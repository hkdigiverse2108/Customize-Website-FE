"use client";

import { CommonModalProps } from "@/type";
import { Modal } from "antd";
import { FC } from "react";

const CommonModal: FC<CommonModalProps> = ({ open, onClose, title, children, width = 480, closable = true }) => {
  return (
    <Modal open={open} onCancel={onClose} footer={null} title={title} width={width} centered closable={closable} styles={{ body: { padding: 0 } }}>
      <div>{children}</div>
    </Modal>
  );
};

export default CommonModal;
