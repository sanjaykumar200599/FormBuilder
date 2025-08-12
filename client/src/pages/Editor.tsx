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
import { Plus, Save, Zap, Database, FileText, Activity } from "lucide-react";

const Editor = () => {
  const [formTitle, setFormTitle] = useState("Untitled Form");
  const [headerImage, setHeaderImage] = useState<string | null>(null);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [showSelector, setShowSelector] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

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
      setIsSaving(true);
      console.log("Payload being sent:", form);
      const saved = await saveForm(form);
      alert("Form saved successfully! Form ID: " + saved._id);
    } catch (err) {
      console.error("Save form error:", err);
      alert("Failed to save form.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(34,211,238,0.3)_1px,transparent_0)] bg-[size:20px_20px]" />
      </div>

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-cyan-400 rounded-full opacity-20 animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
              animationDuration: `${2 + Math.random() * 3}s`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 p-8">
        <div className="max-w-4xl mx-auto">
          <style>{`
            .editor-container input,
            .editor-container textarea,
            .editor-container select {
              background-color: white !important;
              border: 1px solid rgba(75, 85, 99, 0.5) !important;
              color: black !important;
              border-radius: 8px !important;
              padding: 12px !important;
              font-size: 14px !important;
              transition: all 0.3s ease !important;
            }

            .editor-container input:focus,
            .editor-container textarea:focus,
            .editor-container select:focus {
              background-color: white !important;
              border-color: rgba(34, 211, 238, 0.6) !important;
              box-shadow: 0 0 0 3px rgba(34, 211, 238, 0.1) !important;
              outline: none !important;
              color: black !important;
            }

            .editor-container input::placeholder,
            .editor-container textarea::placeholder {
              color: rgba(107, 114, 128, 0.7) !important;
            }

            .editor-container option {
              background-color: white !important;
              color: black !important;
            }

            /* Force black text for any Tailwind text-white elements inside inputs */
            .editor-container .text-white {
              color: black !important;
            }
          `}</style>

          <div className="editor-container">
            {/* Header */}
            <div className="mb-8">
              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center gap-2">
                  <Activity className="text-cyan-400" size={24} />
                  <span className="text-cyan-400 font-mono text-sm">
                    FORM_EDITOR.SYS
                  </span>
                </div>
                <div className="flex-1 h-px bg-gradient-to-r from-cyan-500/30 to-transparent" />
                <div className="flex items-center gap-4 text-sm text-gray-400">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                    <span>ONLINE</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Database size={16} />
                    <span>{questions.length} QUESTIONS</span>
                  </div>
                </div>
              </div>

              {/* Title input */}
              <div className="relative mb-2">
                <input
                  value={formTitle}
                  onChange={(e) => setFormTitle(e.target.value)}
                  className="w-full border-none outline-none placeholder-gray-500 font-mono tracking-wide !text-black !bg-white"
                  placeholder="Enter form title..."
                />
                <div
                  className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 transition-all duration-300"
                  style={{
                    width: `${Math.min((formTitle.length / 50) * 100, 100)}%`,
                  }}
                />
              </div>
              <div className="text-cyan-400 text-sm font-mono mb-8">
                {formTitle.length}/50 characters
              </div>
            </div>

            <HeaderImageUploader onUpload={setHeaderImage} image={headerImage} />

            {/* Questions */}
            <div className="space-y-8 my-8">
              {questions.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-xl font-semibold mb-4 text-cyan-400 font-mono tracking-wider">
                    QUESTIONS_ARRAY [{questions.length}]
                  </h3>
                  <div className="h-px bg-gradient-to-r from-cyan-500/50 via-blue-500/50 to-purple-500/50 mb-6" />
                </div>
              )}

              {questions.map((q, index) => (
                <div key={q.id} className="relative">
                  <div className="absolute -left-12 top-4 w-8 h-8 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-full flex items-center justify-center text-sm font-bold shadow-lg z-10">
                    {index + 1}
                  </div>
                  <div className="editor-form-wrapper">
                    <QuestionCard question={q} onChange={updateQuestion} />
                  </div>
                </div>
              ))}

              {questions.length === 0 && (
                <div className="text-center py-16 border-2 border-dashed border-gray-600 rounded-xl bg-gray-800/30">
                  <FileText
                    className="mx-auto mb-4 text-gray-500"
                    size={48}
                  />
                  <p className="text-gray-400 text-lg mb-2">
                    No questions added yet
                  </p>
                  <p className="text-gray-500 text-sm">
                    Click "Add Question" to get started
                  </p>
                </div>
              )}
            </div>

            {/* Buttons */}
            <div className="sticky bottom-8 z-20">
              <div className="bg-gray-900/90 backdrop-blur-xl border border-gray-700 rounded-2xl p-6 shadow-2xl">
                <div className="flex gap-4 justify-center">
                  <button
                    onClick={() => setShowSelector(true)}
                    className="primary-button group relative bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-8 py-4 rounded-xl font-semibold hover:from-cyan-400 hover:to-blue-500 transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-cyan-500/25 flex items-center gap-3"
                  >
                    <Plus size={20} />
                    <span>Add Question</span>
                    <div className="absolute inset-0 bg-white/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </button>

                  <button
                    onClick={handleSave}
                    disabled={isSaving}
                    className="secondary-button group relative bg-gradient-to-r from-green-500 to-emerald-600 text-white px-8 py-4 rounded-xl font-semibold hover:from-green-400 hover:to-emerald-500 transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-green-500/25 flex items-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                  >
                    {isSaving ? (
                      <>
                        <div className="animate-spin w-5 h-5 border-2 border-white/30 border-t-white rounded-full" />
                        <span>Saving...</span>
                      </>
                    ) : (
                      <>
                        <Save size={20} />
                        <span>Save Form</span>
                      </>
                    )}
                    <div className="absolute inset-0 bg-white/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </button>
                </div>

                <div className="mt-4 flex justify-center items-center gap-6 text-sm text-gray-400">
                  <div className="flex items-center gap-2">
                    <Zap size={16} className="text-yellow-400" />
                    <span>Auto-save enabled</span>
                  </div>
                  <div className="w-px h-4 bg-gray-600" />
                  <div className="flex items-center gap-2">
                    <span>Last modified: {new Date().toLocaleTimeString()}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {showSelector && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-gray-900/95 border border-cyan-500/30 rounded-2xl shadow-2xl shadow-cyan-500/20 backdrop-blur-xl">
            <QuestionSelector
              onClose={() => setShowSelector(false)}
              onSelect={addQuestion}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Editor;
