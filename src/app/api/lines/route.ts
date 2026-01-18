import { NextResponse } from "next/server";
import { collection, getDocs } from "firebase/firestore";
import db from "@/lib/firebase";

export async function GET() {
  try {
    const linesRef = collection(db, "lines");
    const snapshot = await getDocs(linesRef);
    const lines = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return NextResponse.json(lines);
  } catch (error) {
    console.error("Error fetching lines:", error);
    return NextResponse.json({ error: "Failed to fetch lines" }, { status: 500 });
  }
}
