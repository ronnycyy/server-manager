import React from 'react';
import ReactDOM from 'react-dom';
import App from './container/App';
import Login from'./container/Login';
import { HashRouter, Routes, Route } from 'react-router-dom';
import Home from './components/Home/Home';
import License from './components/License/License';
import Demo from './components/Demo/Demo';
import DeviceManager from './components/DeviceManager/DeviceManager';
import './global.css';
import './my-antd.css';
import VirtualList from './components/shared/VirtualList';

ReactDOM.render((
  <React.StrictMode>
    <HashRouter>
      <Routes>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/" element={<App />}>
          <Route path="" element={<Home />}></Route>
          <Route path="license" element={<License />}></Route>
          <Route path="demo" element={<Demo />}></Route>
          <Route path="device-manager" element={<DeviceManager />}></Route>
          <Route path="*" element={<Home />} />
        </Route>
      </Routes>
    </HashRouter>
  </React.StrictMode>
), document.getElementById("reactapp"));
