import React from "react";
import { Text, Img, Slider } from "./..";
import AliceCarousel, { EventObject } from "react-alice-carousel";

interface Props {
  className?: string;
  heading?: string;
  loremipsumis?: string;
}

export default function HomeSlider({
  heading = "Heading",
  loremipsumis = "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry&#39;s standard.",
  ...props
}: Props) {
  const [sliderState, setSliderState] = React.useState(0);
  const sliderRef = React.useRef<AliceCarousel>(null);

  return (
    <Slider
      {...props}
      autoPlay
      autoPlayInterval={2000}
      responsive={{ "0": { items: 1 }, "550": { items: 1 }, "1050": { items: 2 } }}
      disableDotsControls
      activeIndex={sliderState}
      onSlideChanged={(e: EventObject) => {
        setSliderState(e?.item);
      }}
      ref={sliderRef}
      items={[...Array(6)].map(() => (
        <React.Fragment key={Math.random()}>
          <Img
            src="images/img_unsplash_vxhpxyqocfq.png"
            alt="unsplash_one"
            className="md:h-auto mx-auto object-cover rounded-[19px]"
          />
        </React.Fragment>
      ))}
    />
  );
}
