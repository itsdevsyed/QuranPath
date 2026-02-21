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
  type: string;
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
        setLoading(true);

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

          if (!meta) continue;

          result.push({
            surahId,
            surahName: meta.name_arabic,
            totalVerses: meta.total_verse,
            type: meta.type, // directly from DB
            showBismillah: surahId !== 9,
            verses: grouped[surahId],
          });
        }

        setData(result);
      } catch (err) {
        console.error('Error loading juz verses:', err);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [juzNumber]);

  return { data, loading };
}
