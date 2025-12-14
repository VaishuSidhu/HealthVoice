/**
 * API Service for HealthVoice Backend
 * Handles all API calls to the Flask backend
 */

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

/**
 * Generic API request function
 */
async function apiRequest<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`;
  
  const defaultOptions: RequestInit = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  };

  const response = await fetch(url, {
    ...defaultOptions,
    ...options,
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: 'Unknown error' }));
    throw new Error(error.error || error.details || `HTTP error! status: ${response.status}`);
  }

  return response.json();
}

/**
 * Health Log API
 */
export const healthLogApi = {
  /**
   * Create a new health log from voice note text
   */
  create: async (prompt: string, userId?: string) => {
    return apiRequest<{
      message: string;
      log_id: string;
      summary: string;
    }>('/api/health-logs', {
      method: 'POST',
      body: JSON.stringify({ prompt, user_id: userId }),
    });
  },
};

/**
 * Dashboard API
 */
export const dashboardApi = {
  /**
   * Get dashboard overview data
   */
  getOverview: async (userId?: string) => {
    const url = userId ? `/api/dashboard/overview?user_id=${userId}` : '/api/dashboard/overview';
    return apiRequest<{
      today_symptoms: string[];
      mental_state: string;
      medications_logged: string[];
      health_consistency: {
        streak_days: number;
        total_logs: number;
        last_log_date: string | null;
        unique_days_logged: number;
      };
      logs_today: number;
      timestamp: string;
    }>(url);
  },
};

/**
 * Insights API
 */
export const insightsApi = {
  /**
   * Get structured health insights
   */
  getInsights: async (days: number = 7, userId?: string) => {
    const url = userId 
      ? `/api/insights?days=${days}&user_id=${userId}` 
      : `/api/insights?days=${days}`;
    return apiRequest<{
      symptoms_detected: Array<{
        symptom: string;
        frequency: number;
        percentage: number;
      }>;
      mental_emotional_state: {
        primary_mood: string;
        mood_distribution: Record<string, number>;
        total_mood_mentions: number;
      };
      medications_timing: Array<{
        medication: string;
        mentions: number;
      }>;
      lifestyle_context: {
        sleep: {
          average_hours: number | null;
          mentions: number;
        };
        exercise: {
          mentions: number;
          frequency: string;
        };
        stress: {
          mentions: number;
          frequency: string;
        };
      };
      analysis_period: {
        days: number;
        start_date: string;
        end_date: string;
        total_logs: number;
      };
    }>(`/api/insights?days=${days}`);
  },
};

/**
 * Summary API
 */
export const summaryApi = {
  /**
   * Get doctor-ready clinical summary
   */
  getSummary: async (days: number = 30, userId?: string) => {
    const url = userId 
      ? `/api/summary?days=${days}&user_id=${userId}` 
      : `/api/summary?days=${days}`;
    return apiRequest<{
      summary: string;
      period_days: number;
      total_logs: number;
      generated_at: string;
    }>(`/api/summary?days=${days}`);
  },
};

/**
 * Trends API
 */
export const trendsApi = {
  /**
   * Get health trends analysis
   */
  getTrends: async (days: number = 30, userId?: string) => {
    const url = userId 
      ? `/api/trends?days=${days}&user_id=${userId}` 
      : `/api/trends?days=${days}`;
    return apiRequest<{
      symptom_frequency: Array<{
        symptom: string;
        total_occurrences: number;
        frequency_percentage: number;
        trend: string;
      }>;
      mood_trends: Array<{
        mood: string;
        occurrences: number;
        percentage: number;
      }>;
      medication_adherence: {
        total_mentions: number;
        unique_medications: number;
        medications: Array<{
          name: string;
          mentions: number;
          adherence_score: number;
        }>;
      };
      daily_breakdown: Array<{
        date: string;
        symptoms_count: number;
        unique_symptoms: number;
        mood: string | null;
        medications_count: number;
      }>;
      period_days: number;
      total_logs: number;
      analysis_date: string;
    }>(`/api/trends?days=${days}`);
  },
};

/**
 * Health check API
 */
export const healthApi = {
  /**
   * Check if backend is healthy
   */
  check: async () => {
    return apiRequest<{
      status: string;
      timestamp: string;
    }>('/health');
  },
};

/**
 * Reports API
 */
export const reportsApi = {
  /**
   * Download health report as PDF file
   */
  downloadReport: async (days: number = 30, type: string = 'summary', userId?: string, format: string = 'pdf') => {
    const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
    const userParam = userId ? `&user_id=${userId}` : '';
    const formatParam = `&format=${format}`;
    const url = `${API_BASE_URL}/api/reports/download?days=${days}&type=${type}${userParam}${formatParam}`;
    
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      // Get filename from Content-Disposition header or generate one
      const contentDisposition = response.headers.get('Content-Disposition');
      const fileExtension = format === 'pdf' ? 'pdf' : 'txt';
      let filename = `healthvoice_report_${new Date().toISOString().split('T')[0]}.${fileExtension}`;
      if (contentDisposition) {
        const filenameMatch = contentDisposition.match(/filename="?(.+)"?/);
        if (filenameMatch) {
          filename = filenameMatch[1];
        }
      }
      
      // Get blob and create download link
      const blob = await response.blob();
      const downloadUrl = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(downloadUrl);
      
      return { success: true, filename };
    } catch (error) {
      throw new Error(error instanceof Error ? error.message : 'Failed to download report');
    }
  },
};

