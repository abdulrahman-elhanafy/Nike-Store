import { Heart, Search, ShoppingBag } from "lucide-react";

const Navbar = () => {
    return (
        <header className="w-full bg-transparent">
            <div className="max-w-7xl mx-auto px-12 py-2 flex items-center justify-between">
                {/* Left: logo + nav */}
                <div className="flex items-center gap-8">
                    <img
                        src="/nike-logo.png"
                        alt="Nike"
                        className="w-24 h-auto md:w-32 object-contain"
                    />

                    <nav className="hidden md:flex gap-[120px] font-semibold uppercase text-base">
                        <a href="#" className="hover:text-gray-600">
                            Mens
                        </a>
                        <a href="#" className="hover:text-gray-600">
                            Womens
                        </a>
                        <a href="#" className="hover:text-gray-600">
                            Kids
                        </a>
                        <a href="#" className="hover:text-gray-600">
                            Customize
                        </a>
                        <a href="#" className="text-red-600 hover:opacity-80">
                            Sale
                        </a>
                    </nav>
                </div>

                {/* Right: icons */}
                <div className="flex items-center gap-10">
                    <Heart className="w-6 h-6 cursor-pointer text-gray-600 hover:text-red-500 hover:scale-110 transition-transform duration-400" />
                    <Search className="w-6 h-6 cursor-pointer text-gray-600 hover:text-blue-500 hover:scale-110 transition-transform duration-400" />
                    <ShoppingBag className="w-6 h-6 cursor-pointer text-gray-600 hover:text-green-500 hover:scale-110 transition-transform duration-400" />
                </div>

            </div>
        </header>
    );
};
export default Navbar;
