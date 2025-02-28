import { doc, setDoc } from "firebase/firestore";
import db from "@/lib/firebase";
import { DocumentData } from "firebase/firestore";

export async function setDocument<T extends DocumentData>(collectionName: string, docId: string, data: T): Promise<boolean> {
  try {
    await setDoc(doc(db, collectionName, docId), data);
    return true;
  } catch (error) {
    console.error(`寫入 Firestore 文件 (${collectionName}/${docId}) 時出錯:`, error);
    return false;
  }
}
