import React from "react";
import { CategorizeQuestion } from "../../types/form";

type Props = {
  question: CategorizeQuestion;
  onChange: (q: CategorizeQuestion) => void;
};

const Categorize: React.FC<Props> = ({ question, onChange }) => {
  const update = (field: "categories" | "options", value: string) => {
    onChange({
      ...question,
      [field]: value.split(",").map((item) => item.trim()),
    });
  };

  return (
    <div>
      <input
        placeholder="Question Text"
        value={question.questionText}
        onChange={(e) =>
          onChange({ ...question, questionText: e.target.value })
        }
        className="w-full border p-2 rounded mb-3"
      />

      <textarea
        placeholder="Options (comma separated)"
        value={question.options?.join(", ") || ""}
        onChange={(e) => update("options", e.target.value)}
        className="w-full border p-2 rounded mb-3"
      />

      <input
        placeholder="Categories (comma separated)"
        value={question.categories?.join(", ") || ""}
        onChange={(e) => update("categories", e.target.value)}
        className="w-full border p-2 rounded"
      />
    </div>
  );
};

export default Categorize;
