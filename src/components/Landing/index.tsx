import Image from "next/image";
import Button from "@components/UI/Button";
import GetStartedButton from "./GetStartedButton";

const Landing = () => {
  return (
    <div
      className="flex items-center justify-center bg-white md:pt-36 pt-32 pb-12"
      aria-labelledby="hero-heading"
    >
      <section
        className="flex flex-col md:flex-row items-center justify-center max-w-6xl w-full px-4 sm:px-8 gap-10 md:gap-16"
        aria-label="Digital Menu Management System Intro Section"
      >
        {/* LEFT CONTENT */}
        <div className="flex-1 space-y-5 text-center md:text-left">
          <span
            className="inline-block px-4 py-1 rounded-full text-xs sm:text-sm font-semibold text-white bg-primary"
          >
            Digital Menu Management System
          </span>

          <h1
            id="hero-heading"
            className="text-3xl sm:text-4xl md:text-5xl font-semibold text-gray-900 leading-tight"
          >
            Reinvent Your Restaurant Menu Management
          </h1>

          <p className="text-base sm:text-lg font-medium text-gray-700">
            Create, update, and manage digital menus effortlessly - anytime, anywhere.
          </p>

          <p className="text-sm sm:text-base text-gray-600">
            Real-time updates, QR menus, multi-branch support, & actionable analytics help you deliver
            consistent dining experiences across locations.
          </p>

          {/* ACTION BUTTONS */}
          <div className="flex flex-col sm:flex-row items-center md:items-start gap-4 justify-center md:justify-start mt-4">
            <GetStartedButton />

            <Button
              variant="roundedOutline"
              className="w-full sm:w-auto px-6 py-4 text-base"
              aria-label="Book a demo to see the system in action"
            >
              Book a Demo
            </Button>
          </div>
        </div>

        {/* RIGHT IMAGE */}
        <div className="flex-1 flex justify-center w-full">
          <Image
            src="/assets/images/HeroImage.jpg"
            alt="Preview of the Digital Menu Management interface on a tablet screen"
            width={520}
            height={440}
            className="w-full max-w-[400px] sm:max-w-[480px] rounded-3xl shadow-md object-cover"
            priority
            sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
          />
        </div>
      </section>
    </div>
  );
};

export default Landing;