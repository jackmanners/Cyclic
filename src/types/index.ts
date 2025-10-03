export interface Task {
  id: string;
  title: string;
  description: string;
  icon: string;
  category: string;
  tags: string[];
  endpoint?: string;
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
}

export interface TaskCategory {
  id: string;
  name: string;
  icon: string;
  tasks: Task[];
}

export interface ApiRequest {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  url: string;
  headers: Record<string, string>;
  body?: string;
}

export interface ApiResponse {
  status: number;
  statusText: string;
  headers: Record<string, string>;
  body: string;
}

export interface Participant {
  id: string;
  withings_email: string;
  withings_user_id: number;
  study_id: string;
  created_at: string;
  modified_at: string;
}

export interface ParticipantsResponse {
  participants: Participant[];
}