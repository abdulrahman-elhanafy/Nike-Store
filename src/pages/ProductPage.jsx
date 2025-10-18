import React, { useState, useEffect } from "react";
import { Heart } from "lucide-react";
import { useCart } from "../context/CartContext.jsx";

// Helper function to create semi-transparent colors for gradients
const getGradientColor = (hexColor, opacity = 0.9) => {
    const r = parseInt(hexColor.slice(1, 3), 16);
    const g = parseInt(hexColor.slice(3, 5), 16);
    const b = parseInt(hexColor.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${opacity})`;
};

const colorAssets = {
    "#b74141": {
        main: "/Untitled-4.png",
        thumbMain: "/Untitled-4.png",
        thumbTop: "/Untitled-5.png",
        thumbSide: "/Untitled-7.png",
    },
    "#5165b5": {
        main: "/Untitled-3.png",
        thumbMain: "/Untitled-3.png",
        thumbTop: "/Untitled-2.png",
        thumbSide: "/Untitled-1.png",
    },
};

const ColorDot = ({ color, selected, onClick, ariaLabel }) => (
    <button
        type="button"
        onClick={() => onClick && onClick(color)}
        aria-pressed={selected}
        aria-label={ariaLabel}
        className={`w-6 h-6 rounded-full border transition-shadow focus:outline-none focus:ring-2 focus:ring-offset-2 ${selected ? "ring-2 ring-offset-2" : ""
            }`}
        style={{ background: color, cursor: "pointer" }}
    />
);

const SizeDot = ({ size, selected, onClick, activeColor }) => (
    <button
        type="button"
        onClick={() => onClick && onClick(size)}
        aria-pressed={selected}
        className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors border`}
        style={{
            cursor: "pointer",
            background: selected ? activeColor : "#fff",
            color: selected ? "#fff" : "#374151",
            borderColor: selected ? "transparent" : "#d1d5db",
        }}
    >
        {size}
    </button>
);

export default function ProductPage() {
    const { addItem } = useCart();
    const defaultColor = "#b74141";
    const [selectedColor, setSelectedColor] = useState(defaultColor);
    const [selectedSize, setSelectedSize] = useState(9);
    const [loved, setLoved] = useState(false);
    const [activeView, setActiveView] = useState("main");
    const [loaded, setLoaded] = useState(false);

    const colors = [
        { hex: "#b74141", label: "Red" },
        { hex: "#5165b5", label: "Blue" },
    ];

    const sizes = [6, 7, 8, 9, 10];

    const currentAssets = colorAssets[selectedColor] || colorAssets[defaultColor];
    const currentImageSrc =
        currentAssets[
        activeView === "main"
            ? "main"
            : activeView === "top"
                ? "thumbTop"
                : "thumbSide"
        ];

    useEffect(() => {
        setActiveView("main");
    }, [selectedColor]);

    useEffect(() => {
        setLoaded(false);
    }, [currentImageSrc]);

    const handleImgError = (e) => {
        const defaultImg = colorAssets[defaultColor].main;
        if (e.currentTarget.src !== defaultImg) {
            e.currentTarget.src = defaultImg;
            setActiveView("main");
        }
    };

    function handleAddToCart() {
        addItem({
            productId: "nike-air-force-1",
            color: selectedColor,
            size: selectedSize,
            qty: 1,
            price: 129.0,
        });
    }

    return (
        <div className="max-w-7xl mx-auto px-6 py-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
                {/* Left: image and thumbnails */}
                <div className="relative p-8 overflow-visible">
                    {/* Gradient Background */}
                    <div
                        className="absolute -top-8 -left-8 h-[calc(100%+4rem)] w-[60vw] transition-all duration-500"
                        style={{
                            background: `
                                        radial-gradient(circle at 30% 50%, 
                                            ${getGradientColor(selectedColor, 0.95)} 0%,
                                            ${getGradientColor(selectedColor, 0.8)} 25%,
                                            ${getGradientColor(selectedColor, 0.4)} 50%,
                                            rgba(255,255,255,0.95) 100%
                                        )
                            `,
                            borderTopRightRadius: "60% 80%",
                            borderBottomRightRadius: "60% 80%",
                            boxShadow: "40px 0 80px rgba(0,0,0,0.08)",
                            zIndex: -1,
                            transform: "translateX(-5%)",
                        }}
                    ></div>

                    {/* Product Image */}
                    {/* Product Image Wrapper */}
                    <div className="relative w-[560px] h-[400px] mx-auto flex items-center justify-center overflow-visible pt-12">
                        <img
                            key={`${selectedColor}-${activeView}`}
                            src={currentImageSrc}
                            alt="Nike Air Force 1"
                            onLoad={() => setLoaded(true)}
                            onError={handleImgError}
                            className={`object-contain transition-all duration-700 ease-out relative transform z-30 ${loaded
                                    ? "scale-100 opacity-100 translate-y-[-40px]"
                                    : "scale-95 opacity-0 translate-y-[40px]"
                                }`}
                            style={{
                                transformOrigin: "center bottom",
                                filter: "drop-shadow(0 25px 25px rgba(0,0,0,0.15))"
                            }}
                        />

                    </div>




                    {/* Thumbnails */}
                    <div className="flex gap-4 mt-6 justify-center">
                        <button
                            type="button"
                            aria-label="Show top view"
                            onClick={() => setActiveView("top")}
                            className={`bg-white/80 p-4 rounded-xl transition-all hover:bg-white ${
                                activeView === "top" ? "ring-2 ring-offset-2" : ""
                            }`}
                            style={{ ringColor: selectedColor }}
                        >
                            <img
                                src={currentAssets.thumbTop}
                                alt="Top view"
                                className="w-20 h-auto object-contain"
                                onError={(e) => (e.currentTarget.src = currentAssets.main)}
                            />
                        </button>

                        <button
                            type="button"
                            aria-label="Show side view"
                            onClick={() => setActiveView("side")}
                            className={`bg-white/80 p-4 rounded-xl transition-all hover:bg-white ${
                                activeView === "side" ? "ring-2 ring-offset-2" : ""
                            }`}
                            style={{
                                ringColor: selectedColor
                            }}
                        >
                            <img
                                src={currentAssets.thumbSide}
                                alt="Side view"
                                className="w-20 h-auto object-contain"
                                onError={(e) => (e.currentTarget.src = currentAssets.main)}
                            />
                        </button>
                        <button
                            type="button"
                            aria-label="Show main view"
                            onClick={() => setActiveView("main")}
                            className={`bg-white/80 p-4 rounded-xl transition-all hover:bg-white ${
                                activeView === "main" ? "ring-2 ring-offset-2" : ""
                            }`}
                            style={{
                                ringColor: selectedColor
                            }}
                        >
                            <img
                                src={currentAssets.thumbMain}
                                alt="Main view"
                                className="w-20 h-auto object-contain"
                                onError={(e) => (e.currentTarget.src = currentAssets.main)}
                            />
                        </button>
                    </div>
                </div>

                {/* Right: details */}
                <div className="py-16 px-12 flex flex-col gap-6">
                    <div className="text-sm text-gray-400">LIFESTYLE SHOE</div>
                    <h2 className="text-5xl font-extrabold">
                        NIKE AIR
                        <br />
                        FORCE 1
                    </h2>

                    {/* Color selector */}
                    <div>
                        <div className="text-gray-500 uppercase mb-3">Color:</div>
                        <div className="flex items-center gap-4">
                            {colors.map((c) => (
                                <ColorDot
                                    key={c.hex}
                                    color={c.hex}
                                    selected={c.hex === selectedColor}
                                    onClick={setSelectedColor}
                                    ariaLabel={`Select color ${c.label}`}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Size selector */}
                    <div>
                        <div className="text-gray-500 uppercase mb-3 mt-4">Size:</div>
                        <div className="flex items-center gap-4">
                            {sizes.map((s) => (
                                <SizeDot
                                    key={s}
                                    size={s}
                                    selected={s === selectedSize}
                                    onClick={setSelectedSize}
                                    activeColor={selectedColor}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Buttons */}
                    <div className="mt-6 flex items-center gap-6">
                        <button
                            onClick={handleAddToCart}
                            className="text-white px-8 py-3 rounded-full font-bold shadow-lg transition-transform hover:scale-105"
                            style={{
                                backgroundColor: selectedColor,
                            }}
                        >
                            ADD TO CART
                        </button>

                        <button
                            type="button"
                            onClick={() => setLoved((v) => !v)}
                            aria-pressed={loved}
                            aria-label={loved ? "Remove from favorites" : "Add to favorites"}
                            className="p-2 rounded-full transition-transform hover:scale-105"
                        >
                            <Heart
                                className="w-8 h-8"
                                fill={loved ? "#ef4444" : "none"}
                                stroke={loved ? "#ef4444" : undefined}
                                strokeWidth={2}
                            />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
