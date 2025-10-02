// File: app/api/razorpay/verify/route.ts

import { type NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { updatePaymentStatus, createOrUpdateMembership } from "@/lib/db";

const RZP_KEY_SECRET = process.env.RAZORPAY_KEY_SECRET;

// Helper function to calculate the correct membership end date
function getEndsAt(planId: "1m" | "3m" | "6m" | "12m"): Date {
    const endsAt = new Date();
    switch (planId) {
        case "1m":
            endsAt.setMonth(endsAt.getMonth() + 1);
            break;
        case "3m":
            endsAt.setMonth(endsAt.getMonth() + 3);
            break;
        case "6m":
            endsAt.setMonth(endsAt.getMonth() + 6);
            break;
        case "12m":
            endsAt.setFullYear(endsAt.getFullYear() + 1);
            break;
    }
    return endsAt;
}

export async function POST(req: NextRequest) {
    if (!RZP_KEY_SECRET) return NextResponse.json({ error: "Missing Razorpay secret" }, { status: 500 });
    
    try {
        const { type, payload } = await req.json();
        let body = "";
        let signature = "";
        let ref = "";

        // --- FIX #1: CORRECTED SUBSCRIPTION SIGNATURE LOGIC ---
        if (type === "order") {
            const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = payload || {};
            body = `${razorpay_order_id}|${razorpay_payment_id}`;
            signature = razorpay_signature;
            ref = razorpay_order_id;
        } else if (type === "subscription") {
            const { razorpay_subscription_id, razorpay_payment_id, razorpay_signature } = payload || {};
            // The correct order is payment_id|subscription_id
            body = `${razorpay_payment_id}|${razorpay_subscription_id}`;
            signature = razorpay_signature;
            ref = razorpay_subscription_id;
        } else {
            return NextResponse.json({ error: "Invalid type" }, { status: 400 });
        }

        const expected = crypto.createHmac("sha256", RZP_KEY_SECRET).update(body).digest("hex");
        const valid = expected === signature;

        if (valid && ref) {
            try {
                // --- FIX #2: CORRECTLY CALCULATE MEMBERSHIP DURATION ---
                const { userEmail, planName, planId } = payload || {};

                await updatePaymentStatus("razorpay", ref, "paid");
                
                if (userEmail && planName && planId) {
                    const startedAt = new Date();
                    // Use the helper function to get the correct end date
                    const endsAt = getEndsAt(planId); 
                    
                    await createOrUpdateMembership({
                        userEmail,
                        plan: planName,
                        status: "active",
                        startedAt,
                        endsAt,
                        provider: "razorpay",
                    });
                }
            } catch (e) {
                console.log("[v0] Failed to update payment/membership:", (e as any)?.message);
            }
        }

        return NextResponse.json({ valid });
    } catch (e: any) {
        return NextResponse.json({ error: e.message || "Verification error" }, { status: 400 });
    }
}