// src/utils/juzUtils.ts
import { calculateJuzByVerseRange } from './juzRanges';

export const getVerseJuz = (surahId: number, verseId: number, existingJuz?: number): number => {
    // Use existing juz data if available, otherwise calculate it
    return existingJuz || calculateJuzByVerseRange(surahId, verseId);
};

export const toArabicIndic = (n: number | string | undefined): string => {
    if (n == null) return '';
    const s = String(n);
    const arabicNumerals = ['\u0660', '\u0661', '\u0662', '\u0663', '\u0664', '\u0665', '\u0666', '\u0667', '\u0668', '\u0669'];
    return s.split('').map(char => (/\d/.test(char) ? arabicNumerals[Number(char)] : char)).join('');
};