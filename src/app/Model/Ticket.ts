import { TicketComment } from "./TicketComment";

export interface Ticket {
    id: number;
    title: string;
    description: string;
    createdDate: Date;
    createdBy: string;
    modifiedDate?: Date;
    modifiedBy?: string;
    assignedTo?: string;
    status: number;
    comments?: TicketComment[];
  }
  