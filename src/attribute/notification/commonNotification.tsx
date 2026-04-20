import { notification } from "antd";
import { GlobalConfigProps } from "antd/es/config-provider";

export type AntdNotificationType = "success" | "error" | "info" | "warning" | "open";

export interface GlobalConfigPropsWithStack extends GlobalConfigProps {
  stack?: {
    threshold?: number;
  };
}

export const CommonNotification = (type: AntdNotificationType, message: string, description?: string, duration: number = 4) => {
  notification.config({
    placement: "topRight",
    duration,
    maxCount: 5,
  });

  notification[type]({
    title: message,
    description,
    className: `custom-notification custom-notification-${type}`,
  });
};
