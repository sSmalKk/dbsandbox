import React from "react";
import { Img } from "./..";

interface Props {
  className?: string;
  uhomealtoneone?: string;
  ficreditcard?: string;
  vectoroneone?: string;
  vectorthreeone?: string;
  vectoroneone1?: string;
  vectorthreeone1?: string;
  ficompassone?: string;
  fisettingsone?: string;
}

export default function HomeBottombar({
  uhomealtoneone = "images/defaultNoData.png",
  ficreditcard = "images/defaultNoData.png",
  vectoroneone = "images/defaultNoData.png",
  vectorthreeone = "images/defaultNoData.png",
  vectoroneone1 = "images/defaultNoData.png",
  vectorthreeone1 = "images/defaultNoData.png",
  ficompassone = "images/defaultNoData.png",
  fisettingsone = "images/defaultNoData.png",
  ...props
}: Props) {
  return (
    <div {...props}>
      <div className="flex flex-row w-[35%] gap-[27px]">
        <div className="flex flex-row justify-center w-[38%]">
          <div className="flex flex-col items-center justify-start h-[19px] w-[19px]">
            <Img src={uhomealtoneone} alt="uhomealtoneone" className="h-[19px] w-[19px]" />
          </div>
        </div>
        <div className="flex flex-row justify-center w-[38%]">
          <div className="flex flex-col items-center justify-start h-[19px] w-[19px]">
            <Img src={ficreditcard} alt="ficreditcard" className="h-[19px] w-[19px]" />
          </div>
        </div>
      </div>
      <div className="flex flex-row justify-center w-[13%]">
        <div className="flex flex-col items-center justify-start h-[19px] w-[19px] p-0.5">
          <div className="flex flex-col items-center justify-start h-[14px] w-[14px]">
            <div className="flex flex-col h-[14px] w-[14px] gap-[3px]">
              <div className="flex flex-row justify-start w-full gap-[3px]">
                <Img src={vectoroneone} alt="vectoroneone" className="h-[5px] w-[5px]" />
                <Img src={vectorthreeone} alt="vectorthreeone" className="h-[5px] w-[5px]" />
              </div>
              <div className="flex flex-row justify-start w-full gap-[3px]">
                <Img src={vectoroneone1} alt="vectoroneone" className="h-[5px] w-[5px]" />
                <Img src={vectorthreeone1} alt="vectorthreeone" className="h-[5px] w-[5px]" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-row w-[35%] gap-[27px]">
        <div className="flex flex-row justify-center w-[38%]">
          <div className="flex flex-col items-center justify-start h-[19px] w-[19px]">
            <Img src={ficompassone} alt="ficompassone" className="h-[19px] w-[19px]" />
          </div>
        </div>
        <div className="flex flex-row justify-center w-[38%]">
          <div className="flex flex-col items-center justify-start h-[19px] w-[19px]">
            <Img src={fisettingsone} alt="fisettingsone" className="h-[19px] w-[19px]" />
          </div>
        </div>
      </div>
    </div>
  );
}
