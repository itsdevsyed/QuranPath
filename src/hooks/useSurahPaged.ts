import { useEffect, useState, useCallback } from 'react';
import { fetchSurahById, fetchVersesBySurahPaged } from '../db/queries';

export function useSurahPaged(surahId: number) {
  const [surah, setSurah] = useState<any>(null);
  const [verses, setVerses] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const PAGE_SIZE = 50;

  // Initial Load
  useEffect(() => {
    async function loadInitial() {
      if (!surahId) return;
      try {
        setLoading(true);
        const s = await fetchSurahById(surahId);
        const v = await fetchVersesBySurahPaged(surahId, PAGE_SIZE, 0);

        setSurah(s);
        setVerses(v || []);
        setOffset(PAGE_SIZE);
        if (!v || v.length < PAGE_SIZE) setHasMore(false);
      } catch (err) {
        console.error("Initial load error:", err);
      } finally {
        setLoading(false);
      }
    }
    loadInitial();
  }, [surahId]);

  // Load More Function
  const loadMore = useCallback(async () => {
    // Prevent multiple simultaneous calls
    if (loading || !hasMore) return;

    try {
      setLoading(true);
      const nextBatch = await fetchVersesBySurahPaged(surahId, PAGE_SIZE, offset);

      if (!nextBatch || nextBatch.length < PAGE_SIZE) {
        setHasMore(false);
      }

      if (nextBatch && nextBatch.length > 0) {
        setVerses(prev => {
          // PROTECTION: Filter out any ID that already exists in the list
          const existingIds = new Set(prev.map(v => v.id));
          const uniqueNewVerses = nextBatch.filter((v: { id: any; }) => !existingIds.has(v.id));
          return [...prev, ...uniqueNewVerses];
        });
        setOffset(prev => prev + PAGE_SIZE);
      }
    } catch (err) {
      console.error("Load more error:", err);
    } finally {
      setLoading(false);
    }
  }, [surahId, offset, loading, hasMore]);

  return { surah, verses, loading, loadMore, hasMore };
}
