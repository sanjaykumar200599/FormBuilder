// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import { Form, Question } from "@/types/form";
// import { getFormById } from "@/api/formApi";

// const FillFormPage = () => {
//   const { formId } = useParams();
//   const [form, setForm] = useState<Form | null>(null);
//   const [responses, setResponses] = useState<Record<string, string>>({});

//   useEffect(() => {
//     const fetchForm = async () => {
//       if (!formId) return;
//       const data = await getFormById(formId);
//       setForm(data);
//     };
//     fetchForm();
//   }, [formId]);

//   const handleChange = (qId: string, value: string) => {
//     setResponses((prev) => ({ ...prev, [qId]: value }));
//   };

//   const handleSubmit = () => {
//     console.log("Responses submitted:", responses);
//     // TODO: Send responses to backend
//   };

//   if (!form) return <div className="p-6">Loading...</div>;

//   return (
//     <div className="max-w-3xl mx-auto p-6">
//       {form.headerImage && (
//         <img
//           src={form.headerImage}
//           alt="Header"
//           className="w-full h-64 object-cover rounded mb-4"
//         />
//       )}
//       <h1 className="text-3xl font-bold mb-6">{form.title}</h1>

//       {form.questions.map((q: Question, index) => (
//         <div key={q.id} className="mb-6">
//           <p className="font-medium mb-2">
//             Q{index + 1}: {q.title}
//           </p>
//           <input
//             type="text"
//             value={responses[q.id] || ""}
//             onChange={(e) => handleChange(q.id, e.target.value)}
//             className="w-full border p-2 rounded"
//           />
//         </div>
//       ))}

//       <button
//         onClick={handleSubmit}
//         className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
//       >
//         Submit
//       </button>
//     </div>
//   );
// };

// export default FillFormPage;
