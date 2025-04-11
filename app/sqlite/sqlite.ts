import * as SQLite from "expo-sqlite";
import {migrations} from "./migrations"; // Імпортуємо нову логіку міграцій

export const initDatabase = async (): Promise<SQLite.SQLiteDatabase | null> => {
  try {
    const db = await SQLite.openDatabaseAsync("ClientManagerLocalDB");
    await db.execAsync(`PRAGMA foreign_keys = ON;`);

    // Встановлюємо поточну версію БД
    const latestVersion = migrations[migrations.length - 1]?.version || 1;
    await db.execAsync(`PRAGMA user_version = ${latestVersion};`);

    return db;
  } catch (error) {
    console.log("❌ Помилка ініціалізації БД:", error);
    return null;
  }
};
