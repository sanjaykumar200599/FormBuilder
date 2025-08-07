import React from "react";
import { ComprehensionQuestion } from "../../types/form";

type Props = {
  question: ComprehensionQuestion;
  onChange: (q: ComprehensionQuestion) => void;
};

const Comprehension: React.FC<Props> = ({ question, onChange }) => {
  const updatePassage = (value: string) => {
    onChange({ ...question, passage: value });
  };

  const updateQA = (index: number, field: "question" | "answer", value: string) => {
    const updated = [...question.questions];
    updated[index][field] = value;
    onChange({ ...question, questions: updated });
  };

  const addQA = () => {
    const updated = [...question.questions, { question: "", answer: "" }];
    onChange({ ...question, questions: updated });
  };

  return (
    <div>
      <textarea
        placeholder="Comprehension passage"
        value={question.passage}
        onChange={(e) => updatePassage(e.target.value)}
        className="w-full border p-2 rounded mb-3"
      />

      {question.questions.map((qa, idx) => (
        <div key={idx} className="mb-3">
          <input
            placeholder={`Question ${idx + 1}`}
            value={qa.question}
            onChange={(e) => updateQA(idx, "question", e.target.value)}
            className="w-full border p-2 rounded mb-2"
          />
          <input
            placeholder="Answer"
            value={qa.answer}
            onChange={(e) => updateQA(idx, "answer", e.target.value)}
            className="w-full border p-2 rounded"
          />
        </div>
      ))}

      <button
        onClick={addQA}
        className="mt-2 px-4 py-2 bg-blue-500 text-white rounded"
      >
        Add Question
      </button>
    </div>
  );
};

export default Comprehension;
