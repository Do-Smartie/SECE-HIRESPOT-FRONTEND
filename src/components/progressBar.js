import React from "react";


const ProgressBar = (props) => {
    const { barValue } = props;
  
    const containerStyles = {
      height: 4,
      width: '80%',
      backgroundColor: "#e0e0de",
      borderRadius: 5,
      marginTop: 15 ,
      marginLeft:1,
      
    }
  
    const fillerStyles = {
      height: '5px',
      width: `${barValue/6}%`,
      backgroundColor: 'lightblue',
      borderRadius: 'inherit',
      transition: 'width 3s ease-in-out',
    }
  
    return (
      <div style={containerStyles}>
        <div style={fillerStyles}>
        </div>
      </div>
    );
  };
  
  export default ProgressBar;