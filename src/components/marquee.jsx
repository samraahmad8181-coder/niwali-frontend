import { useEffect, useState } from "react";

const messages = [
    "Boost Your Health with Powerful Supplements",
    "Energy, Immunity & Strength – Get it all with Niwali.",
    "100% Natural Ingredients for Better Health.",
    "Your Wellness, Our Mission.",
    " Order Today & Start Your Wellness Journey!",
];

const Marquee = () => {
    const [current, setCurrent] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrent((prev) => (prev + 1) % messages.length);
        }, 3000); // Change every 3 seconds

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="w-full bg-white  py-3 overflow-hidden">
            <p
                key={current}
                className="text-center text-green-600  text-sm md:text-base animate-fade"
            >
                {messages[current]}
            </p>
        </div>
    );
};

export default Marquee;