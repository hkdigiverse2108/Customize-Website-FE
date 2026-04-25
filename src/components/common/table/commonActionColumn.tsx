import { CommonButton } from "@/attribute";
import { CommonActionColumnProps } from "@/type";
import { Flex, Tooltip } from "antd";
import { BiTrash } from "react-icons/bi";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { FiEdit3 } from "react-icons/fi";

const CommonActionColumn = <T,>({ onActive, onEdit, onDelete }: CommonActionColumnProps<T>) => ({
  title: "Option",
  key: "actionIcons",
  width: 120,
  // fixed: "right" as const,
  render: (_: T, record: T & { isActive?: boolean }) => (
    <Flex gap="small" justify="center">
      {!!onActive && (onActive?.isPermission?.(record) ?? true) && (
        <Tooltip title={record?.isActive ? "Deactivate" : "Activate"} color={record?.isActive ? "red" : "green"}>
          <CommonButton onClick={() => onActive?.onHandle(record)} icon={record?.isActive ? <FaEyeSlash /> : <FaEye />} size="middle" color={record?.isActive ? "danger" : "green"} variant="dashed" />
        </Tooltip>
      )}

      {!!onEdit && (onEdit?.isPermission?.(record) ?? true) && <CommonButton onClick={() => onEdit?.onHandle(record)} icon={<FiEdit3 />} size="middle" color="default" variant="dashed" />}

      {!!onDelete && (onDelete?.isPermission?.(record) ?? true) && <CommonButton onClick={() => onDelete?.onHandle(record)} icon={<BiTrash />} size="middle" color="default" variant="dashed" />}
    </Flex>
  ),
});

export default CommonActionColumn;
