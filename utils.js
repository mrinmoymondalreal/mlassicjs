const _tree = {}, states = {}, storedStates = [];
let stateCount = 0;

const makeId = ()=>{
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

const storeState = (state, element, attr, parentElement)=>{
  let _id = state._id;
  storedStates.push({state, element, attr, _id, parentElement});
}

module.exports = {
  makeId,
  _tree,
  states,
  stateCount,
  storedStates,
  storeState
}