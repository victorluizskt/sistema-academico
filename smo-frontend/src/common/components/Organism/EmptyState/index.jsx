import React from 'react';
import Welcome from '../../../../assets/images/welcome.jpg'
const EmptyState = () => {
  return (
    <div style={{
      marginTop: '200px',
      marginLeft: '450px'
    }}>

      <img src={Welcome} alt="welcome to page" />
    </div>
  )
}

export default EmptyState;