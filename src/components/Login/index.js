import React from 'react'
import styles from './index.less'
import { observer, inject } from 'mobx-react'
import { Button, Row, Form, Input } from 'antd'

const FormItem = Form.Item

const Login = inject('appStore')(observer(({
  match,
  appStore,
  appStore: { loginSubmit },
  form: {
    getFieldDecorator,
    validateFieldsAndScroll
  } }) => {
  return (
    <div className={styles.loginWrapper}>
      <form>
        <FormItem hasFeedback>
          {getFieldDecorator('username', {
            rules: [
              {
                required: true,
                message: '请填写用户名'
              }
            ]
          })(<Input
            size='large'
            placeholder='用户名'
            onPressEnter={loginSubmit.bind(appStore, validateFieldsAndScroll)}
          />)}
        </FormItem>
        <FormItem hasFeedback>
          {getFieldDecorator('password', {
            rules: [
              {
                required: true,
                message: '请填写密码'
              }
            ]
          })(<Input
            size='large'
            type='password'
            placeholder='密码'
            onPressEnter={loginSubmit.bind(appStore, validateFieldsAndScroll)}
          />)}
        </FormItem>
        <Row>
          <Button
            type='primary'
            size='large'
            onClick={loginSubmit.bind(appStore, validateFieldsAndScroll)}
          >
            登录
          </Button>
        </Row>
      </form>
    </div>
  )
}))

export default Form.create()(Login)