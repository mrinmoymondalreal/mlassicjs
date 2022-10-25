const { makeId, _tree, storeState } = require("./utils");

function render(element, container, c){
    let _id = makeId(), actualDomElement;

    if(["number", "string"].includes(typeof element)){
        actualDomElement = document.createTextNode(element)
    }else if(typeof element == "function"){
        if(element.isState){
            let state = element;
            let value = element.cb ? element.cb(element()) : element();
            actualDomElement = render(value, container, 1);
            storeState(state, actualDomElement, null, container);
        }
    }else if(Array.isArray(element)){
        let store = document.createElement("span");
        if(element.length>0){
            store = Array.from(element).map(e=>render(e, container, c));
            let f = document.createElement("span");
            store.forEach(e=>{f.appendChild(e);})
            store = f;
        }
        actualDomElement = store;
        if(!c) container.appendChild(actualDomElement);
        return store;
    }else{
        actualDomElement = document.createElement(element.tag);
    }

    if(c!=1 && !c){
        _tree[_id] = {
            _id: _id,
            parentElement: container,
            element: actualDomElement,
        }
        container.appendChild(actualDomElement);
    }
    
    if(["number", "string", "function"].includes(typeof element)){
        return actualDomElement;
    }

    if(element.props.children){
        element.props.children.forEach((e)=>{
            render(e, actualDomElement);
        });
    }
    if(element.props){
        Object.keys(element.props).filter(e=>e!="children").forEach(e=>{
            if(element.props[e] && element.props[e].isState){
                let state = element.props[e];
                let value = element.props[e].cb ? element.props[e].cb(element.props[e]()) : element.props[e]();
                actualDomElement[e] = value;
                storeState(state, actualDomElement, e);
            }else{
                actualDomElement[e] = element.props[e];
            }
        })
    }
    
    return actualDomElement;
}

module.exports = {
    render
}