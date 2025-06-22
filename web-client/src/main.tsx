/*
TAKEN FROM 1

The lines of code for setting up Amplify Authenticator powered by Amazon Cognito were taken from the following source:
https://docs.amplify.aws/react/start/quickstart/
*/

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// TAKEN FROM START 1
import { Authenticator } from '@aws-amplify/ui-react';
import { Amplify } from 'aws-amplify';
import outputs from '../amplify_outputs.json';
import App from './App.tsx'
// TAKEN FROM END 1
import './index.css'

// TAKEN FROM START 1
import '@aws-amplify/ui-react/styles.css';
Amplify.configure(outputs);
createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <Authenticator>
          <App />
      </Authenticator>
  </StrictMode>,
)
// TAKEN FROM END 1