export {}

declare global {
    namespace Express {
      interface User {
        isAdmin: boolean;
        username: string;
        id: number;
        invitedBy: string;
        subEndDate: Date;
      }
    }
  }