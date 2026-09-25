import React, { useRef, useState, useEffect } from "react";
import {
  Sparkles,
  Venus,
  Mars,
  Target,
  Zap,
  Droplet,
  Shield,
  Moon,
  Bone,
  HeartPulse,
  Leaf,
  Brain,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

// Helper map to dynamically assign Lucide icons based on database string names
const iconMap = {
  Sparkles,
  Venus,
  Mars,
  Target,
  Zap,
  Droplet,
  Shield,
  Moon,
  Bone,
  HeartPulse,
  Leaf,
  Brain,
};
import { useNavigate } from "react-router-dom";
export default function ShopByCategory() {
  const scrollRef = useRef(null);
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const apiUrl = import.meta.env.VITE_API_URL || "";

  const handleCategoryClick = (categoryId) => {
    // Navigate to your category products page using the backend route we made
    navigate(`/products/category/${categoryId}`);
  };

  const getImageUrl = (imagePath) => {
    if (!imagePath) return "";
    if (imagePath.startsWith("http") || imagePath.startsWith("data:")) return imagePath;
    return `${apiUrl}${imagePath.startsWith("/") ? "" : "/"}${imagePath}`;
  };

  useEffect(() => {
    fetch(`${apiUrl}/categories/`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch categories from server");
        }
        return res.json();
      })
      .then((data) => {
        const categoryList = Array.isArray(data) ? data : (data.categories || data.data || []);
        setCategories(categoryList);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [apiUrl]);

  const scroll = (direction) => {
    const container = scrollRef.current;
    if (!container) return;

    // Grab a single card width + gap to scroll by precise steps
    const cardElement = container.querySelector("[data-category-item]");
    const scrollAmount = cardElement ? cardElement.clientWidth + 16 : container.clientWidth * 0.5;
    const maxScroll = container.scrollWidth - container.clientWidth;

    if (direction === "right") {
      // Already at (or near) the end -> loop back to the start
      if (container.scrollLeft >= maxScroll - 5) {
        container.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        container.scrollBy({ left: scrollAmount, behavior: "smooth" });
      }
    } else {
      // Already at (or near) the start -> loop to the end
      if (container.scrollLeft <= 5) {
        container.scrollTo({ left: maxScroll, behavior: "smooth" });
      } else {
        container.scrollBy({ left: -scrollAmount, behavior: "smooth" });
      }
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-10">
        <p className="text-gray-500 text-sm">Loading categories...</p>
      </div>
    );
  }

  if (error || !Array.isArray(categories) || categories.length === 0) {
    return null;
  }

  // Repeat the category list enough times so the strip always overflows its
  // container (even on wide screens showing 6 at once) and left/right always
  // has somewhere to scroll to, creating a looping effect.
  const repeatCount = Math.max(3, Math.ceil(12 / categories.length));
  const displayList = Array.from({ length: repeatCount }).flatMap((_, r) =>
    categories.map((item, idx) => ({
      ...item,
      uniqueKey: `${item.id ?? idx}-${r}`, // unique key per repeated copy
    }))
  );

  return (
    <section className="w-full max-w-7xl mx-auto py-10 sm:py-14 px-4 sm:px-6 lg:px-8">
      <h2 className="text-center text-2xl sm:text-3xl font-semibold text-gray-900">
        Shop by Category
      </h2>

      <div className="relative mt-8 sm:mt-10 overflow-hidden">
        <div
          ref={scrollRef}
          className="flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth py-2 no-scrollbar"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {displayList.map((item, i) => {
            const label = item.name || item.title || item.label;
            const mediaVal = item.image || item.icon || item.iconName;
            const IconComponent = iconMap[mediaVal];

            return (
              <div
                key={item.uniqueKey}
                data-category-item
                onClick={() => handleCategoryClick(item.id)} // <-- ADD THIS CLICK HANDLER
                className="flex flex-col items-center gap-3 shrink-0 snap-start group cursor-pointer
                           w-[calc((100%-1.5rem)/2.5)] 
                           sm:w-[calc((100%-3rem)/4)] 
                           lg:w-[calc((100%-5*1.25rem)/6)]"
              >
                {/* Circle container */}
                <div className="flex h-24 w-24 sm:h-28 sm:w-28 lg:h-32 lg:w-32 items-center justify-center overflow-hidden rounded-full bg-green-100 group-hover:bg-green-200 transition-colors duration-200 shadow-sm">
                  {IconComponent ? (
                    <IconComponent
                      className="h-10 w-10 sm:h-12 sm:w-12 lg:h-14 lg:w-14 text-green-700 transition-transform duration-200 group-hover:scale-110"
                      strokeWidth={1.5}
                    />
                  ) : mediaVal ? (
                    <img
                      src={getImageUrl(mediaVal)}
                      alt={label || "Category"}
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                      onError={(e) => {
                        e.target.src = "https://placehold.co/150?text=No+Image";
                      }}
                    />
                  ) : (
                    <Sparkles
                      className="h-10 w-10 sm:h-12 sm:w-12 lg:h-14 lg:w-14 text-green-700 transition-transform duration-200 group-hover:scale-110"
                      strokeWidth={1.5}
                    />
                  )}
                </div>

                <span className="text-center text-xs sm:text-sm font-medium text-gray-800 group-hover:text-green-700 transition-colors">
                  {label}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Navigation Controls */}
      <div className="mt-8 flex justify-center gap-4">
        <button
          onClick={() => scroll("left")}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-300 bg-white text-gray-700 shadow-sm transition hover:bg-gray-100 active:scale-95"
          aria-label="Previous categories"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>

        <button
          onClick={() => scroll("right")}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-300 bg-white text-gray-700 shadow-sm transition hover:bg-gray-100 active:scale-95"
          aria-label="Next categories"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>
    </section>
  );
}