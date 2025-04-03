import Image from "next/image";
import WebConfig from "@/app/config/WebConfig";

export function Banner() {
  return (
    <div className={"relative w-full lg:h-[200px] md:h-[150px]"}>
      <img
        src={WebConfig.getBanner}
        alt={"Banner"}
        className={"object-fill w-full h-full"}
      />
    </div>
  );
}
