import { StrictRJSFSchema, UiSchema } from "@rjsf/utils";
import { useState } from "react";
import {
    AddCheckboxesProps,
    addDecisionFieldsProps,
    addDecisionFieldsWithCommentProps,
    AddRadioButtonProps,
    addTextInputProps,
} from "./types";

type RJSFProperties = StrictRJSFSchema["properties"];

export function useJsonForm() {
    const [requiredFields, setRequiredFields] = useState<string[]>([]);
    const [propertiesArr, setPropertiesArr] = useState<RJSFProperties[]>([]);
    const [UISchema, setUISchema] = useState<UiSchema>({});

    function addField(data: StrictRJSFSchema, isRequired: boolean = false) {
        if (isRequired) {
            setRequiredFields((prev) => [...prev, data.title as string]);
        }

        const newInpData: RJSFProperties = {};
        delete data["required"];
        newInpData[data.title as string] = data;

        setPropertiesArr((prev) => [...prev, newInpData]);
    }

    function removeField(fieldIdx: number) {
        setPropertiesArr((prev) => prev.filter((_, idx) => fieldIdx !== idx));
    }

    function addRadioButtons({ title, radioButtons }: AddRadioButtonProps) {
        setUISchema((prev) => {
            const schema = prev;
            schema[title] = { "ui:widget": "RadioWidget" };
            return schema;
        });
        addField({ title, enum: radioButtons });
    }

    function addCheckboxes({ title, checkboxes }: AddCheckboxesProps) {
        setUISchema((prev) => {
            const schema = prev;
            schema[title] = { "ui:widget": "CheckboxesWidget" };
            return schema;
        });
        addField({
            title,
            type: "array",
            uniqueItems: true,
            items: { enum: checkboxes },
        });
    }

    function addTextInput({
        title,
        required,
        defaultVal,
        isMutableList,
    }: addTextInputProps) {
        const isRequired = required ? true : false;
        if (!isMutableList) {
            addField(
                {
                    title: title,
                    default: defaultVal,
                    type: "string",
                },
                isRequired
            );
        } else {
            addField({
                title: title,
                type: "array",
                items: {
                    type: "string",
                    default: defaultVal,
                },
            });
        }
    }

    function addDecisionFields({ title, fields }: addDecisionFieldsProps) {
        const properties: StrictRJSFSchema[] = fields.map((field) => ({
            [field]: {
                title: field,
                enum: ["Yes", "No", "NA"],
            },
        }));
        setUISchema((prev) => {
            const schema = prev;
            const subSchema: Record<string, Record<string, string>> = {};
            fields.forEach((field) => {
                subSchema[field] = { "ui:widget": "RadioWidget" };
            });
            schema[title] = subSchema;
            return schema;
        });

        addField({
            title,
            properties: Object.assign({}, ...properties),
        });
    }

    function addDecisionFieldsWithComment({
        title,
        fields,
    }: addDecisionFieldsWithCommentProps) {
        const properties: StrictRJSFSchema[] = fields.map((field) => ({
            [field]: {
                properties: {
                    response: {
                        enum: ["Yes", "No", "NA"],
                    },
                    comments: {
                        type: "string",
                    },
                },
            },
        }));

        setUISchema((prev) => {
            const schema = prev;
            const subSchema: Record<
                string,
                Record<string, Record<string, string>>
            > = {};
            fields.forEach((field) => {
                subSchema[field] = {
                    response: { "ui:widget": "RadioWidget" },
                    comments: { "ui:widget": "textarea" },
                };
            });
            schema[title] = subSchema;
            return schema;
        });

        addField({
            title,
            properties: Object.assign({}, ...properties),
        });
    }

    return {
        requiredFields,
        propertiesArr,
        addField,
        removeField,
        UISchema,
        addTextInput,
        addCheckboxes,
        addRadioButtons,
        addDecisionFields,
        addDecisionFieldsWithComment,
    };
}
