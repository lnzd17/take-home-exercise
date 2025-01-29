import React from "react";
import "../App.css";


const Characteristic = ({char, handlClick, isSelected}) => {
  return(
    <>
        <button onClick={handlClick} className={`characteristic-tag ${isSelected ? 'selected' : ''}`} name={char}>
            {char}
        </button>
    </>
  );
};

export default Characteristic;
