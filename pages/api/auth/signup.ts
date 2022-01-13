import { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcryptjs';
import { config } from 'dotenv';

import { encode } from '../../../helpers/jwt_functions';
import prisma from '../../../lib/prisma';
import withValidateSignup from '../../../middlewares/validations/with_validate_signup';

config();

const signupHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    try {
      const { username, email, password } = req.body;
      const checkUser = await prisma.user.findUnique({
        where: {
          email,
        },
      });

      if (checkUser) {
        return res.status(400).json({
          status: 'failed',
          error: 'user already exists',
          data: {},
        });
      }

      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(password, salt);

      const user = await prisma.user.create({
        data: {
          username,
          email,
          password: hash,
        },
      });

      const token = encode(user, process.env.JWT_SECRET);

      res.status(200).json({
        status: 'ok',
        message: 'user successfully created',
        token,
        data: { username, email },
      });
    } catch (error) {
      return res.status(400).json({
        status: 'failed',
        error: 'user not created',
        data: error,
      });
    }
  }
};

export default withValidateSignup(signupHandler);
