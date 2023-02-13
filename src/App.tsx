import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Top from './Top'
import SampleUseState from './sample-useState';
import SampleUseContext from './sample-useContext';
import SampleUseReducer from './sample-useReducer';
import SampleReduxMiddleware from './sample-redux-middleware';
import SampleReduxThunk from './sample-redux-thunk';
import SampleRecoil from './sample-recoil';

import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Top />} />
        <Route path="/useState" element={<SampleUseState />} />
        <Route path="/useContext" element={<SampleUseContext />} />
        <Route path="/useReducer" element={<SampleUseReducer />} />
        <Route path="/redux-middleware" element={<SampleReduxMiddleware />} />
        <Route path="/redux-thunk" element={<SampleReduxThunk />} />
        <Route path="/recoil" element={<SampleRecoil />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
