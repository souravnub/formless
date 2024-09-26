import { StrictRJSFSchema } from "@rjsf/utils";
import { useState } from "react";

type RJSFProperties = StrictRJSFSchema["properties"];

export function useJsonForm() {
    const [requiredFields, setRequiredFields] = useState<string[]>([]);
    const [propertiesArr, setPropertiesArr] = useState<RJSFProperties[]>([]);

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

    return {
        requiredFields,
        propertiesArr,
        addField,
        removeField,
    };
}
