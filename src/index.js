import React from "react";
import ReactDOM from "react-dom";

import "index.scss";

import Application from "components/Application";

const appointments = [
    {
      id: 1,
      time: "12pm",
    },
    {
      id: 2,
      time: "1pm",
      interview: {
        student: "Lydia Miller-Jones",
        interviewer: {
          id: 1,
          name: "Sylvia Palmer",
          avatar: "https://i.imgur.com/LpaY82x.png",
        }
      }
    },
    {
      id: 3,
      time: "2pm",
      interview: {
        student: "Amanda Bynes",
        interviewer: {
          id: 2,
          name: "Jamie Oliver",
          avatar: "https://i.imgur.com/LpaY82x.png",
        }
      }
    }
  ];
ReactDOM.render(<Application appointments={appointments} />, document.getElementById("root"));
