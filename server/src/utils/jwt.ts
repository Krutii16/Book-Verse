import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'secret';
const JWT_EXPIRY = '30d';

export const generateToken = (userId: string, isAdmin: boolean = false) => {
  return jwt.sign(
    { userId, isAdmin },
    JWT_SECRET,
    { expiresIn: JWT_EXPIRY }
  );
};

export const verifyToken = (token: string) => {
  return jwt.verify(token, JWT_SECRET) as { userId: string; isAdmin: boolean };
};
