import React from "react";

export default function Why() {
    return (
        <section className="w-full px-4 py-14 sm:px-8 lg:px-16">
            <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2">

                {/* Left Content */}
                <div>
                    <h2 className="mb-6 text-xl tracking-tight text-gray-900 lg:text-4xl">
                        Why Choose Us?
                    </h2>

                    <p className="leading-8 text-gray-600">
                        At Velnora, we believe that wellness begins with quality and
                        trust. Our carefully selected supplements are made using
                        premium ingredients, backed by science, and designed to
                        support your everyday health goals. Whether you're looking to
                        boost your energy, strengthen your immunity, improve your
                        fitness, or simply maintain a healthier lifestyle, our
                        products are created to help you feel your best every day.
                    </p>
                </div>

                {/* Right Image */}
                <div className="flex justify-center">
                    <img
                        src="https://niwali.com/cdn/shop/files/ChooseUs-dce7b4d1.webp?v=1732201817&width=750"
                        alt="Healthy lifestyle"
                        className="w-full max-w-lg rounded-2xl object-cover shadow-lg border-2 border-gray-200"
                    />
                </div>

            </div>
        </section>
    );
}