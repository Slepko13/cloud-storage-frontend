import React from "react";
import styles from "./file-actions.module.scss";
import { Button, Popconfirm } from "antd";

interface FileActionsProps {
  onClickRemove: VoidFunction;
  isActive: boolean;
}

export const FileActions: React.FC<FileActionsProps> = ({
  onClickRemove,
  isActive,
}) => {
  return (
    <div className={styles.root}>
      <Popconfirm
        title="Delete file(s)?"
        description="All files will be moved to bin"
        okText="Yes"
        cancelText="No"
        disabled={!isActive}
        onConfirm={onClickRemove}
      >
        <Button disabled={!isActive} type="primary" danger>
          Delete
        </Button>
      </Popconfirm>
    </div>
  );
};
