import React from "react";
import { render } from "@testing-library/react";
import { test, describe } from "@jest/globals";
import Carousel from "../components/modules/media-details/Carousel.tsx";

describe("Carousel", () => {
  test("Renders carousel without crashing.", () => {
    const photos = [
      "https://picsum.photos/200/300",
      "https://picsum.photos/id/237/200/300",
      "https://picsum.photos/seed/picsum/200/300",
    ];
    render(<Carousel photos={photos}></Carousel>);
  });
});
