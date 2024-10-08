// @ts-nocheck
import React from "react";
import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";

// Create styles
const styles = StyleSheet.create({
    view: {
        flexDirection: "column",
        gap: "10px",
    },
    nestedView: {
        display: "flex",
        flexDirection: "column",
    },
});

type SubmissionPdfProps = {
    form: {
        id: string;
        title: string;
    };
    user: {
        id: string;
        name: string;
        email: string;
    };
    submission: {
        [key: string]: string;
    };
    submissionId: string;
};

export const SubmissionPdf = ({
    form,
    user,
    submission,
    submissionId,
}: SubmissionPdfProps) => {
    return (
        <Document title={`Submission details: ${submissionId}`}>
            <Page size="A4">
                <View style={styles.view}>
                    <Text>FormId: {form.id}</Text>
                    <Text>SubmissionId: {submissionId}</Text>
                    <Text>User Details </Text>
                    <Text style={{ marginLeft: "20px" }}>
                        name: {user.name}
                    </Text>
                    <Text style={{ marginLeft: "20px" }}>
                        email: {user.email}
                    </Text>

                    <Text>Submission</Text>
                    {Object.keys(submission).map((key) => {
                        return (
                            <View
                                style={{
                                    marginLeft: "20px",
                                    display: "flex",
                                    flexDirection: "column",
                                }}
                                key={key}>
                                <Text>{key} : </Text>
                                {typeof submission[key] !== "string" ? (
                                    Object.keys(submission[key]).map(
                                        (subKey) => (
                                            <Text
                                                style={{ marginLeft: "10px" }}
                                                key={subKey}>
                                                <Text>
                                                    {subKey}:
                                                    {submission[key][subKey]}
                                                </Text>
                                            </Text>
                                        )
                                    )
                                ) : (
                                    <Text>{submission[key] || "---"}</Text>
                                )}
                            </View>
                        );
                    })}
                </View>
            </Page>
        </Document>
    );
};
