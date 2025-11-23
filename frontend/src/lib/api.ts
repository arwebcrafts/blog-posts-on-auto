import axios from 'axios';

// Use relative URLs in production to leverage Next.js rewrites
// In development with separate servers, use NEXT_PUBLIC_API_URL
const API_URL = process.env.NEXT_PUBLIC_API_URL || '';

// Create axios instance
export const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests
api.interceptors.request.use((config) => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

// Handle auth errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      if (typeof window !== 'undefined') {
        localStorage.removeItem('token');
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

// Auth API
export const authAPI = {
  signup: (data: { email: string; password: string; name?: string }) =>
    api.post('/api/auth/signup', data),

  login: (data: { email: string; password: string }) =>
    api.post('/api/auth/login', data),

  getMe: () =>
    api.get('/api/auth/me'),

  updateProfile: (data: { name?: string; email?: string }) =>
    api.put('/api/auth/profile', data),

  changePassword: (data: { currentPassword: string; newPassword: string }) =>
    api.put('/api/auth/change-password', data),
};

// Website API
export const websiteAPI = {
  list: () =>
    api.get('/api/websites'),

  create: (data: { url: string; name?: string | null; platform?: string }) =>
    api.post('/api/websites', data),

  get: (id: string) =>
    api.get(`/api/websites/${id}`),

  scan: (id: string) =>
    api.post(`/api/websites/${id}/scan`),

  delete: (id: string) =>
    api.delete(`/api/websites/${id}`),
};

// Post API
export const postAPI = {
  list: (params?: { status?: string; websiteId?: string }) =>
    api.get('/api/posts', { params }),

  get: (id: string) =>
    api.get(`/api/posts/${id}`),

  generateTitles: (data: { websiteId: string; count?: number }) =>
    api.post('/api/posts/generate-titles', data),

  generate: (data: {
    websiteId: string;
    title: string;
    keyword: string;
    wordCount: number;
    tone: string;
    generateImage?: boolean;
    guestLink?: { url: string; anchor: string; placements: number };
  }) =>
    api.post('/api/posts/generate', data),

  update: (id: string, data: any) =>
    api.put(`/api/posts/${id}`, data),

  schedule: (id: string, scheduledAt: string) =>
    api.post(`/api/posts/${id}/schedule`, { scheduledAt }),

  publish: (id: string) =>
    api.post(`/api/posts/${id}/publish`),

  delete: (id: string) =>
    api.delete(`/api/posts/${id}`),

  bulkCreate: (data: {
    websiteId: string;
    keywords: string[];
    wordCount: number;
    tone: string;
    generateImages: boolean;
    schedule: {
      frequency: string;
      startDate: string;
      time: string;
    };
  }) =>
    api.post('/api/posts/bulk-create', data),
};

// Keyword API
export const keywordAPI = {
  list: () =>
    api.get('/api/keywords'),

  add: (keyword: string) =>
    api.post('/api/keywords', { keyword }),

  research: (seedKeyword: string) =>
    api.post('/api/keywords/research', { seedKeyword }),

  analyzeSERP: (keyword: string) =>
    api.post('/api/keywords/serp', { keyword }),

  delete: (id: string) =>
    api.delete(`/api/keywords/${id}`),
};

// Backlink API
export const backlinkAPI = {
  list: () =>
    api.get('/api/backlinks'),

  check: (domain: string) =>
    api.post('/api/backlinks/check', { domain }),

  summary: (domain: string) =>
    api.get(`/api/backlinks/summary?domain=${domain}`),
};

// Knowledge Base API
export const knowledgeBaseAPI = {
  list: () =>
    api.get('/api/knowledge-base'),

  saveBusinessInfo: (data: {
    businessType?: string;
    industry?: string;
    targetAudience?: string;
    brandVoice?: string;
    products?: string;
    services?: string;
    values?: string;
  }) =>
    api.post('/api/knowledge-base/business-info', data),

  upload: (formData: FormData) =>
    api.post('/api/knowledge-base/upload', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    }),

  delete: (id: string) =>
    api.delete(`/api/knowledge-base/${id}`),
};

// Integration API
export const integrationAPI = {
  list: () =>
    api.get('/api/integrations'),

  connect: (data: {
    websiteId: string;
    platform: string;
    credentials: any;
  }) =>
    api.post('/api/integrations/connect', data),

  test: (websiteId: string) =>
    api.post(`/api/integrations/${websiteId}/test`),

  disconnect: (websiteId: string) =>
    api.delete(`/api/integrations/${websiteId}`),
};

// Chat API
export const chatAPI = {
  getSessions: () =>
    api.get('/api/chat/sessions'),

  getMessages: (sessionId: string) =>
    api.get(`/api/chat/sessions/${sessionId}/messages`),

  sendMessage: (sessionId: string | null, message: string) =>
    api.post('/api/chat/send', { sessionId, message }),
};

// Stripe API
export const stripeAPI = {
  createSubscription: (data: {
    priceId: string;
    paymentMethodId: string;
  }) =>
    api.post('/api/stripe/create-subscription', data),

  cancelSubscription: () =>
    api.post('/api/stripe/cancel-subscription'),

  changePlan: (priceId: string) =>
    api.post('/api/stripe/change-plan', { priceId }),

  getBillingPortal: () =>
    api.post('/api/stripe/billing-portal', {
      returnUrl: window.location.origin + '/dashboard/settings',
    }),
};

export default api;
