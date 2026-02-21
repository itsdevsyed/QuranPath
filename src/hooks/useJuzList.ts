import { useEffect, useState } from 'react';
import { fetchJuzMetadata } from '../db/queries';
import juzzNames from '../../assets/quran/Juzz.json';

type JuzListItemData = {
  number: number;
  arabic: string;
  english: string;
  transliteration: string;
  first_surah_id: number;
  last_surah_id: number;
  verse_count: number;
  start_verse: string;
  end_verse: string;
};

export function useJuzList() {
  const [data, setData] = useState<JuzListItemData[]>([]);

  useEffect(() => {
    const load = async () => {
      try {
        const rows = await fetchJuzMetadata();
        const merged = rows.map((r: any, idx: number) => ({
          number: r.juz_number,
          arabic: juzzNames[idx]?.arabic_name || '',
          english: juzzNames[idx]?.english_name || '',
          transliteration: juzzNames[idx]?.transliteration || '',
          first_surah_id: r.first_surah_id,
          last_surah_id: r.last_surah_id,
          verse_count: r.verse_count,
          start_verse: r.start_verse,
          end_verse: r.end_verse,
        }));
        setData(merged);
      } catch (e) {
        setData([]);
      }
    };
    load();
  }, []);

  return data;
}
