/*
TAKEN FROM 1

The lines of code for setting up Amplify Authenticator powered by Amazon Cognito were taken from the following source:
https://docs.amplify.aws/react/start/quickstart/
*/

import { useEffect } from 'react';
import './App.css'
import ProjectPage from "@/components/ProjectPage.tsx";
import { searchImages, searchInitialImages, uploadImage } from './lib/api';
import AppProvider from "@/context/AppContext.tsx";
import {Button} from "@/components/ui/button.tsx";
import { Badge } from "@/components/ui/badge.tsx";
// TAKEN FROM START 1
import { useAuthenticator } from '@aws-amplify/ui-react';
// TAKEN FROM END 1
function App() {
// TAKEN FROM START 1
  const { user, signOut } = useAuthenticator();
// TAKEN FROM END 1
  useEffect(() => {
    const run = async () => {
      try {
        const results = await searchInitialImages();
        console.log(results);
      } catch (error) {
        console.error(error);
      }

      try {
        const results = await searchImages("building");
        console.log(results);
      } catch (error) {
        console.error(error);
      }

      try {
        await uploadImage();
      } catch (error) {
        console.error(error);
      }

    };

    run();
  }, []);
// TAKEN FROM START 1
  return (
      <>
        <Badge>Hello, {user?.signInDetails?.loginId}!</Badge>
        <Button onClick={signOut}>Sign out</Button>
        <AppProvider>
          <ProjectPage/>
        </AppProvider>
      </>
  )
// TAKEN FROM END 1
}

export default App
