import * as FileSystem from 'expo-file-system/legacy';
import { Asset } from 'expo-asset';
import * as SQLite from 'expo-sqlite';

const DB_NAME = 'quran.db';
const SQLITE_DIR = FileSystem.documentDirectory + 'SQLite/';
const DB_PATH = SQLITE_DIR + DB_NAME;

let db: any = null; // Use 'any' to avoid TypeScript errors

/**
 * Initializes the SQLite database
 */
export async function initDb(): Promise<any> {
  if (db) {
    console.log('DB already initialized');
    return db;
  }

  try {
    console.log('SQLite directory:', SQLITE_DIR);

    // Ensure SQLite directory exists
    const dirInfo = await FileSystem.getInfoAsync(SQLITE_DIR);
    if (!dirInfo.exists) {
      console.log('SQLite directory missing, creating...');
      await FileSystem.makeDirectoryAsync(SQLITE_DIR, { intermediates: true });
    }

    // Always overwrite DB during development to avoid stale copies
    const asset = Asset.fromModule(require('../../assets/quran.db'));
    await asset.downloadAsync();
    console.log('Asset downloaded at:', asset.localUri);

    await FileSystem.copyAsync({
      from: asset.localUri!,
      to: DB_PATH,
    });
    console.log('DB copied to:', DB_PATH);

    // Open DB using full path
    db = SQLite.openDatabaseSync(DB_PATH);
    console.log('DB opened successfully');

    // Optional: log first 5 rows from surah table
    const tables = db.getAllSync(
      "SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%'"
    ) as { name: string }[];
    console.log('Tables in DB:', tables);

    if (tables.find((t) => t.name === 'surah')) {
      const sample = db.getAllSync('SELECT * FROM surah LIMIT 5;');
      console.log('Sample surah rows:', sample);
    }

    return db;
  } catch (err) {
    console.error('DB init failed:', err);
    throw err;
  }
}

/**
 * Safe accessor for already-initialized DB
 */
export function getDb(): any {
  if (!db) {
    throw new Error('Database not initialized. Call initDb() first.');
  }
  return db;
}

// Ayah type definition
export type Ayah = {
  id: number;
  surah_id: number;
  ayah_no: number;
  text: string;
  text_no_tajweed: string;
  juz: number;
  page: number;
};
