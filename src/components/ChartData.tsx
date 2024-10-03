// Prompts Used
// Show the conversion of MST to CST
// Provide how to compare JSON objects in React

import React, { useState, useEffect } from "react";
import { getSubmissionsCount } from "@/actions/submissions";
import { getUserCountByRole } from "@/actions/users";

interface ChartDataType {
  month: string;
  rSubmissions: number;
  aSubmissions: number;
}

const ChartDataFetcher = ({ onDataFetch }: { onDataFetch: (data: ChartDataType[]) => void }) => {
  const [chartData, setChartData] = useState<ChartDataType[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const totalUsersRes = await getUserCountByRole("USER");
        const totalUsers = totalUsersRes.success ? totalUsersRes.data ?? 0:0;

        const today = new Date();
        const timezoneOffset = today.getTimezoneOffset() * 60000; // in milliseconds

        const getMonthlySubmissions = async (month: number) => {
          const startOfMonth = new Date(today.getFullYear(), month, 1);
          startOfMonth.setMilliseconds(startOfMonth.getMilliseconds() + timezoneOffset);
          const endOfMonth = new Date(today.getFullYear(), month + 1, 0, 23, 59, 59, 999); // Last day of the month
          endOfMonth.setMilliseconds(endOfMonth.getMilliseconds() + timezoneOffset);

          try {
            const res = await getSubmissionsCount({
              //dateRange: { from: startOfMonth, to: endOfMonth },
              formFilter: "FLHA Form",
            });
            return res || 0; // Return count, handle errors in the function if necessary
          } catch (error) {
            console.error(`Error fetching submissions for month ${month}:`, error);
            return 0; // Return 0 in case of error
          }
        };

        // Fetch submissions for each month and build chart data
        const submissionPromises = Array.from({ length: 12 }, (_, month) => getMonthlySubmissions(month));
        const submissionsArray = await Promise.all(submissionPromises);

        const data = submissionsArray.map((submissionCount, month) => ({
          month: new Date(today.getFullYear(), month, 1).toLocaleString("default", { month: "long" }),
          rSubmissions: totalUsers, // Total users as rSubmissions
          aSubmissions: submissionCount, // Actual submissions
        }));

        if (JSON.stringify(data) !== JSON.stringify(chartData)) {
            setChartData(data);
            onDataFetch(data); // Pass the generated data back to the parent
          }
        } catch (error) {
          console.error("Error fetching chart data:", error);
        }
      };
  

    fetchData();
  }, [onDataFetch,chartData]);

  return null;
};

export default ChartDataFetcher;
