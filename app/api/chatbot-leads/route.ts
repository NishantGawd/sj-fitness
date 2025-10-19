import { neon } from '@neondatabase/serverless';
import { NextResponse } from 'next/server';

// This function establishes the database connection.
const sql = neon(process.env.DATABASE_URL!);

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, phone, branch, date, time } = body;

    // Validate that essential data is present
    if (!name || !email || !phone || !branch || !date || !time) {
      return NextResponse.json({ message: "Missing required fields" }, { status: 400 });
    }

    // Insert the data into your Neon PostgreSQL database
    // The `RETURNING id` clause is a PostgreSQL feature that gives us back the new row's ID.
    const response = await sql`
      INSERT INTO temporaryLeads (name, email, phone, branch, date, time) 
      VALUES (${name}, ${email}, ${phone}, ${branch}, ${date}, ${time})
      RETURNING id;
    `;

    // The ID from a serial primary key in PostgreSQL is a number.
    const leadId = response[0].id;

    // Send the unique ID back to the chatbot
    return NextResponse.json({ leadId }, { status: 201 });

  } catch (error) {
    console.error("Error in /api/chatbot-leads:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
