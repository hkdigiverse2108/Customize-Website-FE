import { Button, Col, ColProps, ButtonProps } from "antd";
import { CSSProperties, ReactNode, FC } from "react";

export interface CommonButtonProps extends ButtonProps {
  children?: ReactNode;
  title?: string;
  col?: ColProps;
  style?: CSSProperties;
}

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
