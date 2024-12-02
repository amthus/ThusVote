export interface Vote {
  id: string;
  campaignId: string;
  userId: string;
  choice: string;
  timestamp: Date;
}

export interface Campaign {
  id: string;
  title: string;
  description: string;
  startDate: Date;
  endDate: Date;
  choices: string[];
  isPaid: boolean;
  price?: number;
  createdBy: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'user';
}