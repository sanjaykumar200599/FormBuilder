import React from "react";
import { ClozeQuestion } from "../../types/form";

type Props = {
  question: ClozeQuestion;
  onChange: (q: ClozeQuestion) => void;
};

const Cloze: React.FC<Props> = ({ question, onChange }) => {
  const updateField = (field: keyof ClozeQuestion, value: any) => {
    onChange({
      ...question,
      [field]: value,
    });
  };

  return (
    <div>
      <textarea
        placeholder="Enter passage with blanks like: I ____ to the market."
        value={question.passage}
        onChange={(e) => updateField("passage", e.target.value)}
        className="w-full border p-2 rounded mb-3"
      />

      <input
        placeholder="Blanks (comma separated)"
        value={question.blanks?.join(", ") || ""}
        onChange={(e) =>
          updateField(
            "blanks",
            e.target.value.split(",").map((b) => b.trim())
          )
        }
        className="w-full border p-2 rounded"
      />
    </div>
  );
};

export default Cloze;
