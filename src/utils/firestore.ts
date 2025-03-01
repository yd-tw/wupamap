import { collection, doc, DocumentData, getDocs, setDoc } from "firebase/firestore";
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

export async function setDocument<T extends DocumentData>(
  collectionName: string,
  docId: string,
  data: T,
): Promise<boolean> {
  try {
    await setDoc(doc(db, collectionName, docId), data);
    return true;
  } catch (error) {
    console.error(
      `寫入 Firestore 文件 (${collectionName}/${docId}) 時出錯:`,
      error,
    );
    return false;
  }
}