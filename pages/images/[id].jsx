import { PrismaClient } from '@prisma/client';
import { useRouter } from 'next/router';
import Image from 'next/image';
import Layout from '../../components/Layout';

const prisma = new PrismaClient();

export async function getStaticPaths() {
  // Get all the image IDs from the database
  const images = await prisma.image.findMany({
    select: { id: true }
  });

  return {
    paths: images.map((image) => ({
      params: { id: image.id }
    })),
    fallback: true
  };
}

export async function getStaticProps({ params }) {
  // Get the current image from the database
  const image = await prisma.image.findUnique({
    where: { id: params.id }
  });

  if (image) {
    return {
      props: JSON.parse(JSON.stringify(image))
    };
  }

  return {
    redirect: {
      destination: '/',
      permanent: false
    }
  };
}

const ListedImage = (image = null) => {
  const router = useRouter();

  if (router.isFallback) {
    return 'Loading...';
  }

  return (
    <Layout>
      <div className="max-w-screen-lg mx-auto">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:space-x-4 space-y-4">
          <div>
            <h1 className="text-2xl font-semibold truncate">
              {image?.title ?? ''}
            </h1>
          </div>
        </div>
        <div className="mt-6 relative aspect-w-16 aspect-h-9 bg-gray-200 rounded-lg shadow-md overflow-hidden">
          {image?.image ? (
            <Image
              src={image.image}
              alt={image.title}
              layout="fill"
              objectFit="cover"
            />
          ) : null}
        </div>

        <p className="mt-8 text-lg">{image?.description ?? ''}</p>
      </div>
    </Layout>
  );
};

export default ListedImage;
