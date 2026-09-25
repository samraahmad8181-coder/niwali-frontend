import React from 'react';
import { FaFacebookF, FaInstagram, FaWhatsapp, FaCommentDots } from 'react-icons/fa';

const Footer = () => {
    return (
        <footer className="relative bg-white text-gray-600 font-sans border-t border-gray-100 pt-12 pb-6 px-4 md:px-12 lg:px-20">
            {/* Main Grid Content */}
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">

                {/* Column 1: Logo & About */}
                <div className="space-y-4">
                    <div className="flex items-center space-x-2">
                        {/* Logo Icon */}
                        <div className="flex items-center">
                            <img
                                src="https://niwali.com/cdn/shop/files/Logo-52d55b9c.png?v=1732260211&width=1100"
                                alt="Niwali Logo"
                                className="h-12 w-auto"
                            />
                        </div>
                    </div>

                    <p className="text-gray-500 text-base leading-relaxed pr-2">
                        Niwali is a fully online store providing supplements of the best quality to customers assuring enhancement of health in no time.
                    </p>

                    {/* Social Icons */}
                    <div className="flex space-x-3 pt-2">
                        <a
                            href="#"
                            aria-label="Facebook"
                            className="w-8 h-8 rounded-full border border-gray-800 flex items-center justify-center text-gray-800 hover:bg-gray-800 hover:text-white transition-colors"
                        >
                            <FaFacebookF className="w-4 h-4" />
                        </a>
                        <a
                            href="#"
                            aria-label="Instagram"
                            className="w-8 h-8 rounded-full border border-gray-800 flex items-center justify-center text-gray-800 hover:bg-gray-800 hover:text-white transition-colors"
                        >
                            <FaInstagram className="w-4 h-4" />
                        </a>
                    </div>
                </div>

                {/* Column 2: Quick links */}
                <div className="md:pl-8">
                    <h3 className="text-black font-bold text-lg mb-6">Quick links</h3>
                    <ul className="space-y-4 text-gray-600">
                        <li>
                            <a href="#" className="hover:text-black transition-colors">Blogs</a>
                        </li>
                        <li>
                            <a href="#" className="hover:text-black transition-colors">Contact Us</a>
                        </li>
                        <li>
                            <a href="#" className="hover:text-black transition-colors">Privacy Policy</a>
                        </li>
                        <li>
                            <a href="#" className="hover:text-black transition-colors">Refund and Returns Policy</a>
                        </li>
                    </ul>
                </div>

                {/* Column 3: Contact Information */}
                <div>
                    <h3 className="text-black font-bold text-lg mb-6">Contact Information</h3>
                    <div className="space-y-5 text-gray-700">
                        <p>
                            <span className="font-bold text-black">Address:</span>{' '}
                            <a href="#" className="underline hover:text-black">
                                74-0 Grand Ave suite 4249 Queens NY 11373 USA.
                            </a>
                        </p>
                        <p>
                            <span className="font-bold text-black">Phone:</span>{' '}
                            <a href="tel:+18886805433" className="underline hover:text-black">
                                +1 (888) 680-5433
                            </a>
                        </p>
                        <p>
                            <span className="font-bold text-black">Mail:</span>{' '}
                            <a href="mailto:info@niwali.com" className="underline hover:text-black">
                                info@niwali.com
                            </a>
                        </p>
                    </div>
                </div>

            </div>

            {/* Divider */}
            <div className="border-t border-gray-100 my-6"></div>

            {/* Bottom Row: Payment Logos & Copyright */}
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 items-center gap-4 pt-2">

                {/* Copyright Text (Left Aligned on Desktop) */}
                <div className="text-sm text-gray-500 order-2 md:order-1 text-center md:text-left">
                    © 2026, Niwali Powered by The Web Concept
                </div>

                {/* Payment Methods Badges (Centered on Desktop) */}
                <div className="flex flex-wrap items-center justify-center gap-1.5 order-1 md:order-2">
                    {/* Amex */}
                    <div className="bg-[#006fcf] text-white px-2 py-1 rounded text-xs font-black tracking-tighter italic">
                        AM EX
                    </div>
                    {/* Apple Pay */}
                    <div className="bg-white border border-gray-300 px-2 py-1 rounded text-xs font-semibold text-black flex items-center gap-0.5">
                        Pay
                    </div>
                    {/* Diners Club / Discover */}
                    {/* <div className="bg-white border border-gray-300 px-2 py-1 rounded text-xs text-blue-600 font-bold">
                        <span className="text-blue-500">D</span>
                    </div> */}
                    {/* Discover */}
                    <div className="bg-white border border-gray-300 px-2 py-1 rounded text-[10px] font-bold text-gray-800 flex items-center">
                        DISCOVER <span className="w-1.5 h-1.5 bg-orange-500 rounded-full ml-0.5 inline-block"></span>
                    </div>
                    {/* GPay */}
                    <div className="bg-white border border-gray-300 px-2 py-1 rounded text-xs font-semibold text-gray-600">
                        <span className="text-blue-500 font-bold">G</span> Pay
                    </div>
                    {/* Mastercard */}
                    <div className="bg-black px-2 py-1 rounded flex items-center space-x-0.5">
                        <span className="w-2.5 h-2.5 bg-red-500 rounded-full inline-block"></span>
                        <span className="w-2.5 h-2.5 bg-yellow-500 rounded-full inline-block -ml-1"></span>
                    </div>
                    {/* Paypal */}
                    <div className="bg-white border border-gray-300 px-2 py-1 rounded text-xs font-bold text-blue-800 italic">
                        PayPal
                    </div>
                    {/* Shop Pay */}

                </div>

                {/* Empty Column to balance the 3-column layout on desktop */}
                <div className="hidden md:block md:order-3"></div>

            </div>



            {/* Floating Action Buttons (Fixed / Sticky Buttons as in original UI) */}
            <a
                href="https://api.whatsapp.com/send?phone=18886805433"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp Chat"
                className="fixed bottom-4 left-4 z-50 bg-[#25D366] text-white p-3 rounded-full shadow-lg hover:opacity-90 transition-opacity"
            >
                <FaWhatsapp className="w-7 h-7" />
            </a>

            <button
                aria-label="Live Chat"
                className="fixed bottom-4 right-4 z-50 bg-[#00B67A] text-white p-3 rounded-full shadow-lg hover:opacity-90 transition-opacity"
            >
                <FaCommentDots className="w-7 h-7" />
            </button>

        </footer>
    );
};

export default Footer;