import { B2CConfiguration } from "./b2cClient";

export const b2cConfig: B2CConfiguration = {
    auth: {
      clientId: '',
      authorityBase: '',
      policies: {
        signInSignUp: '',
        passwordReset: '',
      },
    },
    // web only:
    cache: { cacheLocation: '' },
  };
  
  export const b2cScopes = [];
  