import { useEffect, useState } from 'react';
import { fetchAllJuz } from '../db/queries';

export type JuzListItemData = {
    number: number;
    arabic: string;
    verse_count: number;
};

export function useJuzList() {
    const [juzData, setJuzData] = useState<JuzListItemData[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function load() {
            try {
                const data = await fetchAllJuz();
                setJuzData(data);
            } catch (err) {
                console.error('Error loading Juz metadata:', err);
            } finally {
                setLoading(false);
            }
        }
        load();
    }, []);

    return { juzData, loading };
}
