import React from "react";
import { fireEvent, render } from "@testing-library/react";
import { test, describe, expect } from "@jest/globals";
import Tabs from "../components/modules/home-page/Tabs.tsx";
import "@testing-library/jest-dom/jest-globals";

describe("Tabs", () => {
  test("Renders tabs without crashing.", () => {
    render(<Tabs></Tabs>);
  });
  test("Changes tabs when clicked", () => {
    const { getByTestId } = render(<Tabs />);
    const moviesTab = getByTestId("tab_1");
    const showsTab = getByTestId("tab_0");
    fireEvent.click(moviesTab);
    expect(moviesTab).toHaveClass("active");
    expect(showsTab).not.toHaveClass("active");
    fireEvent.click(showsTab);
    expect(showsTab).toHaveClass("active");
    expect(moviesTab).not.toHaveClass("active");
  });
});
