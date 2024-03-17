import { CalendarEvent } from 'angular-calendar';
import { EventColor, EventAction } from 'calendar-utils';
import { startOfDay } from 'date-fns';

export class NgCalendarEvent implements CalendarEvent {
  id?: string | number | undefined;
  start: Date;
  end?: Date | undefined;
  title: string;
  color?: EventColor | undefined;
  actions?: EventAction[] | undefined;
  allDay?: boolean | undefined;
  cssClass?: string | undefined;
  resizable?:
    | { beforeStart?: boolean | undefined; afterEnd?: boolean | undefined }
    | undefined;
  draggable?: boolean | undefined;
  meta?: any;

  constructor(data?: {
    start?: any;
    end?: any;
    _id?: any;
    title?: any;
    color?: any;
    draggable?: any;
    resizable?: any;
    actions?: any;
    allDay?: any;
    cssClass?: any;
    meta?: any;
  }) {
    data = data || {};
    this.start = new Date(data.start) || startOfDay(new Date());
    this.end = data.end ? new Date(data.end) : undefined;
    this.id = data._id || '';
    this.title = data.title || '';
    this.color = {
      primary: (data.color && data.color.primary) || '#247ba0',
      secondary: (data.color && data.color.secondary) || '#D1E8FF',
    };
    this.draggable = data.draggable || true;
    this.resizable = {
      beforeStart: (data.resizable && data.resizable.beforeStart) || true,
      afterEnd: (data.resizable && data.resizable.afterEnd) || true,
    };
    this.actions = data.actions || [];
    this.allDay = data.allDay || false;
    this.cssClass = data.cssClass || '';
    this.meta = {
      location: (data.meta && data.meta.location) || '',
      notes: (data.meta && data.meta.notes) || '',
    };
  }
}
