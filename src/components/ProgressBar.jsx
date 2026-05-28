import './ProgressBar.css';

export default function ProgressBar({ current, total }) {
  const percentage = total > 0 ? (current / total) * 100 : 0;

  return (
    <div className="progress-bar-track" id="progress-bar" role="progressbar" aria-valuenow={current} aria-valuemin={0} aria-valuemax={total}>
      <div
        className="progress-bar-fill"
        style={{ width: `${percentage}%` }}
      />
    </div>
  );
}
