import React from 'react';
import { Form, Input, Button, message } from 'antd';

export const PasswordRecover = () => {
  const [form] = Form.useForm();
  const onFinish = async ({ password, password2 }) => {
    if (password === password2) {
      message.success({
        content: <p style={{ padding: '12px', width: '350px' }}>Las</p>,
        duration: 3,
        onClose: form.resetFields(),
        style: {
          marginTop: '20vh',
        },
      });
    }

    message.error({
      content: <p style={{ padding: '12px', width: '350px' }}>No coinciden las contraseñas</p>,
      duration: 3,
      onClose: form.resetFields(),
      style: {
        marginTop: '20vh',
      },
    });
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        hight: '100%',
        width: '100%',
      }}
    >
      <div style={{ textAlign: 'center', width: '33%' }}>
        <h2>Cambiar contraseña</h2>
      </div>
      <div style={{ width: '33%' }}>
        <Form
          name='basic'
          form={form}
          labelCol={{
            span: 24,
          }}
          wrapperCol={{
            span: 24,
          }}
          onFinish={onFinish}
          autoComplete='off'
          layout='vertical'
        >
          <Form.Item
            label='Contraseña'
            name='password'
            rules={[
              {
                required: true,
                message: 'Ingrese una contraseña!',
              },
            ]}
          >
            <Input.Password allowClear placeholder='Indique una contraseña' />
          </Form.Item>
          <Form.Item
            label='Confirme contraseña'
            name='confirm'
            dependencies={['password']}
            hasFeedback
            rules={[
              {
                required: true,
                message: 'Repita la contraseña!',
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('Las dos contraseñas introducidas no coinciden!'));
                },
              }),
            ]}
          >
            <Input.Password placeholder='Repita la contraseña' />
          </Form.Item>
          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Button type='primary' htmlType='submit'>
              Aceptar
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};
