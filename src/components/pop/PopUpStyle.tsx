import styled from "styled-components";

const PopUpMessageWrapper = styled.div`
  display: flex;
  align-items: stretch;
  justify-content: space-between;
  min-height: 2rem;
  min-width: 20vw;
  border-radius: 4px;
  overflow-y: hidden;
  box-sizing: content-box;
  padding: 0;
  background-color: #00af72;
  box-shadow: 15px 15px 15px #04513760;
  animation: animateMe 1s forwards;
  position: fixed;
  top: 5%;
  right: 0;
  z-index: 2000;

  &::after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    height: 5px;
    width: 100%;
    background-color: #027b51ed;
    animation: animateAfter 1500ms forwards;
  }
  @media screen and (max-width: 623px) {
    width: 60%;
  }

  @keyframes animateMe {
    0% {
      opacity: 0;
      transform: translateY(-30px);
    }

    100% {
      opacity: 1;
      transform: translateY(0px);
    }
  }
  @keyframes slide-out {
    0% {
      opacity: 1;
      transform: translateY(0);
    }

    100% {
      opacity: 0;
      transform: translateY(-30px);
      display: none;
    }
  }

  .after-error::after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    height: 5px;
    width: 100%;
    background-color: #ff0173;
    animation: animateAfter 8s forwards;
  }

  @keyframes animateAfter {
    0% {
      width: 100%;
    }

    100% {
      width: 0%;
    }
  }
  .icon-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 100%;
    width: 20%;
    background-color: #027b51ed;
  }

  .success-icon {
    background-color: inherit;
  }

  .message-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 100%;
    padding: 0.5rem 1rem;
    width: 80%;
  }

  .success-message {
    font-weight: 600;
    font-size: 0.9rem;
    color: #ffff;
    text-wrap: wrap;
    align-self: center;
    text-align: left;
  }

`;

export default PopUpMessageWrapper;
