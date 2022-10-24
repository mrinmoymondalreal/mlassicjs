const Mlassic = {
    createElement: (tag, props, ...children)=>{
        if(typeof tag === "function"){
            let element = tag(props);
            return element;
        }
        let element = { tag: tag, props: {...props, children} }
        return element;
    }
}


module.exports = {
    React
}