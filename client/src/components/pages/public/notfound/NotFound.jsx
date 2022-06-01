import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import './not-found.css';

export const NotFound = () => {
  const { loading } = useSelector((state) => state.ui);

  return (
    !loading && (
      <section className='page_404'>
        <h1 className='text-center error_404'>Error 404</h1>
        <div className='four_zero_four_bg'></div>
        <div className='contant_box_404'>
          <h3 className='text-center lost'>Parece que estás perdido</h3>
          <h3 className='text-center unabled'>La página que buscas no está disponible!</h3>
          <Link to='/upload' className='text-center link_404'>
            Ir a Inicio
          </Link>
        </div>
      </section>
    )
  );
};
