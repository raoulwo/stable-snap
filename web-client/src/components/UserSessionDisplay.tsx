import React from "react";
import { useAuthenticator } from '@aws-amplify/ui-react';
import {LogOut} from "lucide-react";
import {Button} from "@/components/ui/button.tsx";

const UserSessionDisplay: React.FC = () => {
    /*
    The lines of code for setting up Amplify Authenticator powered by Amazon Cognito were taken from the following source:
    https://docs.amplify.aws/react/start/quickstart/
    */
    const { user, signOut } = useAuthenticator();
    const username: string | undefined = user?.signInDetails?.loginId;

    const handleLogout = () => {
        console.info("Info: Logging out user "+username);
        signOut();
    }

    return (
        <div className="flex justify-between items-center mb-4">
            <div className="font-bold text-xl truncate">Hello, {username}</div>
            <Button
                className="ml-2"
                onClick={handleLogout}
                variant="outline"><LogOut className="text-red-500" /></Button>
        </div>
    );
}

export default UserSessionDisplay;