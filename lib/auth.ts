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
    name: 'Sunrise HVAC',
    industry: 'HVAC & Plumbing',
    location: 'Austin, TX',
    phone: '(555) 100-2000',
    email: 'owner@sunrisehvac.com',
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
  {
    id: 'electric',
    name: 'Bright Wire Electric',
    industry: 'Electrical Services',
    location: 'Phoenix, AZ',
    phone: '(602) 555-7740',
    email: 'owner@brightwireelectric.com',
    address: '3200 N 44th St, Suite 150',
    city: 'Phoenix',
    state: 'AZ',
    zip: '85018',
  },
  {
    id: 'peak',
    name: 'Peak Roofing Co.',
    industry: 'Roofing Services',
    location: 'Dallas, TX',
    phone: '(214) 555-9920',
    email: 'owner@peakroofing.com',
    address: '8100 Stemmons Fwy, Suite 300',
    city: 'Dallas',
    state: 'TX',
    zip: '75247',
  },
];

export const users: User[] = [
  {
    id: 'apex-admin',
    name: 'Marcus Webb',
    email: 'owner@sunrisehvac.com',
    password: 'apex2024',
    role: 'admin',
    businessId: 'apex',
    jobTitle: 'Owner',
  },
  {
    id: 'apex-viewer',
    name: 'Sarah Chen',
    email: 'sarah@sunrisehvac.com',
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
    id: 'electric-admin',
    name: 'Lisa Torres',
    email: 'owner@brightwireelectric.com',
    password: 'bright2024',
    role: 'admin',
    businessId: 'electric',
    jobTitle: 'Owner',
  },
  {
    id: 'peak-admin',
    name: 'Ryan Kowalski',
    email: 'owner@peakroofing.com',
    password: 'peak2024',
    role: 'admin',
    businessId: 'peak',
    jobTitle: 'Owner',
  },
];

export function findUser(email: string, password: string): User | null {
  return users.find(u => u.email.toLowerCase() === email.toLowerCase() && u.password === password) ?? null;
}

export function getBusiness(id: string): Business | undefined {
  return businesses.find(b => b.id === id);
}
