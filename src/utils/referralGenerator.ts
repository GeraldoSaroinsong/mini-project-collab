export const referralGenerator = (username: string): string => {
    const randomDigit = Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000;
    const referralCode = username.substring(0,3) + randomDigit.toString();
    return referralCode;
};
