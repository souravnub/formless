// @ts-nocheck
import React from "react";
import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";
import { Prisma } from "@prisma/client";

// Create styles
const styles = StyleSheet.create({
    view: {
        flexDirection: "column",
        gap: "10px",
    },
});

export const MultipleSubmissionsPdf = ({
    submissions,
}: {
    submissions: Prisma.FormSubmissionGetPayload<{
        include: { user: true; form: true };
    }>[];
}) => (
    <Document title={`Multiple submissions records`}>
        {submissions.map(({ user, submissions, id }) => (
            <Page size="A4" key={id}>
                <View style={styles.view}>
                    <Text>SubmissionId: {id}</Text>
                    <Text>User Details </Text>
                    <Text style={{ marginLeft: "20px" }}>
                        name: {user.name}
                    </Text>
                    <Text style={{ marginLeft: "20px" }}>
                        email: {user.email}
                    </Text>

                    <Text>Submission</Text>
                    {Object.keys(submissions).map((key) => {
                        return (
                            <View
                                style={{
                                    marginLeft: "20px",
                                    display: "flex",
                                    flexDirection: "column",
                                }}
                                key={key}>
                                <Text>{key} : </Text>
                                {typeof submissions[key] !== "string" ? (
                                    Object.keys(submissions[key]).map(
                                        (subKey) => (
                                            <Text
                                                style={{ marginLeft: "10px" }}
                                                key={subKey}>
                                                <Text>
                                                    {subKey}:
                                                    {submissions[key][subKey]}
                                                </Text>
                                            </Text>
                                        )
                                    )
                                ) : (
                                    <Text>{submissions[key] || "---"}</Text>
                                )}
                            </View>
                        );
                    })}
                </View>
            </Page>
        ))}
    </Document>
);
