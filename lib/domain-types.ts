export type UserRole = 'USER' | 'ADMIN';
export type UserPlan = 'FREE' | 'MONTHLY' | 'YEARLY';
export type DocumentStatus = 'PENDING' | 'COMPLETED' | 'FAILED';
export type SubscriptionStatus = 'ACTIVE' | 'CANCELED' | 'PAST_DUE';
export type OrderStatus = 'PENDING' | 'COMPLETED' | 'FAILED' | 'CANCELLED';
export type PaymentMethod = 'CARD' | 'PAYPAL';
export type JobStatus = 'PENDING' | 'PROCESSING' | 'COMPLETED' | 'FAILED';
export type UsageSource = 'EXTRACTION' | 'INVITE_REWARD' | 'SUBSCRIPTION_GRANT' | 'ADMIN_ADJUST';
export type UsageDirection = 'IN' | 'OUT';
export type LlmProvider = 'OPENAI' | 'OPENAI_COMPATIBLE' | 'GEMINI';

export const USER_ROLE = {
  USER: 'USER' as UserRole,
  ADMIN: 'ADMIN' as UserRole,
};

export const USER_PLAN = {
  FREE: 'FREE' as UserPlan,
  MONTHLY: 'MONTHLY' as UserPlan,
  YEARLY: 'YEARLY' as UserPlan,
};

export const DOCUMENT_STATUS = {
  PENDING: 'PENDING' as DocumentStatus,
  COMPLETED: 'COMPLETED' as DocumentStatus,
  FAILED: 'FAILED' as DocumentStatus,
};

export const SUBSCRIPTION_STATUS = {
  ACTIVE: 'ACTIVE' as SubscriptionStatus,
  CANCELED: 'CANCELED' as SubscriptionStatus,
  PAST_DUE: 'PAST_DUE' as SubscriptionStatus,
};

export const ORDER_STATUS = {
  PENDING: 'PENDING' as OrderStatus,
  COMPLETED: 'COMPLETED' as OrderStatus,
  FAILED: 'FAILED' as OrderStatus,
  CANCELLED: 'CANCELLED' as OrderStatus,
};

export const PAYMENT_METHOD = {
  CARD: 'CARD' as PaymentMethod,
  PAYPAL: 'PAYPAL' as PaymentMethod,
};

export const JOB_STATUS = {
  PENDING: 'PENDING' as JobStatus,
  PROCESSING: 'PROCESSING' as JobStatus,
  COMPLETED: 'COMPLETED' as JobStatus,
  FAILED: 'FAILED' as JobStatus,
};

export const USAGE_SOURCE = {
  EXTRACTION: 'EXTRACTION' as UsageSource,
  INVITE_REWARD: 'INVITE_REWARD' as UsageSource,
  SUBSCRIPTION_GRANT: 'SUBSCRIPTION_GRANT' as UsageSource,
  ADMIN_ADJUST: 'ADMIN_ADJUST' as UsageSource,
};

export const USAGE_DIRECTION = {
  IN: 'IN' as UsageDirection,
  OUT: 'OUT' as UsageDirection,
};

export const LLM_PROVIDER = {
  OPENAI: 'OPENAI' as LlmProvider,
  OPENAI_COMPATIBLE: 'OPENAI_COMPATIBLE' as LlmProvider,
  GEMINI: 'GEMINI' as LlmProvider,
};

export const USER_PLAN_VALUES: UserPlan[] = [
  USER_PLAN.FREE,
  USER_PLAN.MONTHLY,
  USER_PLAN.YEARLY,
];

export const LLM_PROVIDER_VALUES: LlmProvider[] = [
  LLM_PROVIDER.OPENAI,
  LLM_PROVIDER.OPENAI_COMPATIBLE,
  LLM_PROVIDER.GEMINI,
];
