import { CommonButton } from "@/attribute";
import { CommonCardProps } from "@/type";
import { Card, Col } from "antd";
import { type FC } from "react";
import { IoMdAdd } from "react-icons/io";

const CommonCard: FC<CommonCardProps> = ({ children, cardProps, handleAdd, col }) => {
  const extra = handleAdd && <CommonButton onClick={handleAdd} size="large" icon={<IoMdAdd />} title="Add" />;

  return (
    <Col {...col}>
      <Card className="custom-card" {...cardProps} variant="borderless" extra={extra}>
        <div>{children}</div>
      </Card>
    </Col>
  );
};

export default CommonCard;
