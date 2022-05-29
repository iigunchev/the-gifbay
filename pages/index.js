import Head from 'next/head';
import Image from 'next/image';
import Card from '../components/Card';
import styles from '../styles/Home.module.css';

import data from '../data/data.json';

export default function Home() {
  return (
    <div className={styles.container}>
      <ul>
        {data &&
          data.map((item) => (
            <Card
              key={item.id}
              image={item.image}
              title={item.title}
              tags={item.tags}
            />
          ))}
      </ul>
    </div>
  );
}
