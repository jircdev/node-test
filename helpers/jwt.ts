import jwt from 'jsonwebtoken';

export const generateJWT = (uid: string, name: string) => {
  return new Promise((resolve, reject) => {
    const payload = { uid, name };

    jwt.sign(
      payload,
      'process.env.SECRET_JWT_SEED',
      {
        expiresIn: '8h',
      },
      (err, token) => {
        resolve;

        if (err) {
          console.log(err);
          reject('No se pudo generar el token');
        }

        resolve(token);
      }
    );
  });
};
