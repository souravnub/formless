"use client";
//Prompt Use
//will this work? const startOfMonth = new Date(currentYear, currentMonth,1 + timezoneOffset * 60000);
// const endOfMonth = new Date(currentYear,currentMonth,1 + timezoneOffset * 60000);
import React from "react";
import { useState, useEffect } from "react";
import { getSubmissionsCount } from "@/actions/submissions";
import { getForms } from "@/actions/forms";

const DashUsageStats = () => {
    const [highestSubmissions, setHighestSubmissions] = useState(0);
    const [formTitle, setFormTitle] = useState("");
    const [forms, setForms] = useState<any>([]);
    const fetchForms = async () => {
        const forms = await getForms();
        setForms(forms);
        console.log(forms);
    };
    useEffect(() => {
        fetchForms();
    }, []);

    useEffect(() => {
        const today = new Date();
        const currentYear = today.getFullYear();
        const currentMonth = today.getMonth();
        const timezoneOffset = today.getTimezoneOffset();
        const startOfMonth = new Date(currentYear, currentMonth, 1);
        startOfMonth.setMilliseconds(startOfMonth.getMilliseconds() + timezoneOffset * 60000);
        const endOfMonth = new Date(currentYear, currentMonth, 1, 0);
        endOfMonth.setHours(23, 59, 59, 999); // Set to end of the day
        endOfMonth.setMilliseconds(endOfMonth.getMilliseconds() + timezoneOffset * 60000);
        forms.forEach((form: any) => {
            getSubmissionsCount({
                // dateRange: {from: startOfMonth, to: endOfMonth},
                formFilter: form.title,
            }).then((res) => {
                if (res > highestSubmissions) {
                    setHighestSubmissions(res);
                    setFormTitle(form.title);
                }
            });
        });
    }, [forms]);
    return (
        <p>
            The most used form this month is {formTitle} with {highestSubmissions} submissions
        </p>
    );
};
export default DashUsageStats;
