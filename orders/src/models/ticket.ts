import mongoose from 'mongoose';
import { Order, OrderStatus } from './order';

// An interface that describes the properties
// that are required to create a new Ticket
interface TicketAttrs {
  title: string;
  price: number;
}

// Describes the properties which a saved document has
export interface TicketDoc extends mongoose.Document {
  title: string;
  price: number;
  isReserved(): Promise<boolean>;
}

// Describes the properties which an overall model has
// The Model represents the overall collection
interface TicketModel extends mongoose.Model<TicketDoc> {
  build(attrs: TicketAttrs): TicketDoc;
}

const ticketSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
      },
    },
  }
);

// The statics object is how we add a new method directly to the Ticket model
ticketSchema.statics.build = (attrs: TicketAttrs) => {
  return new Ticket(attrs);
};
// add a new method to the Doument
ticketSchema.methods.isReserved = async function () {
  // this === the ticket document that we just called isReserved on
  const existingOrder = await Order.findOne({
    ticket: this,
    status: {
      $in: [
        OrderStatus.Created,
        OrderStatus.AwaitingPayment,
        OrderStatus.Complete,
      ],
    },
  });

  return !!existingOrder;
};

const Ticket = mongoose.model<TicketDoc, TicketModel>('Ticket', ticketSchema);

export { Ticket };
