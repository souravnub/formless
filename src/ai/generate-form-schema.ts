import { SchemaType } from "@google/generative-ai";

const schema = {
    description: "Generated Form",
    type: SchemaType.OBJECT,
    properties: {
        title: {
            type: SchemaType.STRING,
            nullable: false,
            description: "Title of the form",
        },
        description: {
            type: SchemaType.STRING,
            nullable: false,
            description: "Description of the form",
        },
        radioButtons: {
            type: SchemaType.ARRAY,
            description: "Radio buttons in the form",
            items: {
                type: SchemaType.OBJECT,
                nullable: true,
                properties: {
                    title: {
                        description: "title of the radio button group",
                        type: SchemaType.STRING,
                    },
                    elements: {
                        type: SchemaType.ARRAY,
                        description: "title of the radio button field",
                        items: {
                            type: SchemaType.STRING,
                        },
                    },
                },
            },
        },
        checkboxes: {
            type: SchemaType.ARRAY,
            description: "checkboxes in the form",
            items: {
                type: SchemaType.OBJECT,
                properties: {
                    title: {
                        description: "title of the checkbox group",
                        type: SchemaType.STRING,
                    },
                    elements: {
                        type: SchemaType.ARRAY,
                        description: "title of the checkbox field",
                        items: {
                            type: SchemaType.STRING,
                        },
                    },
                },
            },
        },
        textInputs: {
            type: SchemaType.ARRAY,
            description: "text inputs in the form",
            items: {
                type: SchemaType.OBJECT,
                properties: {
                    title: {
                        description: "title of the input field",
                        type: SchemaType.STRING,
                    },
                    isRequired: {
                        description: "Is the text input a required field",
                        type: SchemaType.BOOLEAN,
                    },
                    defaultValue: {
                        description: "The default value for the input",
                        nullable: true,
                        type: SchemaType.STRING,
                    },
                    isMutableList: {
                        description:
                            "Can the input store a list of text inputs",
                        type: SchemaType.BOOLEAN,
                        nullable: true,
                    },
                },
            },
        },
        decisionFields: {
            type: SchemaType.ARRAY,
            description: "decision field group in the form",
            items: {
                type: SchemaType.OBJECT,
                properties: {
                    title: {
                        description: "title of the decision field group",
                        type: SchemaType.STRING,
                    },
                    withComments: {
                        type: SchemaType.BOOLEAN,
                        description:
                            "do the decision fields in the group have comment field in them",
                    },
                    elements: {
                        type: SchemaType.ARRAY,
                        description: "title of the descision fields",
                        items: {
                            type: SchemaType.STRING,
                        },
                    },
                },
            },
        },
    },
};
export default schema;
