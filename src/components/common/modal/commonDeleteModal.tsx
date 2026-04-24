import { CommonButton } from "@/attribute";
import { CommonDeleteModalProps } from "@/type";
import { type FC } from "react";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import CommonModal from "./commonModal";

const CommonDeleteModal: FC<CommonDeleteModalProps> = ({ open, title, description, itemName, loading = false, onClose, onConfirm }) => {
  return (
    <CommonModal title={title} open={open} onClose={onClose} closable={false}>
      <div className="py-2 text-center">
        {/* Icon */}
        <div className="mb-4 flex justify-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-red-100 dark:bg-red-900/30">
            <ExclamationCircleOutlined className="text-3xl text-red-500" />
          </div>
        </div>

        {/* Message */}
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white">{title || "Are you sure?"}</h3>

        <p className="mt-3 mb-8 text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
          {description || "Are you sure you want to delete"}
          {itemName && <span className="font-semibold text-gray-800 dark:text-white"> {itemName}</span>}? This action cannot be undone.
        </p>

        {/* Buttons */}
        <div className="flex justify-center gap-3">
          <CommonButton title="Cancel" color="default" variant="dashed" onClick={onClose} />

          <CommonButton title="Yes, Delete" onClick={onConfirm} loading={loading} />
        </div>
      </div>
    </CommonModal>
  );
};

export default CommonDeleteModal;
