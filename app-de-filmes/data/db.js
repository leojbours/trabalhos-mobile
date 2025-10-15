import * as SQLite from 'expo-sqlite';

export const db = SQLite.openDatabaseSync('expo-sqlite')

export function initDb() {
    db.execSync(`
    PRAGMA journal_mode = WAL;
    CREATE TABLE IF NOT EXISTS movies (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        genre TEXT NOT NULL,
        year INTEGER NOT NULL
    );`)
}