import * as SQLite from 'expo-sqlite';

export const db = SQLite.openDatabaseSync('expo-sqlite')

export function initDb() {
    db.execSync(`
    PRAGMA journal_mode = WAL;
    CREATE TABLE IF NOT EXISTS despesas (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        descricao TEXT NOT NULL,
        valor REAL NOT NULL
    );`)
}