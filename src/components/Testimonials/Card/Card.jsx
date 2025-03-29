import React from "react";
import "./Card.css";


const Card = ({ title, text, tag }) => {
  return (
    <div className="card">
      <div className="card-header">
        <div className="card-img">
         
        </div>

        <div className="card-data">
          <h2>{title}</h2>
          <p>{tag}</p>
        </div>

        <div className="card-icon">
     
        </div>
      </div>

      <div className="card-text">
        <p>{text}</p>
      </div>
    </div>
  );
};

export default Card;
