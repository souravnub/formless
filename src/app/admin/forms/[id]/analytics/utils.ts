import { FormSubmission } from "@prisma/client";

export function getRadioButtonChartData(formSchema: any, formSubmissions: FormSubmission[]) {
    const radioButtonFields: any = [];

    Object.keys(formSchema.properties).forEach((key) => {
        const keyValue = formSchema.properties[key];
        if (keyValue.enum !== undefined) {
            radioButtonFields.push({ key, enum: keyValue.enum });
        }
    });
    const radioButtonFieldChartData: any = {};

    radioButtonFields.forEach((radioGroup: any) => {
        const enumObj: any = {};

        radioGroup.enum.map((e: any) => (enumObj[e] = { count: 0 }));

        formSubmissions.forEach((submission) => {
            const res = submission.submissions as any;
            enumObj[res[radioGroup.key]].count++;
        });

        radioButtonFieldChartData[radioGroup.key] = Object.keys(enumObj).map((key) => {
            return { answer: key, count: enumObj[key].count };
        });
    });

    return radioButtonFieldChartData;
}

export function getCheckboxChartData(formSchema: any, formSubmissions: FormSubmission[]) {
    const checkboxChartData: any = {};

    const checkboxFields: any = [];

    Object.keys(formSchema.properties).forEach((key) => {
        const keyValue = formSchema.properties[key];
        if (keyValue.items !== undefined) {
            checkboxFields.push({ key, enum: keyValue.items.enum });
        }
    });

    checkboxFields.forEach((radioGroup: any) => {
        const enumObj: any = {};

        radioGroup.enum.map((e: any) => (enumObj[e] = { count: 0 }));

        formSubmissions.forEach((submission) => {
            // console.log(submission);
            const res = submission.submissions as any;
            res[radioGroup.key].map((ans: any) => enumObj[ans].count++);
        });

        checkboxChartData[radioGroup.key] = Object.keys(enumObj).map((key, idx) => {
            return { label: key, count: enumObj[key].count, fill: `hsl(var(--chart-${idx + 1}))` };
        });
    });

    return checkboxChartData;
}
