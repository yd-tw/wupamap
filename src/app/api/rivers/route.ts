import { NextResponse } from "next/server";
import { collection, getDocs } from "firebase/firestore";
import db from "@/lib/firebase";

export async function GET() {
  try {
    const riversRef = collection(db, "rivers");
    const snapshot = await getDocs(riversRef);
    const rivers = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return NextResponse.json(rivers);
  } catch (error) {
    console.error("Error fetching rivers:", error);
    return NextResponse.json({ error: "Failed to fetch rivers" }, { status: 500 });
  }
}
