# Create Slice

> In redux-toolkit I seperate **Reducer, Action** into many **slice** that depend on the components
> Actions write direct in reducer

**Full code counterSlice.js**

```js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
   count: 0,
};

export const counterSlice = createSlice({
   name: "counter",
   initialState,
   reducers: {
      increment: (state) => {
         state.count += 1;
      },
      decrement: (state) => {
         state.count -= 1;
      },
      incrementByAmount: (state, payload) => {
         state.count += payload;
      },
      decrementByAmount: (state, payload) => {
         state.count -= payload;
      },
   },
});

export const { increment, decrement, incrementByAmount, decrementByAmount } =
   counterSlice.actions;
export default counterSlice.reducer;
```

**import createSlice hook to create slice**
`import { createSlice } from "@reduxjs/toolkit";`

**initial state similar redux core**

```js
const initialState = {
   count: 0,
};
```

**createSlice**

```js
export const counterSlice = createSlice({
   name: "counter", //
   initialState, //
   reducers: {
      increment: (state) => {
         state.count += 1;
      },
      decrement: (state) => {
         state.count -= 1;
      },
      incrementByAmount: (state, payload) => {
         state.count += payload;
      },
      decrementByAmount: (state, payload) => {
         state.count -= payload;
      },
   },
});
```

> At here I can see I can write everything (reducer, action)
> **I don't mention to write immutate or mutate bla..bla**
> redux toolkit allow me to write mutate **but** in fact redux toolkit import the _Immer library_
> Immer library convert mutate to immutate

```js
increment: (state) => {
   state.count += 1;
};
```

**export**

```js
export const { increment, decrement, incrementByAmount, decrementByAmount } =
   counterSlice.actions;
export default counterSlice.reducer;
```

`export const { increment, decrement, incrementByAmount, decrementByAmount } = counterSlice.actions;`

> when I dispatch(increment()) -> RTK automatic create a _action creator_ with the same name

`export default counterSlice.reducer;`

> use with store (configureStore)

# store.js

```js
import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../features/counter/counterSlice";

export const store = configureStore({
   reducer: {
      counter: counterReducer,
   },
});
```

# Counter.js

**Full code**

```js
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
```

**import all action from counterSlice**

```js
import { useSelector, useDispatch } from "react-redux";
import counterSlice from "./counterSlice";
import {
   decrement,
   increment,
   decrementByAmount,
   incrementByAmount,
} from "./counterSlice";
```

`const count = useSelector((state) => state.counter.count);`

> **counter** is name of reducer in store.js

```js
export const store = configureStore({
   reducer: {
      counter: counterReducer,
   },
});
```

> **count** is data in initialState

# App.js

```js
import { store } from "./app/store";
import { Provider } from "react-redux";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
   <Provider store={store}>
      <React.StrictMode>
         <App />
      </React.StrictMode>
   </Provider>
);
```
