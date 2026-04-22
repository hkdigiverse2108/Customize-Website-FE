import { App } from "antd";
import { ReactNode, useEffect } from "react";

type AntdNotificationType = "success" | "error" | "info" | "warning";

let notificationInstance: ReturnType<typeof App.useApp>["notification"] | null = null;

export const NotificationProvider = ({ children }: { children: ReactNode }) => {
  const { notification } = App.useApp();

  useEffect(() => {
    notificationInstance = notification;
  }, [notification]);

  return <>{children}</>;
};

export const CommonNotification = (type: AntdNotificationType, message: string, description?: string, duration: number = 4) => {
  if (!notificationInstance) {
    console.warn("Notification system is not initialized");
    return;
  }

  notificationInstance[type]({
    title: message,
    description,
    duration,
    placement: "topRight",
    // maxCount: 5,
    // showProgress: true,
    className: `custom-notification custom-notification-${type}`,
  });
};
