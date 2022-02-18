import React from 'react';
import ReactDOM from 'react-dom';
import './modal.css';
import { CloseCircleOutlined } from '@ant-design/icons';
import Button from './Button';

function Modal({ title, content, visible, onClose, onConfirm, onCancel, reactRootId, style }) {
  const handleClose = () => onClose && onClose();
  const handleCancel = () => onCancel && onCancel();
  const handleConfirm = () => onConfirm && onConfirm();

  return ReactDOM.createPortal(
    <div style={{ display: visible ? "block" : "none" }}>
      {/* 居中 */}
      <div className="modal_main" style={style}>
        {/* 标题栏 */}
        <div className="modal_title">
          {title}
          <CloseCircleOutlined onClick={handleClose} style={{ cursor: 'pointer' }} />
        </div>
        {/* 内容 */}
        <div className="modal_content">
          {Object.prototype.toString.call(content) === '[object Function]' ? content() : content}
        </div>
        {/* 确认和取消 按钮 */}
        <div className="modal_buttons">
          <Button onClick={handleConfirm} style={{ marginRight: '0.5rem' }}>确认</Button>
          <Button onClick={handleCancel}>取消</Button>
        </div>
      </div>
      {/* 捕捉背景点击事件以关闭弹窗 */}
      <div className="modal_mask" onClick={handleClose}></div>
    </div>,
    // 挂载到 react根DOM 或 body
    reactRootId ? document.getElementById(reactRootId) : document.body
  )
}

export default Modal;