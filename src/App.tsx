import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Top from './Top';
import SampleUseState from './sample-useState';
import SampleUseContext from './sample-useContext';
import SampleUseReducer from './sample-useReducer';
import SampleReduxMiddleware from './sample-redux-middleware';
import SampleReduxThunk from './sample-redux-thunk';
import { store } from './sample-redux-thunk/redux/store';
import SampleRecoil from './sample-recoil';

import './App.css';
import { Provider } from 'react-redux';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Top />} />
        <Route path='/useState' element={<SampleUseState />} />
        <Route path='/useContext' element={<SampleUseContext />} />
        <Route path='/useReducer' element={<SampleUseReducer />} />
        <Route path='/redux-middleware' element={<SampleReduxMiddleware />} />
        <Route
          path='/redux-thunk'
          element={
            <Provider store={store}>
              <SampleReduxThunk />{' '}
            </Provider>
          }
        />
        <Route path='/recoil' element={<SampleRecoil />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
