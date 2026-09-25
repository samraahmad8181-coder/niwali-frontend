import React from 'react';

export default function ShippingPolicy() {
    return (
        <section className="min-h-screen bg-white py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
            <div className="max-w-3xl w-full space-y-8 text-black">

                {/* Main Title - Centered */}
                <header className="pb-6 text-center">
                    <h1 className="text-3xl sm:text-4xl font-semibold text-black tracking-wide">
                        Shipping Policy
                    </h1>
                </header>

                {/* Policy Sections - Left Aligned Headers & Paragraphs */}
                <div className="space-y-6 text-black text-left">

                    <div className="space-y-2">
                        <h1 className="text-lg sm:text-2xl font-bold text-gray-700 tracking-wide text-left">
                            Shipping Policy
                        </h1>
                        <p className="text-base sm:text-lg text-gray-700 leading-relaxed tracking-wide">
                            Thank you for shopping at <span className="font-semibold">Niwali</span>! We strive to ensure that your products arrive quickly and safely. Here’s everything you need to know about our shipping process:
                        </p>
                    </div>
                    {/* Section 1 */}
                    <div className="space-y-2">
                        <h2 className="text-xl sm:text-2xl font-bold text-gray-700 tracking-wide text-left">
                            Processing Time
                        </h2>
                        <p className="text-base sm:text-lg text-gray-700 leading-relaxed tracking-wide">
                            Orders are typically processed within 1–2 business days after the order is placed.
                        </p>
                    </div>

                    {/* Section 2 */}
                    <div className="space-y-2">
                        <h2 className="text-xl sm:text-2xl font-bold text-gray-700 tracking-wide text-left">
                            Delivery Time
                        </h2>
                        <p className="text-base sm:text-lg text-gray-700 leading-relaxed tracking-wide">
                            Once processed, your order will be shipped out and delivered within 3–5 business days. Please note that delivery times may vary depending on the destination and any unforeseen circumstances with the carrier.
                        </p>
                    </div>

                    {/* Section 3 */}
                    <div className="space-y-2">
                        <h2 className="text-xl sm:text-2xl font-bold text-gray-700 tracking-wide text-left">
                            Shipping Charges
                        </h2>
                        <p className="text-base sm:text-lg text-gray-700 leading-relaxed tracking-wide">
                            Shipping costs will be calculated at checkout based on your delivery address.
                        </p>
                    </div>

                    {/* Section 4 */}
                    <div className="space-y-2">
                        <h2 className="text-xl sm:text-2xl font-bold text-gray-700 tracking-wide text-left">
                            Order Tracking
                        </h2>
                        <p className="text-base sm:text-lg text-gray-700 leading-relaxed tracking-wide">
                            Once your order has shipped, you will receive a tracking number so you can follow your package’s journey.
                        </p>
                    </div>
                </div>

                {/* Footer / Support */}
                <footer className="pt-6 border-t border-gray-200 space-y-4 text-center">
                    <p className="text-base sm:text-lg text-gray-700 tracking-wide">
                        If you have any questions or concerns, please feel free to contact our customer support team.
                    </p>
                    <p className="text-lg sm:text-xl font-bold text-gray-800 tracking-wide">
                        Thank you for choosing Niwali! We appreciate your business.
                    </p>
                </footer>
            </div>
        </section>
    );
}