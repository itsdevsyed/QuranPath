// /utils/groupVersesBySurah.ts

import { Verse, SurahGroup } from '../hooks/useJuzVerses';

export function groupVersesBySurah(rows: Verse[]): SurahGroup[] {
  const grouped: Record<number, Verse[]> = {};

  rows.forEach((verse) => {
    if (!grouped[verse.surah_id]) {
      grouped[verse.surah_id] = [];
    }
    grouped[verse.surah_id].push(verse);
  });

  return Object.keys(grouped)
    .map((key) => ({
      surahId: Number(key),
      verses: grouped[Number(key)],
    }))
    .sort((a, b) => a.surahId - b.surahId);
}
