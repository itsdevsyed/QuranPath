import { useEffect, useState } from 'react';
import { getVersesByJuz, fetchSurahById } from '../db/queries';

export type Verse = {
  id: number;
  surah_id: number;
  ayah_no: number;
  text: string;
};

export type SurahGroup = {
  surahName: string;
  totalVerses: number;
  type: "Meccan" | "Medinan";
  showBismillah: boolean;
  surahId: number;
  verses: Verse[];
};

export function useJuzVerses(juzNumber: number) {
  const [data, setData] = useState<SurahGroup[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const rows: Verse[] = await getVersesByJuz(juzNumber);

        const grouped: Record<number, Verse[]> = {};

        // Group verses by surah_id
        rows.forEach((verse) => {
          if (!grouped[verse.surah_id]) {
            grouped[verse.surah_id] = [];
          }
          grouped[verse.surah_id].push(verse);
        });

        const result: SurahGroup[] = [];

        for (const surahIdStr of Object.keys(grouped)) {
          const surahId = Number(surahIdStr);

          const meta = await fetchSurahById(surahId);

          result.push({
            surahId,
            surahName: meta.name_arabic,
            totalVerses: meta.total_verse,
            type: meta.type === "Meccan" ? "Meccan" : "Medinan",
            showBismillah: surahId !== 9,
            verses: grouped[surahId],
          });
        }

        setData(result);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [juzNumber]);

  return { data, loading };
}
