import { sign } from "jsonwebtoken";

export const tokenGenerator = (dataUser: {
    id: number;
    email: string;
    role: string;
}) => {
    const token = sign(
        { id: dataUser.id, email: dataUser.email, role: dataUser.role },
        process.env.TOKEN_KEY || "test",
        { expiresIn: "1h" }
    );
    return token;
};
