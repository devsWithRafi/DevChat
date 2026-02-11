// LOGOUT USER
export const logOutUser = async (req, res) => {
    res.clearCookie('token', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        path: '/',
    });
    return res.status(200).json({ success: 'Logged out successfully' });
};
//# sourceMappingURL=logOutUser.controller.js.map