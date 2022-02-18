import React, { useEffect } from 'react'
import Card from '../shared/Card';
import Loading from '../shared/Loading';


const Block = ({ title, data, color }) => {
  return (
    <div style={{
      width: 200,
      height: 100,
      marginRight: 16,
      backgroundColor: '#222',
      borderRadius: '5%',
    }}>
      <h5 style={{
        height: 30,
        textAlign: 'center',
        fontSize: 18,
        lineHeight: '50px',
      }}>{title}</h5>
      <span style={{
        display: 'inline-block',
        width: '100%',
        marginTop: 10,
        marginTop: 18,
        textAlign: 'center',
        fontSize: 24,
        color: color || '#52c41a',
      }}>{data}</span>
    </div >
  )
}

function Preview() {
  console.log('render Preview');
  const [data, setData] = React.useState(null);

  useEffect(() => {
    fetch('http://localhost:4000/data/preview')
      .then(res => res.json())
      .then((data) => {
        setData(data)
      })
  }, [])

  return (
    <Card title="概览">
      {
        !data ? <Loading width={800} height={116} /> :
          <div style={{ display: 'flex' }}>
            <Block data={data.web} title="网站" />
            <Block data={data.ftp} title="FTP" />
            <Block data={data.database} title="数据库" />
            <Block data={data.risk} title="安全风险" color="red" />
          </div>
      }
    </Card>
  )
}

export default Preview