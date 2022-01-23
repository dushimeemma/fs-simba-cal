import { NextApiRequest, NextApiResponse } from 'next';

import prisma from '../../../../lib/prisma';

const singleEventTypesHandler = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const { id } = req.query;
  if (req.method === 'GET') {
    try {
      const eventType = await prisma.eventTypes.findFirst({
        where: { id: Number(id) },
        include: { events: true },
        orderBy: { id: 'desc' },
      });
      res.status(200).json({
        status: 'sucsess',
        message: 'event type retrieved successfully',
        data: eventType,
      });
    } catch (error) {
      return res.status(400).json({
        status: 'failed',
        error: 'event type not retrieved',
        data: error,
      });
    }
  }
};

export default singleEventTypesHandler;
