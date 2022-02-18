import React, { useRef, useEffect } from 'react'
import Form, { Input, Select } from '../components/shared/formData/form';
import Button from '../components/shared/Button';
import './login.css';
import logo from '../images/logo.jpeg';

const FormItem = Form.FormItem
const Option = Select.Option

function Login() {
  const form = useRef(null)

  useEffect(() => {
    console.log(form.current, 'form.current')
  }, [])

  const handleClick = () => {
    handleGetValue()
    form.current.submit((res) => {
      console.log(res)
    })
  }

  const handleGetValue = () => {
    const value = form.current.getFieldsValue()
    console.log(value)
  }

  return (
    <div className="login-container">
      <div className="login-block">
        <div className="login-header">
          <img src={logo} alt="logo" style={{ width: '20%' }} />
          <h3>服务器管理平台</h3>
          <span>v1.0.0.0</span>
        </div>
        <Form ref={form} className="login-form">
          <FormItem label="语言" name="language" required>
            <Select placeholder="请选择" width={120}>
              <Option value={1}> React.js </Option>
              <Option value={2} > Vue.js </Option>
              <Option value={3} > Angular.js </Option>
            </Select>
          </FormItem>

          <FormItem label="用户名" name="username" required
            rules={{
              rule: /^[a-zA-Z0-9_\u4e00-\u9fa5]{4,32}$/,
              message: '名称仅支持中文、英文字母、数字和下划线，长度限制4~32个字'
            }}
            validateTrigger="onBlur">
            <Input placeholder="用户名称" />
          </FormItem>

          <FormItem label="密码" name="password" required validateTrigger="onBlur">
            <Input placeholder="输入密码" />
          </FormItem>

          <Button onClick={handleClick} className="login-button">登录</Button>
        </Form>
      </div>
    </div>
  )
}

export default Login;
