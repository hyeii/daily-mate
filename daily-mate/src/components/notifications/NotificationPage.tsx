import { useEffect, useState } from "react";
import { notifyResponse } from "../../types/notificationType";
import { deleteNofity, getNotify } from "../../apis/notificationApis";
import NotificationInfo from "./NotificationInfo";
import styled from "styled-components";

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

  const notifyList = () => {
    return (
      <div>
        {notificationList.map((notify) => (
          <NotificationInfo notify={notify} key={notify.alertId} />
        ))}
      </div>
    );
  };
  return (
    <div>
      <Title>알림</Title>
      <div>{notifyList()}</div>
    </div>
  );
};

export default NotificationPage;

const Title = styled.h3`
  font-size: 1.2rem;
`;
