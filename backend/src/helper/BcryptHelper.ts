import bcrypt from 'bcryptjs';

export const HashPassword = async (password: string) => {
    const hashedPass = await bcrypt.hash(password, 10);
    return hashedPass;
};
export const ComparePassword = async (
    password: string,
    hashedPassword: string,
) => {
    const result = await bcrypt.compare(password, hashedPassword);
    return result;
};
