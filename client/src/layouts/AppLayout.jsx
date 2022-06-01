import React from 'react';
import { Layout } from 'antd';
import { Content } from 'antd/lib/layout/layout';
import { AppRouter } from '../router/AppRouter';
import { AppHeader } from './AppHeader';
import { AppFooter } from './AppFooter';
import { Loading } from '../components/ui/loading/Loading';
import './app-layout.css';

export const AppLayout = () => {
  return (
    <Layout className='--main-layout__container'>
      <Layout className='--main-layout__right'>
        <AppHeader />
        <Loading />
        <Content className='--layout-content__container'>
          <AppRouter />
        </Content>
        <AppFooter />
      </Layout>
    </Layout>
  );
};
