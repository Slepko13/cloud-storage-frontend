import { GetServerSidePropsContext, NextPage } from 'next';
import React from "react";
import { useRouter } from 'next/router';
import * as api from "@/api";

import { checkAuth } from '@/utils/check-auth';
import { Layout } from '@/layouts/layout';

import styles from "@/styles/Home.module.scss";
import { Menu } from 'antd';
import { DeleteOutlined, FileImageOutlined, FileOutlined } from '@ant-design/icons';
import { UploadButton } from '@/components/upload-button/upload-button';
import { FileItem } from '@/api/dto/files.dto';
import { FileList } from '@/components/file-list';
import { DashboardLayout } from '@/layouts/dashnoard-layout';
import { Files } from '@/modules/files';

interface Props {
  items: FileItem[]
}
type DashboardPageType<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?(page: React.ReactElement): React.ReactNode;
};

const DashboardTrash: DashboardPageType<Props> = ({ items }: Props) => {
  return (
    <DashboardLayout>
      <Files items={items}/>
    </DashboardLayout>
  );
};

DashboardTrash.getLayout = (page: React.ReactNode) => {
  return <Layout title="Dashboard / Main">{page}</Layout>;
};

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const authProps = await checkAuth(ctx);

  if ('redirect' in authProps) {
    return authProps
  }
  try {
    const items = await api.files.getAll('trash');

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

export default DashboardTrash;
