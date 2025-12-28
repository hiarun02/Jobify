import React from "react";
import {Button} from "./ui/button";
import {Link} from "react-router-dom";

const HeroSection = () => {
  return (
    <>
      <section className="bg-white lg:grid lg:h-[50vh] lg:place-content-center">
        <div className="mx-auto w-screen max-w-screen-xl lg:h-[60vh] px-4 py-8 sm:px-6 sm:py-24 lg:px-8 lg:py-32">
          <div className="mx-auto max-w-prose text-center">
            <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl">
              <strong className="text-red-700"> #Get Your Dreame Job! </strong>
            </h1>
            <p className="mt-4 text-base text-pretty text-gray-700 sm:text-lg/relaxed">
              Discover the best job opportunities. Join us and take the first
              step towards your dream career.
            </p>
            <div className="mt-4 flex justify-center sm:mt-6">
              <Link to="/jobs">
                <Button className=" bg-red-700 text-white hover:bg-red-800 w-32">
                  Explore
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default HeroSection;
