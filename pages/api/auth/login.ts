import { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcryptjs';
import { config } from 'dotenv';

import { encode } from '../../../helpers/jwt_functions';
import prisma from '../../../lib/prisma';
import withValidateLogin from '../../../middlewares/validations/with_validate_login';

config();

const loginHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    try {
      const { email, password } = req.body;

      const checkUser: any = await prisma.user.findUnique({
        where: {
          email,
        },
      });

      const checkPassword = bcrypt.compareSync(password, checkUser.password);

      if (!checkUser || !checkPassword) {
        return res.status(401).json({
          status: 'failed',
          error: 'unauthorized',
          data: {},
        });
      }

      const token = encode(checkUser, process.env.JWT_SECRET);

      delete checkUser.password;

      res.status(200).json({
        status: 'ok',
        message: 'logged In successfully',
        token,
        data: checkUser,
      });
    } catch (error) {
      return res.status(400).json({
        status: 'failed',
        error: 'user not logged in',
        data: error,
      });
    }
  }
};

export default withValidateLogin(loginHandler);
