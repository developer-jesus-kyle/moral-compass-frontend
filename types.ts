export enum View {
  AUTH = 'AUTH',
  ONBOARDING = 'ONBOARDING',
  DASHBOARD = 'DASHBOARD',
  INTERVENTION = 'INTERVENTION',
  STUDY_BIBLE = 'STUDY_BIBLE',
  HABIT_MAINTENANCE = 'HABIT_MAINTENANCE',
  PRICING = 'PRICING',
  AI_MENTOR = 'AI_MENTOR',
}

export enum MoralCode {
  TEN_COMMANDMENTS = 'TEN_COMMANDMENTS',
  STOICISM = 'STOICISM',
  PERSONAL_CODE = 'PERSONAL_CODE',
}

export interface UserData {
  moralCode: MoralCode | null;
  psiTriggers: string[];
  pact: string;
  hasOnboarded: boolean;
}

export interface InterventionLog {
  timestamp: number;
  immediateCost: string;
  longTermCost: string;
  alternativeAction: string;
}

export interface WeeklyLog {
  success: string;
  failure: string;
  analysis: string;
}

export type SubscriptionStatus = 'free' | 'premium';

export interface User {
  email: string;
  subscription: SubscriptionStatus;
}