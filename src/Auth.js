import React from 'react';

const Auth = {
    isAuthenticated: null,
    authenticate() {
      this.isAuthenticated=true;
    },
    signout() {
      this.isAuthenticated=false;
    },
    getAuth() {
        return this.isAuthenticated;
      }
  };

  export default Auth;