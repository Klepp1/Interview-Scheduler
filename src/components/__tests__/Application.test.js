import React from "react";

import { render, cleanup, waitForElement, getByText, fireEvent, prettyDOM, getAllByTestId, getByAltText, getByPlaceholderText, queryByText, mockRejectedValueOnce } from "@testing-library/react";

import Application from "components/Application";
import { exportAllDeclaration } from "@babel/types";
import axios from 'axios';

afterEach(cleanup);
describe('Application', () => {
  it("defaults to Monday and changes the schedule when a new day is selected", async () => {
    const { getByText } = render(< Application />);
    await waitForElement(() => getByText('Monday'))
  
    fireEvent.click(getByText('Tuesday'));
  
    expect(getByText('Leopold Silvers')).toBeInTheDocument();
  });
  it("loads data, books an interview and reduces the spots remaining for Monday by 1", async () => {
    const { container, debug } = render(<Application />);
  
    await waitForElement(() => getByText(container, "Archie Cohen"));
  
    const appointments = getAllByTestId(container, "appointment");
    const appointment = appointments[0];
  
    fireEvent.click(getByAltText(appointment, "Add"));
  
    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: { value: "Lydia Miller-Jones" }
    });
  
    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));
    fireEvent.click(getByText(appointment, "Save"));
  
    expect(getByText(appointment, "Saving")).toBeInTheDocument();
  
    await waitForElement(() => getByText(appointment, "Lydia Miller-Jones"));
  
    const day = getAllByTestId(container, "day").find(day =>
      queryByText(day, "Monday")
    );
  
    expect(getByText(day, "no spots remaining")).toBeInTheDocument();
  });
  it('loads data, cancels an interview and increases the spots remaining for Monday by 1', async () => {
    const { container, debug } = render(<Application />);

    await waitForElement(() => getByText(container, "Archie Cohen"));

    const appointment = getAllByTestId(container, 'appointment').find(
      appointment => queryByText(appointment, 'Archie Cohen')
    );

    fireEvent.click(getByAltText(appointment, 'Delete'));

    expect(getByText(appointment, 'are you sure you want to delete?')).toBeInTheDocument();

    fireEvent.click(getByText(appointment, 'Confirm'));

    expect(getByText(appointment, 'Deleting')).toBeInTheDocument();

    await waitForElement(() => getByAltText(appointment, "Add"));

    const day = getAllByTestId(container, "day").find(day =>
      queryByText(day, "Monday")
    );

    expect(getByText(day, '2 spots remaining')).toBeInTheDocument();
  });
  it('loads data, edits an interview and keeps the spots remaining for Monday the same', async () => {
    const { container, debug } = render(<Application />);

    await waitForElement(() => getByText(container, "Archie Cohen"));

    const appointment = getAllByTestId(container, 'appointment').find(
      appointment => queryByText(appointment, 'Archie Cohen')
    );

    fireEvent.click(getByAltText(appointment, 'Edit'));
    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: { value: "Lydia Miller-Jones" }
    });

    fireEvent.click(getByText(appointment, 'Save'));

    await waitForElement(() => getByText(appointment, 'Lydia Miller-Jones'))

    const day = getAllByTestId(container, "day").find(day =>
      queryByText(day, "Monday")
    );

    expect(getByText(day, '1 spot remaining')).toBeInTheDocument();
  });
  it('shows the save error when failing to save an appointment', async () => {

    axios.put.mockRejectedValueOnce();

    const { container, debug } = render(<Application />);
  
    await waitForElement(() => getByText(container, "Archie Cohen"));

    const appointments = getAllByTestId(container, "appointment");
    const appointment = appointments[0];
  
    fireEvent.click(getByAltText(appointment, "Add"));
    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: { value: "Lydia Miller-Jones" }
    });
  
    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));
    fireEvent.click(getByText(appointment, "Save"));

    await waitForElement(() => getByText(appointment, 'Failed to save!'));

    expect(getByText(appointment, "Failed to save!")).toBeInTheDocument();
  })
  it('shows deleting error when trying to delete and existing appointment', async () => {
    axios.delete.mockRejectedValueOnce();

    const { container, debug } = render(<Application />);

    await waitForElement(() => getByText(container, "Archie Cohen"));

    const appointment = getAllByTestId(container, 'appointment').find(
      appointment => queryByText(appointment, 'Archie Cohen')
    );
    fireEvent.click(getByAltText(appointment, 'Delete'));
    fireEvent.click(getByText(appointment, 'Confirm'));
   
    await waitForElement(() => getByText(appointment, 'Failed to delete!'));

    expect(getByText(appointment, "Failed to delete!")).toBeInTheDocument();
  })
});
