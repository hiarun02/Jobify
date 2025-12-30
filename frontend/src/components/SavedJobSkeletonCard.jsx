const SavedJobSkeletonCard = () => {
  return (
    <div className="bg-white border-2 border-gray-100 rounded-2xl shadow-1xl p-3 animate-pulse">
      {/* Delete Button */}
      <div className="h-8 w-8 bg-gray-300 rounded"></div>

      {/* Company Section */}
      <div className="mt-5 flex items-center gap-5">
        <div className="w-16 h-16 bg-gray-300 rounded-full flex-shrink-0"></div>
        <div className="flex-1">
          <div className="h-5 bg-gray-300 rounded w-3/4 mb-2"></div>
          <div className="h-3 bg-gray-200 rounded w-1/2"></div>
        </div>
      </div>

      {/* Title and Description */}
      <div className="pt-2 pb-2">
        <div className="h-5 bg-gray-300 rounded w-4/5 mb-2"></div>
        <div className="h-3 bg-gray-200 rounded w-full mb-1"></div>
        <div className="h-3 bg-gray-200 rounded w-5/6"></div>
      </div>

      {/* View Button */}
      <div className="w-full my-2 pt-2">
        <div className="h-10 bg-gray-300 rounded w-full"></div>
      </div>
    </div>
  );
};

export default SavedJobSkeletonCard;
