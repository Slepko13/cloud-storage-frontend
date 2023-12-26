import { GetServerSidePropsContext, NextPage } from 'next';
import React from "react";
import * as api from "@/api";

import { checkAuth } from '@/utils/check-auth';
import { Layout } from '@/layouts/layout';
import { FileItem } from '@/api/dto/files.dto';
import { DashboardLayout } from '@/layouts/dashnoard-layout';
import { Files } from '@/modules/files';

interface Props {
  items: FileItem[]
}
type DashboardPageType<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?(page: React.ReactElement): React.ReactNode;
};

const DashboardPhotos: DashboardPageType<Props> = ({ items }: Props) => {
  return (
    <DashboardLayout>
      <Files items={items} withActions/>
    </DashboardLayout>
  );
};

DashboardPhotos.getLayout = (page: React.ReactNode) => {
  return <Layout title="Dashboard / Photos">{page}</Layout>;
};

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const authProps = await checkAuth(ctx);

  if ('redirect' in authProps) {
    return authProps
  }
  try {
    const items = await api.files.getAll('photos');

    return {
      props: {
        items,
      },
    };
  } catch (err) {
    console.log(err);
    return {
      props: { items: [] },
    };
  }
}

export default DashboardPhotos;
