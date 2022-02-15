import styled from "styled-components";
// import { Link as LinkR } from "react-router-dom";
import { Link as LinkS } from "react-scroll";

export const Button = styled(LinkS)`
 
 
  white-space: nowrap;
  padding: ${({ big }) => (big ? "#14px 48px" : "12px 30px")};
  color: #e40019;
  font-size: 20px;
  font-weight: 650;
  outline: none;
  border:solid 4px #e40019;
  text-decoration: none;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 0.2s ease-in-out;
  &:hover {
    background:#e40019;
    color: white;
  }
  
`;
