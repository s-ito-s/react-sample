import { BrowserRouter, Route, Routes } from "react-router-dom"
import Top from "./Top"
import SampleUseState from "./sample-useState"
import SampleUseContext from "./sample-useContext"
import SampleUseReducer from "./sample-useReducer"
import SampleZustand from "./sample-zustand"
import SampleReduxThunk from "./sample-redux-thunk"
import { store } from "./sample-redux-thunk/redux/store"
import { storeReduxDI } from "./sample-redux-di/store"
import SampleRecoil from "./sample-recoil"
import SampleReduxDI from "./sample-redux-di"
import SampleCounter from "./sample-counter"
import SampleCounterMemo from "./sample-counter-memo"
import SampleCounterClass from "./sample-counter-class";
import SampleComponentLibrary from "./sample-component-library"
import "./App.css"
import { Provider } from "react-redux"


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Top />} />
        <Route path="/useState" element={<SampleUseState />} />
        <Route path="/useContext" element={<SampleUseContext />} />
        <Route path="/useReducer" element={<SampleUseReducer />} />
        <Route path="/zustand" element={<SampleZustand />} />
        <Route
          path="/redux-thunk"
          element={
            <Provider store={store}>
              <SampleReduxThunk />{" "}
            </Provider>
          }
        />
        <Route path="/recoil" element={<SampleRecoil />} />
        <Route 
          path="/redux-di" 
          element={
            <Provider store={storeReduxDI}>
              <SampleReduxDI />
            </Provider>
          }
        />
        <Route path="/component-library" element={<SampleComponentLibrary />} />
        <Route path="/counter" element={<SampleCounter />} />
        <Route path="/counterMemo" element={<SampleCounterMemo />} />
        <Route path="/counterClass" element={<SampleCounterClass />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
