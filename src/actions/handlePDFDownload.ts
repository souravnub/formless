import React from "react";

const handlePDFDownload = async ({ submissionId }: { submissionId: string }) => {
    try {
        const data = await fetch(`/api/reportGen/submission?submissions=${submissionId}`, {
            method: "GET",
        });
        if (!data.ok) {
            throw new Error("Error fetching data");
        }
        console.log(data);
        const dataJson = await data.json();

        const generateDoc = await fetch("/api/reportGen/pdfGen", {
            method: "POST",
            body: JSON.stringify({ dataJson }),
            headers: {
                "Content-Type": "application/json",
            },
        });
        if (!generateDoc.ok) {
            throw new Error("Error generating document");
        }
        const blob = await generateDoc.blob();
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "FLHA.pdf";
        a.click();
        a.remove();
        window.URL.revokeObjectURL(url);
    } catch (error) {
        console.error("Error generating document:", error);
    }
};
export default handlePDFDownload;
