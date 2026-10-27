import type { DemoState, Reading, Role } from "./types";

export const roleLabels: Record<Role, string> = {
  customer: "Prepaid Customer",
  operations: "Outage Operations",
  service: "Customer Service",
  branch: "Service Area Staff",
  admin: "System Administrator",
  management: "REG Management",
};

const iso = (daysAgo: number, hour = 8) => {
  const date = new Date();
  date.setDate(date.getDate() - daysAgo);
  date.setHours(hour, 0, 0, 0);
  return date.toISOString();
};

const consumption = (meterId: string, offset: number): Reading[] =>
  Array.from({ length: 45 }, (_, index) => ({
    id: `r-${meterId}-${index}`,
    meterId,
    date: iso(44 - index),
    kwh: Number((3.1 + ((index * 7 + offset) % 10) * 0.46 + (index % 6 === 0 ? 1.8 : 0)).toFixed(1)),
  }));

export function createInitialState(): DemoState {
  const users: DemoState["users"] = [
    { id: "u-c1", name: "Assoumpta Uwineza", email: "customer@demo.reg.rw", phone: "+250 788 100 101", role: "customer", status: "Active", customerId: "c1" },
    { id: "u-c2", name: "Eric Mugisha", email: "eric@demo.reg.rw", phone: "+250 788 100 102", role: "customer", status: "Active", customerId: "c2" },
    { id: "u-c3", name: "Claudine Uwera", email: "claudine@demo.reg.rw", phone: "+250 788 100 103", role: "customer", status: "Active", customerId: "c3" },
    { id: "u-op", name: "Patrick Habimana", email: "operations@demo.reg.rw", phone: "+250 788 200 101", role: "operations", status: "Active" },
    { id: "u-cs", name: "Diane Mukamana", email: "service@demo.reg.rw", phone: "+250 788 200 102", role: "service", status: "Active" },
    { id: "u-br", name: "Samuel Rukundo", email: "gasabo.branch@demo.reg.rw", phone: "+250 788 200 105", role: "branch", status: "Active", serviceArea: "Gasabo" },
    { id: "u-ad", name: "Jean Nshimiyimana", email: "admin@demo.reg.rw", phone: "+250 788 200 103", role: "admin", status: "Active" },
    { id: "u-mg", name: "Aline Ingabire", email: "management@demo.reg.rw", phone: "+250 788 200 104", role: "management", status: "Active" },
  ];
  return {
    users,
    customers: [
      { id: "c1", userId: "u-c1", area: "Gasabo", channel: "In-app", status: "Active" },
      { id: "c2", userId: "u-c2", area: "Kicukiro", channel: "SMS (simulated)", status: "Active" },
      { id: "c3", userId: "u-c3", area: "Nyarugenge", channel: "Email (simulated)", status: "Active" },
    ],
    meters: [
      { id: "m1", customerId: "c1", number: "041 885 294 10", nickname: "Home", feeder: "KCY-FDR-A", transformer: "KCY-TX-014", area: "Gasabo", status: "Linked", balance: 48.6 },
      { id: "m2", customerId: "c1", number: "041 885 294 22", nickname: "Shop", feeder: "KCY-FDR-B", transformer: "KCY-TX-022", area: "Gasabo", status: "Linked", balance: 21.3 },
      { id: "m3", customerId: "c2", number: "052 118 804 16", nickname: "Residence", feeder: "KIC-FDR-C", transformer: "KIC-TX-009", area: "Kicukiro", status: "Linked", balance: 72.4 },
      { id: "m4", customerId: "c3", number: "063 224 198 04", nickname: "Family home", feeder: "NYA-FDR-A", transformer: "NYA-TX-031", area: "Nyarugenge", status: "Linked", balance: 9.2 },
      { id: "m5", customerId: "c3", number: "063 224 198 18", nickname: "New meter", feeder: "NYA-FDR-B", transformer: "NYA-TX-036", area: "Nyarugenge", status: "Pending", balance: 0 },
    ],
    purchases: [
      { id: "p1", meterId: "m1", date: iso(4), kwh: 42.8, reference: "DEMO-MOMO-1082" },
      { id: "p2", meterId: "m1", date: iso(20), kwh: 85.6, reference: "DEMO-AIRTEL-0871" },
      { id: "p3", meterId: "m2", date: iso(11), kwh: 32.4, reference: "DEMO-MOMO-1044" },
      { id: "p4", meterId: "m3", date: iso(8), kwh: 64.2, reference: "DEMO-BANK-4421" },
      { id: "p5", meterId: "m4", date: iso(24), kwh: 28.5, reference: "DEMO-MOMO-0982" },
    ],
    readings: [...consumption("m1", 1), ...consumption("m2", 4), ...consumption("m3", 6), ...consumption("m4", 8)],
    notifications: [
      { id: "n1", userId: "u-c1", title: "Planned outage tomorrow", message: "Maintenance is scheduled for the KCY-FDR-A network section.", category: "Outage", timestamp: iso(0, 9), read: false, related: "KCY-FDR-A", eventKey: "seed-outage" },
      { id: "n2", userId: "u-c1", title: "Purchase recorded", message: "Your simulated purchase of 42.8 kWh was added to Home.", category: "Purchase", timestamp: iso(4), read: true, related: "041 885 294 10", eventKey: "purchase-p1" },
      { id: "n3", userId: "u-c1", title: "Account verified", message: "Your customer account and Home meter are verified.", category: "Account", timestamp: iso(12), read: true, related: "Home", eventKey: "account-c1" },
      { id: "n4", userId: "u-c3", title: "Low balance warning", message: "Family home has an estimated balance of 9.2 kWh.", category: "Warning", timestamp: iso(1), read: false, related: "063 224 198 04", eventKey: "low-m4" },
    ],
    outages: [
      { id: "o1", title: "Kacyiru feeder maintenance", description: "Preventive maintenance on distribution equipment.", reason: "Preventive maintenance", feeder: "KCY-FDR-A", transformer: "All connected points", area: "Gasabo", start: iso(-1, 9), restoration: iso(-1, 13), status: "Upcoming", version: 1, notifiedUserIds: ["u-c1"] },
      { id: "o2", title: "Kicukiro network upgrade", description: "Capacity upgrade for the network section.", reason: "Network upgrade", feeder: "KIC-FDR-C", transformer: "KIC-TX-009", area: "Kicukiro", start: iso(8, 8), restoration: iso(8, 12), status: "Completed", version: 2, notifiedUserIds: ["u-c2"] },
      { id: "o3", title: "Nyarugenge inspection", description: "Routine safety inspection.", reason: "Safety inspection", feeder: "NYA-FDR-A", transformer: "NYA-TX-031", area: "Nyarugenge", start: iso(-5, 10), restoration: iso(-5, 12), status: "Draft", version: 1, notifiedUserIds: [] },
    ],
    cases: [
      { id: "CASE-1042", customerId: "c1", subject: "Balance estimate query", status: "Open", priority: "Medium", notes: ["Customer requested an explanation of the balance estimate."], updated: iso(1) },
      { id: "CASE-1038", customerId: "c3", subject: "Meter linking verification", status: "In Progress", priority: "High", notes: ["Ownership document simulated for academic demonstration."], updated: iso(2) },
      { id: "CASE-1029", customerId: "c2", subject: "Notification preference", status: "Resolved", priority: "Low", notes: ["Preference updated to simulated SMS."], updated: iso(7) },
    ],
    audits: [
      { id: "a1", actor: "Patrick Habimana", action: "Published outage", detail: "Kacyiru feeder maintenance targeted KCY-FDR-A.", timestamp: iso(0, 8) },
      { id: "a2", actor: "Diane Mukamana", action: "Updated support case", detail: "CASE-1038 moved to In Progress.", timestamp: iso(2) },
      { id: "a3", actor: "Jean Nshimiyimana", action: "Saved notification settings", detail: "Simulated in-app and SMS channels enabled.", timestamp: iso(3) },
    ],
    settings: { lowDays: 3, criticalDays: 1, inApp: true, sms: true, email: false },
  };
}
