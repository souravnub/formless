/*
This is a seed file for seeding the database with the following:
- 10 users
- 1 admin
- 10 supervisors

- 3 Forms
    - 2 user forms
    - 1 supervisor form

- Form Submissions
    - 2 submissions on Form (id: 1),
        - first submission: by userId 1
        - second submission: by userId 2
    - 1 submnission on Form (id: 2)
        - by userId 2
    - 3 submissions on Form (id:3) [supervisor Form]
        - by userId 11
        - by userId 12
        - by userId 13

*/

import prisma from "../src/db";
import bcrypt from "bcryptjs";

async function seedUsers() {
    const salt = await bcrypt.genSalt(10);
    const password = await bcrypt.hash("password", salt);

    try {
        const userPromises = Array.from({ length: 10 }).map((_, index) => {
            const count = index + 1; // Start from 1 instead of 0

            return prisma.user.upsert({
                where: { id: `${count}` },
                create: {
                    id: `${count}`,
                    email: `user${count}@gmail.com`,
                    name: `user${count}`,
                    password,
                },
                update: {},
            });
        });
        Promise.all(userPromises);

        await prisma.user.upsert({
            where: { id: "1000" },
            create: {
                id: "1000",
                email: "admin@gmail.com",
                name: "admin",
                password,
                role: "ADMIN",
            },
            update: {},
        });
    } catch (err) {
        console.log("ERROR while seeding users", err);
    }
}

async function seedSupervisors() {
    const salt = await bcrypt.genSalt(10);
    const password = await bcrypt.hash("password", salt);

    try {
        const supervisorPromises = Array.from({ length: 10 }).map((_, index) => {
            const count = index + 11; // Start from 11 instead of 0, because user Ids are till 10

            return prisma.user.upsert({
                where: { id: `${count}` },
                create: {
                    id: `${count}`,
                    email: `supervisor${count}@gmail.com`,
                    name: `supervisor${count}`,
                    password,
                    role: "SUPERVISOR",
                },
                update: {},
            });
        });
        Promise.all(supervisorPromises);
    } catch (err) {
        console.log("ERROR while seeding supervisors", err);
    }
}

async function seedForms() {
    try {
        await prisma.form.upsert({
            where: { id: "1" },
            create: {
                id: "1",
                createdBy: "1000",
                title: "Fire Extinguisher Form",
                description: "A form for inspecting fire extinguishers",
                schema: {
                    type: "object",
                    required: [],
                    properties: {
                        Date: { type: "string", title: "Date", default: "" },
                        Time: { type: "string", title: "Time", default: "" },
                        "Serial #": { type: "string", title: "Serial #", default: "" },
                        Inspector: { type: "string", title: "Inspector", default: "" },
                        QUESTIONS: {
                            title: "QUESTIONS",
                            properties: {
                                "Is the pressure gauge in good condition?": {
                                    properties: {
                                        comments: { type: "string" },
                                        response: { enum: ["Yes", "No", "NA"] },
                                    },
                                },
                                "Is the extinguisher wall-mounted and secured?": {
                                    properties: {
                                        comments: { type: "string" },
                                        response: { enum: ["Yes", "No", "NA"] },
                                    },
                                },
                                "Is the extinguisher accessible & unobstructed?": {
                                    properties: {
                                        comments: { type: "string" },
                                        response: { enum: ["Yes", "No", "NA"] },
                                    },
                                },
                                "Are the extinguishers damaged? Dented? Corroded?": {
                                    properties: {
                                        comments: { type: "string" },
                                        response: { enum: ["Yes", "No", "NA"] },
                                    },
                                },
                                "Is the hose & nozzle secured and in good condition?": {
                                    properties: {
                                        comments: { type: "string" },
                                        response: { enum: ["Yes", "No", "NA"] },
                                    },
                                },
                                "Is the trigger/lock pin in-place? Is the clip broken?": {
                                    properties: {
                                        comments: { type: "string" },
                                        response: { enum: ["Yes", "No", "NA"] },
                                    },
                                },
                                "Is it fully charged and operable? (needle in the green?)": {
                                    properties: {
                                        comments: { type: "string" },
                                        response: { enum: ["Yes", "No", "NA"] },
                                    },
                                },
                                "Is the inspection tag attached & readable? Last annual inspection completed?": {
                                    properties: {
                                        comments: { type: "string" },
                                        response: { enum: ["Yes", "No", "NA"] },
                                    },
                                },
                            },
                        },
                        "Type/ Rating": { type: "string", title: "Type/ Rating", default: "" },
                        "License Plate": { type: "string", title: "License Plate", default: "" },
                        "Additional Comments": { type: "string", title: "Additional Comments", default: "" },
                        "Inspector Signature": { type: "string", title: "Inspector Signature", default: "" },
                        "Reviewed by Safety/Management (name & signature)": {
                            type: "string",
                            title: "Reviewed by Safety/Management (name & signature)",
                            default: "",
                        },
                    },
                },
                uiSchema: {
                    QUESTIONS: {
                        "Is the pressure gauge in good condition?": {
                            comments: { "ui:widget": "textarea" },
                            response: { "ui:widget": "RadioWidget" },
                        },
                        "Is the extinguisher wall-mounted and secured?": {
                            comments: { "ui:widget": "textarea" },
                            response: { "ui:widget": "RadioWidget" },
                        },
                        "Is the extinguisher accessible & unobstructed?": {
                            comments: { "ui:widget": "textarea" },
                            response: { "ui:widget": "RadioWidget" },
                        },
                        "Are the extinguishers damaged? Dented? Corroded?": {
                            comments: { "ui:widget": "textarea" },
                            response: { "ui:widget": "RadioWidget" },
                        },
                        "Is the hose & nozzle secured and in good condition?": {
                            comments: { "ui:widget": "textarea" },
                            response: { "ui:widget": "RadioWidget" },
                        },
                        "Is the trigger/ lock pin in-place? Is the clip broken?": {
                            comments: { "ui:widget": "textarea" },
                            response: { "ui:widget": "RadioWidget" },
                        },
                        "Is it fully charged and operable? (needle in the green?)": {
                            comments: { "ui:widget": "textarea" },
                            response: { "ui:widget": "RadioWidget" },
                        },
                        "Is the inspection tag attached & readable? Last annual inspection completed?": {
                            comments: { "ui:widget": "textarea" },
                            response: { "ui:widget": "RadioWidget" },
                        },
                    },
                },
                role: "USER",
            },
            update: {},
        });

        await prisma.form.upsert({
            where: { id: "2" },
            create: {
                id: "2",
                createdBy: "1000",
                title: "Employee information form",
                description: "A form for getting employee's information",
                schema: {
                    type: "object",
                    required: ["Name", "EMP Id"],
                    properties: {
                        Name: { type: "string", title: "Name", default: "" },
                        "EMP Id": { type: "string", title: "EMP Id", default: "" },
                        "Work Location": {
                            enum: ["SAIT", "NAIT", "Bow valley", "Cross Irons"],
                            title: "Work Location",
                        },
                    },
                },
                uiSchema: {
                    type: "object",
                    required: ["Name", "EMP Id"],
                    properties: {
                        Name: { type: "string", title: "Name", default: "" },
                        "EMP Id": { type: "string", title: "EMP Id", default: "" },
                        "Work Location": {
                            enum: ["SAIT", "NAIT", "Bow valley", "Cross Irons"],
                            title: "Work Location",
                        },
                    },
                },
                role: "USER",
            },
            update: {},
        });

        await prisma.form.upsert({
            where: { id: "3" },
            create: {
                id: "3",
                createdBy: "1000",
                title: "Supervisor Information form",
                description: "A form for getting supervisor's information",
                schema: {
                    type: "object",
                    required: ["Name", "SUP Id"],
                    properties: {
                        Name: { type: "string", title: "Name", default: "" },
                        "SUP Id": { type: "string", title: "SUP Id", default: "" },
                        "Employment status": {
                            title: "Employment status",
                            properties: {
                                "Have you been encharge of a location in last month?": {
                                    enum: ["Yes", "No", "NA"],
                                    title: "Have you been encharge of a location in last month?",
                                },
                                "Have you ever been accused of conducting crime at a work location?": {
                                    enum: ["Yes", "No", "NA"],
                                    title: "Have you ever been accused of conducting crime at a work location?",
                                },
                            },
                        },
                        "Current location of work": {
                            enum: ["SAIT", "NAIT", "Bow valley"],
                            title: "Current location of work",
                        },
                    },
                },
                uiSchema: {
                    "Employment status": {
                        "Have you been encharge of a location in last month?": { "ui:widget": "RadioWidget" },
                        "Have you ever been accused of conducting crime at a work location?": {
                            "ui:widget": "RadioWidget",
                        },
                    },
                    "Current location of work": { "ui:widget": "RadioWidget" },
                },
                role: "SUPERVISOR",
            },
            update: {},
        });
    } catch (err) {
        console.log("ERROR while seeding forms", err);
    }
}

async function seedSubmissions() {
    try {
        await prisma.formSubmission.upsert({
            where: { id: "1" },
            create: {
                id: "1",
                submissions: {
                    Date: "11",
                    Time: "11",
                    "Serial #": "11",
                    Inspector: "21",
                    QUESTIONS: {
                        "Is the pressure gauge in good condition?": { response: "Yes" },
                        "Is the extinguisher wall-mounted and secured?": { response: "Yes" },
                        "Is the extinguisher accessible & unobstructed?": { response: "No" },
                        "Are the extinguishers damaged? Dented? Corroded?": { response: "No" },
                        "Is the hose & nozzle secured and in good condition?": { response: "Yes" },
                        "Is it fully charged and operable? (needle in the green?)": { response: "No" },
                        "Is the inspection tag attached & readable? Last annual inspection completed?": {
                            response: "Yes",
                        },
                    },
                    "Type/ Rating": "12",
                    "License Plate": "1",
                    "Additional Comments": "sdf",
                    "Inspector Signature": "sdf",
                    "Reviewed by Safety/Management (name & signature)": "sdf",
                },
                userId: "1",
                formId: "1",
            },
            update: {},
        });
        await prisma.formSubmission.upsert({
            where: { id: "2" },
            create: {
                id: "2",
                submissions: {
                    Date: "11/12/1220",
                    Time: "11:23pm",
                    "Serial #": "11",
                    Inspector: "21",
                    QUESTIONS: {
                        "Is the pressure gauge in good condition?": { response: "Yes" },
                        "Is the extinguisher wall-mounted and secured?": { response: "Yes" },
                        "Is the extinguisher accessible & unobstructed?": { response: "No" },
                        "Are the extinguishers damaged? Dented? Corroded?": { response: "No" },
                        "Is the hose & nozzle secured and in good condition?": { response: "Yes" },
                        "Is it fully charged and operable? (needle in the green?)": { response: "No" },
                        "Is the inspection tag attached & readable? Last annual inspection completed?": {
                            response: "Yes",
                        },
                    },
                    "Type/ Rating": "12",
                    "License Plate": "1",
                    "Additional Comments": "sdf",
                    "Inspector Signature": "sdf",
                    "Reviewed by Safety/Management (name & signature)": "sdf",
                },
                userId: "2",
                formId: "1",
            },
            update: {},
        });

        await prisma.formSubmission.upsert({
            where: { id: "3" },
            create: {
                id: "3",
                submissions: { Name: "emp", "EMP Id": "empi1", "Work Location": "NAIT" },
                userId: "2",
                formId: "2",
            },
            update: {},
        });

        await prisma.formSubmission.upsert({
            where: { id: "4" },
            create: {
                id: "4",
                submissions: {
                    Name: "Sourav",
                    "SUP Id": "supervisor11@gmail.com",
                    "Employment status": {
                        "Have you been encharge of a location in last month?": "Yes",
                        "Have you ever been accused of conducting crime at a work location?": "Yes",
                    },
                    "Current location of work": "SAIT",
                },
                userId: "11",
                formId: "3",
            },
            update: {},
        });

        await prisma.formSubmission.upsert({
            where: { id: "5" },
            create: {
                id: "5",
                submissions: {
                    Name: "Amrinder",
                    "SUP Id": "amrinder id",
                    "Employment status": {
                        "Have you been encharge of a location in last month?": "Yes",
                        "Have you ever been accused of conducting crime at a work location?": "Yes",
                    },
                    "Current location of work": "SAIT",
                },
                userId: "12",
                formId: "3",
            },
            update: {},
        });

        await prisma.formSubmission.upsert({
            where: { id: "6" },
            create: {
                id: "6",
                submissions: {
                    Name: "Elias",
                    "SUP Id": "SUP123w",
                    "Employment status": {
                        "Have you been encharge of a location in last month?": "Yes",
                        "Have you ever been accused of conducting crime at a work location?": "Yes",
                    },
                    "Current location of work": "SAIT",
                },
                userId: "13",
                formId: "3",
            },
            update: {},
        });
    } catch (err) {
        console.log("ERROR while seeding submissions", err);
    }
}

async function seedDatabase() {
    try {
        await seedUsers();
        await seedSupervisors();
        await seedForms();
        await seedSubmissions();
    } catch (err) {
        console.log("Error while seeding database", err);
    } finally {
        await prisma.$disconnect();
    }
}

seedDatabase().catch((err) => {
    console.log(err);
});
