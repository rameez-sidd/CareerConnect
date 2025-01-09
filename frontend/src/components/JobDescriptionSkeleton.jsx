import React from "react";

const JobDescriptionSkeleton = () => {
  return (
    <div className="flex flex-col gap-10 animate-pulse">
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-3">
          <div className="h-6 bg-gray-300 rounded w-40"></div>
          <div className="flex items-center gap-2">
            <div className="h-4 bg-gray-300 rounded w-20"></div>
            <div className="h-4 bg-gray-300 rounded w-20"></div>
            <div className="h-4 bg-gray-300 rounded w-20"></div>
          </div>
        </div>
        <div className="hidden sm:block">
          <div className="h-10 bg-gray-300 rounded w-32"></div>
        </div>
      </div>

      <div className="flex flex-col gap-5">
        <div className="h-6 bg-gray-300 rounded w-48"></div>
        <div className="flex flex-col gap-4">
          <div className="h-4 bg-gray-300 rounded w-80"></div>
          <div className="h-4 bg-gray-300 rounded w-80"></div>
          <div className="h-4 bg-gray-300 rounded w-80"></div>
          <div className="h-4 bg-gray-300 rounded w-80"></div>
          <div className="h-4 bg-gray-300 rounded w-80"></div>
          <div className="h-4 bg-gray-300 rounded w-80"></div>
          <div className="h-4 bg-gray-300 rounded w-80"></div>
        </div>
      </div>

      <div className="sm:hidden">
        <div className="h-10 bg-gray-300 rounded w-full"></div>
      </div>
    </div>
  );
};

export default JobDescriptionSkeleton;
