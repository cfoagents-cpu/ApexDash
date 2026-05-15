export type UserRole = 'admin' | 'viewer';

export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  role: UserRole;
  businessId: string;
  jobTitle: string;
}

export interface Business {
  id: string;
  name: string;
  industry: string;
  location: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  state: string;
  zip: string;
}

export const businesses: Business[] = [
  {
    id: 'apex',
    name: 'Apex Home Services',
    industry: 'HVAC & Plumbing',
    location: 'Austin, TX',
    phone: '(555) 100-2000',
    email: 'owner@apexhome.com',
    address: '4821 Commerce Dr, Suite 200',
    city: 'Austin',
    state: 'TX',
    zip: '78701',
  },
  {
    id: 'ridge',
    name: 'Blue Ridge Plumbing',
    industry: 'Plumbing Services',
    location: 'Denver, CO',
    phone: '(720) 555-3400',
    email: 'owner@blueridge.com',
    address: '1820 Blake St, Suite 110',
    city: 'Denver',
    state: 'CO',
    zip: '80202',
  },
];

export const users: User[] = [
  {
    id: 'apex-admin',
    name: 'Apex Owner',
    email: 'owner@apexhome.com',
    password: 'apex2024',
    role: 'admin',
    businessId: 'apex',
    jobTitle: 'Owner',
  },
  {
    id: 'apex-viewer',
    name: 'Sarah Chen',
    email: 'sarah@apexhome.com',
    password: 'sarah123',
    role: 'viewer',
    businessId: 'apex',
    jobTitle: 'Lead Technician',
  },
  {
    id: 'ridge-admin',
    name: 'Tom Bradley',
    email: 'owner@blueridge.com',
    password: 'ridge2024',
    role: 'admin',
    businessId: 'ridge',
    jobTitle: 'Owner',
  },
  {
    id: 'ridge-viewer',
    name: 'Jake Torres',
    email: 'jake@blueridge.com',
    password: 'jake123',
    role: 'viewer',
    businessId: 'ridge',
    jobTitle: 'Operations Manager',
  },
];

export function findUser(email: string, password: string): User | null {
  return users.find(u => u.email.toLowerCase() === email.toLowerCase() && u.password === password) ?? null;
}

export function getBusiness(id: string): Business | undefined {
  return businesses.find(b => b.id === id);
}
