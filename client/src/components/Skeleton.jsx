// to show a skeleton loading state
function Skeleton({ className }) {
  return (
    <div className={`animate-pulse bg-gray-200 rounded ${className}`}></div>
  );
}

export default Skeleton;
