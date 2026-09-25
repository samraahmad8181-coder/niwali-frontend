import React from "react";
import { Check, ArrowRight } from "lucide-react";

export default function Hero() {
    const badges = [
        "Made in USA",
        "GMP Certified Manufacturing",
        "Third-Party Tested for Purity",
        "Delivered in 3–5 Days",
    ];

    return (
        <section className="w-full font-sans">
            <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[420px] lg:min-h-[460px]">
                {/* Image */}
                <div className="order-1 lg:order-2 h-[190px] sm:h-[240px] lg:h-auto">
                    <img
                        src="https://niwali.com/cdn/shop/files/WhatsApp_Image_2025-12-20_at_7.18.58_PM.jpg?v=1766240402&width=2000"
                        alt="Premium supplement bottle"
                        className="w-full h-full object-cover"
                        loading="eager"
                    />
                </div>

                {/* Content */}
                <div className="order-2 lg:order-1 relative flex items-center overflow-hidden bg-gradient-to-br from-green-900 via-green-700 to-green-500">
                    <div className="absolute inset-0 bg-black/15" />
                    <div className="absolute inset-0 opacity-[0.06] bg-[radial-gradient(circle,white_1px,transparent_1px)] [background-size:20px_20px]" />

                    <div className="relative z-10 w-full max-w-xl mx-auto px-6 py-8 sm:px-10 sm:py-10 lg:px-16 lg:py-0 text-white">
                        <h1 className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-[2.75rem] leading-[1.15] tracking-tight">
                            Premium supplements,
                            <br className="hidden sm:block" /> proven quality
                        </h1>

                        <p className="mt-3 text-white/75 text-sm sm:text-base max-w-md">
                            Formulated with rigorously sourced ingredients and backed by
                            independent lab testing.
                        </p>

                        <ul className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                            {badges.map((badge) => (
                                <li
                                    key={badge}
                                    className="flex items-center gap-2.5 rounded-lg border border-white/15 bg-white/[0.06] px-3.5 py-2.5 text-sm backdrop-blur-sm"
                                >
                                    <Check className="h-4 w-4 shrink-0 text-[#D4B45A]" />
                                    <span>{badge}</span>
                                </li>
                            ))}
                        </ul>

                        <button className="mt-6 inline-flex items-center gap-2 rounded-lg bg-green-800 px-6 py-3 text-sm sm:text-base font-semibold text-white transition hover:bg-[#F3EEDD]">
                            Shop now
                            <ArrowRight className="h-4 w-4" />
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}