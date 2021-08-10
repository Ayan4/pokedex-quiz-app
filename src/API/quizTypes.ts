export type Option = {
  id: string;
  content: string;
  isAnswer: boolean;
};

export type Question = {
  id: string;
  question: string;
  points: number;
  negativePoints: number;
  options: Option[];
  clickedOption: string | null;
};

export type Quiz = {
  id: string;
  name: string;
  coverImageUrl: string;
  totalScore: number;
  questions: Question[];
};

export type ServerError = {
  errorMessage: string;
};
