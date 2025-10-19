import { neon } from '@neondatabase/serverless';
import { NextResponse } from 'next/server';

const sql = neon(process.env.DATABASE_URL!);

export async function GET(req: Request, { params }: { params: { leadId: string } }) {
  try {
    const { leadId } = params;
    const id = parseInt(leadId, 10); // Convert the ID from string to number for SQL

    // Ensure the ID is a valid number before querying
    if (isNaN(id)) {
      return NextResponse.json({ message: "Invalid lead ID format" }, { status: 400 });
    }

    // Select the temporary lead data from the database where the ID matches
    const leads = await sql`
      SELECT name, email, phone, branch, date, time 
      FROM temporaryLeads 
      WHERE id = ${id};
    `;

    // If no lead is found, return a 404 error
    if (leads.length === 0) {
      return NextResponse.json({ message: "Trial link not found or has expired" }, { status: 404 });
    }

    // Return the found lead data
    return NextResponse.json(leads[0], { status: 200 });

  } catch (error) {
    console.error("Error in /api/leads/[leadId]:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
