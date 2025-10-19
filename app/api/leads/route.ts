import { neon } from '@neondatabase/serverless';
import { NextResponse } from 'next/server';

const sql = neon(process.env.DATABASE_URL!);

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, phone, branch, date, time } = body;

    // Validate the final data
    if (!name || !email || !phone || !branch) {
      return NextResponse.json({ message: "Missing required fields for final submission" }, { status: 400 });
    }

    // Insert the confirmed lead into the permanent 'trials' table
    await sql`
      INSERT INTO trials (name, email, phone, branch, date, time) 
      VALUES (${name}, ${email}, ${phone}, ${branch}, ${date}, ${time});
    `;

    return NextResponse.json({ message: "Trial booked successfully!" }, { status: 201 });

  } catch (error) {
    console.error("Error in /api/leads:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
