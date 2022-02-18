import React from 'react';
import VirtualList from '../shared/VirtualList';
import "./device-manager.css";
import Loading from '../shared/Loading';
import { EditFilled } from '@ant-design/icons';
import Modal from '../shared/Modal';
import Input from '../shared/Input';

function DeviceManager() {
  console.log('render DeviceManager~');
  // TODO: 虚拟长列表渲染设备列表
  // 每次请求 50 个加入状态，DOM上只展示 20 个，另外30个滚动到了再渲染。
  // 当用户滚动到底时，再去请求 50 个。
  const [devices, setDevices] = React.useState([]);
  const [dialogVisible, setDialogVisible] = React.useState(false);
  const [currentDevice, setCurrentDevice] = React.useState(null);
  const listStyleRef = React.useRef({
    name: { width: 250 },
    type: { width: 150 },
    ip: { width: 200 },
    mac: { width: 400 },
    operator: { width: 100 },
    nameIcon: {
      green: {
        width: 15,
        height: 15,
        display: 'inline-block',
        backgroundColor: 'green',
        borderRadius: '50%',
        transform: 'translate(-4px, 3px)',
      },
      gray: {
        width: 15,
        height: 15,
        display: 'inline-block',
        backgroundColor: 'gray',
        borderRadius: '50%',
        transform: 'translate(-4px, 3px)',
      }
    }
  })
  const listStyle = listStyleRef.current;

  const handleEdit = (d) => {
    setDialogVisible(true);
    setCurrentDevice(d)
  }

  const renderEditor = () => {
    const changeDevice = (field,e) => {
      console.log(field, e);
      console.log(e.target.value);
    }

    return currentDevice ?
      (
        <div className="device-edit-form">
          <div>
            <label>名称</label>
            <Input value={currentDevice.name} onChange={(e) => changeDevice('name',e)} />
          </div>
          <div>
            <label>类型</label>
            <Input value={currentDevice.type} onChange={(e) => changeDevice('type',e)} />
          </div>
          <div>
            <label>IP</label>
            <Input value={currentDevice.ip} onChange={(e) => changeDevice('ip',e)}/>
          </div>
        </div>
      )
      :
      (
        <div>没有选中任何设备</div>
      )
  }

  const detail = (d) => (
    <li key={d.id}>
      <span style={listStyle.name}>
        <span style={d.online ? listStyle.nameIcon.green : listStyle.nameIcon.gray}></span>
        {d.name}
      </span>
      <span style={listStyle.type}>{d.type}</span>
      <span style={listStyle.ip}>{d.ip}</span>
      <span style={listStyle.mac}>{d.mac}</span>
      <span style={listStyle.operator}>
        <EditFilled style={{ cursor: 'pointer', color: '#52c41a' }} title="编辑" onClick={() => handleEdit(d)} />
      </span>
    </li>
  )

  React.useEffect(() => {
    fetch(`http://localhost:4000/data/devices`)
      .then(res => res.json())
      .then(devices => {
        console.log(devices);
        setDevices(devices);
      })
  }, []);

  return (
    <div style={{
      width: '100%',
      minWidth: 900
    }}>
      {/* <VirtualList></VirtualList> */}
      <div className="devices" >
        <span style={listStyle.name}>名称</span>
        <span style={listStyle.type}>类型</span>
        <span style={listStyle.ip}>IP地址</span>
        <span style={listStyle.mac}>MAC地址</span>
        <span style={listStyle.operator}>操作</span>
      </div>
      {
        devices.length === 0 ?
          <Loading backgroundColor="#333333" height="calc(100vh - 126px)" />
          :
          <ul className="device-infos">
            {devices.map(d => detail(d))}
          </ul>
      }
      <Modal
        reactRootId="reactapp"
        visible={dialogVisible}
        title="编辑设备"
        content={renderEditor}
        onConfirm={() => console.log('confirm')}
        onCancel={() => console.log('cancel')}
        onClose={() => setDialogVisible(false)}
      />
    </div>
  );
}

export default DeviceManager;