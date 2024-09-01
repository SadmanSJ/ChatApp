import axios from "axios";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  const { data } = await axios.post("");
}

export async function GET(request: NextRequest) {
  const { data } = await axios.get("");
}
