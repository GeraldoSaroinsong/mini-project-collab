export interface IUser {
    name: string;
    email: string;
    username: string;
    password: string;
    phone: string;
    role: "user" | "organizer";
    image?: string;
    referralCode: string;
    usingReferralCode?: string;
    pointBalace: number;
}

export interface ILogin {
    email: string;
    password: string;
}

export interface IUserUpdate {
    name?: string;
    password?: string;
    phone?: string;
    image?: string;
    pointBalace?: number;
}

export interface IUserUnique {
    id?: number;
    email: string;
}
