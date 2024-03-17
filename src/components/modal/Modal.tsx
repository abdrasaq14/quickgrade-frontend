import ModalStyle from "./ModalStyle";

interface ModalProps {
  modalText: string;
}
function Modal({ modalText }: ModalProps) {
  return (
    <ModalStyle>
      <div className="modal-shape"></div>
      <p>{modalText}</p>
    </ModalStyle>
  );
}

export default Modal;
