const { PrismaClient } = require("@prisma/client");

const db = global.db || new PrismaClient();

if (process.env.DATABASE_URL !== "production") global.db = db;

module.exports = { db };


