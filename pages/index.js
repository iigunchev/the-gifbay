import { PrismaClient } from '@prisma/client'

import data from '../data/data.json';
import Grid from '../components/Grid';
import Layout from '../components/Layout';

 // Instantiate a new Prisma client
const prisma = new PrismaClient()

export async function getServerSideProps() {
  const images = await prisma.image.findMany();
  return {
    props: {
      // props for the Home component
      data: JSON.parse(JSON.stringify(images)),
    },
  };
}

export default function Home({data = []}) {
  return (
    <Layout>
      <h1 className="text-xl font-medium text-gray-800">
        Top-rated
      </h1>
      <p className="text-gray-500">
        Explore the funniest Gifs and Memes
      </p>
      <div className="mt-8">
        <Grid items={data} />
      </div>
    </Layout>
  );
}
