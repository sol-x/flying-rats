import React from "react";
import App from "./App";
import {render, waitForElement} from "@testing-library/react";
import fetchMock from "fetch-mock";
import {API_URL} from "./constants";

beforeAll(() => {
  // @ts-ignore
  global.fetch = fetch;
});

afterAll(() => {
  fetchMock.restore();
});

it("rads select renders successfully", async () => {
  fetchMock.restore().get(`begin:${API_URL}`, ['rat 1', 'rat 2']);

  const { getByTestId, getByText } = render(<App />);
  const ratSelectNode = await waitForElement(() =>
    getByTestId('rat-select')
  );
  expect(ratSelectNode).toMatchSnapshot();
  expect(getByText('No Rat')).toBeDefined();
  expect(getByText('rat 1')).toBeDefined();
});
