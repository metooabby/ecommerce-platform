interface Props {
  title: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
}

export function EmptyState({
  title,
  description,
  actionLabel,
  onAction
}: Props) {
  return (
    <div className="border rounded-lg bg-white p-6 text-center">
      <h2 className="text-lg font-semibold mb-2">{title}</h2>

      {description && (
        <p className="text-sm text-gray-600 mb-4">
          {description}
        </p>
      )}

      {actionLabel && onAction && (
        <button
          className="px-4 py-2 bg-blue-600 text-white rounded"
          onClick={onAction}
        >
          {actionLabel}
        </button>
      )}
    </div>
  );
}
