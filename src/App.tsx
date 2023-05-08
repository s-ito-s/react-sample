import { BrowserRouter, Route, Routes } from "react-router-dom"
import Top from "./Top"
import SampleUseState from "./sample-useState"
import SampleUseContext from "./sample-useContext"
import SampleUseReducer from "./sample-useReducer"
import SampleZustand from "./sample-zustand"
import SampleReduxThunk from "./sample-redux-thunk"
import { store } from "./sample-redux-thunk/redux/store"
import SampleRecoil from "./sample-recoil"
import SampleCounter from "./sample-counter"
import SampleCounterMemo from "./sample-counter-memo"
import SampleCounterClass from "./sample-counter-class"

// style
import StyleCSSModules from "./style-css-modules";

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
        <Route path="/counter" element={<SampleCounter />} />
        <Route path="/counterMemo" element={<SampleCounterMemo />} />
        <Route path="/styleCssModules" element={<StyleCSSModules />} />
        <Route path="/counterClass" element={<SampleCounterClass />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App
