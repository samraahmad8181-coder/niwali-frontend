import React from "react";

const About = () => {
    return (
        <section className="bg-white">
            {/* Hero */}
            <div className="py-8">
                <div className="max-w-7xl mx-auto px-18">
                    <h1 className="text-3xl md:text-5xl ">
                        About Us
                    </h1>

                </div>
            </div>

            {/* About Content */}
            <div className="max-w-7xl mx-auto px-18 py-16 space-y-8">
                <h2 className="text-3xl font-bold text-gray-900">
                    Niwali is a reliable supplier of a wide range of health and
                    nutritional supplements.
                </h2>

                <p className="leading-5 text-sm">
                    We focus on producing supplements that deliver maximum health
                    benefits. Every product is made using authentic, all-natural organic
                    ingredients and manufactured in an{" "}
                    <span className="font-semibold">
                        FDA-registered and GMP-certified facility.
                    </span>{" "}
                    Our manufacturing facilities undergo regular inspections to ensure
                    every supplement meets strict quality standards.
                </p>

                <p className="leading-5 text-sm">
                    Each of our supplements is certified under GMP (Good Manufacturing
                    Practices), one of the highest quality standards in the supplement
                    industry. Whether you're looking for dietary supplements, weight
                    management, sexual wellness, healthy aging support, or daily nutrition
                    for men and women, Niwali offers trusted solutions.
                </p>

                <h2 className="text-3xl font-bold pt-6">
                    Niwali is For You
                </h2>

                <p className="leading-5 text-sm">
                    Niwali is designed for everyone who wants to live a healthier life.
                    Whether you're a fitness enthusiast, a busy professional, an athlete,
                    a middle-aged adult, or simply looking to improve your overall
                    wellness, our supplements are carefully formulated to help you reach
                    your health and fitness goals.
                </p>

                <p className="leading-5 text-sm">
                    As a fully online health store, Niwali makes premium-quality
                    supplements available with just a few clicks. We provide organic,
                    effective, and affordable supplements suitable for men and women of
                    all ages.
                </p>

                <p className="leading-5 text-sm">
                    Our products are developed for people living busy lifestyles who need
                    natural, herbal solutions without major side effects. From supporting
                    weight management and improving energy levels to maintaining hormonal
                    balance and healthy aging, our supplements help meet your daily
                    nutritional needs naturally.
                </p>

                <p className="leading-5 text-sm">
                    At Niwali, we believe growing older should never mean slowing down.
                    Our mission is to help you stay active, energetic, and confident every
                    day.
                </p>
            </div>

            {/* Why Choose Us */}
            <div className="py-20">
                <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
                    {/* Image */}
                    <div>
                        <img
                            src="https://niwali.com/cdn/shop/files/Untitled-design-3-768x768.webp?v=1732269544&width=1070"
                            alt="Niwali Supplements"
                            className="border-2 border-gray-200 rounded-3xl shadow-xl w-full object-cover"
                        />
                    </div>
                    {/* Content */}
                    <div>
                        <h2 className="text-3xl font-bold text-gray-900 mb-6">
                            Why Choose Our Supplements Over <br /> Any Other Supplement Brand?
                        </h2>

                        <p className="text-sm font-semibold mb-6">
                            We ensure Niwali remains one of the most trusted health supplement
                            <br /> brands.
                        </p>

                        <ul className="space-y-5">
                            <li className="flex gap-3">

                                <p className="text-sm font-semibold">
                                    Our products are genuine and are certified by GMP (Great <br /> Manufacturing Practices),
                                    which is the highest standard for <br />quality assurance in the supplement industry
                                </p>
                            </li>

                            <li className="flex gap-3">

                                <p className="text-sm font-semibold">
                                    We offer a range of supplements to help people get over many <br /> serious
                                    health issues, starting from weight gain to hormone deficiencies <br /> and
                                    chronic age-related symptoms

                                </p>
                            </li>

                            <li className="flex gap-3">

                                <p className="text-sm font-semibold">
                                    Each of our supplements is produced with natural ingredients
                                    that contain <br /> balanced nutrients, required for general enhancement of health
                                </p>
                            </li>

                            <li className="flex gap-3">

                                <p className="text-sm font-semibold">
                                    None of the dietary supplements required you to go for crash dieting but <br /> encourages
                                    you to adopt healthy eating habits and gives results in weeks
                                </p>
                            </li>

                            <li className="flex gap-3">

                                <p className="text-sm font-semibold">
                                    100% vegetarian, easy-to-consume supplements.
                                </p>
                            </li>

                            <li className="flex gap-3">

                                <p className="text-sm font-semibold mb-6">
                                    Premium quality at affordable prices for everyone.
                                </p>
                            </li>
                        </ul>
                    </div>


                </div>
            </div>

            {/* CTA */}
            <div className="py-20">
                <div className="max-w-6xl mx-auto text-center px-4">
                    <h2 className="text-2xl md:text-4xl lg:text-3xl font-bold leading-[1.3]">
                        <span className="whitespace-nowrap">
                            Get your desired pack of Niwali supplements ordered today from our one-stop
                        </span>
                        <br />
                        <span>store to experience the difference!</span>
                    </h2>
                </div>
            </div>
        </section>
    );
};

export default About;