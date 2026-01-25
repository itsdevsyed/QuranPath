// import * as SQLite from "expo-sqlite";
// import * as FileSystem from "expo-file-system";
// import { Asset } from "expo-asset";

// const DB_NAME = "offlinedb.db";

// export async function openDatabase() {
//   if (!FileSystem.documentDirectory) {
//     throw new Error("❌ Expo FileSystem.documentDirectory is undefined. Run on device or dev build, not Expo Go Web.");
//   }

//   const dbDir = `${FileSystem.documentDirectory}SQLite`;
//   const dbPath = `${dbDir}/${offlinedb.db}`;

//   // ✅ Ensure directory exists
//   const dirInfo = await FileSystem.getInfoAsync(dbDir);
//   if (!dirInfo.exists) {
//     await FileSystem.makeDirectoryAsync(dbDir, { intermediates: true });
//   }

//   // ✅ Check if DB already exists
//   const dbFile = await FileSystem.getInfoAsync(dbPath);
//   if (!dbFile.exists) {
//     const asset = Asset.fromModule(require("../../assets/quran.db"));
//     await asset.downloadAsync();

//     if (!asset.localUri) throw new Error("Failed to load database asset.");

//     // ✅ Use correct API for SDK 52+
//     if ("copyFileAsync" in FileSystem) {
//       // @ts-ignore for SDK backward compat
//       await FileSystem.copyFileAsync(asset.localUri, dbPath);
//     } else {
//       // @ts-ignore backward compat
//       await FileSystem.copyAsync({ from: asset.localUri, to: dbPath });
//     }
//   }

//   return SQLite.openDatabaseSync(DB_NAME);
// }
