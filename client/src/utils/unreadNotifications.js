export const unreadNotifiactionsFunc = (notifications) => {
  return notifications.filter((n) => n.isRead === false);
};
