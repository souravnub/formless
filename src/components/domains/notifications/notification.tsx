import { Notification as NotificationProp } from "@prisma/client";
import React from "react";

const Notification = ({ id, description, link, type }: NotificationProp) => {
    return <div>{id}</div>;
};

export default Notification;
