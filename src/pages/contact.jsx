import React from "react";

const Contact = () => {
    return (
        <section className="bg-gray-50 py-16">
            <div className="max-w-3xl mx-auto px-6">
                {/* Heading */}
                <div className="text-center mb-10">
                    <h1 className="text-4xl font-bold text-[#15803d]">Contact Us</h1>
                    <p className="mt-4 text-gray-600">
                        We'd love to hear from you. Fill out the form below and our team
                        will get back to you as soon as possible.
                    </p>
                </div>

                {/* Contact Form */}
                <div className="bg-white rounded-2xl shadow-lg p-8">
                    <form className="space-y-6">
                        {/* Name */}
                        <div>
                            <label className="block text-gray-700 font-medium mb-2">
                                Full Name
                            </label>
                            <input
                                type="text"
                                placeholder="Enter your name"
                                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#15803d]"
                            />
                        </div>

                        {/* Email */}
                        <div>
                            <label className="block text-gray-700 font-medium mb-2">
                                Email Address
                            </label>
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#15803d]"
                            />
                        </div>

                        {/* Phone */}
                        <div>
                            <label className="block text-gray-700 font-medium mb-2">
                                Phone Number
                            </label>
                            <input
                                type="tel"
                                placeholder="Enter your phone number"
                                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#15803d]"
                            />
                        </div>

                        {/* Comment */}
                        <div>
                            <label className="block text-gray-700 font-medium mb-2">
                                Comment
                            </label>
                            <textarea
                                rows="5"
                                placeholder="Write your message..."
                                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#15803d] resize-none"
                            ></textarea>
                        </div>

                        {/* Button */}
                        <button
                            type="submit"
                            className="w-full bg-[#15803d] hover:bg-green-700 text-white font-semibold py-3 rounded-lg transition duration-300"
                        >
                            Send Message
                        </button>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default Contact;