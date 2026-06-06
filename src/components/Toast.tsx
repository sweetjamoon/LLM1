type ToastProps = {
  message: string;
};

export function Toast({ message }: ToastProps) {
  if (!message) return null;

  return (
    <div className="fixed bottom-5 left-1/2 z-50 -translate-x-1/2 rounded-full border border-ink/10 bg-ink px-5 py-3 text-sm font-semibold text-white shadow-soft transition">
      {message}
    </div>
  );
}
