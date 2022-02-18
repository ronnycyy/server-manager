import React, { useEffect } from 'react'
import { Liquid } from '@ant-design/charts';
import Loading from '../shared/Loading';
import Card from '../shared/Card';

function MyLiquid({ percent, title }) {
  console.log('render MyLiquid', percent);

  const style = {
    container: {
      marginRight: 50,
    },
    title: {
      textAlign: 'center',
      fontSize: 18
    }
  }

  const config = {
    percent: percent,
    liquidStyle: {
      fill: '#52c41a',
      stroke: "#52c41a"
    },
    outline: {
      border: 2,
    },
    wave: {
      length: 128,
    },
  };

  return (
    <div style={style.container}>
      <h5 style={style.title}>{title}</h5>
      <Liquid {...config} height={150} width={150} style={{ fontSize: 8 }} />
    </div>
  )
}

function Status(props) {
  console.log('render Status,', props);
  const [monitorData, setMonitorData] = React.useState(null)

  useEffect(() => {
    fetch('http://localhost:4000/data/status')
      .then(res => res.json())
      .then((data) => {
        setMonitorData(data)
      })
  }, [])

  return (
    <Card title="状态" style={{ marginBottom: 20, marginTop: 10 }}>
      {
        !monitorData ? <Loading width={800} height={200} /> :
          <div style={{ display: 'flex', marginTop: '1em' }}>
            <MyLiquid percent={monitorData.load} title="负载状态" />
            <MyLiquid percent={monitorData.cpu} title="CPU使用率" />
            <MyLiquid percent={monitorData.memory} title="内存占用" />
            <MyLiquid percent={monitorData.disk} title="磁盘占用" />
          </div>
      }
    </Card>
  )
}

export default Status
