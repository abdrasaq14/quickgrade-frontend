import styled from "styled-components";

export const OuterWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  overflow-x: hidden !important;
  background-color: var(--form-background-color);
  @media all and (min-width: 1000px) {
    flex-direction: row;
    justify-content: space-between;
  }
`;

export const InnerWrapper = styled.div`
  overflow-x: hidden !important;
  width: 100%;
  background-color: #f9fafb;
  display: flex;
  align-self: center;
  overflow-x: hidden !important;
  justify-content: center !important;
  align-items: center !important;
  flex-direction: column !important;
  gap: 0.5rem;
  @media all and (min-width: 1000px) {
    width: 80%;
    margin-left: 20%;
    max-width: 2000px;
  }
`;
