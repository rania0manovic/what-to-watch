import React from "react";
import { render, fireEvent } from "@testing-library/react";
import SearchBar from "../components/common/SearchBar.tsx";
import { test, describe, expect } from "@jest/globals";
import catalogStore from "../components/stores/CatalogStore.tsx";
import "@testing-library/jest-dom/jest-globals";

describe("SearchBar", () => {
  jest.mock("../components/stores/CatalogStore", () => ({
    ...jest.requireActual("../components/stores/CatalogStore"),
    updateSearch: jest.fn(),
  }));

  test("Renders input field and focuses it.", () => {
    const { getByTestId } = render(<SearchBar />);
    const inputElement = getByTestId("searchBar");
    expect(inputElement).toBeInTheDocument();
    expect(document.activeElement).toBe(inputElement);
  });

  test("Typing in input field updates search value.", () => {
    const { getByTestId } = render(<SearchBar />);
    const inputElement = getByTestId("searchBar");
    fireEvent.change(inputElement, { target: { value: "test" } });
    setTimeout(() => {
      expect(catalogStore.updateSearch).toHaveBeenCalledWith("test");
    }, 1000);
  });

  test("Clicking clear button clears input field.", () => {
    const { getByTestId } = render(<SearchBar />);
    const inputElement = getByTestId("searchBar");
    const clearButton = getByTestId("clearButton");
    fireEvent.change(inputElement, { target: { value: "test" } });
    fireEvent.click(clearButton);
    setTimeout(() => {
      expect(catalogStore.updateSearch).toHaveBeenCalledWith("");
    }, 1000);
  });

  test("Clear button is not visible when search is empty.", () => {
    catalogStore.search = "";
    const { queryByTestId } = render(<SearchBar />);
    expect(queryByTestId("clearButton")).toBeNull();
  });

  test("Clear button is visible when search is not empty.", () => {
    catalogStore.search = "test";
    const { getByTestId } = render(<SearchBar />);
    expect(getByTestId("clearButton")).toBeInTheDocument();
  });
});
