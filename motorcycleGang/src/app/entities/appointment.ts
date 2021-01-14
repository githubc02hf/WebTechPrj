import { Customer } from "./customer";

export class Appointment {

    id: number;
    firstName: string;
    lastName: string;
    customer: Customer;
    preferredDate: string;
    issue: string;
  }