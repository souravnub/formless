import { StrictRJSFSchema } from "@rjsf/utils";
import { useState } from "react";

type RJSFProperties = StrictRJSFSchema["properties"];

export function useJsonForm() {
    const [requiredFields, setRequiredFields] = useState<string[]>([]);
    const [propertiesArr, setPropertiesArr] = useState<RJSFProperties[]>([]);

    function addField(data: StrictRJSFSchema, isReuqired: boolean = false) {
        if (isReuqired) {
            setRequiredFields((prev) => [...prev, data.title as string]);
        }

        const newInpData: RJSFProperties = {};
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