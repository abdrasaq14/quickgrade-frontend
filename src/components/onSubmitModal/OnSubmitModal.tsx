import ModalStyle from "./OnSubmitModalStyle";

interface ModalProps {
  modalText: string;
}
function OnSubmitModal({ modalText }: ModalProps) {
  return (
    <ModalStyle>
      <div className="modal-shape"></div>
      <p>{modalText}</p>
    </ModalStyle>
  );
}

export default OnSubmitModal;
