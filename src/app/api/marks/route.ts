import { NextResponse } from "next/server";
import { collection, getDocs } from "firebase/firestore";
import db from "@/lib/firebase";

export async function GET() {
  try {
    const marksRef = collection(db, "marks");
    const snapshot = await getDocs(marksRef);
    const marks = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return NextResponse.json(marks);
  } catch (error) {
    console.error("Error fetching marks:", error);
    return NextResponse.json({ error: "Failed to fetch marks" }, { status: 500 });
  }
}
