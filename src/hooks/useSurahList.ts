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

        // Professional Urdu/Arabic spelling for Quran Apps
        const locationMapping: { [key: string]: string } = {
          'Meccan': 'مکیہ',
          'Medinan': 'مدنیہ',
          'meccan': 'مکیہ',
          'medinan': 'مدنیہ',
        };

        const mapped = rows.map((row: any) => {
          const rawLocation = row.type || '';
          const urduLocation = locationMapping[rawLocation] || rawLocation;

          return {
            number: row.id,
            arabic: row.name_arabic,
            english: row.name_latin || row.name_english,
            translation: row.name_english,
            verses: row.total_verse,
            location: urduLocation,
          };
        });

        setSurahList(mapped);
      } catch (err) {
        console.error('Error fetching Surahs:', err);
      }
    };

    loadSurahs();
  }, []);

  return surahList;
};
