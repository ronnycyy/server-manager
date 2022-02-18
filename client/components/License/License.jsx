import React from 'react';
import { Upload, message, Button } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import "./License.css";

class License extends React.Component {
  state = {
    fileList: [],
    uploading: false,
  }

  handleUpload = () => {
    const { fileList } = this.state;
    const formData = new FormData();
    fileList.forEach(file => {
      formData.append('file', file);
    });
    this.setState({
      uploading: true,
    });
    // You can use any AJAX library you like
    fetch('http://localhost:4000/file', {
      method: 'POST',
      body: formData,
    })
      .then(res => res.json())
      .then((json) => {
        message.success('upload successfully.' + JSON.stringify(json));
      })
      .catch((e) => {
        debugger
        message.error('upload failed.');
      })
      .finally(() => {
        this.setState({
          uploading: false,
        });
      });
  }

  render() {
    const { uploading, fileList } = this.state;
    const props = {
      onRemove: file => {
        this.setState(state => {
          const index = state.fileList.indexOf(file);
          const newFileList = state.fileList.slice();
          newFileList.splice(index, 1);
          return {
            fileList: newFileList,
          };
        });
      },
      beforeUpload: file => {
        this.setState(state => ({
          fileList: [...state.fileList, file],
        }));
        return false;
      },
      fileList,
    };

    return (
      <>
        <Upload {...props}>
          <Button icon={<UploadOutlined />}>Select File</Button>
        </Upload>
        <Button
          type="primary"
          onClick={this.handleUpload}
          disabled={fileList.length === 0}
          loading={uploading}
          style={{ marginTop: 16 }}
        >
          {uploading ? 'Uploading' : 'Start Upload'}
        </Button>
      </>
    );
  }
}

class DndSample extends React.Component {
  constructor(props) {
    super(props);
  }

  state = {
    lineHeight: 42,
    dragging: false,
    draggingIndex: -1,
    startPageY: 0,
    offsetPageY: 0,
    list: [
      'Item 1',
      'Item 2',
      'Item 3',
      'Item 4',
      'Item 5',
      'Item 6',
      'Item 7',
      'Item 8',
    ]
  }

  move = (arr, startIndex, toIndex) => {
    arr = arr.slice();
    arr.splice(toIndex, 0, arr.splice(startIndex, 1)[0]);
    return arr;
  }

  handleMounseDown = (evt, index) => {
    this.setState({
      dragging: true,
      startPageY: evt.pageY,
      currentPageY: evt.pageY,
      draggingIndex: index,
    });
  }

  handleMouseUp = () => {
    this.setState({ dragging: false, startPageY: 0, draggingIndex: -1 });
  }

  handleMouseMove = evt => {
    let offset = evt.pageY - this.state.startPageY;
    const draggingIndex = this.state.draggingIndex;
    const lineHeight = this.state.lineHeight;
    if (offset > lineHeight && draggingIndex < this.state.list.length - 1) {
      // move down
      offset -= lineHeight;
      this.setState({
        list: this.move(this.state.list, draggingIndex, draggingIndex + 1),
        draggingIndex: draggingIndex + 1,
        startPageY: this.state.startPageY + lineHeight,
      });
    } else if (offset < -lineHeight && draggingIndex > 0) {
      // move up
      offset += lineHeight;
      this.setState({
        list: this.move(this.state.list, draggingIndex, draggingIndex - 1),
        draggingIndex: draggingIndex - 1,
        startPageY: this.state.startPageY - lineHeight,
      });
    }
    this.setState({ offsetPageY: offset });
  }

  getDraggingStyle(index) {
    if (index !== this.state.draggingIndex) return {};
    return {
      backgroundColor: "#eee",
      transform: `translate(10px, ${this.state.offsetPageY}px)`,
      opacity: 0.5,
    };
  }

  render() {
    return (
      <div className="dnd-sample">
        <ul>
          {this.state.list.map((text, i) => (
            <li
              key={text}
              onMouseDown={evt => this.handleMounseDown(evt, i)}
              style={this.getDraggingStyle(i)}
            >
              {text}
            </li>
          ))}
        </ul>
        {this.state.dragging && (
          <div
            className="dnd-sample-mask"
            onMouseMove={this.handleMouseMove}
            onMouseUp={this.handleMouseUp}
          />
        )}
      </div>
    );
  }
}


export default DndSample;
