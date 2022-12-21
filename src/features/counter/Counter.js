import React from "react";
import { useSelector, useDispatch } from "react-redux";
import counterSlice from "./counterSlice";
import {
   decrement,
   increment,
   decrementByAmount,
   incrementByAmount,
} from "./counterSlice";

function Counter() {
   const count = useSelector((state) => state.counter.count);
   const dispatch = useDispatch();
   console.log(count);
   return (
      <div>
         <p>{count}</p>
         <button onClick={() => dispatch(increment())}>+</button>
         <button onClick={() => dispatch(decrement())}>-</button>
         <button onClick={() => dispatch(decrementByAmount(2))}>--</button>
         <button onClick={() => dispatch(incrementByAmount(5))}>++</button>
      </div>
   );
}

export default Counter;
