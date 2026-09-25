import React from "react";
import products from "../data/products";

export default function Products() {

    return (
        <section className="w-full bg-white px-4 py-12 sm:px-6 sm:py-16 lg:px-10 lg:py-20">
            <div className="mx-auto max-w-7xl">

                {/* Heading */}
                <div className="mb-10 text-left sm:mb-12">
                    <h1 className="mt-2 text-xl font-semibold tracking-tight text-gray-900 sm:text-3xl lg:text-4xl">
                        You may also like
                    </h1>
                </div>

                {/* Product Grid - Sliced to 4 Items */}
                <div className="grid grid-cols-1 gap-x-5 gap-y-10 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-3 lg:gap-x-7 xl:grid-cols-4">
                    {products.slice(0, 4).map((product) => (
                        <a
    key={product.id}
    href={`/product/${product.id}`}
    className="group block cursor-pointer"
>
                            {/* Image Container with Hover Swap */}
                            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl bg-gray-100">

                                {/* Sale Badge */}
                                {product.sale && (
                                    <span className="absolute left-4 top-4 z-20 rounded-full bg-white px-3 py-1 text-xs font-semibold text-gray-900 shadow-sm">
                                        Sale
                                    </span>
                                )}

                                {/* Main Image */}
                                <img
                                    src={product.images?.[0]}
                                    alt={product.title}
                                    className="h-full w-full object-cover transition-all duration-500 group-hover:scale-105 group-hover:opacity-0"
                                />

                                {/* Secondary Image on Hover */}
                                <img
                                    src={product.images?.[1] || product.images?.[0]}
                                    alt={`${product.title} hover`}
                                    className="absolute inset-0 h-full w-full object-cover opacity-0 transition-all duration-500 group-hover:scale-105 group-hover:opacity-100"
                                />
                            </div>

                            {/* Product Details */}
                            <div className="px-1 pt-4">
                                <p className="line-clamp-2 text-sm leading-6 text-gray-600">
                                    {product.description}
                                </p>

                                <div className="mt-3 flex items-center gap-2">
                                    {product.sale && (
                                        <span className="text-sm text-gray-400 line-through">
                                            ${Number(product.originalPrice).toFixed(2)}
                                        </span>
                                    )}

                                    <span className="text-base font-semibold text-gray-900">
                                        ${Number(product.price).toFixed(2)}
                                    </span>
                                </div>
                            </div>
                        </a>
                    ))}
                </div>
            </div>
        </section>
    );
}