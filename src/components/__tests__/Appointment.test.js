/*
  We are rendering `<Application />` down below, so we need React.createElement
*/
import React from "react";

/*
  We import our helper functions from the react-testing-library
  The render function allows us to render Components
*/
import { render, waitForElement, fireEvent, prettyDOM, getByText } from "@testing-library/react";

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
          getByPlaceholderText,
          queryByText
        } = render(<Application />);
          // const appointments = getAllByTestId("appointment");

        return waitForElement(() => getAllByTestId("appointment")).then(async (res) => {
         
          const appointment = res[0];
          fireEvent.click(getByAltText("Add"));
          fireEvent.change(getByPlaceholderText(/enter student name/i), {
            target: { value: "Lydia Miller-Jones" }
          });

          fireEvent.click(getByAltText("Sylvia Palmer"));

          fireEvent.click(getByText("Save"));
          expect(getByText("Saving...")).toBeInTheDocument();
          await waitForElement(() => getByText("Lydia Miller-Jones"));
          const day = getAllByTestId("day").find(day =>
            queryByText("Monday")
          );
          
          expect(getByText("no spots remaining")).toBeInTheDocument();
        })
      });

      it("loads data, books an interview and reduces the spots remaining for Monday by 1", async () => {
        // 1. Render the Application.
        const { container, getByAltText, getByPlaceholderText, getByText, getAllByTestId, queryByText } = render(<Application />);
        
        // 2. Wait until the text "Archie Cohen" is displayed.
        await waitForElement(() => getByText("Archie Cohen"));
      
        // 3. Click the "Delete" button on the booked appointment.
        fireEvent.click(getByAltText("Delete"));

        // 4. Check that the confirmation message is shown.
        await waitForElement(() => getByText("Delete appointment?"));

        // 5. Click the "Confirm" button on the confirmation.
        fireEvent.click(getByText("Confirm"));

        // 6. Check that the element with the text "Deleting" is displayed.
        await waitForElement(() => getByText("Deleting..."));

        // 7. Wait until the element with the "Add" button is displayed.
        await waitForElement(() => getByAltText("Add"));
        
        // 8. Check that the DayListItem with the text "Monday" also has the text "2 spots remaining".
        const day = getAllByTestId("day").find(day =>
           queryByText("Monday")
        );
        
        console.log("MONDAAY",prettyDOM(day))
        // const {getByTextWithin} = within(day);
        expect(day).toHaveTextContent('1 spot remaining');

      });
      
  });
  
