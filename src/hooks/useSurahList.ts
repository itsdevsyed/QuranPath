import { useEffect, useState } from 'react';
import { fetchAllSurahs } from '../db/queries';

type SurahListItem = {
  number: number;
  arabic: string;
  english: string;
  translation: string;
  verses: number;
  location: string;
};

export const useSurahList = () => {
  const [surahList, setSurahList] = useState<SurahListItem[]>([]);

  useEffect(() => {
    const loadSurahs = async () => {
      try {
        const rows = await fetchAllSurahs();

        const mapped = rows.map((row: any) => ({
          number: row.id,
          arabic: row.name_arabic,
          english: row.name_latin || row.name_english,
          translation: row.name_english,
          verses: row.total_verse,
          location: row.type, // 🔥 coming from DB now
        }));

        setSurahList(mapped);
      } catch (err) {
        console.error('Error fetching Surahs:', err);
      }
    };

    loadSurahs();
  }, []);

  return surahList;
};
