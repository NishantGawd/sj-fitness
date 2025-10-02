import { type NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { 
    upsertUser, 
    createPayment, 
    createOrUpdateMembership,
    Payment 
} from "@/lib/db"; // Make sure the path to your db.ts is correct

const RZP_KEY_SECRET = process.env.RAZORPAY_KEY_SECRET;

// Helper to calculate membership end date
function getEndsAt(planId: "1m" | "3m" | "6m" | "12m"): Date {
    const endsAt = new Date();
    const months = parseInt(planId.replace('m', ''));
    endsAt.setMonth(endsAt.getMonth() + months);
    return endsAt;
}

export async function POST(req: NextRequest) {
    if (!RZP_KEY_SECRET) {
        return NextResponse.json({ error: "Missing Razorpay secret" }, { status: 500 });
    }
    
    try {
        const { type, payload } = await req.json();
        const {
            razorpay_order_id,
            razorpay_subscription_id,
            razorpay_payment_id,
            razorpay_signature,
            name,
            email,
            phone,
            planName,
            planId,
            amount,
            notes
        } = payload || {};

        let body = "";
        let signature = razorpay_signature;

        if (type === "order") {
            body = `${razorpay_order_id}|${razorpay_payment_id}`;
        } else if (type === "subscription") {
            body = `${razorpay_payment_id}|${razorpay_subscription_id}`;
        } else {
            return NextResponse.json({ error: "Invalid type" }, { status: 400 });
        }

        const expected = crypto.createHmac("sha256", RZP_KEY_SECRET).update(body).digest("hex");
        const valid = expected === signature;

        if (valid) {
            // --- THIS IS THE NEW LOGIC ---
            // 1. Create or update the user first, for ALL payment types.
            await upsertUser({ name, email, phone });

            // 2. Create a payment record for ALL payment types.
            const paymentRecord: Payment = {
                provider: 'razorpay',
                providerRef: razorpay_payment_id,
                amount: amount * 100, // Convert rupees to paise
                currency: 'INR',
                status: 'paid',
                user: { email, name, phone },
                notes: notes,
            };
            const paymentId = await createPayment(paymentRecord);

            // 3. If it's a subscription, create a membership record.
            if (type === "subscription" || type === "order") { // Also creating a membership for one-time
                await createOrUpdateMembership({
                    userEmail: email,
                    plan: planName,
                    status: "active",
                    startedAt: new Date(),
                    endsAt: getEndsAt(planId),
                    paymentId: paymentId,
                    provider: "razorpay",
                });
            }
        }

        return NextResponse.json({ valid });
    } catch (e: any) {
        return NextResponse.json({ error: e.message || "Verification error" }, { status: 400 });
    }
}