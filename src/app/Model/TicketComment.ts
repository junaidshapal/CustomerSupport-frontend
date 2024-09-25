
//Class for ticketComment
export interface TicketComment{
    id: number;
    ticketId: number;
    commentMessage: string;
    createdBy:string;
    createdOn: Date;
    modifiedBy: string;
    modifiedOn: Date;
}