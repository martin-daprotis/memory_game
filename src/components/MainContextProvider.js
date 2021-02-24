import React, { useMemo, useReducer } from "react";
import MainContext from "./MainContext";

const initialState = {
  count: 20,
  paired: 0,
  lastFlipped: { index: -1, title: "", flipped: 1 },
  arrayFlipped: Array.from({ length: 20 }).map((e) => 1),
};

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_COUNTER":
      return {
        ...state,
        count: action.payload,
        arrayFlipped: Array.from({ length: action.payload }).map((e) => 1),
      };
    case "ADD_PAIR":
      return {
        ...state,
        paired: state.paired + 1,
        lastFlipped: { index: -1, title: "", flipped: 1 },
      };
    case "SET_LAST_FLIPPED":
      return { ...state, lastFlipped: action.payload };
    case "SET_FLIPPED": {
      let newArr = [...state.arrayFlipped];
      newArr[action.payload.index] = action.payload.flipped;
      return { ...state, arrayFlipped: newArr };
    }
    case "FLIP_PAIR": {
      let newArr = [...state.arrayFlipped];
      newArr[action.payload.index] = 1;
      newArr[state.lastFlipped.index] = 1;
      return {
        ...state,
        arrayFlipped: newArr,
        lastFlipped: { index: -1, title: "", flipped: 1 },
      };
    }
    default:
      return state;
  }
};

const MainContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const providedValue = useMemo(
    () => ({
      state,
      dispatch,
    }),
    [state, dispatch]
  );
  return (
    <MainContext.Provider value={providedValue}>
      {children}
    </MainContext.Provider>
  );
};

export default MainContextProvider;
