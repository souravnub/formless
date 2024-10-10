import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";


const SignupForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    
    const handleSignup = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
        //await signup(email, password);
        } catch (error) {
        console.log(error);
        }
    };
    
    return (
        <form
            className="grid w-full items-center gap-4"
            //onSubmit={}
            >
            <div className="flex flex-col space-y-1.5">
                <Label htmlFor="email">Email</Label>
                <Input id="name" name="email" />
            </div>
            <div>
                <Label htmlFor="password">Password</Label>
                <Input id="password" type="password" name="password" />
            </div>

            <Button type="submit" disabled={isLoading} className="px-8 w-min">
                {isLoading ? "loading..." : "Login"}
            </Button>
        </form>
    );
;}

export default SignupForm;