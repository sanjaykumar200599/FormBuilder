// types/form.ts

export type QuestionType = "categorize" | "cloze" | "comprehension";

export interface BaseQuestion {
  id: string;
  type: QuestionType;
  questionText: string;
}

export interface CategorizeQuestion extends BaseQuestion {
  type: "categorize";
  categories: string[];
  options: string[];
}

export interface ClozeQuestion extends BaseQuestion {
  type: "cloze";
  passage: string;
  blanks: string[];
}

export interface ComprehensionQuestion extends BaseQuestion {
  type: "comprehension";
  passage: string;
  questions: { question: string; answer: string }[];
}

export type Question =
  | CategorizeQuestion
  | ClozeQuestion
  | ComprehensionQuestion;

// ✅ This is the missing Form type
export interface Form {
  id?: string;
  title: string;
  description?: string;
  headerImage?: string;
  questions: Question[];
}
