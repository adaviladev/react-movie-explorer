export default function ErrorState({ message, onRetry }) {
  return (
    <div role="alert" style={{ margin: "8px 0" }}>
      <p style={{ margin: "0 0 8px" }}>{message || "Something went wrong."}</p>
      {onRetry && (
        <button className="btn btn--outline" onClick={onRetry}>
          Retry
        </button>
      )}
    </div>
  );
}
