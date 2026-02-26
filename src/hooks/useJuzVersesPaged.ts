import { useState, useEffect, useCallback } from 'react';
import { fetchVersesByJuzPaged, fetchSurahById } from '../db/queries';

export type SurahGroup = {
  surahId: number;
  surahName: string;
  totalVerses: number;
  type: string;
  showBismillah: boolean;
  verses: any[];
};

export function useJuzVersesPaged(juzNumber: number) {
  const [surahGroups, setSurahGroups] = useState<SurahGroup[]>([]);
  const [offset, setOffset] = useState(0);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const PAGE_SIZE = 50; // Fetch 50 ayahs at a time to group them effectively

  const loadMore = useCallback(async () => {
    if (loading || !hasMore) return;

    setLoading(true);
    try {
      const rows = await fetchVersesByJuzPaged(juzNumber, PAGE_SIZE, offset);

      if (!rows || rows.length < PAGE_SIZE) setHasMore(false);

      if (rows && rows.length > 0) {
        const newGroups: SurahGroup[] = [];

        for (const verse of rows) {
          let group = newGroups.find(g => g.surahId === verse.surah_id);

          // If not in the new batch, check if it was in the previous state's last group
          if (!group) {
            const meta = await fetchSurahById(verse.surah_id);
            group = {
              surahId: verse.surah_id,
              surahName: meta?.name_arabic || '',
              totalVerses: meta?.total_verse || 0,
              type: meta?.type || 'Meccan',
              showBismillah: verse.surah_id !== 9 && verse.ayah_no === 1,
              verses: []
            };
            newGroups.push(group);
          }
          group.verses.push(verse);
        }

        setSurahGroups(prev => {
          const combined = [...prev];
          newGroups.forEach(newG => {
            const existingIdx = combined.findIndex(g => g.surahId === newG.surahId);
            if (existingIdx > -1) {
              // Append verses to existing surah group in the list
              combined[existingIdx].verses = [...combined[existingIdx].verses, ...newG.verses];
            } else {
              combined.push(newG);
            }
          });
          return combined;
        });

        setOffset(prev => prev + PAGE_SIZE);
      }
    } catch (err) {
      console.error("Juz Page Error:", err);
    } finally {
      setLoading(false);
    }
  }, [juzNumber, offset, loading, hasMore]);

  useEffect(() => {
    loadMore();
  }, [juzNumber]);

  return { surahGroups, loading, loadMore, hasMore };
}
