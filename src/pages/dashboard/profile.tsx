import * as api from "@/api";
import React, { useState } from 'react';
import { GetServerSidePropsContext, NextPage } from "next";
import { Button, Modal } from 'antd';

import { User } from "@/api/dto/auth.dto";
import styles from "@/styles/Profile.module.scss";
import { checkAuth } from "@/utils/check-auth";

import { Layout } from '@/layouts/layout';
import MyModal from '@/components/modal/my-modal';

interface Props {
  userData: User;
}

type ProfilePagType<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?(page: React.ReactElement): React.ReactNode;
};

const DashboardProfilePage: ProfilePagType<Props> = ({ userData }) => {

  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };

  return (
    <main>
      <div className={styles.root}>
        <h1>My profile</h1>
        <br />
        <p>
          ID: <b>{userData.id}</b>
        </p>
        <p>
          full name: <b>{userData.fullName}</b>
        </p>
        <p>
          E-Mail: <b>{userData.email}</b>
        </p>
        <br />
        <Button onClick={showModal} type="primary" danger>
          Logout
        </Button>
      </div>
      <MyModal
        title={'Profile Modal'}
        content={'Do you really want to log out?'}
        isOpen={isModalOpen}
        toggleOpen={setIsModalOpen}
      />
    </main>
  );
};

DashboardProfilePage.getLayout = (page: React.ReactNode) => {
  return <Layout title="Dashboard / Profile">{page}</Layout>;
};

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const authProps = await checkAuth(ctx);

  if ("redirect" in authProps) {
    return authProps;
  }

  const userData = await api.auth.getMe();

  return {
    props: {
      userData,
    },
  };
};

export default DashboardProfilePage;
