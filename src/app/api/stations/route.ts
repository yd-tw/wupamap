import { NextResponse } from "next/server";
import { collection, getDocs } from "firebase/firestore";
import db from "@/lib/firebase";

export async function GET() {
  try {
    const stationsRef = collection(db, "stations");
    const snapshot = await getDocs(stationsRef);
    const stations = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return NextResponse.json(stations);
  } catch (error) {
    console.error("Error fetching stations:", error);
    return NextResponse.json({ error: "Failed to fetch stations" }, { status: 500 });
  }
}
