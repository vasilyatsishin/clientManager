import { initDatabase } from "./sqlite";
import * as SQLite from "expo-sqlite";
import {
    addressTableCreating,
  clientTableCreating,
  contactTableCreating,
  contractTableCreating,
  documentTableCreating,
  scheduleTableCreating,
  storeTableCreating,
  visitScheduleTableCreating,
} from "./tableCreating";

interface Migration {
  version: number;
  up: (db: SQLite.SQLiteDatabase) => Promise<void>;
}

const getDBVersion = async (db: SQLite.SQLiteDatabase): Promise<number> => {
  try {
    const result = await db.getFirstAsync<{ user_version: number }>(
      "PRAGMA user_version;"
    );
    return result?.user_version || 0;
  } catch (error) {
    console.error("Error getting DB version:", error);
    return 0;
  }
};

const setDBVersion = async (
  db: SQLite.SQLiteDatabase,
  version: number
): Promise<void> => {
  try {
    await db.execAsync(`PRAGMA user_version = ${version};`);
    console.log(`DB version updated to ${version}`);
  } catch (error) {
    console.error("Error setting DB version:", error);
  }
};

export const migrations: Migration[] = [
  {
    version: 1,
    up: async (db) => {
      await db.execAsync(`PRAGMA foreign_keys = ON;`);
      clientTableCreating(db);
      contractTableCreating(db);
      storeTableCreating(db);
      documentTableCreating(db)
      addressTableCreating(db);
      scheduleTableCreating(db);
      contactTableCreating(db);
      visitScheduleTableCreating(db);
    },
  },
];

export const runMigrations = async (): Promise<void> => {
  try {
    const db = await initDatabase();
    if (!db) {
      console.error("Database initialization failed!");
      return;
    }

    const currentVersion = await getDBVersion(db);

    for (const migration of migrations) {
      if (migration.version > currentVersion) {
        console.log(`🚀 Applying migration: ${migration.version}`);
        try {
          await migration.up(db);
          await setDBVersion(db, migration.version);
        } catch (error) {
          console.error(
            `Migration ${migration.version} failed, stopping migration process.`
          );
          break;
        }
      }
    }
  } catch (error) {
    console.error("Migration process failed:", error);
  }
};
