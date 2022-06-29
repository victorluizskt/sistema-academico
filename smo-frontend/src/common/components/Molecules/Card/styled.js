import styled from "styled-components"

export const CardContainer = styled.div`
  background-color: #F9F9F9 !important;
  width: ${props => props.width}; 
  height: ${props => props.height};
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  box-shadow: rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;
  border-radius: 15px;
`;