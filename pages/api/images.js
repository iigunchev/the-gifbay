import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const { image, title, tags } = req.body;

      const newImage = await prisma.image.create({
        data: { image, title, tags }
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
