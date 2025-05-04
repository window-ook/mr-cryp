export default function Skeleton() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      {Array.from(new Array(4)).map((_, index) => (
        <div key={index} className="w-[9rem]">
          <div className="w-full mt-[0.7rem]">
            <div className="bg-gray-200 w-full h-[5rem] animate-pulse rounded"></div>
            <div className="pt-2">
              <div className="h-4 bg-gray-200 rounded w-full animate-pulse mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-3/5 animate-pulse"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
