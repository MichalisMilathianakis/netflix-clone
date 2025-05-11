import { createPortal } from "react-dom";
import { useEffect } from "react";
import MoviePreview from "./MoviePreview";

export default function Modal({ movieId, onClose, onPickNext }) {
  const show = !!movieId;               

  useEffect(() => {
    if (!show) return;                 
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [show, onClose]);

  if (!show) return null;

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative max-w-4xl w-full mx-4 overflow-y-auto max-h-[90vh] rounded-lg bg-gray-900">
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute top-2 right-4 text-3xl leading-none text-gray-400 hover:text-white"
        >
          ×
        </button>

        <MoviePreview movieId={movieId} onPickSimilar={onPickNext} />
      </div>
    </div>,
    document.body
  );
}
