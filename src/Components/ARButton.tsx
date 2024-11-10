import React from "react";

interface ARButtonProps {
  onActivateAR: () => void;
}

const ARButton: React.FC<ARButtonProps> = ({ onActivateAR }) => {
  return <button onClick={onActivateAR}>Activar Realidad Aumentada</button>;
};

export default ARButton;
