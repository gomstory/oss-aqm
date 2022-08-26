import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import CompareProject from './pages/compare-project/compare-project';
import NewProject from './pages/new-project/new-project';
import AboutUs from './pages/about-us/about-us';
import store from './redux/store'
import { Provider } from 'react-redux'
import './styles/theme.scss';
import {
  Routes,
  Route,
  Navigate,
  HashRouter
} from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <HashRouter>
        <Routes>
          <Route path="/" element={<App />}>
            <Route path="compare" element={<CompareProject />} />
            <Route path="new" element={<NewProject />} />
            <Route path="about-us" element={<AboutUs />} />
            <Route path='*' element={<Navigate to="/compare" replace />} />
          </Route>
        </Routes>
      </HashRouter>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
