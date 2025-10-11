export const Hero = () => {
    return (
        <section className="relative overflow-hidden pb-[10px]">
            {/* Radial background gradient */}
            <div className="absolute inset-0 -z-20 flex justify-center items-center">
                <div
                    className="w-[900px] h-[900px] rounded-full"
                    style={{
                        background: "radial-gradient(circle, #ffe5cf 0%, #fff 60%, transparent 100%)",
                    }}
                />
            </div>

            {/* Main content */}
            <div className="relative flex flex-col items-center pt-10">
                {/* NIKE AIR text */}
                <h1 className="text-[7vw] md:text-[8vw] lg:text-[9vw] font-extrabold tracking-widest text-black text-center leading-none select-none z-10">
                    NIKE AIR
                </h1>

                {/* Shoe image with background image behind */}
                <div className="relative w-full flex justify-center z-20 -mt-[13vw] translate-x-[-100px]">
                    {/* Image behind the shoe */}
                    <div className="relative w-full flex justify-center z-20 -mt-[6vw]">
                        {/* Image behind the shoe */}
                        <div className="absolute inset-0 flex justify-center items-center pointer-events-none">
                            <img
                                src="/Ellipse1.svg"
                                alt=""
                                aria-hidden="true"
                                className="w-[860px] max-w-full translate-x-[200px] translate-y-[150px]"
                            />
                        </div>
                        {/* Image behind the shoe */}
                        <div className="absolute inset-0 flex justify-center items-center pointer-events-none">
                            <img
                                src="/Ellipse2.svg"
                                alt=""
                                aria-hidden="true"
                                className="w-[860px] max-w-full translate-x-[-100px]"
                            />
                        </div>
                        {/* Shoe image */}
                        <img
                            src="/shoe.png"
                            alt="Nike shoe"
                            className="relative w-[660px] max-w-full rotate-[-20deg] drop-shadow-xl z-10"
                            style={{ zIndex: 2 }}
                        />

                        {/* Product info box */}
                        <div className="absolute right-20 bottom-8 bg-transparent text-right z-20">
                            <div className="inline-block border-l-4 border-black pl-4">
                                <div className="font-bold text-lg tracking-widest text-left">NIKE</div>
                                <div className="uppercase text-xs font-black tracking-wider mt-1 text-left">
                                    Air Jordan 1 Retro High OG
                                    <br />
                                    "Shattered Backboard"
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Product info box */}
                    <div className="absolute right-20 bottom-8 bg-transparent text-right z-20">
                        <div className="inline-block border-l-4 border-black pl-4">
                            <div className="font-bold text-lg tracking-widest text-left">NIKE</div>
                            <div className="uppercase text-xs font-black tracking-wider mt-1 text-left">
                                Air Jordan 1 Retro High OG
                                <br />
                                "Shattered Backboard"
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* JUST DO IT section */}
            <div className="flex flex-col items-center space-y-8 pb-10">
                <div className="text-5xl md:text-6xl font-extrabold tracking-widest">
                    JUST DO IT
                </div>
                <div className="text-base text-gray-700 text-center max-w-xl">
                    explore more of the coolest and high-quality sneakers right now and don’t miss the promos
                </div>
                <button className="bg-black text-white px-10 py-3 rounded-full text-lg font-bold hover:bg-gray-800 transition">
                    Explore now
                </button>
            </div>

        </section>
    );
};
