import { createContext, ReactNode, useReducer } from "react";
import { State, Dispatch, initState, reducer } from "./reducer";

export const DeviceContext = createContext<State>(initState);
export const DeviceDispatchContext = createContext<Dispatch>(() => {});

export function DeviceContextProvider({ children }: { children: ReactNode }) {
  const [deviceList, dispatch] = useReducer(reducer, initState);
  return (
    <DeviceDispatchContext.Provider value={dispatch}>
      <DeviceContext.Provider value={deviceList}>
        {children}
      </DeviceContext.Provider>
    </DeviceDispatchContext.Provider>
  );
}
