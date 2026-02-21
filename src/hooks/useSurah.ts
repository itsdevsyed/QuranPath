import { useEffect, useState } from 'react';
import { fetchSurahById, fetchVersesBySurah } from '../db/queries';

export type Surah = {
  id: number;
  name_arabic: string;
  name_latin: string;
  total_verse: number;
  type?: string;
};

export type Verse = {
  id: number;
  ayah_no: number;
  text: string;
};

export function useSurah(surahId: number) {
  const [surah, setSurah] = useState<Surah | null>(null);
  const [verses, setVerses] = useState<Verse[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const s = await fetchSurahById(surahId);
        const v = await fetchVersesBySurah(surahId);
        setSurah(s);
        setVerses(v);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [surahId]);

  return { surah, verses, loading };
}
