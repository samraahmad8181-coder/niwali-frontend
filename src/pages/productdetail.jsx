import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useCart } from "../context/cartContext";
// import LikeProducts from "../components/likeProducts";
import AddToCart from "./addToCart";

const PLACEHOLDER_IMAGE = "https://placehold.co/400x500?text=No+Image";
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/api";

const getImageUrl = (imagePath) => {
    if (!imagePath) return "";
    if (imagePath.startsWith("http") || imagePath.startsWith("blob:") || imagePath.startsWith("data:")) {
        return imagePath;
    }
    const baseUrl = API_URL.replace(/\/api$/, "");
    return `${baseUrl}/${imagePath.replace(/^\//, "")}`;
};

export default function ProductDetailPage() {
    const { id } = useParams();

    const [product, setProduct] = useState(null);
    const [mainImage, setMainImage] = useState(PLACEHOLDER_IMAGE);
    const [thumbnails, setThumbnails] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [quantity, setQuantity] = useState(1);

    const [isCartOpen, setIsCartOpen] = useState(false);
    const { addToCart } = useCart();

    // 2. Scroll to the top of the page when the component mounts
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);


    useEffect(() => {
        let ignore = false;

        async function fetchProduct() {
            setLoading(true);
            setError(null);
            try {
                const res = await fetch(`${API_URL}/products/${id}`);
                if (!res.ok) throw new Error("Product not found");
                const data = await res.json();
                const productData = data.product || data;

                // Normalize ID properties for cart synchronization
                productData.id = productData.id || productData._id || id;

                const resolvedMainImage = productData.main_image
                    ? getImageUrl(productData.main_image)
                    : PLACEHOLDER_IMAGE;

                const thumbList = [];
                if (Array.isArray(productData.thumbnail_images)) {
                    productData.thumbnail_images.forEach((img) => {
                        const resolved = getImageUrl(img);
                        if (resolved && resolved !== resolvedMainImage && !thumbList.includes(resolved)) {
                            thumbList.push(resolved);
                        }
                    });
                }

                if (!ignore) {
                    setProduct(productData);
                    setMainImage(resolvedMainImage);
                    setThumbnails(thumbList);
                }
            } catch (err) {
                if (!ignore) setError(err.message);
            } finally {
                if (!ignore) setLoading(false);
            }
        }

        fetchProduct();
        return () => {
            ignore = true;
        };
    }, [id]);

    if (loading) {
        return (
            <div className="flex justify-center items-center py-20">
                <p className="text-gray-500 text-lg">Loading product...</p>
            </div>
        );
    }

    if (error || !product) {
        return (
            <div className="flex justify-center items-center py-20">
                <p className="text-red-600 text-lg">{error || "Product not found."}</p>
            </div>
        );
    }

    const title = product.name || product.title;

    const handleAddToCart = () => {
        // Ensure standard object payload keys match what cart context expects
        const payload = {
            ...product,
            id: product.id || product._id,
            price: Number(product.price || 0),
            title: title,
            main_image: mainImage,
        };
        addToCart(payload, quantity);
        setIsCartOpen(true);
    };

    if (isCartOpen) {
        return (
            <div className="relative">
                {/* <div className="max-w-6xl mx-auto px-4 py-4">
                    <button
                        type="button"
                        onClick={() => setIsCartOpen(false)}
                        className="text-sm font-medium text-green-700 hover:underline mb-4 inline-block"
                    >
                        ← Back to product
                    </button>
                </div> */}
                <AddToCart />
            </div>
        );
    }

    return (
        <section className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8 lg:py-16">
            <div className="flex flex-wrap gap-10 lg:flex-nowrap lg:gap-16">
                <div className="w-full">
                    <div className="flex h-[380px] w-full items-center justify-center sm:h-[420px] lg:h-[500px]">
                        <img
                            src={mainImage}
                            alt={title}
                            className="max-h-full max-w-full h-auto w-auto object-contain rounded-2xl overflow-hidden"
                        />
                    </div>

                    {thumbnails.length > 0 && (
                        <div className="mt-6 grid grid-cols-2 gap-4">
                            {thumbnails.map((img, index) => (
                                <button
                                    key={index}
                                    type="button"
                                    onClick={() => setMainImage(img)}
                                    className="group aspect-square overflow-hidden rounded-xl border bg-gray-50 transition focus:outline-none"
                                >
                                    <img
                                        src={img}
                                        alt={`${title}-thumb-${index}`}
                                        className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                                    />
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                <div className="min-w-[280px] flex-1 lg:ml-auto lg:max-w-md lg:sticky lg:top-24 lg:self-start">
                    <p className="text-sm font-medium tracking-wide text-gray-500">Niwali</p>
                    <h1 className="mt-2 text-2xl font-semibold tracking-tight text-gray-900 sm:text-3xl">{title}</h1>

                    <div className="mt-4 flex flex-wrap items-center gap-3">
                        <span className="text-2xl font-semibold text-gray-900">
                            ${Number(product.price || 0).toFixed(2)}
                        </span>
                    </div>



                    <div className="mt-8">
                        <span className="mb-3 block text-sm font-medium text-gray-800">Quantity</span>
                        <div className="inline-flex items-center overflow-hidden rounded-lg border border-gray-300">
                            <button
                                type="button"
                                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                                className="flex h-11 w-11 items-center justify-center text-lg text-gray-600 transition hover:bg-gray-100"
                            >
                                −
                            </button>
                            <span className="flex h-11 w-12 items-center justify-center border-x border-gray-300 text-sm font-medium text-gray-900">
                                {quantity}
                            </span>
                            <button
                                type="button"
                                onClick={() => setQuantity((q) => q + 1)}
                                className="flex h-11 w-11 items-center justify-center text-lg text-gray-600 transition hover:bg-gray-100"
                            >
                                +
                            </button>
                        </div>
                    </div>

                    <div className="mt-8 flex flex-col gap-3">
                        <button
                            type="button"
                            onClick={handleAddToCart}
                            className="w-full rounded-lg bg-green-600 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-green-700 shadow-sm"
                        >
                            Add to cart
                        </button>
                        <button
                            type="button"
                            onClick={handleAddToCart}
                            className="w-full rounded-lg bg-green-600 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-green-700 shadow-sm"
                        >
                            Buy Now
                        </button>
                    </div>
                    <div className="my-6 border-t border-gray-200" />
                    <p className="text-sm leading-7 text-gray-600">{product.description}</p>
                </div>
            </div>
            {/* <LikeProducts /> */}
        </section>
    );
}