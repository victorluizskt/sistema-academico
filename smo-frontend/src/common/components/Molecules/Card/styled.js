import styled from "styled-components"

export const CardContainer = styled.div`
  background-color: #fff !important;
  width: 275px;
  height: 450px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  box-shadow: rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;
  border-radius: 15px;
`;

export const Label = styled.div `
  display: grid;
  grid-gap: 20px;
  align-items: center;
`;

export const Title = styled.span`
  text-align: center;
  margin-top: 20px;
  font-size: 30px;
  text-width: 20px;
`;

export const SubTitle = styled.span` 
  text-align: center;
  font-size: 16px;
`;

export const Footer = styled.button` 
  color: #316fce !important;
  text-align: center;
  margin-left: auto;
  margin-right: auto;
  background-color: #fff;
  border:none;
  cursor:pointer;
  width: 100px;
`;

export const ImagesLogin = styled.div` 
  margin-left: auto;
  margin-right: auto;
`;

export const LabelContainer = styled.div` 
  margin-top: 30px;
  width: 220px;
  margin-left: 26px;
  display: grid;
  grid-gap: 20px;
`;
