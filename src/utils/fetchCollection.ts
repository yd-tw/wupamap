import { collection, getDocs } from "firebase/firestore";
import db from "@/lib/firebase";

export async function fetchCollection<T>(collectionName: string): Promise<T[]> {
  try {
    const querySnapshot = await getDocs(collection(db, collectionName));
    const results: T[] = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as T[];

    return results;
  } catch (error) {
    console.error(`讀取 Firestore 集合 (${collectionName}) 時出錯:`, error);
    return [];
  }
}


