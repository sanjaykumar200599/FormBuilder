import React from "react";
import { Question } from "../../types/form";
import Categorize from "../QuestionTypes/Categorize";
import Cloze from "../QuestionTypes/Cloze";
import Comprehension from "../QuestionTypes/Compreshension";


type Props = {
  question: Question;
  onChange: (q: Question) => void;
};

const QuestionCard: React.FC<Props> = ({ question, onChange }) => {
  const renderQuestion = () => {
    switch (question.type) {
      case "categorize":
        return <Categorize question={question} onChange={onChange} />;
      case "cloze":
        return <Cloze question={question} onChange={onChange} />;
      case "comprehension":
        return <Comprehension question={question} onChange={onChange} />;
      default:
        return null;
    }
  };

  return (
    <div className="border rounded p-4 bg-white shadow">
      {renderQuestion()}
    </div>
  );
};

export default QuestionCard;
