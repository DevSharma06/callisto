export type Option = {
  id?: number;
  optionText: string;
  correct: boolean;
};

export type Question = {
  id?: number;
  questionText: string;
  explanation?: string;
  categoryID: number;
  options: Option[];
};

export type QuestionCategory = {
  id: number;
  categoryName: string;
  questionCount: number;
};

export type SignupRequest = {
  username: string;
  email: string;
  password: string;
  role: string[];
};

export type LoginRequest = {
  username: string;
  password: string;
};

export type LoginResponse = {
  username: string;
  email: string;
  roles: string[];
  token: string;
  expiresIn: string;
};
