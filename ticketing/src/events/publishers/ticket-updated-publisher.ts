import { Publisher, Subjects, TicketUpdatedEvent } from '@mltickets123/common';

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
  readonly subject = Subjects.TicketUpdated;
}
