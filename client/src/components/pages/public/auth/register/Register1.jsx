import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button, Col, Form, Input, Row } from 'antd';
import { UserOutlined, MailOutlined, LockOutlined } from '@ant-design/icons';
import { startRegister } from '../../../../../actions/auth';
import history from '../../../../../helpers/history';
import './register.scss';

export const Register = () => {
  const dispatch = useDispatch();

  const onFinish = ({ name, email, password }) => {
    dispatch(startRegister(name, email, password));
    history.push('/home');
  };

  const handleShowLogin = () => {
    history.push('/login');
  };

  return (
    <>
      <div className='--login-page__body'></div>
      <div className='--register-page__container'>
        <Row justify='center'>
          <Col>
            <div className='--register-form__container'>
              <Form name='normal_register' className='--register-form' onFinish={onFinish}>
                <h2 className='--register-form__title'>Registrarse</h2>
                <Form.Item name='name' rules={[{ required: true, message: 'Por Favor ingrese el nombre de usuario!' }]}>
                  <Input prefix={<UserOutlined className='site-form-item-icon' />} placeholder='Nombre' />
                </Form.Item>
                <Form.Item
                  name='email'
                  rules={[{ required: true, message: 'Por Favor ingrese la dirección de correo!' }]}
                >
                  <Input prefix={<MailOutlined className='site-form-item-icon' />} placeholder='Correo' />
                </Form.Item>
                <Form.Item name='password' rules={[{ required: true, message: 'Por Favor ingrese la contraseña!' }]}>
                  <Input
                    prefix={<LockOutlined className='site-form-item-icon' />}
                    type='password'
                    placeholder='Contraseña'
                  />
                </Form.Item>

                <Form.Item>
                  <Button type='primary' htmlType='submit' className='register-form__button'>
                    Registrame
                  </Button>
                  <div className='--login-goto__text' onClick={handleShowLogin}>
                    Ya tienes cuenta?
                    <Link className='--login-goto__link' to='/login'>
                      Inicia sesión!
                    </Link>
                  </div>
                </Form.Item>
              </Form>
            </div>
          </Col>
        </Row>
      </div>
    </>
  );
};
