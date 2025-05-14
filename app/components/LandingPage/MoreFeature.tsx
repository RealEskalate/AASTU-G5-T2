import React from "react";
import FeatureCard from "./FeatureCard";

function MoreFeature() {
  return (
    <div className="mx-auto pt-20">
      <h1 className="text-2xl font-bold py-5 text-center">More Feature</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-2/3 gap-6 mx-auto">
        <FeatureCard />
        <FeatureCard />
        <FeatureCard />
      </div>
        <p className="text-gray-500 w-2/3 text-center  mx-auto py-10">
          Continuously Enhancing Your Experience: Our Commitment to Innovation
          Means We're Hard at Work Developing and Integrating a Host of Exciting
          New Features, Stay Tuned for Even More Ways to Elevate Your Journey.
        </p>
    </div>
  );
}

export default MoreFeature;
