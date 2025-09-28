export default function SkeletonDetails() {
  return (
    <div className="details" aria-busy="true" aria-live="polite">
      {/* Poster placeholder */}
      <div className="details__poster skeleton" />

      {/* Texto placeholder */}
      <div>
        <div
          className="skeleton skeleton-line skel-w-80"
          style={{ height: 16, marginTop: 0 }}
        />
        <div className="skeleton skeleton-line skel-w-50" />
        <div className="skeleton skeleton-line skel-w-80" />
        <div className="skeleton skeleton-line skel-w-50" />
      </div>
    </div>
  );
}
