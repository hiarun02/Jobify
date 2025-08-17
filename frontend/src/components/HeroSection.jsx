import React from "react";
import {Button} from "./ui/button";
import {Link} from "react-router-dom";
import {TrendingUp, Users, Briefcase, ArrowRight, Star} from "lucide-react";

const HeroSection = () => {
  return (
    <>
      <section className="relative bg-gradient-to-br from-red-50 via-white to-red-50 overflow-hidden pt-5">
        {/* Background decorations */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-32 w-80 h-80 bg-red-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
          <div className="absolute -bottom-40 -left-32 w-80 h-80 bg-red-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
          <div className="absolute top-40 left-40 w-80 h-80 bg-red-50 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
        </div>

        <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8 lg:py-32">
          <div className="text-center">
            {/* Main heading */}
            <div className="mb-8">
              <div className="inline-flex items-center gap-2 bg-red-100 text-red-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
                <Star className="h-4 w-4" />
                #1 Job Platform in the Industry
              </div>
              <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl lg:text-7xl">
                Find Your{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-red-800">
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
              <Link to="/jobs">
                <Button className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 text-lg font-medium rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 flex items-center gap-2">
                  Explore Jobs
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </Link>
              <Link to="/register">
                <Button
                  variant="outline"
                  className="border-2 border-red-200 text-red-600 hover:bg-red-50 px-8 py-3 text-lg font-medium rounded-lg hover:border-red-300 transition-all duration-200"
                >
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
