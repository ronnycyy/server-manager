import React from 'react';
import { Spin } from 'antd';

function Loading({ width, height, backgroundColor }) {
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      width: width || '100%',
      height: height || '100%',
      backgroundColor: backgroundColor || 'transparent'
    }}>
      <Spin tip="玩命加载中..."></Spin>
    </div>
  )
}

export default Loading;
