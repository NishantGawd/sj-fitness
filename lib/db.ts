import type { ObjectId } from "mongodb"
import { getDb } from "./mongodb"

export type PaymentProvider = "razorpay" | "stripe"
export type PaymentStatus = "created" | "authorized" | "paid" | "failed" | "refunded"

export interface User {
    _id?: ObjectId
    name?: string
    email?: string
    phone?: string
    createdAt?: Date
}

export interface Payment {
    _id?: ObjectId
    provider: PaymentProvider
    providerRef: string // order_id, payment_id, or session/invoice id
    amount: number // in smallest unit (INR paise / Stripe smallest)
    currency: string
    status: PaymentStatus
    user?: { name?: string; email?: string; phone?: string }
    notes?: Record<string, any>
    createdAt?: Date
    updatedAt?: Date
}

export interface Membership {
    _id?: ObjectId
    userEmail?: string
    plan?: string
    status: "active" | "canceled" | "expired" | "trial"
    startedAt: Date
    endsAt?: Date
    paymentId?: ObjectId
    provider?: PaymentProvider
}

export interface TrialPass {
    _id?: ObjectId
    name?: string
    email?: string
    phone?: string
    issuedAt: Date
    expiresAt: Date
    used?: boolean
}

export async function ensureIndexes() {
    const db = await getDb()
    await db.collection<User>("users").createIndex({ email: 1 }, { unique: false })
    await db.collection<Payment>("payments").createIndex({ provider: 1, providerRef: 1 }, { unique: true })
    await db.collection<Membership>("memberships").createIndex({ userEmail: 1, status: 1 })
    await db.collection<TrialPass>("trials").createIndex({ email: 1, expiresAt: 1 })
}

export async function upsertUser(u: User) {
    const db = await getDb()
    if (!u.email && !u.phone) return null

    const filter: Partial<User> = {}
    if (u.email) filter.email = u.email
    if (u.phone) filter.phone = u.phone

    return db
        .collection<User>("users")
        .updateOne(
            filter,
            { $setOnInsert: { createdAt: new Date() }, $set: { name: u.name } },
            { upsert: true },
        )
}

export async function createPayment(p: Payment) {
    const db = await getDb()
    p.createdAt = new Date()
    p.updatedAt = new Date()
    const res = await db.collection<Payment>("payments").insertOne(p)
    return res.insertedId
}

export async function updatePaymentStatus(provider: PaymentProvider, providerRef: string, status: PaymentStatus) {
    const db = await getDb()
    await db
        .collection<Payment>("payments")
        .updateOne({ provider, providerRef }, { $set: { status, updatedAt: new Date() } })
}

export async function createOrUpdateMembership(input: Omit<Membership, "_id">) {
    const db = await getDb()
    const now = new Date()
    await db
        .collection<Membership>("memberships")
        .updateOne(
            { userEmail: input.userEmail, status: { $in: ["active", "trial"] } },
            { $set: { ...input, startedAt: input.startedAt ?? now } },
            { upsert: true },
        )
}

export async function issueTrialPass({ name, email, phone }: { name?: string; email?: string; phone?: string }) {
    const db = await getDb()
    const now = new Date()
    const expiresAt = new Date(now.getTime() + 24 * 60 * 60 * 1000)
    // limit: one active trial per email
    const existing = await db.collection<TrialPass>("trials").findOne({
        email,
        expiresAt: { $gte: now },
        used: { $ne: true },
    })
    if (existing) return existing
    const trial: TrialPass = { name, email, phone, issuedAt: now, expiresAt }
    const { insertedId } = await db.collection<TrialPass>("trials").insertOne(trial)
    return { ...trial, _id: insertedId }
}
