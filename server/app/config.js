const config = {
    port: process.env.PORT || 3001,
    databaseUrl: process.env.MONGODB_URI || "mongodb+srv://fason199:dAJtNQsjDgfWHYyu@projekttaw.ny1l1yn.mongodb.net/?retryWrites=true&w=majority",
    JwtSecret: process.env.JWT_SECRET || "secret",
};

export default config;
