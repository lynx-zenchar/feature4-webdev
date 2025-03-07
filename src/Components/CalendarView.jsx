//// filepath: ./Components/CalendarView.jsx

import React from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";

// Setup localizer for react-big-calendar using moment
const localizer = momentLocalizer(moment);

function CalendarView({ tasks }) {
  // Convert tasks to events for the calendar view
  const events = tasks.map((task) => {
    const start = task.date ? new Date(task.date) : new Date(task.startDate);
    const end = task.endDate ? new Date(task.endDate) : start;
    return {
      id: task.id,
      title: task.taskName,
      start,
      end,
    };
  });

  return (
    <div>
      <h2>Calendar View</h2>
      {tasks.length === 0 ? (
        <p>No tasks scheduled.</p>
      ) : (
        <div className="row">
          {/*
            react-big-calendar will display a month view.
            Plugins and customizations can be added for a more detailed view.
          */}
          <div style={{ height: "80vh" }}>
            <Calendar
              localizer={localizer}
              events={events}
              startAccessor="start"
              endAccessor="end"
              defaultView="month"
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default CalendarView;
