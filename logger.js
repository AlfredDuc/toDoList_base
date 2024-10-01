export default function withLogger(reducer) {
  return (prevState, action, agrs) => {
    console.group(action);
    console.log("Prev State: ", prevState);
    console.log("Prev Argument: ", agrs);
    const nextState = reducer(prevState, action, agrs);
    console.log("Next State: ", nextState);

    console.log(action);
    return nextState;
  };
}
