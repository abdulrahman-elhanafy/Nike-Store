import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Heart } from "lucide-react";

// Luhn algorithm for validating card numbers
function validateCardNumber(number) {
    const digits = number.replace(/\D/g, "");
    if (digits.length < 13 || digits.length > 19) return false;
    let sum = 0;
    let shouldDouble = false;
    for (let i = digits.length - 1; i >= 0; i--) {
        let digit = parseInt(digits.charAt(i), 10);
        if (shouldDouble) {
            digit *= 2;
            if (digit > 9) digit -= 9;
        }
        sum += digit;
        shouldDouble = !shouldDouble;
    }
    return sum % 10 === 0;
}

function formatCardNumber(number) {
    const digits = number.replace(/\D/g, "");
    const groups = digits.match(/(\d{1,4})/g);
    return groups ? groups.join(" ").substr(0, 19) : "";
}

function validateExpiryDate(date) {
    if (!/^\d{2}\/\d{2}$/.test(date)) return false;
    const [month, year] = date.split("/");
    const now = new Date();
    const currentYear = now.getFullYear() % 100;
    const currentMonth = now.getMonth() + 1;
    const expMonth = parseInt(month, 10);
    const expYear = parseInt(year, 10);
    if (expMonth < 1 || expMonth > 12) return false;
    if (expYear < currentYear) return false;
    if (expYear === currentYear && expMonth < currentMonth) return false;
    return true;
}

export default function Checkout() {
    const navigate = useNavigate();
    const [shipping, setShipping] = useState({
        fullname: "",
        address: "",
        city: "",
        postal: "",
    });
    const [card, setCard] = useState({ number: "", name: "", expiry: "" });
    const [qty, setQty] = useState(1);
    const [errors, setErrors] = useState({
        number: "",
        name: "",
        expiry: "",
    });
    const price = 129.0;
    const subTotal = (price * qty).toFixed(2);

    async function handlePlaceOrder(e) {
        e.preventDefault();
        let newErrors = { ...errors };
        // Card number
        if (!validateCardNumber(card.number)) {
            newErrors.number = "Invalid card number";
        } else {
            newErrors.number = "";
        }
        // Name
        if (!card.name || card.name.length < 3) {
            newErrors.name = "Name is too short";
        } else {
            newErrors.name = "";
        }
        // Expiry
        if (!validateExpiryDate(card.expiry)) {
            newErrors.expiry = "Invalid expiry date";
        } else {
            newErrors.expiry = "";
        }
        setErrors(newErrors);
        if (Object.values(newErrors).some((err) => err)) return;
        alert("Order placed — thank you!");
        navigate("/");
    }

    const handleCardNumberChange = (e) => {
        const formattedValue = formatCardNumber(e.target.value);
        setCard({ ...card, number: formattedValue });
    };

    useEffect(() => {
        const newErrors = { ...errors };
        // Card number
        if (card.number && !validateCardNumber(card.number)) {
            newErrors.number = "Invalid card number";
        } else {
            newErrors.number = "";
        }
        // Name
        if (card.name && card.name.length < 3) {
            newErrors.name = "Name is too short";
        } else {
            newErrors.name = "";
        }
        // Expiry
        if (card.expiry && !validateExpiryDate(card.expiry)) {
            newErrors.expiry = "Invalid expiry date";
        } else {
            newErrors.expiry = "";
        }
        setErrors(newErrors);
    }, [card]);

    return (
        <div className="max-w-7xl mx-auto px-6 py-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                {/* Left: checkout form */}
                <form onSubmit={handlePlaceOrder} className="bg-white p-8 rounded-lg shadow-sm">
                    <h3 className="text-lg text-gray-500 uppercase mb-3">Shipping</h3>
                    <div className="grid grid-cols-1 gap-4">
                        <input
                            required
                            value={shipping.fullname}
                            onChange={(e) => setShipping({ ...shipping, fullname: e.target.value })}
                            placeholder="Full name"
                            className="border rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-200"
                        />
                        <input
                            required
                            value={shipping.address}
                            onChange={(e) => setShipping({ ...shipping, address: e.target.value })}
                            placeholder="Address"
                            className="border rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-200"
                        />
                        <div className="flex gap-4">
                            <input
                                required
                                value={shipping.city}
                                onChange={(e) => setShipping({ ...shipping, city: e.target.value })}
                                placeholder="City"
                                className="border rounded-md px-4 py-3 flex-1 focus:outline-none focus:ring-2 focus:ring-blue-200"
                            />
                            <input
                                required
                                value={shipping.postal}
                                onChange={(e) => setShipping({ ...shipping, postal: e.target.value })}
                                placeholder="Postal"
                                className="border rounded-md px-4 py-3 w-32 focus:outline-none focus:ring-2 focus:ring-blue-200"
                            />
                        </div>
                    </div>

                    <h3 className="text-lg text-gray-500 uppercase mt-8 mb-3">Payment</h3>
                    <div className="grid grid-cols-1 gap-4">
                        <div>
                            <input
                                required
                                value={card.number}
                                onChange={handleCardNumberChange}
                                maxLength="19"
                                placeholder="Card number"
                                className={`border rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-200 ${
                                    errors.number ? "border-red-500" : ""
                                }`}
                            />
                            {errors.number && (
                                <p className="text-red-500 text-sm mt-1">{errors.number}</p>
                            )}
                        </div>
                        <div className="flex gap-4">
                            <div className="flex-1">
                                <input
                                    required
                                    value={card.name}
                                    onChange={(e) => setCard({ ...card, name: e.target.value })}
                                    placeholder="Name on card"
                                    className={`border rounded-md px-4 py-3 flex-1 focus:outline-none focus:ring-2 focus:ring-blue-200 ${
                                        errors.name ? "border-red-500" : ""
                                    }`}
                                />
                                {errors.name && (
                                    <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                                )}
                            </div>
                            <div className="w-28">
                                <input
                                    required
                                    value={card.expiry}
                                    onChange={(e) => setCard({ ...card, expiry: e.target.value })}
                                    placeholder="MM/YY"
                                    maxLength="5"
                                    className={`border rounded-md px-4 py-3 w-28 focus:outline-none focus:ring-2 focus:ring-blue-200 ${
                                        errors.expiry ? "border-red-500" : ""
                                    }`}
                                />
                                {errors.expiry && (
                                    <p className="text-red-500 text-sm mt-1">{errors.expiry}</p>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="mt-8 flex items-center gap-4">
                        <button type="submit" className="bg-blue-600 text-white px-8 py-3 rounded-full font-bold shadow-lg">
                            Place order
                        </button>
                        <button
                            type="button"
                            onClick={() => navigate(-1)}
                            className="px-4 py-2 rounded-full border text-gray-700"
                        >
                            Continue shopping
                        </button>
                    </div>
                </form>

                {/* Right: order summary */}
                <aside className="p-8 bg-gray-50 rounded-lg">
                    <h4 className="text-sm text-gray-400 uppercase">Order summary</h4>

                    <div className="flex items-center gap-4 mt-6">
                        <img src="/shoe.png" alt="product" className="w-28 h-auto object-contain rounded-md" />
                        <div className="flex-1">
                            <div className="font-semibold">NIKE AIR FORCE 1</div>
                            <div className="text-sm text-gray-500 mt-1">Color: Blue • Size: 9</div>
                            <div className="flex items-center gap-2 mt-3">
                                <button type="button" onClick={() => setQty(Math.max(1, qty - 1))} className="w-8 h-8 rounded-full border">-</button>
                                <div className="w-8 h-8 flex items-center justify-center">{qty}</div>
                                <button type="button" onClick={() => setQty(q => q + 1)} className="w-8 h-8 rounded-full border">+</button>
                            </div>
                        </div>
                        <div className="font-semibold">${(price * qty).toFixed(2)}</div>
                    </div>

                    <div className="border-t mt-6 pt-6 flex flex-col gap-3">
                        <div className="flex justify-between text-gray-600">
                            <span>Subtotal</span>
                            <span>${subTotal}</span>
                        </div>
                        <div className="flex justify-between text-gray-600">
                            <span>Shipping</span>
                            <span>Free</span>
                        </div>
                        <div className="flex justify-between font-bold text-lg">
                            <span>Total</span>
                            <span>${subTotal}</span>
                        </div>
                    </div>

                    <div className="mt-6 flex items-center gap-4">
                        <button className="bg-blue-600 text-white px-6 py-2 rounded-full font-bold">Checkout</button>
                        <Heart className="w-8 h-8 stroke-2" />
                    </div>
                </aside>
            </div>
        </div>
    );
}