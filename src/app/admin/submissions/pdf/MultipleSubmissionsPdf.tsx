// @ts-nocheck
import React from "react";
import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";
import { Prisma } from "@prisma/client";
import PdfRecursiveDisplay from "@/components/PdfRecursiveDisplay";

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
                    <PdfRecursiveDisplay data={submissions} />
                </View>
            </Page>
        ))}
    </Document>
);
