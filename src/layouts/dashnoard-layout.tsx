import React from "react";
import styles from "@/styles/Home.module.scss";
import { useRouter } from "next/router";
import { Menu } from "antd";
import {
  DeleteOutlined,
  FileImageOutlined,
  FileOutlined,
} from "@ant-design/icons";
import { UploadButton } from '@/components/upload-button/upload-button';

export const DashboardLayout: React.FC<React.PropsWithChildren> = ({
 children,
}) => {
  const router = useRouter();
  const selectedMenu = router.pathname;

  return (
    <main className={styles.dashboardContainer}>
      <div className={styles.sidebar}>
        <UploadButton />
        <Menu
          className={styles.menu}
          mode="inline"
          selectedKeys={[selectedMenu]}
          items={[
            {
              key: `/dashboard`,
              icon: <FileOutlined />,
              label: `Files`,
              onClick: () => router.push("/dashboard"),
            },
            {
              key: `/dashboard/photos`,
              icon: <FileImageOutlined />,
              label: `Photos`,
              onClick: () => router.push("/dashboard/photos"),
            },
            {
              key: `/dashboard/trash`,
              icon: <DeleteOutlined />,
              label: `Bin`,
              onClick: () => router.push("/dashboard/trash"),
            },
          ]}
        />
      </div>

      <div className="container">{children}</div>
    </main>
  );
};
