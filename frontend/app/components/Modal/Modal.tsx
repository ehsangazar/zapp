import { useEffect, useRef } from "react";

interface ModalProps {
  closeModal: () => void;
  title: string;
  children: React.ReactNode;
}

const Modal = ({ closeModal, title, children }: ModalProps) => {
  const ref = useRef<HTMLDivElement>(null);

  const clickOutside = (event: MouseEvent) => {
    if (ref.current && !ref.current.contains(event.target as Node)) {
      closeModal();
    }
  };

  const keyPress = (event: KeyboardEvent) => {
    if (event.key === "Escape") {
      closeModal();
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", clickOutside);
    document.addEventListener("keydown", keyPress);

    return () => {
      document.removeEventListener("mousedown", clickOutside);
      document.removeEventListener("keydown", keyPress);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div ref={ref} className="bg-white w-full md:w-1/2 p-6 rounded-lg mx-2">
        <div className="flex justify-between">
          <h1 className="text-2xl font-bold">{title}</h1>
          <button onClick={closeModal} className="text-2xl font-bold">
            X
          </button>
        </div>
        <div>{children}</div>
      </div>
    </div>
  );
};

export default Modal;
