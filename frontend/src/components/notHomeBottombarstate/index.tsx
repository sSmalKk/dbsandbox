import React from "react";
import { Text, Img } from "./..";

interface Props {
  className?: string;
  equipedItem?: string;
  equipeditem?: string;
}

export default function HomeBottombarstate({ equipedItem, equipeditem = "equiped item", ...props }: Props) {
  return (
    <div {...props}>
      <div className="flex flex-col items-center justify-start h-[32px] w-[32px] p-[7px] bg-blue_gray-900_19 rounded-[50%]">
        {!!equipedItem ? <Img src={equipedItem} alt="equiped_item" className="h-[17px] w-[17px]" /> : null}
      </div>
      <Text size="s" as="p" className="tracking-[1.50px] uppercase !font-medium">
        {equipeditem}
      </Text>
    </div>
  );
}
