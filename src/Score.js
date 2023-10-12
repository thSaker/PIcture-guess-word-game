import React from "react";

function Score({ score }) {
  return (
    <div style={{fontSize: "30px", fontWeight: "600"}}>
      <p>Score: {score}</p>
    </div>
  );
}

export default Score;
