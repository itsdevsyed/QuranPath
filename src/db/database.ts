import * as SQLite from "expo-sqlite";
import * as FileSystem from "expo-file-system";
import { Asset } from "expo-asset";

const DB_NAME = "offlinedb.db";

export async function openDatabase(): Promise<SQLite.SQLiteDatabase> {
  const documentDir = (FileSystem as any).documentDirectory as string;
  if (!documentDir) throw new Error("Expo FileSystem.documentDirectory is undefined.");

  const dbDir = `${documentDir}SQLite`;
  const dbPath = `${dbDir}/${DB_NAME}`;

  const dirInfo = await FileSystem.getInfoAsync(dbDir);
  if (!dirInfo.exists) {
    await FileSystem.makeDirectoryAsync(dbDir, { intermediates: true });
  }

  const dbFile = await FileSystem.getInfoAsync(dbPath);
  if (!dbFile.exists) {
    const asset = Asset.fromModule(require("../../assets/quran/quran.db"));
    await asset.downloadAsync();

    if (!asset.localUri) throw new Error("Failed to load DB asset URI.");

    await FileSystem.copyAsync({
      from: asset.localUri,
      to: dbPath,
    });
  }

  return SQLite.openDatabaseSync(DB_NAME);
}
