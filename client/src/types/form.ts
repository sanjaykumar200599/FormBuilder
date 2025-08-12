// types/form.ts

// Define the question types
export type QuestionType = "categorize" | "cloze" | "comprehension";

// Base interface for all question types
export interface BaseQuestion {
  id: string;
  type: QuestionType;
  questionText: string; // still required in type, but we'll validate before save
}

// Specific question type: Categorize
export interface CategorizeQuestion extends BaseQuestion {
  type: "categorize";
  categories: string[]; // optional in backend but here we default empty
  options: string[];
}

// Specific question type: Cloze
export interface ClozeQuestion extends BaseQuestion {
  type: "cloze";
  passage: string; // can be empty initially
  blanks: string[];
}

// Specific question type: Comprehension
export interface ComprehensionQuestion extends BaseQuestion {
  type: "comprehension";
  passage: string;
  questions: { question: string; answer: string }[];
}

// Union type for all questions
export type Question =
  | CategorizeQuestion
  | ClozeQuestion
  | ComprehensionQuestion;

// ✅ Form type definition used in Editor and API
export interface Form {
  id?: string;                 // Optional for new forms
  title: string;
  headerImage?: string | null; // Matches Editor state type
  questions: Question[];
}
