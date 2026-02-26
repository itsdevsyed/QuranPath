import { getDb } from './database';

/**
 * Fetch all surahs
 */
export async function fetchAllSurahs() {
  const db = getDb();
  return db.getAllSync(`
    SELECT id, name_arabic, name_english, name_latin, total_verse, type
    FROM surah
    ORDER BY id ASC;
  `);
}

/**
 * Fetch a single Surah info by ID
 */
export async function fetchSurahById(surahId: number) {
  const db = getDb();
  const rows = db.getAllSync(
    `SELECT id, name_arabic, name_english, name_latin, total_verse, type
     FROM surah WHERE id = ?;`,
    [surahId]
  );
  return rows[0] || null;
}

/**
 * PAGED: Fetch verses for a Surah (Smooth Loading)
 */
export const fetchVersesBySurahPaged = async (surahId: number, limit: number, offset: number) => {
  const db = getDb();
  return db.getAllSync(`
    SELECT id, surah_id, ayah_no, text
    FROM verse
    WHERE surah_id = ?
    ORDER BY ayah_no ASC
    LIMIT ? OFFSET ?;
  `, [surahId, limit, offset]);
};

/**
 * Fetch all Juz metadata
 */
export const fetchAllJuz = async () => {
  const db = getDb();
  return db.getAllSync(`
    SELECT id AS number, arabic_name AS arabic, total_ayahs AS verse_count
    FROM juz ORDER BY id ASC;
  `);
};

/**
 * PAGED: Fetch verses for a Juz (Smooth Loading)
 * FIXED: Table name changed to 'verse' and column to 'juz'
 */
export const fetchVersesByJuzPaged = async (juzNumber: number, limit: number, offset: number) => {
  const db = getDb();
  return db.getAllSync(`
    SELECT id, surah_id, ayah_no, text
    FROM verse
    WHERE juz = ?
    ORDER BY id ASC
    LIMIT ? OFFSET ?;
  `, [juzNumber, limit, offset]);
};

/**
 * Non-paged version (if needed for background logic)
 */
export const getVersesByJuz = (juzNumber: number) => {
  const db = getDb();
  return db.getAllSync(
    `SELECT id, surah_id, ayah_no, text
     FROM verse
     WHERE juz = ?
     ORDER BY surah_id, ayah_no ASC`,
    [juzNumber]
  );
};
