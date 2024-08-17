import React from "react";
import Lottie from "lottie-react";
import animationData from "./../../public/loading.json";

interface LottieProps {
  height?: number;
  width?: number;
}

const LottiePlayer: React.FC<LottieProps> = ({ height = 150, width = 150 }) => {
  return (
    <div
      className="w-full h-screen overflow-hidden flex items-center justify-center fixed top-0 left-0"
      style={{ backdropFilter: "blur(20px)" }}
    >
      <Lottie
        animationData={animationData}
        className={`w-[${width}] h-[${height}]`}
        id="lottie_parent"
        loop={true}
      />
    </div>
  );
};

export default LottiePlayer;
