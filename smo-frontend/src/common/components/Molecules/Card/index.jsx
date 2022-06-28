import React from 'react';
import { 
  CardContainer, 
} from './styled';

const Card = ({children, width, height}) => {

  return (
    <CardContainer width={width} height={height}>
      {children}
    </CardContainer>
  )
}

export default Card;