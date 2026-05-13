const generateAccessToken = (app, id) => {
    return app.jwt.sign({ id }, { expiresIn: `${process.env.JWT_SECRET_EXPIRATION}` });
};
export { generateAccessToken };
//# sourceMappingURL=auth.utils.js.map