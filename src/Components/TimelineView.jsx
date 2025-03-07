//// filepath: ./Components/TimelineView.jsx

import React from "react";
import { Gantt } from "gantt-task-react";
import "gantt-task-react/dist/index.css";

function TimelineView({ tasks }) {
  // Filter and map tasks into Gantt format. Tasks lacking valid dates are filtered out.
  const ganttTasks = tasks
    .map((task) => {
      const startDateTime =
        task.startDate && !isNaN(Date.parse(task.startDate))
          ? new Date(task.startDate)
          : task.date && !isNaN(Date.parse(task.date))
          ? new Date(task.date)
          : null;
      // Skip tasks without a valid start date
      if (!startDateTime) return null;
      const endDateTime =
        task.endDate && !isNaN(Date.parse(task.endDate))
          ? new Date(task.endDate)
          : startDateTime;
      return {
        id: String(task.id),
        name: task.taskName,
        start: startDateTime,
        end: endDateTime,
        type: "task",
        progress: 100, // Static for now; can be dynamic
        isDisabled: false,
        styles: { progressColor: "#ffbb54", progressSelectedColor: "#ff9e0d" },
      };
    })
    .filter((t) => t !== null);

  return (
    <div>
      <h2>Timeline View (Gantt Chart)</h2>
      {ganttTasks.length === 0 ? (
        <p>No tasks loaded.</p>
      ) : (
        <Gantt tasks={ganttTasks} />
      )}
    </div>
  );
}

export default TimelineView;
