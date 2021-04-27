import React from "react";

import { render, cleanup } from "@testing-library/react";

import Form from "components/Appointments/Form";

afterEach(cleanup);

describe("Form", () => {
  const interviewers = [
    {
      id: 1,
      name: "Sylvia Palmer",
      avatar: "https://i.imgur.com/LpaY82x.png"
    }
  ];
  
  it("renders without student name if not provided", () => {
    const { getByPlaceholderText, getByTestId } = render(<Form interviewers={interviewers}/>);
    expect(getByPlaceholderText("Enter Student Name")).toHaveValue("");
  });

  it("renders with initial student name", () => {
    const { getByPlaceholderText, getByTestId } = render(<Form interviewers={interviewers}/>);
    expect(getByTestId("student-name-input")).toHaveValue("");
  });
});
