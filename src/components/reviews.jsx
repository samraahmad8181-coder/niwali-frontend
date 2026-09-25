import React, { useState } from "react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";

export default function Reviews() {
    const reviews = [
        {
            name: "Sarah Johnson",
            time: "1 year ago",
            review:
                "I've been using these supplements for months and I'm genuinely impressed. The quality is excellent, shipping was fast, and I feel much more energetic throughout the day.",
        },
        {
            name: "Michael Brown",
            time: "8 months ago",
            review:
                "Amazing products! The packaging is premium, and customer service was very helpful. I highly recommend this brand to anyone looking for quality supplements.",
        },
        {
            name: "Emily Wilson",
            time: "4 months ago",
            review:
                "Great experience from ordering to delivery. I've noticed positive results after just a few weeks. Definitely purchasing again.",
        },
        {
            name: "David Smith",
            time: "2 months ago",
            review:
                "Very satisfied with my purchase. The products arrived quickly and exceeded my expectations. Will definitely recommend to friends and family.",
        },
    ];

    const [current, setCurrent] = useState(0);

    const nextReview = () => {
        setCurrent((prev) => (prev + 1) % reviews.length);
    };

    const prevReview = () => {
        setCurrent((prev) =>
            prev === 0 ? reviews.length - 1 : prev - 1
        );
    };

    const review = reviews[current];

    return (
        <section className="w-full px-4 py-14 sm:px-8 lg:px-16">
            <div className="mx-auto max-w-4xl">

                <h2 className="mb-10 text-center text-2xl  text-gray-900">

                    Customer Reviews About Our Products

                </h2>

                <div className="flex items-center justify-center gap-4">

                    <button
                        onClick={prevReview}
                        className="rounded-full border border-gray-300 p-3 transition hover:bg-green-600 hover:text-white"
                    >
                        <ChevronLeft size={22} />
                    </button>

                    <div className="flex-1 rounded-3xl border border-gray-200 bg-gray-100 p-8 shadow-md">

                        <div className="mb-4 flex">
                            {[...Array(5)].map((_, i) => (
                                <Star
                                    key={i}
                                    size={20}
                                    className="fill-yellow-400 text-yellow-400"
                                />
                            ))}
                        </div>

                        <p className="mb-6 text-sm font-medium text-gray-500">
                            {review.time}
                        </p>

                        <p className="text-lg leading-8 text-gray-700">
                            "{review.review}"
                        </p>

                        <div className="mt-8 flex items-center gap-4">
                            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-600 text-lg font-semibold text-white">
                                {review.name.charAt(0)}
                            </div>

                            <div>
                                <h4 className="font-semibold text-gray-900">
                                    {review.name}
                                </h4>
                                <p className="text-sm text-gray-500">
                                    Verified Customer
                                </p>
                            </div>
                        </div>

                    </div>

                    <button
                        onClick={nextReview}
                        className="rounded-full border border-gray-300 p-3 transition hover:bg-green-600 hover:text-white"
                    >
                        <ChevronRight size={22} />
                    </button>

                </div>

                {/* Dots */}


            </div>
        </section>
    );
}