import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import {
  Question,
  CategorizeQuestion,
  ClozeQuestion,
  ComprehensionQuestion,
  Form,
} from "../types/form";
import { saveForm } from "../api/formApi";
import HeaderImageUploader from "../components/FormEditor/HeaderImageUploader";
import QuestionCard from "../components/FormEditor/QuestionCard";
import QuestionSelector from "../components/FormEditor/QuestionSelector";

const Editor = () => {
  const [formTitle, setFormTitle] = useState("Untitled Form");
  const [headerImage, setHeaderImage] = useState<string | null>(null);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [showSelector, setShowSelector] = useState(false);

  const addQuestion = (type: string) => {
    let newQuestion: Question;

    switch (type.toLowerCase()) {
      case "categorize":
        newQuestion = {
          id: uuidv4(),
          type: "categorize",
          questionText: "",
          categories: [],
          options: [],
        } as CategorizeQuestion;
        break;
      case "cloze":
        newQuestion = {
          id: uuidv4(),
          type: "cloze",
          questionText: "",
          passage: "",
          blanks: [],
        } as ClozeQuestion;
        break;
      case "comprehension":
        newQuestion = {
          id: uuidv4(),
          type: "comprehension",
          questionText: "",
          passage: "",
          questions: [],
        } as ComprehensionQuestion;
        break;
      default:
        throw new Error("Invalid question type");
    }

    setQuestions([...questions, newQuestion]);
    setShowSelector(false);
  };

  const updateQuestion = (updated: Question) => {
    setQuestions((prev) =>
      prev.map((q) => (q.id === updated.id ? updated : q))
    );
  };

  const handleSave = async () => {
    // ✅ Frontend validation to prevent 400 from backend
    if (!formTitle.trim()) {
      alert("Form title is required");
      return;
    }

    if (questions.length === 0) {
      alert("Please add at least one question");
      return;
    }

    for (const q of questions) {
      if (!q.questionText.trim()) {
        alert("Every question must have a question text");
        return;
      }
    }

    const form: Form = {
      title: formTitle,
      headerImage,
      questions,
    };

    try {
      const saved = await saveForm(form);
      alert("Form saved successfully! Form ID: " + saved._id);
    } catch (err) {
      console.error("Save form error:", err);
      alert("Failed to save form.");
    }
  };

  return (
    <div className="min-h-screen p-6 bg-gray-50">
      <div className="max-w-3xl mx-auto">
        <input
          value={formTitle}
          onChange={(e) => setFormTitle(e.target.value)}
          className="text-3xl font-bold w-full outline-none mb-4 bg-transparent"
        />
        <HeaderImageUploader onUpload={setHeaderImage} image={headerImage} />

        <div className="space-y-6 my-6">
          {questions.map((q) => (
            <QuestionCard key={q.id} question={q} onChange={updateQuestion} />
          ))}
        </div>

        <div className="flex gap-4">
          <button
            onClick={() => setShowSelector(true)}
            className="bg-indigo-600 text-white px-4 py-2 rounded"
          >
            + Add Question
          </button>

          <button
            onClick={handleSave}
            className="bg-green-600 text-white px-4 py-2 rounded"
          >
            Save Form
          </button>
        </div>
      </div>

      {showSelector && (
        <QuestionSelector
          onClose={() => setShowSelector(false)}
          onSelect={addQuestion}
        />
      )}
    </div>
  );
};

export default Editor;
