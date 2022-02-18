import React from 'react';
import { CaretRightOutlined } from '@ant-design/icons';


function Card({ title, style, icon, children }) {
  const [cardStyle] = React.useState({
    container: {
      color: '#FFFFFF',
      ...style
    },
    header: {
      fontSize: 24,
      fontWeight: 'bold',
      height: 40,
      lineHeight: '40px',
    },
    body: {
      fontSize: 16,
      padding: '0.5rem'
    }
  });


  return (
    <div style={cardStyle.container}>
      <header style={cardStyle.header}>
        {icon ? icon : <CaretRightOutlined style={{ marginRight: '0.2rem' }}/>}
        {title}
      </header>
      <div style={cardStyle.body}>
        {children}
      </div>
    </div>
  )

}

export default Card;