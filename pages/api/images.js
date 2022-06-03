import { getSession } from 'next-auth/react';

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  // Check if user is authenticated
  const session = await getSession({ req });
  if (!session) {
    return res.status(401).json({ message: 'Unauthorized.' });
  }
  // Upload new image
  if (req.method === 'POST') {
    try {
      const { image, title, tags } = req.body;

      // Retrieve the current authenticated user
      const user = await prisma.user.findUnique({
        where: { email: session.user.email }
      });
      const newImage = await prisma.image.create({
        data: { image, title, tags, ownerId: user.id }
      });

      res.status(200).json(newImage);
    } catch (e) {
      res.status(500).json({ message: 'Something went wrong' });
    }
    // HTTP method not supported!
  } else {
    res.setHeader('Allow', ['POST']);
    res
      .status(405)
      .json({ message: `HTTP method ${req.method} is not supported.` });
  }
}
