import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Button, message, Space, Upload } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import { loadingFinish, loadingStart } from '../../../actions/ui';
import './upload.scss';
import history from '../../../helpers/history';

const url = `${process.env.REACT_APP_API_URL}/uploads/`;
const { Dragger } = Upload;

const deafaultFileList = [
  {
    uid: '-1',
    name: 'xxx.png',
    status: 'done',
    url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    thumbUrl: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
  },
];

export const UploadForm = () => {
  const [fileList, setFileList] = useState([]);
  const dispatch = useDispatch();

  const handleUpload = () => {
    const formData = new FormData();
    fileList.forEach((file) => {
      formData.append('images', file);
    });
    dispatch(loadingStart());
    fetch(url, {
      method: 'POST',
      headers: { Accept: '*/*', 'x-token': sessionStorage.token },
      body: formData,
    })
      .then((res) => res.json())
      .then(() => {
        setFileList([]);
        history.push('/dashboard');
        history.push('/playground');
        message.success('Las imagenes se cargaron exitosamente');
      })
      .catch(() => {
        message.error('Ocurrio un fallo al cargar las imagenes.');
      })
      .finally(() => {
        dispatch(loadingFinish());
      });
  };

  const props = {
    onRemove: (file) => {
      const newFileList = fileList.filter((item) => item.uid !== file.uid);
      setFileList(newFileList);
    },
    beforeUpload: (file) => {
      setFileList([...fileList, file]);
      return false;
    },
    fileList,
  };

  return (
    <div className='form-container'>
      <Space align='center' direction='vertical'>
        <Dragger
          className='dragger=====>'
          listType='picture'
          accept='.png, .jpg, .jpeg'
          defaultFileList={[deafaultFileList]}
          {...props}
          style={{ padding: '24px' }}
        >
          <p className='ant-upload-drag-icon'>
            <InboxOutlined />
          </p>
          <p className='ant-upload-text'>Haga click o arrastre una imagen a esta area para subirla</p>
        </Dragger>

        <Button
          type='primary'
          onClick={handleUpload}
          disabled={fileList.length === 0}
          style={{
            marginTop: 16,
            width: '150px',
          }}
        >
          Submit
        </Button>
      </Space>
    </div>
  );
};
