import * as SQLite from 'expo-sqlite';

export const db = SQLite.openDatabaseSync('expo-sqlite')

export function initDb() {
    db.execSync(`
    PRAGMA journal_mode = WAL;
    CREATE TABLE IF NOT EXISTS exercises (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        activity TEXT NOT NULL,
        minDuration REAL NOT NULL,
        category TEXT NOT NULL
    );`)
}