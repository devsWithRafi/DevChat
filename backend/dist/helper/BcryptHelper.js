import bcrypt from 'bcryptjs';
export const HashPassword = async (password) => {
    const hashedPass = await bcrypt.hash(password, 10);
    return hashedPass;
};
export const ComparePassword = async (password, hashedPassword) => {
    const result = await bcrypt.compare(password, hashedPassword);
    return result;
};
//# sourceMappingURL=BcryptHelper.js.map