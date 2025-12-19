"use client"

import React, { Suspense } from "react"
import { useSearchParams } from "next/navigation"
import { CheckCircle, XCircle, Calendar, MapPin, User, CreditCard } from "lucide-react"

function VerifyPassContent() {
  const searchParams = useSearchParams()
  
  const paymentId = searchParams.get('id')
  const name = searchParams.get('name')
  const branch = searchParams.get('branch')
  const date = searchParams.get('date')
  const status = searchParams.get('status') || 'invalid'

  const isValid = status === 'valid' && paymentId;

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden shadow-2xl">
        
        {/* Header Status */}
        <div className={`p-6 text-center ${isValid ? 'bg-green-500/10 border-b border-green-500/20' : 'bg-red-500/10 border-b border-red-500/20'}`}>
          <div className="flex justify-center mb-4">
            {isValid ? (
              <CheckCircle className="w-16 h-16 text-green-500" />
            ) : (
              <XCircle className="w-16 h-16 text-red-500" />
            )}
          </div>
          <h1 className={`text-2xl font-bold ${isValid ? 'text-green-500' : 'text-red-500'}`}>
            {isValid ? "VALID PASS" : "INVALID PASS"}
          </h1>
          <p className="text-zinc-400 text-sm mt-1">
            {isValid ? "Authorized Entry" : "Entry Denied"}
          </p>
        </div>

        {/* Details */}
        <div className="p-6 space-y-6">
           
           {/* User */}
           <div className="flex items-start space-x-4">
             <div className="bg-zinc-800 p-2 rounded-full">
                <User className="w-5 h-5 text-yellow-400" />
             </div>
             <div>
                <p className="text-xs text-zinc-500 uppercase tracking-wider font-semibold">Member Name</p>
                <p className="text-lg font-medium text-white">{name || "Unknown"}</p>
             </div>
           </div>

           {/* Branch */}
           <div className="flex items-start space-x-4">
             <div className="bg-zinc-800 p-2 rounded-full">
                <MapPin className="w-5 h-5 text-yellow-400" />
             </div>
             <div>
                <p className="text-xs text-zinc-500 uppercase tracking-wider font-semibold">Location</p>
                <p className="text-white">{branch || "Unknown"}</p>
             </div>
           </div>

           {/* Date */}
           <div className="flex items-start space-x-4">
             <div className="bg-zinc-800 p-2 rounded-full">
                <Calendar className="w-5 h-5 text-yellow-400" />
             </div>
             <div>
                <p className="text-xs text-zinc-500 uppercase tracking-wider font-semibold">Valid Date</p>
                <p className="text-white">{date || "N/A"}</p>
             </div>
           </div>

           {/* Payment ID */}
           <div className="flex items-start space-x-4">
             <div className="bg-zinc-800 p-2 rounded-full">
                <CreditCard className="w-5 h-5 text-yellow-400" />
             </div>
             <div>
                <p className="text-xs text-zinc-500 uppercase tracking-wider font-semibold">Payment ID</p>
                <p className="text-zinc-300 font-mono text-sm">{paymentId || "N/A"}</p>
             </div>
           </div>

        </div>

        {/* Footer */}
        <div className="bg-zinc-950 p-4 text-center border-t border-zinc-800">
            <p className="text-xs text-zinc-500">SJ Fitness Staff Verification System</p>
        </div>

      </div>
    </div>
  )
}

export default function VerifyPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-black flex items-center justify-center text-white">Loading...</div>}>
      <VerifyPassContent />
    </Suspense>
  )
}