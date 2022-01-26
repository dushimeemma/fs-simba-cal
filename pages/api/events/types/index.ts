import { NextApiRequest, NextApiResponse } from 'next';

import prisma from '../../../../lib/prisma';

const eventTypesHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    try {
      const eventTypes = await prisma.eventTypes.findMany({
        include: { events: true },
        orderBy: { id: 'desc' },
      });
      res.status(200).json({
        status: 'sucsess',
        message: 'event types retrieved successfully',
        data: eventTypes,
      });
    } catch (error) {
      return res.status(400).json({
        status: 'failed',
        error: 'event types not retrieved',
        data: error,
      });
    }
  }
};

export default eventTypesHandler;
