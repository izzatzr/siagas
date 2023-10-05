const ModalWrapper = ({ children, onClose }) => {
  return (
    <div
      className="fixed top-0 left-0 z-30 flex items-center justify-center w-screen h-screen bg-black/20"
      onClick={onClose}
    >
      {children}
    </div>
  );
};

export default ModalWrapper;
