import { integer } from "aws-sdk/clients/cloudfront";

export interface FirebaseConfig {
  apiKey: string;
  authDomain: string;
  projectId: string;
  storageBucket: string;
  messagingSenderId: string;
  appId: string;
}

export interface Environment {
  production: boolean;
  firebase: FirebaseConfig;
  frontendUrl: string;
  backendUrl: string;
  domainUrl: string;
}
