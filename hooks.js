const { render } = require("./renderer");
let { stateCount, states, makeId, storedStates, _tree } = require("./utils")

const useState = (initVal)=>{
    const FORZENCOUNT = stateCount;
    states[FORZENCOUNT] = initVal;

    const state = () => states[FORZENCOUNT];

    state.isState = true;
    state._id = makeId();

    stateCount++;

    const setState = (newValue) => {
        let oldValue = Array.isArray(states[FORZENCOUNT]) ? Array.from(states[FORZENCOUNT]) : states[FORZENCOUNT] ;
        let value = typeof newValue == "function" ? newValue(states[FORZENCOUNT]) : newValue ;
        if( oldValue !== value || !Object.is(oldValue, value) ){
            states[FORZENCOUNT] = value;
            callEffects(Object.values(states).filter(e=>e.dep==state._id))
            rerender(state);
        }
    }

    state.setCaller = (cb)=>{
        let func = eval(String(state));
        func.isState = state.isState;
        func._id = state._id;
        func.cb = cb;
        return func;
    }

    function rerender(_s){
        storedStates.forEach((e,i)=>{
            if(e._id==_s._id){
                let value = e.state();
                if(e.state.cb){
                    value = e.state.cb(e.state());
                }
                if(e.attr){
                    e.element.setAttribute(e.attr, value);
                }else{
                    let result = render(value, e.element.parentElement, 1);
                    let newEl = result;
                    e.element.parentElement.insertBefore(newEl, e.element);
                    e.element.remove();
                    storedStates[i].element = newEl;
                }
            }
        });
    }

    return [ state, setState ];
}

const callEffects = (arr)=>{
    arr.forEach(e=>e());
}

const useEffect = (cb, dep)=>{
    cb.dep = dep._id;
    states[stateCount] = cb;
    stateCount++;
    cb();
}

module.exports = {
    useState,
    useEffect
}