export default function SkeletonCard() {
  return (
    <div className="card" aria-hidden="true">
      <div className="card__poster skeleton skeleton-poster" />
      <div className="card__body">
        <div className="skeleton skeleton-line skel-w-80" />
        <div className="skeleton skeleton-line skel-w-50" />
      </div>
    </div>
  );
}
