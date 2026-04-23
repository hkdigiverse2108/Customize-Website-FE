import { CommonButton } from "@/attribute";
import { Flex } from "antd";
import { BiTrash } from "react-icons/bi";
import { BsEye } from "react-icons/bs";
import { FiEdit3 } from "react-icons/fi";

export interface CommonActionColumnProps<T> {
  onActive?: { onHandle: (row: T) => void; isPermission?: (row: T) => boolean };
  onEdit?: { onHandle: (row: T) => void; isPermission?: (row: T) => boolean };
  onDelete?: { onHandle: (row: T) => void; isPermission?: (row: T) => boolean };
}
const CommonActionColumn = <T,>({ onActive, onEdit, onDelete }: CommonActionColumnProps<T>) => ({
  title: "Option",
  key: "actionIcons",
  width: 120,
  fixed: "right" as const,
  render: (_: T, record: T) => (
    <Flex gap="small" justify="center">
      {!!onActive && (onActive?.isPermission?.(record) ?? true) && <CommonButton onClick={() => onActive?.onHandle(record)} icon={<BsEye />} size="middle" color="default" variant="dashed" />}

      {!!onEdit && (onEdit?.isPermission?.(record) ?? true) && <CommonButton onClick={() => onEdit?.onHandle(record)} icon={<FiEdit3 />} size="middle" color="default" variant="dashed" />}

      {!!onDelete && (onDelete?.isPermission?.(record) ?? true) && <CommonButton onClick={() => onDelete?.onHandle(record)} icon={<BiTrash />} size="middle" color="default" variant="dashed" />}
    </Flex>
  ),
});

export default CommonActionColumn;
