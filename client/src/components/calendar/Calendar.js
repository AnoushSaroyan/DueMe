import React, { Component } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import MainHeader from '../main_header/MainHeader'

import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = momentLocalizer(moment);
const DnDCalendar = withDragAndDrop(Calendar);

class TaskCalendar extends Component {
  constructor(props){
    super(props)
    this.state = {
      events: [
        {
          start: new Date("10-07-2019"),
          end: new Date("10-07-2019"),
          title: "Shit to do"
        },
        // {
        //   start: new Date("10-11-2019"),
        //   end: new Date("10-12-2019"),
        //   title: "Other shit to do"
        // }
      ]
    };
  }

  onEventResize = ({start, end}) => {
    this.setState(state => {
      this.state.events[0].start = start;
      this.state.events[0].end = end;
      return { events: this.state.events };
    });
  };

  onEventDrop = ({ event, start, end, allDay }) => {
    console.log(start);
  };

  render() {
    return (
        <div className="Calendar">
          <MainHeader page={"Calendar"}/>
          <DnDCalendar
            localizer={localizer}
            defaultDate={new Date()}
            defaultView="month"
            events={this.state.events}
            style={{ height: "100vh" }}
            onEventDrop={this.onEventDrop}
            onEventResize={this.onEventResize}
            resizable
          />
        </div>
    );
  }
}

export default TaskCalendar;