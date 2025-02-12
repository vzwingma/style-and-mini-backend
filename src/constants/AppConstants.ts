
export const BACKEND_PORT = process.env.PORT || 5000;
/**
 * Configuration MongoDB
 */
export const MONGO_DB_URI = process.env.MONGO_DB_URI || "";
export const MONGO_DB_DATABASE_NAME = process.env.MONGO_DB_DATABASE || "style-mini-app-dev";

export const MONGO_DB_COLLECTIONS = {
    TYPES_VETEMENTS: "typesVetements",
    VETEMENTS: "vetements",
    USERS: "users",
    COMMANDS: "commands"
}