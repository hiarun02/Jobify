const SkeletonCard = () => {
  return (
    <div className="border p-5 rounded-2xl shadow-2xs animate-pulse">
      {/* Header Section */}
      <div className="flex items-center gap-5">
        <div className="w-12 h-12 bg-gray-300 rounded-full"></div>
        <div className="flex-1">
          <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
          <div className="h-3 bg-gray-200 rounded w-1/2"></div>
        </div>
      </div>

      {/* Content Section */}
      <div className="pt-2 pb-2">
        <div className="h-5 bg-gray-300 rounded w-4/5 mb-2"></div>
        <div className="h-3 bg-gray-200 rounded w-full mb-1"></div>
        <div className="h-3 bg-gray-200 rounded w-5/6"></div>
      </div>

      {/* Badges Section */}
      <div className="my-2 mt-2 flex gap-3">
        <div className="h-6 bg-gray-200 rounded-full w-20"></div>
        <div className="h-6 bg-gray-200 rounded-full w-20"></div>
        <div className="h-6 bg-gray-200 rounded-full w-20"></div>
      </div>

      {/* Button Section */}
      <div className="w-full my-2 pt-2">
        <div className="h-10 bg-gray-300 rounded w-full"></div>
      </div>
    </div>
  );
};

export default SkeletonCard;
