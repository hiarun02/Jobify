import React from "react";
import {Button} from "./ui/button";
import {Link} from "react-router-dom";
import {ArrowRight, Star} from "lucide-react";

const HeroSection = () => {
  return (
    <>
      <section className="relative bg-gradient-to-br  overflow-hidden pt-5">
        <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8 lg:py-32">
          <div className="text-center">
            {/* Main heading */}
            <div className="mb-8">
              <div className="inline-flex items-center gap-2 bg-red-100 text-red-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
                <Star className="h-4 w-4" />
                job seeker's choice
              </div>
              <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl lg:text-7xl">
                Find Your{" "}
                <span className="text-transparent bg-clip-text bg-red-700 ">
                  Dream Job
                </span>
                <br />
              </h1>
            </div>
            {/* Subtitle */}
            <p className="mx-auto max-w-2xl text-lg text-gray-600 sm:text-xl leading-relaxed mb-10">
              Connect with top companies, discover amazing opportunities, and
              take the next step in your career journey. Join thousands of
              professionals who found their perfect match.
            </p>
            {/* CTA buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-10">
              <Link to="/jobs" className="w-full sm:w-auto">
                <Button className="bg-red-600 hover:bg-red-700 text-white px-8 w-full sm:w-auto">
                  Explore Jobs
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </Link>
              <Link to="/register" className="w-full sm:w-auto">
                <Button variant="outline" className="w-full sm:w-auto">
                  Get Started Free
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg
            viewBox="0 0 1440 120"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
              fill="white"
            />
          </svg>
        </div>
      </section>

      <style jsx>{`
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </>
  );
};

export default HeroSection;
