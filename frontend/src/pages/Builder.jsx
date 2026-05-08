import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../api";

export default function Builder() {
  const { id } = useParams();

  const [form, setForm] = useState({
    title: "",
    fields: []
  });

  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    API.get(`/forms/${id}`)
      .then(res => setForm(res.data))
      .catch(err => console.error(err));
  }, [id]);

  // ADD FIELD
  const addField = () => {
    setForm({
      ...form,
      fields: [
        ...form.fields,
        {
          type: "text",
          label: "New Field",
          required: false,
          conditionalLogic: {
            field: "",
            value: ""
          }
        }
      ]
    });
  };

  // DELETE FIELD
  const deleteField = (index) => {
    const updated = form.fields.filter((_, i) => i !== index);

    setForm({
      ...form,
      fields: updated
    });
  };

  // MOVE UP
  const moveUp = (index) => {
    if (index === 0) return;

    const updated = [...form.fields];

    [updated[index], updated[index - 1]] =
      [updated[index - 1], updated[index]];

    setForm({
      ...form,
      fields: updated
    });
  };

  // MOVE DOWN
  const moveDown = (index) => {
    if (index === form.fields.length - 1) return;

    const updated = [...form.fields];

    [updated[index], updated[index + 1]] =
      [updated[index + 1], updated[index]];

    setForm({
      ...form,
      fields: updated
    });
  };

  // SAVE FORM
  const saveForm = async () => {
    try {

      await API.put(`/forms/${id}`, form);

      alert("Form Saved!");

    } catch (err) {

      console.error(err);
    }
  };

  // AI GENERATE
  const generateAI = async () => {

    if (!prompt) {
      return alert("Enter AI prompt");
    }

    try {

      setLoading(true);

      const res = await API.post("/ai/generate", {
        prompt
      });

      setForm({
        ...form,
        title: res.data.title,
        fields: res.data.fields
      });

    } catch (err) {

      console.error(err);

      alert("AI failed");

    } finally {

      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">

      {/* FORM TITLE */}
      <div className="bg-white p-6 rounded-xl shadow mb-6">

        <input
          value={form.title}
          onChange={(e) =>
            setForm({
              ...form,
              title: e.target.value
            })
          }
          className="text-3xl font-bold w-full outline-none"
          placeholder="Form Title"
        />

      </div>

      {/* AI SECTION */}
      <div className="bg-white p-6 rounded-xl shadow mb-6 flex gap-3">

        <input
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Generate form using AI..."
          className="border p-3 rounded w-full"
        />

        <button
          onClick={generateAI}
          className="bg-purple-500 text-white px-5 rounded"
        >
          {loading ? "Generating..." : "AI Generate"}
        </button>

      </div>

      {/* ADD FIELD */}
      <button
        onClick={addField}
        className="bg-blue-500 text-white px-4 py-2 rounded mb-6"
      >
        + Add Field
      </button>

      {/* FIELDS */}
      <div className="space-y-4">

        {form.fields.map((field, index) => (

          <div
            key={index}
            className="bg-white p-5 rounded-xl shadow"
          >

            {/* LABEL */}
            <input
              value={field.label}
              onChange={(e) => {

                const updated = [...form.fields];

                updated[index].label = e.target.value;

                setForm({
                  ...form,
                  fields: updated
                });
              }}
              className="border p-2 rounded w-full mb-4"
            />

            {/* FIELD TYPE */}
            <select
              value={field.type}
              onChange={(e) => {

                const updated = [...form.fields];

                updated[index].type = e.target.value;

                setForm({
                  ...form,
                  fields: updated
                });
              }}
              className="border p-2 rounded mb-4"
            >
              <option value="text">Text</option>
              <option value="email">Email</option>
              <option value="number">Number</option>
              <option value="textarea">Textarea</option>
            </select>

            {/* REQUIRED */}
            <div className="mb-4">

              <label className="flex items-center gap-2">

                <input
                  type="checkbox"
                  checked={field.required}
                  onChange={(e) => {

                    const updated = [...form.fields];

                    updated[index].required =
                      e.target.checked;

                    setForm({
                      ...form,
                      fields: updated
                    });
                  }}
                />

                Required

              </label>

            </div>

            {/* CONDITIONAL LOGIC */}
            <div className="mt-4">

              <p className="font-semibold mb-2">
                Conditional Logic
              </p>

              {/* FIELD */}
              <input
                type="text"
                placeholder="Show when field..."
                value={field.conditionalLogic?.field || ""}
                onChange={(e) => {

                  const updated = [...form.fields];

                  updated[index].conditionalLogic = {
                    ...updated[index].conditionalLogic,
                    field: e.target.value
                  };

                  setForm({
                    ...form,
                    fields: updated
                  });
                }}
                className="border p-2 rounded w-full mb-2"
              />

              {/* VALUE */}
              <input
                type="text"
                placeholder="Equals value..."
                value={field.conditionalLogic?.value || ""}
                onChange={(e) => {

                  const updated = [...form.fields];

                  updated[index].conditionalLogic = {
                    ...updated[index].conditionalLogic,
                    value: e.target.value
                  };

                  setForm({
                    ...form,
                    fields: updated
                  });
                }}
                className="border p-2 rounded w-full"
              />

            </div>

            {/* ACTIONS */}
            <div className="flex gap-2 mt-4">

              <button
                onClick={() => moveUp(index)}
                className="bg-gray-300 px-3 py-1 rounded"
              >
                ↑
              </button>

              <button
                onClick={() => moveDown(index)}
                className="bg-gray-300 px-3 py-1 rounded"
              >
                ↓
              </button>

              <button
                onClick={() => deleteField(index)}
                className="bg-red-500 text-white px-3 py-1 rounded"
              >
                Delete
              </button>

            </div>

          </div>

        ))}

      </div>

      {/* SAVE */}
      <button
        onClick={saveForm}
        className="bg-green-500 text-white px-6 py-3 rounded mt-6"
      >
        Save Form
      </button>

    </div>
  );
}