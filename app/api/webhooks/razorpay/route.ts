// File: app/api/webhooks/razorpay/route.ts

import { type NextRequest, NextResponse } from "next/server";
import crypto from "crypto"; // Import the built-in crypto library
import { 
    upsertUser, 
    createPayment, 
    createOrUpdateMembership, 
    Payment, 
    Membership 
} from "@/lib/db"; // Make sure the path to db.ts is correct

export async function POST(req: NextRequest) {
    // Step 1: Read the raw request body as text
    const body = await req.text();
    
    // Step 2: Get the signature from the request headers
    const signature = req.headers.get("x-razorpay-signature");

    // Step 3: Get your webhook secret from environment variables
    const secret = process.env.RAZORPAY_WEBHOOK_SECRET;

    if (!secret || !signature) {
        return NextResponse.json({ error: "Missing secret or signature" }, { status: 400 });
    }

    try {
        // Step 4: Verify the signature
        const hmac = crypto.createHmac("sha256", secret);
        hmac.update(body);
        const generatedSignature = hmac.digest("hex");

        if (generatedSignature !== signature) {
            // If signatures do not match, the request is not authentic
            return NextResponse.json({ error: "Unauthorized: Invalid signature" }, { status: 401 });
        }

        // If signatures match, proceed with the logic
        const event = JSON.parse(body);

        if (event.event === 'order.paid') {
            const order = event.payload.order.entity;
            const payment = event.payload.payment.entity;
            
            const userEmail = order.notes.email;
            const userName = order.notes.name;
            const userPhone = payment.contact;
            const planName = order.notes.plan;

            if (!userEmail || !planName) {
                return NextResponse.json({ error: "Email or plan missing in order notes" }, { status: 400 });
            }

            // 1. Create or update the user in your database
            await upsertUser({ name: userName, email: userEmail, phone: userPhone });

            // 2. Create a record of the payment
            const paymentRecord: Payment = {
                provider: 'razorpay',
                providerRef: payment.id,
                amount: payment.amount,
                currency: payment.currency,
                status: 'paid',
                user: { email: userEmail, name: userName, phone: userPhone },
                notes: order.notes
            };
            const paymentId = await createPayment(paymentRecord);

            // 3. Create or update the membership for the user
            const membershipRecord: Omit<Membership, "_id"> = {
                userEmail: userEmail,
                plan: planName,
                status: 'active',
                startedAt: new Date(),
                endsAt: new Date(new Date().setDate(new Date().getDate() + 30)), 
                paymentId: paymentId,
                provider: 'razorpay'
            };
            await createOrUpdateMembership(membershipRecord);
        }

        return NextResponse.json({ received: true });

    } catch (e: any) {
        return NextResponse.json({ error: e.message ?? "Error processing webhook" }, { status: 500 });
    }
}