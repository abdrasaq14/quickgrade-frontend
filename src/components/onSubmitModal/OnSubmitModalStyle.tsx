import styled from "styled-components";

const ModalStyle = styled.div`
  height: 100vh;
  width: 100vw;
  position: fixed;
  z-index: 1500;
  top: 0;
  left: 0;
  gap: 1rem;
  right: 0;
   overflow-hidden;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  background-color: rgba(175, 201, 247, 0.5);
  backdrop-filter: blur(4px);

  @supports (backdrop-filter: blur(10px)) {
    backdrop-filter: blur(10px);
  }

  p {
    color: var(--button-color);
    font-size: 0.8rem;
    font-weight: 600
  }
  .modal-shape {
    height: 50px;
    width: 50px;
    border-radius: 50%;
    border: 3px solid #bfe1f7;
    border-bottom: 5px solid var(--button-color);
    animation: spin 1s linear infinite;
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

export default ModalStyle;
