export default function Hero() {
  return (
    <section
      id="home"
      className="relative h-screen bg-cover bg-center flex flex-col items-center justify-center text-center px-6 sm:px-12 lg:px-32"
      style={{ backgroundImage: "url('/sanjay.jpeg')" }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-70"></div>

      {/* Text Content */}
      <div className="relative z-10 text-white">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold mb-6 leading-tight">
          Achieve Your <span className="text-yellow-400">Fitness Goals</span> with Us
        </h1>
        <p className="text-lg sm:text-xl text-gray-300 max-w-2xl mb-10">
          Join <span className="text-yellow-400 font-semibold">FitFactory</span> and take the first step towards a healthier, stronger you. 💪
        </p>
        <a
          href="#plans"
          className="bg-yellow-400 text-black px-8 py-3 text-lg font-bold rounded-full hover:bg-white hover:text-black transition duration-300"
        >
          Explore Plans
        </a>
      </div>
    </section>
  );
}