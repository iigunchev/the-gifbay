import Head from 'next/head';
import Image from 'next/image';
import Card from '../components/Card';
import styles from '../styles/Home.module.css';

import data from '../data/data.json';
import Grid from '../components/Grid';
import Layout from '../components/Layout';

export default function Home() {
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
