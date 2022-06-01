import React, { createContext, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { getImages } from '../../../actions/upload';
import { UploadForm } from '../../forms/upload/Upload';
import { CardGrid } from '../../ui/card/CardGrid';

export const ImagesContext = createContext(null);

export const Playground = () => {
  const dispatch = useDispatch();
  const [images, setImages] = useState([]);
  const imgCtxValue = { images, setImages };

  useEffect(() => {
    let abortController = new AbortController();
    const fetchData = async () => {
      const result = await dispatch(getImages());

      const sortResult = result.sort((a, b) =>
        a.image.toLowerCase() < b.image.toLowerCase() ? -1 : b.image.toLowerCase() > a.image.toLowerCase() ? 1 : 0
      );

      setImages(sortResult);
    };

    fetchData();

    return () => {
      abortController.abort();
    };
  }, [dispatch]);

  return (
    <div className='container'>
      <ImagesContext.Provider value={imgCtxValue}>
        <CardGrid images={images} />
        <UploadForm />
      </ImagesContext.Provider>
    </div>
  );
};
