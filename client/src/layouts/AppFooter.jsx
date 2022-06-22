import React from 'react';
import { Col, Row, Space } from 'antd';
import { Footer } from 'antd/lib/layout/layout';
import { AntDesignOutlined, FacebookFilled, GithubOutlined, LinkedinFilled } from '@ant-design/icons';

const style = {
  fontSize: '18px',
  color: 'rgb(20, 0, 120)',
  verticalAlign: 'middle',
};

export const AppFooter = () => {
  return (
    <Row>
      <Col xs={0} sm={24}>
        <Footer className='--layout-footer__container'>
          <Space align='baseline'>
            <div className='--layout-footer__info'>
              {new Date().getFullYear()} -{'  '}
              <a href='https://ant.design/' target='blank'>
                <AntDesignOutlined style={style} />
              </a>
              {'  '}
              Ant Design - App design and development by Joalrope{'  '}
              <a href='https://www.facebook.com/Joalrope' target='blank'>
                <FacebookFilled style={style} />
              </a>
              {'  '}
              {'  '}
              <a href='https://github.com/joalrope' target='blank'>
                <GithubOutlined style={style} />
              </a>
              {'  '}
              {'  '}
              <a href='https://www.linkedin.com/in/joalrope/' target='blank'>
                <LinkedinFilled style={style} />
              </a>
              {'  '}
            </div>
          </Space>
        </Footer>
      </Col>
    </Row>
  );
};
