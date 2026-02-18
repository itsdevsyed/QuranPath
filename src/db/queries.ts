import { getDb } from './database';

/**
 * Fetch all surahs from the DB
 */
export async function fetchAllSurahs() {
  const db = getDb();
  return db.getAllSync(`
    SELECT id, name_arabic, name_english, name_latin, total_verse
    FROM surah
    ORDER BY id ASC;
  `);
}

/**
 * Fetch a single Surah info by ID
 */
export async function fetchSurahById(surahId: number) {
  const db = getDb();
  const rows = db.getAllSync(`
    SELECT id, name_arabic, name_english, name_latin, total_verse
    FROM surah
    WHERE id = ${surahId};
  `);
  return rows[0] || null;
}

/**
 * Fetch all verses for a given Surah
 */
export async function fetchVersesBySurah(surahId: number) {
  const db = getDb();
  return db.getAllSync(`
    SELECT id, surah_id, ayah_no, text, text_no_tajweed, juz, page_no
    FROM verse
    WHERE surah_id = ${surahId}
    ORDER BY ayah_no ASC;
  `);
}

export async function fetchVersesByJuzz(surahId: number) {
  const db = getDb();
  return db.getAllSync(`
SELECT
    juz AS juz_number,
    MIN(surah_id) AS first_surah_id,
    MAX(surah_id) AS last_surah_id,
    COUNT(*) AS verse_count,
    MIN(surah_id) || ':' || MIN(ayah_no) AS start_verse,
    MAX(surah_id) || ':' || MAX(ayah_no) AS end_verse
FROM verse
GROUP BY juz
ORDER BY juz ASC;
  `);
}
