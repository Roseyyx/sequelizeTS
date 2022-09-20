export {}

declare global {
    namespace Express {
      interface User {
        isAdmin: boolean;
        username: string;
      }
    }
  }