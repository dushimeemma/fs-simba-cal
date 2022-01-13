import jwt from 'jsonwebtoken';

export const encode = (payload: any, jwtSecret: any) => {
  const token = jwt.sign(payload, jwtSecret, { expiresIn: '1d' });
  return token;
};

export const decode = (token: string, jwtSecret: any) => {
  const payload = jwt.verify(token, jwtSecret);
  return payload;
};
