/*
  We are rendering `<Application />` down below, so we need React.createElement
*/
import React from "react";

/*
  We import our helper functions from the react-testing-library
  The render function allows us to render Components
*/
import { render, waitForElement, fireEvent, prettyDOM } from "@testing-library/react";

/*
  We import the component that we are testing
*/
import Application from "components/Application";
import Appointment from "components/Appointments/index";
/*
  A test that renders a React Component
*/
//Group related tests with describe()
describe("Appointment", () => {
    it("defaults to Monday and changes the schedule when a new day is selected", () => {
        const { getByText, queryByText } = render(<Application />);

        //Wait for element returns a promise
        return waitForElement(() => getByText("Monday")).then(() => {
          fireEvent.click(getByText("Tuesday"));
          expect(getByText("Leopold Silvers")).toBeInTheDocument();
        });
      });

      it("loads data, books an interview and reduces the spots remaining for the first day by 1", () => {
        
        //Wait for element returns a promise
        const { 
          container, 
          getByText, 
          getAllByTestId, 
          getByAltText, 
          getByPlaceholderText
        } = render(<Application />);
          // const appointments = getAllByTestId("appointment");

        return waitForElement(() => getAllByTestId("appointment")).then((res) => {
          // console.log(prettyDOM(appointments));
          const appointment = res[0];
          fireEvent.click(getByAltText("Add"));
          console.log(prettyDOM(res[0]))
        })
      });
  });
  
