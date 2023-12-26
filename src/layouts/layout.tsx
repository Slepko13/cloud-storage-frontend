import Head from 'next/head';
import { Header } from '@/components/header';
import React from 'react';

import styles from '@/styles/Home.module.scss';

interface LayoutProps {
  title: string;
  children: React.ReactNode
}

export const Layout: React.FC<LayoutProps> = ({
 title,
 children,
}) => {
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <main>
        <Header />
        <div className={styles.main}>
          <div className={styles.layout}>{children}</div>
        </div>
      </main>
    </>
  );
};
