"use client";
import {
  Day,
  Week,
  Month,
  Agenda,
  ScheduleComponent,
  Inject,
  Resize,
  DragAndDrop,
} from "@syncfusion/ej2-react-schedule";

import { useRef } from "react";
import { useSession } from "next-auth/react";

export default function SchedulerComponent({ scheduleData }) {
  const { data: session } = useSession();
  const scheduleObj = useRef(null);
  const eventSettings = { dataSource: scheduleData };

  const defaultEvent = {
    Id: "",
    Subject: "",
    StartTime: "",
    EndTime: "",
    IsAllDay: false,
    userId: session?.user?.id,
  };

  let newEvent = defaultEvent;

  const createEvent = async () => {
    try {
      await fetch("/api/scheduler", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newEvent),
      });
        // router.refresh();
    } catch (error) {
      console.error(error);
    }
  };

  const deleteEvent = async (id) => {
      try {
        await fetch('/api/scheduler', {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({_id: id}),
        });
        // router.refresh();
      } catch (error) {
        console.error(error);
      }
    }


  const onResizeStart = (args) => {
    args.scroll = { enable: false };
  };



  const onActionComplete = (args) => {
    if (args.requestType === "toolBarItemRendered") {
      // This block is execute after toolbarItem render
    }
    if (args.requestType === "dateNavigate") {
      // This block is executed after previous and next navigation
    }
    if (args.requestType === "viewNavigate") {
      // This block is execute after view navigation
    }
    if (args.requestType === "eventCreated") {
      // This block is execute after an appointment create
      console.log("Event Created");
      const addedEvent = args.addedRecords[0];

      newEvent = {
        ...defaultEvent,
        Id: addedEvent.Id,
        Subject: addedEvent.Subject,
        StartTime: addedEvent.StartTime,
        EndTime: addedEvent.EndTime,
        IsAllDay: addedEvent.IsAllDay,
      };

      createEvent();
    }
    if (args.requestType === "eventChanged") {
      // This block is execute after an appointment change
      console.log("Event Updated");
      const updatedEvent = args.changedRecords[0];

      newEvent = {
        ...defaultEvent,
        _id: updatedEvent._id,
        Id: updatedEvent.Id,
        Subject: updatedEvent.Subject,
        StartTime: updatedEvent.StartTime,
        EndTime: updatedEvent.EndTime,
        IsAllDay: updatedEvent.IsAllDay,
      };

      createEvent();
    }
    if (args.requestType === "eventRemoved") {
      // This block is execute after an appointment remove
      console.log("Event Deleted");
    
      const deletedEvent = args.deletedRecords[0];
        
      deleteEvent(deletedEvent._id)

    }
  };

  return (
    <ScheduleComponent
        width='100%'
      height="500px"
      eventSettings={eventSettings}
      resizeStart={onResizeStart}
      ref={scheduleObj}
      actionComplete={onActionComplete.bind(this)}
    >
      <Inject services={[Day, Week, Month, Agenda, Resize, DragAndDrop]} />
    </ScheduleComponent>
  );
}
