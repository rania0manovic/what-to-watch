import React from "react";
import { render } from "@testing-library/react";
import Catalog from "../components/modules/home-page/Catalog.tsx";
import { BrowserRouter } from "react-router-dom";
import { test, describe } from "@jest/globals";

describe("Catalog", () => {
  test("Renders catalog without crashing.", () => {
    render(
      <BrowserRouter>
        <Catalog></Catalog>
      </BrowserRouter>,
    );
  });
});
