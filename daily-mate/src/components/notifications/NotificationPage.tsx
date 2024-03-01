import { useEffect, useState } from "react";
import { notifyResponse } from "../../types/notificationType";
import { deleteNofity, getNotify } from "../../apis/notificationApis";

const NotificationPage = () => {
  const [notificationList, setNotificationList] = useState<notifyResponse[]>(
    []
  );
  useEffect(() => {
    const fetchData = async () => {
      const getNotifications: notifyResponse[] | null = await getNotify();
      if (getNotifications !== null) {
        setNotificationList(getNotifications);
      }
    };
    fetchData();
  }, []);

  const handleDeleteNotify = (alertId: number) => {
    const deleteResult = deleteNofity(alertId);
    if (deleteResult !== null) {
      // 삭제완료, 새로고침
    }
  };

  const notifyList = () => {
    return (
      <div>
        {notificationList.map((notify) => (
          <div key={notify.alertId}>
            <div>{notify.fromId}</div>
            <div>{notify.content}</div>
            <button onClick={() => handleDeleteNotify(notify.alertId)}>
              X
            </button>
          </div>
        ))}
      </div>
    );
  };
  return (
    <div>
      <h3>알림</h3>
      <div>{notifyList()}</div>
    </div>
  );
};

export default NotificationPage;
