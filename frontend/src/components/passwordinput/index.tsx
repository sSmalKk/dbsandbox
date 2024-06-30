import React from "react";
import { Text, Img } from "./..";

interface Props {
  className?: string;
  password?: string;
  password1?: string;
  atleastoneTwo?: string;
}

export default function Home243password({
  password = "Password",
  password1 = "********",
  atleastoneTwo = "At least one Uppercase, one number, one symbol",
  ...props
}: Props) {
  return (
    <div {...props}>
      <Text as="p" className="tracking-[0.50px]">
        {password}
      </Text>
      <div className="flex flex-row justify-start w-full pt-2">
        <div className="flex flex-col items-center justify-start w-full gap-2">
          <div className="flex flex-row justify-between w-full md:px-5 max-w-[300px]">
            <div className="flex flex-row justify-start items-center w-[27%] gap-2.5">
              <div className="flex flex-col items-center justify-start h-[20px] w-[20px]">
                <div className="flex flex-col items-center justify-start h-[20px] w-[20px] p-[3px] bg-blue_gray-900_19 rounded-[50%]">
                  <Img src="images/img_u_padlock.svg" alt="upadlock_one" className="h-[14px] w-[14px]" />
                </div>
              </div>
              <Text as="p" className="tracking-[0.50px]">
                {password1}
              </Text>
            </div>
            <div className="flex flex-col items-center justify-start h-[20px] w-[20px]">
              <div className="flex flex-col items-center justify-start h-[20px] w-[20px] p-[3px] bg-blue_gray-900_19 rounded-[50%]">
                <Img src="images/img_u_eye.svg" alt="ueye_one" className="h-[14px] w-[14px]" />
              </div>
            </div>
          </div>
          <div className="h-px w-full bg-blue_gray-900_19" />
        </div>
      </div>
      <Text size="xs" as="p" className="!font-normal">
        {atleastoneTwo}
      </Text>
    </div>
  );
}
