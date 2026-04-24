"use client";

import { CommonModalProps } from "@/type";
import { Modal } from "antd";
import { FC } from "react";

const CommonModal: FC<CommonModalProps> = ({ open, onClose, title, subtitle, icon, children, width = 480, closable = true }) => {
  return (
    <Modal open={open} onCancel={onClose} footer={null} title={title} width={width} centered styles={{ body: { padding: 0 } }}>
      {(title || icon || subtitle) && (
        <div className="px-6 py-5">
          <div className="flex items-center gap-3">
            {icon && (
              <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: "white" }}>
                {icon}
              </div>
            )}
            <div>
              <h2 className="text-xl font-bold text-white mb-0">{title}</h2>
              {subtitle && <p className="text-white text-opacity-85 text-xs mt-1">{subtitle}</p>}{" "}
            </div>
          </div>
        </div>
      )}

      <div className="px-6 py-6">{children}</div>
    </Modal>
  );
};

export default CommonModal;
