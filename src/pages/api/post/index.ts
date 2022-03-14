import { NextApiRequest, NextApiResponse } from 'next';

import { prisma } from '@/lib/prisma';

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    await prisma.post.create({
      data: {
        title: req.body.title,
        content: req.body.content,
        authorId: req.body.id,
        id: new Date().toISOString(),
      },
    });
    return res.status(200).json({
      status: 200,
      message: 'Post added successfully',
    });
  } else {
    return res.status(500).json({
      status: 500,
      message: 'Something went wrong',
    });
  }
};
