interface Notification {
  title: string;
  message: string;
}

interface NotificationTelegram extends Notification {
  thumbnail?: string;
  url?: string;
}

export const sendNotificationTelegram = async (
  data: NotificationTelegram
) => {};

interface NotificationMail extends Notification {
  to: string;
  subTitle?: string;
  html?: string;
}

export const sendNotificationMail = async (data: NotificationMail) => {};
