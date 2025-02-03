// import { Component }  from 'react';
// connect is a hooc used in class based to wrappe the component with the store
// import { connect } from 'react-redux'
import { useSelector, useDispatch } from 'react-redux'
import classes from './Counter.module.css';

const Counter = () => {
  // useSelector will make react to default subscribe to the store and get the state
  const counter = useSelector(state => state.counter)
  const show = useSelector(state => state.showCounter)
  const dispatch = useDispatch()
  const incrementHandler = () => {
    dispatch({ type: 'INCREMENT' })
  }
  const increaseHandler = () => {
    dispatch({ type: 'INCREASE', amount: 5 })
  }
  const decrementHandler = () => {
    dispatch({ type: 'DECREMENT' })
  }
  const toggleCounterHandler = () => {
    dispatch({ type: 'TOGGLE' })
  };

  return (
    <main className={classes.counter}>
      <h1>Redux Counter</h1>
      {show && <div className={classes.value}>{counter}</div>}
      <div>
        <button onClick={incrementHandler}>Increment</button>
        <button onClick={increaseHandler}>Increment By 5 </button>
        <button onClick={decrementHandler}>Decrement</button>
      </div>
      <button onClick={toggleCounterHandler}>Toggle Counter</button>
    </main>
  );
};
export default Counter;

// class Counter extends Component {
//   incrementHandler() {
//     this.props.increment()
//   }
//   decrementHandler() {
//     this.props.decrement()
//   }
//   toggleCounterHandler() {
//     this.props.toggle()
//   }
//   render() {
//     return (<main className={classes.counter}>
//       <h1>Redux Counter</h1>
//       <div className={classes.value}>{this.props.counter}</div>
//       <div>
//         <button onClick={this.incrementHandler.bind(this)}>Increment</button>
//         <button onClick={this.decrementHandler.bind(this)}>Decrement</button>
//       </div>
//       <button onClick={this.toggleCounterHandler.bind(this)}>Toggle Counter</button>
//     </main>)
//   }
// }
// // connect return a function that takes the component as argument
// // and return a new component with the store
// // connect teke 2 arguments, the first is a function that return an object
// // that will be merged with the props of the component
// // the second argument is the component that will be wrapped
// // the first argument is a function that take the state as argument
// // and return an object that will be merged with the props of the component
// // the second argument is the component that will be wrapped

// const mapStateToProps = state => {
//   return {
//     counter: state.counter
//   }
// }
// const mapDispatchToProps = dispatch => {
//   return {
//     increment: () => dispatch({ type: 'INCREMENT' }),
//     decrement: () => dispatch({ type: 'DECREMENT' }),
//     toggle: () => dispatch({ type: 'TOGGLE' })
//   }
// }
// export default connect(mapStateToProps, mapDispatchToProps)(Counter);
