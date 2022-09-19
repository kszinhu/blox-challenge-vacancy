import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import NotFound from "..";

global.React = React;

describe("<NotFound />", () => {
  it("should render the page", () => {
    render(
      <MemoryRouter initialEntries={["/some-page"]}>
        <Routes>
          <Route path='/' element={<div data-testid='home'>home</div>} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </MemoryRouter>
    );

    expect(
      screen.getByText("The page you are looking for does not exist.")
    ).toBeInTheDocument();
  });

  it("should redirect to the home page when clicking on the link", async () => {
    render(
      <MemoryRouter initialEntries={["/not-found"]}>
        <Routes>
          <Route path='/' element={<div data-testid='home'>home</div>} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </MemoryRouter>
    );
    const user = userEvent.setup();
    expect(screen.queryByTestId("home")).not.toBeInTheDocument();

    await user.click(screen.getByText("Go to home"));
    expect(screen.getByTestId("home")).toBeInTheDocument();
  });
});
