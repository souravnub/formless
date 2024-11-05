"use client";
//Prompts Used:
//Show the conversion of MST to CST

import React from "react";
import { useState, useEffect } from "react";
import { getUserCountByRole } from "@/actions/users";
import { getSubmissionsCount } from "@/actions/submissions";
const DashSubmissionsStat = () => {
    const [totalUsers, setTotalUsers] = useState(0);
    const [totalForms, setTotalForms] = useState(0);
    useEffect(() => {
        getUserCountByRole("USER").then((res) => {
            if (res.success) {
                setTotalUsers(res.data ?? 0);
            }
        });
    }, []);
    useEffect(() => {
        const today = new Date();
        const timezoneOffset = today.getTimezoneOffset();
        //Handle MST to UTC Conversion for Database Query
        const startOfToday = new Date(today.setHours(0, 0, 0, 0) + timezoneOffset * 60000);
        const endOfToday = new Date(today.setHours(23, 59, 59, 999) + timezoneOffset * 60000);
        console.log(startOfToday);
        console.log(endOfToday);
        getSubmissionsCount({
            // dateRange: {from: startOfToday, to: endOfToday},
            formFilter: "FLHA Form",
        }).then((res) => {
            if (res) {
                setTotalForms(res);
            } else {
                console.log("Error getting total forms");
            }
        });
    });
    return (
        <p>
            Currently {totalForms}/{totalUsers} users have submitted their FLHA's Today
        </p>
    );
};
export default DashSubmissionsStat;
