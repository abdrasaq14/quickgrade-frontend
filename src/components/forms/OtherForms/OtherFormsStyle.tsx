import styled from "styled-components";

const OtherFormsStyleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #f9fafb;

  .other-forms-page-app {
    min-height: 50%;
    width: 90%;
    max-width: 450px;
    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-content: center;
    padding: 40px;
    background-color: white;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    border: 0.5 solid white;
    border-radius: 8px;
    @media all and (min-width: 768px) {
      min-width: 30%;
      max-width: 450px;
      min-height: 55%;
      max-height: 60%;
    }
  }
  .error-message {
    font-weight: 700;
  }

  .other-forms-header {
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    margin-bottom: 2rem;
    a {
      text-decoration: none;
    }
  }

  .other-forms-header img {
  }

  .other-forms-page-app h1 {
    text-align: center;
    color: black;
    font-size: 25px;
    font-weight: 600;
    margin-bottom: 2rem;
  }

  .other-forms-page-app form {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
  }
  .other-forms-page-app form input {
    height: 3rem;
    border: 1px solid #d0d5dd;
    padding: 8px;
    margin-bottom: 2rem;
    border-radius: 100px;
    color: var(--label-color);
  }

  .other-forms-page-app form input::placeholder {
    color: #98a2b3;
  }
  .other-forms-page-app form input:focus {
    outline: none;
    border: 1px solid var(--button-color);
  }
  .other-forms-page-app form label {
    font-size: 1rem;
    color: #101828;
    font-weight: 700;
    text-align: left;
    margin-bottom: 0.5rem;
  }
  .check-your-email-text {
    font-size: 0.9rem;
    line-height: normal;
    text-align: center;
    margin-bottom: 1rem;
  }
  .check-your-email-link {
    margin-top: 2rem;
    cursor: pointer;
    color: var(--button-color);
    font-weight: 700;
    line-height: normal;
    margin-bottom: 0.5rem;
  }
  .extra-text-link {
    color: var(--button-color);
    font-weight: 700;
    line-height: normal;
    margin: 1rem 0;
  }
`;
export default OtherFormsStyleWrapper;
