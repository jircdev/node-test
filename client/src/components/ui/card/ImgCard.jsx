import React, { useContext } from 'react';
import { useDispatch } from 'react-redux';
import { Card, Tooltip, Typography } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { parseJwt } from '../../../helpers/parse-jwt';
import { ImagesContext } from '../../pages/private/Playground';
import { deleteImage } from '../../../actions/upload';

const { Meta } = Card;
const { Text } = Typography;

const baseUrl = process.env.REACT_APP_API_URL;

export const ImgCard = ({ id, userName, userId, image }) => {
  const dispatch = useDispatch();
  const { images, setImages } = useContext(ImagesContext);
  const { uid } = parseJwt();
  const { role } = parseJwt();

  const handleDeleteClick = async (id, userId, image) => {
    const { ok } = await dispatch(deleteImage(userId, image));
    if (ok) {
      const newImages = images.filter((item) => item.id !== id);
      setImages(newImages);
      return;
    }
  };

  return (
    <Card
      hoverable
      style={{
        width: 170,
        height: 230,
      }}
      cover={
        <>
          <img alt={`${image}`} src={`${baseUrl}/uploads/user/${userId}/img/${image}`} style={{ height: '100px' }} />
        </>
      }
    >
      <Meta
        title={userName}
        description={
          <Tooltip title={image}>
            <Text ellipsis={true}>{image}</Text>
          </Tooltip>
        }
      />
      {(uid === userId || role === 'admin') && (
        <div
          style={{
            color: 'red',
            marginTop: '5px',
            textAlign: 'end',
            width: '100%',
          }}
        >
          <Text ellipsis style={{ color: 'transparent', marginBottom: '8px', width: '10px' }}>
            {id}
          </Text>
          <DeleteOutlined onClick={() => handleDeleteClick(id, userId, image)} />
        </div>
      )}
    </Card>
  );
};
