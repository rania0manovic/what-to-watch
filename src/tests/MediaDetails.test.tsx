import React from "react";
import { render } from "@testing-library/react";
import { test, describe } from "@jest/globals";
import MediaDetails from "../components/modules/media-details/MediaDetails.tsx";
import { BrowserRouter } from "react-router-dom";
import "@testing-library/jest-dom";

describe("MediaDetails", () => {
  test("Renders media detials without crashing.", () => {
    window.scrollTo = jest.fn();
    render(
      <BrowserRouter>
        <MediaDetails></MediaDetails>
      </BrowserRouter>,
    );
  });
});
