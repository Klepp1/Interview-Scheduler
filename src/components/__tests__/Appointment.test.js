import React from "react";

import { render } from "@testing-library/react";

import Appointment from "components/Appointment/index.js";
import { isTSAnyKeyword } from "@babel/types";

describe('Appointment', () => {
  it('should render without crashing', () => {
    render(< Appointment />);
  })
})