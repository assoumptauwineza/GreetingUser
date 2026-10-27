export type Role = "customer" | "operations" | "service" | "branch" | "admin" | "management";
export type Page =
  | "dashboard" | "meters" | "purchases" | "consumption" | "prediction" | "notifications" | "outages"
  | "customers" | "requests" | "cases" | "users" | "permissions" | "settings" | "audit"
  | "reports" | "network" | "help" | "profile";

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: Role;
  status: "Active" | "Inactive";
  customerId?: string;
  serviceArea?: string;
}

export interface Customer {
  id: string;
  userId: string;
  area: string;
  channel: "In-app" | "SMS (simulated)" | "Email (simulated)";
  status: "Active" | "Pending";
}

export interface Meter {
  id: string;
  customerId: string;
  number: string;
  nickname: string;
  feeder: string;
  transformer: string;
  area: string;
  status: "Linked" | "Pending" | "Rejected";
  balance: number;
}

export interface Purchase {
  id: string;
  meterId: string;
  date: string;
  kwh: number;
  reference: string;
}

export interface Reading {
  id: string;
  meterId: string;
  date: string;
  kwh: number;
}

export type NotificationCategory = "Warning" | "Outage" | "Purchase" | "Account";
export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  category: NotificationCategory;
  timestamp: string;
  read: boolean;
  related: string;
  eventKey: string;
}

export type OutageStatus = "Draft" | "Upcoming" | "Active" | "Completed" | "Cancelled";
export interface Outage {
  id: string;
  title: string;
  description: string;
  reason: string;
  feeder: string;
  transformer: string;
  area: string;
  start: string;
  restoration: string;
  status: OutageStatus;
  version: number;
  notifiedUserIds: string[];
}

export interface SupportCase {
  id: string;
  customerId: string;
  subject: string;
  status: "Open" | "In Progress" | "Resolved";
  priority: "Low" | "Medium" | "High";
  notes: string[];
  updated: string;
}

export interface Audit {
  id: string;
  actor: string;
  action: string;
  detail: string;
  timestamp: string;
}

export interface DemoState {
  users: User[];
  customers: Customer[];
  meters: Meter[];
  purchases: Purchase[];
  readings: Reading[];
  notifications: Notification[];
  outages: Outage[];
  cases: SupportCase[];
  audits: Audit[];
  settings: {
    lowDays: number;
    criticalDays: number;
    inApp: boolean;
    sms: boolean;
    email: boolean;
  };
}
