import React, { useState } from "react";
import { useRouter } from "next/router";

import { Layout, Avatar, Menu, Popover, Button, Modal } from "antd";
import { CloudOutlined } from "@ant-design/icons";

import * as api from '@/api';

import styles from "./header.module.scss";
import MyModal from '@/components/modal/my-modal';

// const onClickLogout = () => {
//   if (window.confirm("Do you really want to logout")) {
//     api.auth.logout();
//
//     location.href = "/";
//   }
// };

export const Header: React.FC = () => {
  const router = useRouter();
  const selectedMenu = router.pathname;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    api.auth.logout();
    location.href = "/";
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <Layout.Header className={styles.root}>
      <div className={styles.headerInner}>
        <div className={styles.headerLeft}>
          <h2>
            <CloudOutlined />
            Cloud Storage
          </h2>
          <Menu
            className={styles.topMenu}
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={[selectedMenu]}
            onSelect={({ key }) => router.push(key)}
            items={[
              { key: "/dashboard", label: "Main page" },
              { key: "/dashboard/profile", label: "Profile" },
            ]}
          />
        </div>
        <div className={styles.headerRight}>
          <Popover
            trigger="click"
            content={
              <Button type="primary" onClick={showModal} danger>
                Logout
              </Button>
            }
          >
            <Avatar>A</Avatar>
          </Popover>
          <MyModal
            title={'Basic Modal'}
            content={'Do you really want to log out?'}
            isOpen={isModalOpen}
            toggleOpen={setIsModalOpen}
          />
        </div>
      </div>
    </Layout.Header>
  );
};

export default Header;
