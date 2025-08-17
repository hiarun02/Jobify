import React from "react";
import {Link} from "react-router-dom";
import {Button} from "../ui/button";
import {Home, ArrowLeft} from "lucide-react";

const NotFoundPage = () => {
  return (
    <div className="min-h-fit bg-gradient-to-br from-red-50 to-white flex items-center justify-center px-4 py-8 pt-20 sm:pt-16">
      <div className="max-w-sm sm:max-w-md w-full text-center">
        {/* 404 Number */}
        <div className="mb-6 sm:mb-8">
          <h1 className="text-6xl sm:text-8xl md:text-9xl font-bold text-red-600 opacity-20 select-none leading-none">
            404
          </h1>
        </div>

        {/* Content */}
        <div className="mb-6 sm:mb-8 px-2">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4">
            Page Not Found
          </h2>
          <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
            Sorry, we couldn't find the page you're looking for. The page might
            have been moved, deleted, or you entered the wrong URL.
          </p>
        </div>
        {/* Action Buttons */}
        <div
          className="flex justify-center flex-col
        gap-5"
        >
          <Link to="/">
            <Button className="w-full h-11 sm:h-12 bg-red-600 hover:bg-red-700 text-white flex items-center justify-center gap-2 text-sm sm:text-base font-medium">
              <Home className="h-4 w-4" />
              Go to Homepage
            </Button>
          </Link>

          <Button
            onClick={() => window.history.back()}
            variant="outline"
            className="w-full h-11 sm:h-12 border-red-200 text-red-600 hover:bg-red-50 flex items-center justify-center gap-2 text-sm sm:text-base font-medium"
          >
            <ArrowLeft className="h-4 w-4" />
            Go Back
          </Button>
        </div>

        {/* Help Links */}
        <div className="pt-4 sm:pt-6 border-t border-gray-200">
          <p className="text-xs sm:text-sm text-gray-500 mb-3 sm:mb-4">
            Need help? Try these popular pages:
          </p>
          <div className="flex justify-center gap-2 sm:gap-4 text-xs ">
            <Link
              to="/jobs"
              className="text-red-600 hover:text-red-700 hover:underline py-1 sm:py-0"
            >
              Browse Jobs
            </Link>
            <Link
              to="/register"
              className="text-red-600 hover:text-red-700 hover:underline py-1 sm:py-0"
            >
              Sign Up
            </Link>
            <Link
              to="/login"
              className="text-red-600 hover:text-red-700 hover:underline py-1 sm:py-0"
            >
              Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
