interface ToastProps {
  message: string;
  onClose: () => void;
}

const Toast = ({ message, onClose }: ToastProps) => {
  return (
    <div className="fixed bottom-4 right-4 z-50 bg-gray-800 text-white px-4 py-2 rounded-md shadow-lg flex items-center animate-none">
      <span className="flex-1">{message}</span>
      <button
        onClick={onClose}
        className="ml-4 text-red-300 hover:text-red-500"
      >
        ✕
      </button>
    </div>
  );
};

export default Toast;
