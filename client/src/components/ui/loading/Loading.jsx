import React from 'react';
import { useSelector } from 'react-redux';
import { Spin } from 'antd';
import './loading.scss';

export const Loading = () => {
  const { loading } = useSelector((state) => state.ui);

  return (
    loading && (
      <div className='--layout-content__spinner'>
        <Spin size='large' />
      </div>
    )
  );
};
