import React from "react";

type Props = {
  onClose: () => void;
  onSelect: (type: string) => void;
};

const questionTypes = [
  { type: "Categorize", description: "Sort items into groups" },
  { type: "Cloze", description: "Fill-in-the-blank question" },
  { type: "Comprehension", description: "Answer questions from passage" },
];

const QuestionSelector: React.FC<Props> = ({ onClose, onSelect }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg w-96 relative">
        <h2 className="text-xl font-bold mb-4">Select Question Type</h2>

        <div className="space-y-3">
          {questionTypes.map((q) => (
            <div
              key={q.type}
              onClick={() => onSelect(q.type)}
              className="border p-3 rounded hover:bg-gray-100 cursor-pointer"
            >
              <strong>{q.type}</strong>
              <p className="text-sm text-gray-600">{q.description}</p>
            </div>
          ))}
        </div>

        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-black"
          onClick={onClose}
        >
          ✕
        </button>
      </div>
    </div>
  );
};

export default QuestionSelector;
