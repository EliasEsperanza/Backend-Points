import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { Admin } from '../Admin';
dotenv.config();

export const validateUser = async (req, res, next) => {
  const token = req.header('Authorization').replace('Bearer ', '');

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await Admin.findOne({ where: { id: decoded.id, token: token } });

    if (!user) {
      return res.status(401).send({ error: 'Usuario no encontrado o token inválido.' });
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(401).send({ error: 'Autenticación fallida.' });
  }
};
