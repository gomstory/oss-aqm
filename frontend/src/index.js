import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import './styles/index.scss';

import CompareProject from './compare-project/compare-project';
import NewProject from './new-project/new-project';
import AboutUs from './about-us/about-us';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
      <Route path="/" element={<App />}>
        <Route path="compare" element={<CompareProject />} />
        <Route path="new" element={<NewProject />} />
        <Route path="about-us" element={<AboutUs />} />
        <Route path='*' element={<Navigate to="/compare" replace />} />
      </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
