import React, { useEffect, useRef } from "react";
import Lottie from "lottie-react";
import loading from "@/assets/loading.json"; // Import your Lottie JSON file

const Loading: React.FC = () => {
  const loadingRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (loadingRef.current) {
      // اضافه کردن event listener به عنصر پس از رندر شدن
      loadingRef.current.addEventListener("animationend", () => {
        // کاری که پس از پایان انیمیشن باید انجام شود
        console.log("Animation ended");
      });
      const divElement = document.getElementById("lottie_parent");
      var svgElement = divElement?.getElementsByTagName("svg")[0];
      //   console.log(svgElement);
      svgElement?.style.removeProperty("transform");
    }
  }, [loadingRef]);

  return (
    <div
      ref={loadingRef}
      className="w-full h-screen max-w-[400px] fixed top-0 flex items-center justify-center z-50 backdrop_blur"
    >
      <Lottie
        animationData={loading}
        className="w-[150px] h-[150px]"
        id="lottie_parent"
        loop={true}
      />
    </div>
  );
};

export default Loading;
