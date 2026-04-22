import { CommonButtonProps } from "@/type";
import { Button, Col } from "antd";
import { FC } from "react";

export const CommonButton: FC<CommonButtonProps> = ({ className, children, loading = false, disabled, title, col, style, size = "large", ...rest }) => {
  const button = (
    <Button
      {...rest}
      loading={loading}
      disabled={disabled || Boolean(loading)}
      size={size}
      className={`custom-btn ${className}`}
      style={{
        borderRadius: 8,
        fontWeight: 600,
        ...style,
      }}
    >
      {children ?? title}
    </Button>
  );

  return col ? <Col {...col}>{button}</Col> : button;
};
