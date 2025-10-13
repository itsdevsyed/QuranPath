// utils/quranData.js
import quranData from './quranData.json';

// Precompute surah map for fast lookup
const surahMap = {};
quranData.forEach(verse => {
  if (!surahMap[verse.surah]) surahMap[verse.surah] = [];
  surahMap[verse.surah].push(verse);
});

// Precompute juz map if needed
const juzMap = {};
quranData.forEach(verse => {
  if (!juzMap[verse.juz]) juzMap[verse.juz] = [];
  juzMap[verse.juz].push(verse);
});

export const getSurah = surahNumber => surahMap[surahNumber] || [];
export const getJuz = juzNumber => juzMap[juzNumber] || [];
