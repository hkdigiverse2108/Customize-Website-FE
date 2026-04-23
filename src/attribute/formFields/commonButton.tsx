import { CommonButtonProps } from "@/type";
import { Button, Col } from "antd";
import { FC } from "react";

export const CommonButton: FC<CommonButtonProps> = ({ className, children, loading = false, disabled, title, color = "primary", variant = "solid", col, style, size = "large", ...rest }) => {
  const button = (
    <Button
      {...rest}
      loading={loading}
      disabled={disabled || Boolean(loading)}
      size={size}
      color={color}
      variant={variant}
      className={`custom-btn ${className}`}
      style={{
        ...style,
        borderRadius: "10px",
      }}
    >
      {children ?? title}
    </Button>
  );

  return col ? <Col {...col}>{button}</Col> : button;
};
