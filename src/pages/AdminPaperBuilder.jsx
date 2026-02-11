import { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";

export default function AdminPaperBuilder() {
  // Form to add new questions
  const [form, setForm] = useState({
    competition: "",
    subject: "",
    topic: "",
    questionText: "",
    options: { A: "", B: "", C: "", D: "" },
    correctOption: "A",
    marks: 1,
    negative: 0.25,
  });

  // All questions added per subject
  const [subjectQuestions, setSubjectQuestions] = useState({}); // { physics: [q1,q2], chemistry: [...] }

  // Subjects for Paper Builder
  const [paperSubjects, setPaperSubjects] = useState([]);

  // Add question to current subjectQuestions
  const addQuestion = () => {
    if (!form.subject || !form.questionText) return;

    const newQuestion = { ...form, id: Date.now() };

    setSubjectQuestions((prev) => {
      const subj = prev[form.subject] || [];
      return { ...prev, [form.subject]: [...subj, newQuestion] };
    });

    // Reset questionText + options
    setForm({ ...form, questionText: "", options: { A: "", B: "", C: "", D: "" } });
  };

  // Move all questions of this subject to Paper Builder
  const addSubjectToPaper = (subject) => {
    if (!subjectQuestions[subject] || subjectQuestions[subject].length === 0) return;

    setPaperSubjects((prev) => [
      ...prev,
      { id: subject, name: subject, questions: subjectQuestions[subject] },
    ]);

    // Clear from subjectQuestions
    setSubjectQuestions((prev) => {
      const copy = { ...prev };
      delete copy[subject];
      return copy;
    });
  };

  // Drag & Drop handling
  const onDragEnd = (result) => {
    const { source, destination } = result;
    if (!destination) return;

    if (source.droppableId === destination.droppableId) {
      const subject = paperSubjects.find((s) => s.id === source.droppableId);
      const newQuestions = Array.from(subject.questions);
      const [moved] = newQuestions.splice(source.index, 1);
      newQuestions.splice(destination.index, 0, moved);

      setPaperSubjects(
        paperSubjects.map((s) =>
          s.id === subject.id ? { ...s, questions: newQuestions } : s
        )
      );
    } else {
      const sourceSubj = paperSubjects.find((s) => s.id === source.droppableId);
      const destSubj = paperSubjects.find((s) => s.id === destination.droppableId);

      const sourceQuestions = Array.from(sourceSubj.questions);
      const destQuestions = Array.from(destSubj.questions);
      const [moved] = sourceQuestions.splice(source.index, 1);
      destQuestions.splice(destination.index, 0, moved);

      setPaperSubjects(
        paperSubjects.map((s) => {
          if (s.id === sourceSubj.id) return { ...s, questions: sourceQuestions };
          if (s.id === destSubj.id) return { ...s, questions: destQuestions };
          return s;
        })
      );
    }
  };

  return (
    <div className="p-6 space-y-6">
      <h2 className="text-2xl font-bold">Admin Paper Builder</h2>

      {/* Step 1: Add Questions */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white p-4 rounded shadow space-y-3">
          <h3 className="font-semibold">Add Questions</h3>

          <select
            className="w-full border p-2 rounded"
            value={form.competition}
            onChange={(e) => setForm({ ...form, competition: e.target.value })}
          >
            <option value="">Select Competition</option>
            <option>JEE</option>
            <option>NEET</option>
            <option>SSC</option>
          </select>

          <select
            className="w-full border p-2 rounded"
            value={form.subject}
            onChange={(e) => setForm({ ...form, subject: e.target.value })}
          >
            <option value="">Select Subject</option>
            <option>Physics</option>
            <option>Chemistry</option>
            <option>Math</option>
            <option>Biology</option>
          </select>

          <input
            className="w-full border p-2 rounded"
            placeholder="Topic"
            value={form.topic}
            onChange={(e) => setForm({ ...form, topic: e.target.value })}
          />

          <textarea
            className="w-full border p-2 rounded"
            placeholder="Question"
            value={form.questionText}
            onChange={(e) => setForm({ ...form, questionText: e.target.value })}
          />

          {["A", "B", "C", "D"].map((opt) => (
            <input
              key={opt}
              className="w-full border p-2 rounded"
              placeholder={`Option ${opt}`}
              value={form.options[opt]}
              onChange={(e) =>
                setForm({
                  ...form,
                  options: { ...form.options, [opt]: e.target.value },
                })
              }
            />
          ))}

          <select
            className="w-full border p-2 rounded"
            value={form.correctOption}
            onChange={(e) => setForm({ ...form, correctOption: e.target.value })}
          >
            <option value="A">A</option>
            <option value="B">B</option>
            <option value="C">C</option>
            <option value="D">D</option>
          </select>

          <input
            type="number"
            className="w-full border p-2 rounded"
            placeholder="Marks"
            value={form.marks}
            onChange={(e) => setForm({ ...form, marks: parseFloat(e.target.value) })}
          />

          <input
            type="number"
            className="w-full border p-2 rounded"
            placeholder="Negative Marks"
            value={form.negative}
            onChange={(e) =>
              setForm({ ...form, negative: parseFloat(e.target.value) })
            }
          />

          <button
            onClick={addQuestion}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Add Question
          </button>

          {/* Preview of added questions */}
          {form.subject && subjectQuestions[form.subject] && (
            <div className="mt-4 space-y-2">
              <h4 className="font-semibold">Preview ({form.subject})</h4>
              {subjectQuestions[form.subject].map((q, i) => (
                <div key={q.id} className="border p-2 rounded bg-gray-50">
                  {i + 1}. {q.questionText} [{q.topic}]
                </div>
              ))}
              <button
                className="mt-2 bg-green-600 text-white px-3 py-1 rounded"
                onClick={() => addSubjectToPaper(form.subject)}
              >
                Add Subject to Paper
              </button>
            </div>
          )}
        </div>

        {/* Step 2: Paper Builder (Drag & Drop) */}
        <div className="bg-gray-50 p-4 rounded shadow">
          <h3 className="font-semibold mb-2">Paper Sections</h3>
          {paperSubjects.length === 0 && (
            <p className="text-gray-400">No subjects added yet</p>
          )}

          <DragDropContext onDragEnd={onDragEnd}>
            <div className="space-y-4">
              {paperSubjects.map((subject) => (
                <Droppable key={subject.id} droppableId={subject.id}>
                  {(provided) => (
                    <div
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                      className="bg-white p-3 rounded shadow"
                    >
                      <h4 className="font-semibold mb-2">{subject.name}</h4>
                      {subject.questions.map((q, index) => (
                        <Draggable key={q.id} draggableId={q.id.toString()} index={index}>
                          {(provided) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              className="border p-2 mb-2 rounded bg-gray-50"
                            >
                              <p>{q.text} [{q.topic}]</p>
                              <div className="flex gap-2 text-sm mt-1">
                                <input
                                  type="number"
                                  className="border p-1 w-16 rounded"
                                  value={q.marks}
                                  onChange={(e) => {
                                    const newVal = parseFloat(e.target.value);
                                    setPaperSubjects((prev) =>
                                      prev.map((s) =>
                                        s.id === subject.id
                                          ? {
                                              ...s,
                                              questions: s.questions.map((qq) =>
                                                qq.id === q.id
                                                  ? { ...qq, marks: newVal }
                                                  : qq
                                              ),
                                            }
                                          : s
                                      )
                                    );
                                  }}
                                />
                                <input
                                  type="number"
                                  className="border p-1 w-16 rounded"
                                  value={q.negative}
                                  onChange={(e) => {
                                    const newVal = parseFloat(e.target.value);
                                    setPaperSubjects((prev) =>
                                      prev.map((s) =>
                                        s.id === subject.id
                                          ? {
                                              ...s,
                                              questions: s.questions.map((qq) =>
                                                qq.id === q.id
                                                  ? { ...qq, negative: newVal }
                                                  : qq
                                              ),
                                            }
                                          : s
                                      )
                                    );
                                  }}
                                />
                              </div>
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              ))}
            </div>
          </DragDropContext>

          {paperSubjects.length > 0 && (
            <button className="mt-4 bg-green-600 text-white px-4 py-2 rounded">
              Save Complete Paper
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
