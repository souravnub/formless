import React from "react";
import { useState, useEffect } from "react";
import { getSubmissionsCount } from "@/actions/submissions";
import { getForms } from "@/actions/forms";

const DashFormIssues = () => {
    const [highestResubmissions, setHighestResubmissions] = useState(0);
    const [formTitle, setFormTitle] = useState("");
    const [forms, setForms] = useState<any>([]);
    const fetchForms = async () => {
        const forms = await getForms();
        setForms(forms);
    }
    useEffect(() => {
        fetchForms();
    }, []);

    useEffect (() => {
        forms.forEach((form: any) => {
            getSubmissionsCount({
                // Needs Date Implementation Logic to Check for Resubmissions

                formFilter: form.title
            }).then((res) => {
                if (res > highestResubmissions) {
                    setHighestResubmissions(res);
                    setFormTitle(form.title);
                }
            });
        });
    }, [forms]);
    return (
        <p>
            The form with the most resubmissions is {formTitle} with {highestResubmissions} resubmissions
        </p>
    );

}
export default DashFormIssues;