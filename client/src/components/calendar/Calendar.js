import React, { Component } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";

import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = momentLocalizer(moment);

class TaskCalendar extends Component {
  state = {
    tasks: [
      {
        start: new Date(),
        end: new Date(moment().add(1, "days")),
        title: "Shit to do"
      }
    ]
  };

  render() {
    return (
        <div className="Calendar">
          <Calendar
            localizer={localizer}
            defaultDate={new Date()}
            defaultView="month"
            events={this.state.tasks}
            style={{ height: "100vh" }}
          />
        </div>
    );
  }
}

export default TaskCalendar;