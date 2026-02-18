import { useEffect, useState } from 'react';
import { fetchAllSurahs } from '../db/queries'; // make sure this path is correct

export const useSurahList = () => {
  const [surahList, setSurahList] = useState<any[]>([]);

  useEffect(() => {
    const loadSurahs = async () => {
      try {
        const rows = await fetchAllSurahs(); // fetch all columns from surah table

        const mapped = rows.map((row: any) => ({
          number: row.id,
          arabic: row.name_arabic,
          english: row.name_latin || row.name_english,
          translation: row.name_english,
          verses: row.total_verse, // matches DB column exactly
          location: 'meccan', // optional, can add 'type' column to surah table later
        }));

        setSurahList(mapped);
      } catch (err) {
        console.error('Error fetching Surahs from DB:', err);
      }
    };

    loadSurahs();
  }, []);

  return surahList;
};
