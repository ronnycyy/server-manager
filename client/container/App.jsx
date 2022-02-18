import React from 'react';
import { Outlet } from 'react-router-dom'
import { UserOutlined, VideoCameraOutlined, HomeOutlined, VerifiedOutlined, DatabaseOutlined } from '@ant-design/icons';
import './app.css';
import logo from '../images/logo.jpeg';

function App() {
  console.log('App rendered~');
  const [version] = React.useState('v1.0.0.0');

  return (
    <>
      <header className="myHeader">
        <img src={logo} alt="logo" />
        <h3>服务器管理平台</h3>
        <span>{version}</span>
        <span style={{ marginLeft: 20, fontStyle: 'italic' }}>*TODO: User组件</span>
      </header>
      <div className="myBody">
        <nav>
          <a href="#">
            <HomeOutlined style={{ marginRight: 7 }}/>
            首页
          </a>
          <a href="#/device-manager">
            <DatabaseOutlined style={{ marginRight: 7 }} />
            设备管理
          </a>
          <a href="#/license">
            <VerifiedOutlined style={{ marginRight: 7 }} />
            License
          </a>
          <a href="#/demo">
            <UserOutlined style={{ marginRight: 7 }} />
            Demo
          </a>
        </nav>
        <div className="myContent">
          <Outlet />
        </div>
      </div>
    </>
  )
}

export default App;