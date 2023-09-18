const Loading = () => {
  return (
    <div className="flex items-center justify-center h-full mt-10 mb-20">
    <div
      className="animate-spin inline-block w-10 h-10 border-[3px] border-current border-t-transparent text-green-600 rounded-full"
      role="status"
      aria-label="loading"
    >
      <span className="sr-only">Loading...</span>
    </div>
    </div>
  );
};

export default Loading;
