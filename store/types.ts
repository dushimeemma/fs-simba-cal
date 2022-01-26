export interface AppState {
  auth: AuthState;
  error: ErrorState;
  events: EventTypes;
}

export interface AuthState {
  isLoading: boolean;
  isAuth: boolean;
  token: string;
  user: UserType | null;
  message: string;
}

export interface EventTypes {
  isLoading: boolean;
  eventTypes: EventType[];
  eventType: EventType | null;
}

export interface UserType {
  user: { username: string; email: string };
}

export interface EventType {
  user: any;
  name: string;
  duration: number;
  events: any[];
  id: number;
}

export interface ErrorState {
  error: string;
}
