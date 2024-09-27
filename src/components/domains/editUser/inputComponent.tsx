"use client";

import { Button } from "@/components/ui/button";
import { updateUser } from "@/actions/users";
import bcrypt from "bcryptjs";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useRouter } from "next/router";

interface InputComponentProps {
  id: string;
  name: string;
  email: string;
  role: "ADMIN" | "SUPERVISOR" | "USER";
  closeDialog: () => void;
}

const InputComponent: React.FC<InputComponentProps> = ({
  id,
  name,
  email,
  role,
  closeDialog,
}) => {
  const [data, setData] = useState<string[]>([name, email, "password", role]);

  const handleInput = async (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const newData = [...data];
    newData[index] = e.target.value;
    setData(newData);
  };

  const handleEdit = async () => {
    const salt = await bcrypt.genSalt();
    const hashedPass = await bcrypt.hash(data[2], salt);
    const res = await updateUser(id, {
      name: data[0],
      email: data[1],
      password: hashedPass,
      role: data[3] as "SUPERVISOR" | "USER",
    });
    if (res.success) {
      closeDialog();
    }
  };

  return (
    <div>
      {data.map((item, index) => (
        <>
          {index === 3 ? (
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
          ) : (
            <>
              <Input
                type="text"
                value={item === "password" ? "" : item}
                placeholder={item === "password" ? "New Password" : ""}
                onChange={(e) => handleInput(e, index)}
                className="my-2"
              />
            </>
          )}
        </>
      ))}
      <Button className="justify-end" onClick={() => handleEdit()}>
        Save
      </Button>
    </div>
  );
};

export default InputComponent;
