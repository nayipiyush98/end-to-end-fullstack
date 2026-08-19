declare global {
  namespace Express {
    interface Request {
      user?: {
        id: number;
        email: string;
      };
    }
  }
}

export {};


declare global {
  namespace Express {
    interface Request {
      user?: {
        id: number;
        email: string;
        roleId?: number | null;
      };

      auth?: {
        id: number;
        email: string;
        type: "ADMIN" | "CUSTOMER";
      };
    }
  }
}

export {};