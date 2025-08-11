import { SignUpForm } from '@/components/(auth)/signup-form'
import React from 'react'

const Page = () => {
    return (
        <div className="min-h-screen bg-black text-white">
            <div className="container mx-auto px-4 py-8">
                <div className="grid lg:grid-cols-2 gap-8 items-center">
                    {/* Left side - Marketing content */}
                    <div className="space-y-8">
                        <div className="space-y-4">
                            <h1 className="text-4xl font-bold">
                                QUICK<span className="text-purple-400">COURT</span>
                            </h1>
                            <p className="text-gray-300 text-lg">
                                Book sports facilities instantly. Find courts, fields, and venues near you.
                            </p>
                        </div>

                        <div className="space-y-6">
                            <div className="flex items-start gap-4">
                                <div className="w-2 h-2 bg-purple-400 rounded-full mt-2"></div>
                                <div>
                                    <h3 className="font-semibold mb-2">Easy Booking</h3>
                                    <p className="text-gray-400 text-sm">
                                        Book your favorite sports facilities with just a few clicks. Real-time availability and instant
                                        confirmation.
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="w-2 h-2 bg-orange-400 rounded-full mt-2"></div>
                                <div>
                                    <h3 className="font-semibold mb-2">Facility Management</h3>
                                    <p className="text-gray-400 text-sm">
                                        List and manage your sports facilities. Track bookings, manage schedules, and grow your business.
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="w-2 h-2 bg-blue-400 rounded-full mt-2"></div>
                                <div>
                                    <h3 className="font-semibold mb-2">Verified Reviews</h3>
                                    <p className="text-gray-400 text-sm">
                                        Read authentic reviews from verified users. Make informed decisions about where to play.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right side - Sign up forms */}
                    <div className="flex justify-center">
                        <SignUpForm />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Page