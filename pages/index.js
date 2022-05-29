import Head from 'next/head';
import Image from 'next/image';
import Card from '../components/Card';
import styles from '../styles/Home.module.css';

import data from '../data/data.json';
import Grid from '../components/Grid';

export default function Home() {
  return (
    <div className={styles.container}>
      <Grid items={data}/>
    </div>
  );
}
