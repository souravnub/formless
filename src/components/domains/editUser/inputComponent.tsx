"use client";

import { Button } from "@/components/ui/button";
import { updateUser } from "@/actions/users";
import bcrypt from "bcryptjs";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";

interface InputComponentProps {
  id: string;
  name: string;
  email: string;

  role: "ADMIN" | "SUPERVISOR" | "USER";
  refresh?: () => void;
  closeDialog: () => void;
}

const InputComponent: React.FC<InputComponentProps> = ({
  id,
  name,
  email,
  role,
  refresh,
  closeDialog,
}) => {
  const {toast} = useToast();
  const [data, setData] = useState<string[]>([name, email, "", role]);
  const [wantToChangePassword, setWantToChangePassword]= useState<boolean>(false);

  const handleInput = async (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const newData = [...data];
    newData[index] = e.target.value;
    setData(newData);
  };


  

  const handleEdit = async () => {

    if(wantToChangePassword && data[2].trim().length == 0) {
      toast({
        variant: "destructive",
        description: 'Please provide a new passoword'
      })
      return;
    }
    const res = await updateUser(id, {
      name: data[0],
      email: data[1],
      password: data[2],
      role: data[3] as "SUPERVISOR" | "USER",
    }, wantToChangePassword);

    if (res.success) {
      refresh && refresh();
      closeDialog();
    }
  };

  return (
    <div>
      {data.map((item, index) => (
        <>
          {index === 3 && (
            <>
              <RadioGroup
                className="my-2"
                name="role"
                defaultValue={role}
                onValueChange={(value) => {
                  handleInput(
                    {
                      target: { value },
                    } as React.ChangeEvent<HTMLInputElement>,
                    index
                  );
                }}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="SUPERVISOR" id="SUPERVISOR" />
                  <Label htmlFor="SUPERVISOR">Supervisor</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="USER" id="USER" />
                  <Label htmlFor="USER">User</Label>
                </div>
              </RadioGroup>
            </>
          )}
        </>
      ))}

      <div className="my-2">
        <div >
          <Label htmlFor="editPassword">Want to edit password?</Label>
          <Checkbox id="eidtPassword"  className="ml-2" onCheckedChange={(value) => setWantToChangePassword(value ? true: false)} checked={wantToChangePassword}/>
        </div>

{wantToChangePassword && 
        <Input
          type="text"
          value={data[2]}
          placeholder={"New Password"}
          required
          onChange={(e) => handleInput(e, 2)}
          className="my-2"
        />}
      </div>

      <Button className="justify-end" onClick={() => handleEdit()}>
        Save
      </Button>
    </div>
  );
};

export default InputComponent;
