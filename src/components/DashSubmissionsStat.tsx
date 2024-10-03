import React from "react";
import { useState, useEffect } from "react";
import { getUserCountByRole } from "@/actions/users";
import { get } from "http";
const DashSubmissionsStat = () => {
    const [totalUsers, setTotalUsers] =  useState(0);
    const [totalForms, setTotalForms] =  useState(0);

    useEffect(() => {
        getUserCountByRole("USER").then((res) => {
            if (res.success) {
                setTotalUsers(res.data??0);
            }
        });
    },[]);

}