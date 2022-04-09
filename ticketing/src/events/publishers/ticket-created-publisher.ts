import { Publisher, Subjects, TicketCreatedEvent } from '@mltickets123/common';

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
  readonly subject = Subjects.TicketCreated;
}
