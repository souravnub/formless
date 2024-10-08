import React, { Dispatch, FormEvent, SetStateAction } from "react";
import AddDecisionFieldsDialog from "./AddDescisionDialog";

type DialogProps = {
    isDialogOpen: boolean;
    setIsDialogOpen: Dispatch<SetStateAction<boolean>>;
    onSubmit: (data: { title: string; fields: string[] }) => void;
};
const AddDecisionCommentDialog = (props: DialogProps) => {
    return <AddDecisionFieldsDialog {...props} />;
};

export default AddDecisionCommentDialog;
