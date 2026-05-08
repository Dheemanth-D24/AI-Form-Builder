import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../api";

export default function PublicForm() {
  const { id } = useParams();

  const [form, setForm] = useState(null);
  const [answers, setAnswers] = useState({});

  useEffect(() => {
    API.get(`/forms/${id}`)
      .then(res => setForm(res.data))
      .catch(err => console.error(err));
  }, [id]);

  // HANDLE INPUT CHANGE
  const handleChange = (label, value) => {

    setAnswers({
      ...answers,
      [label]: value
    });
  };

  // SUBMIT FORM
  const submitForm = async () => {

    try {

      await API.post(`/responses/${id}`, answers);

      alert("Response submitted!");

      setAnswers({});

    } catch (err) {

      console.error(err);

      alert("Submission failed");
    }
  };

  if (!form) {
    return <p>Loading...</p>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">

      <div className="max-w-xl mx-auto bg-white p-6 rounded-xl shadow">

        <h1 className="text-3xl font-bold mb-6">
          {form.title}
        </h1>

        {form.fields.map((field, index) => {

          // CONDITIONAL LOGIC
          if (field.conditionalLogic?.field) {

            const dependentValue =
              answers[field.conditionalLogic.field];

            if (
              dependentValue !==
              field.conditionalLogic.value
            ) {
              return null;
            }
          }

          return (

            <div key={index} className="mb-4">

              <label className="block mb-2 font-medium">
                {field.label}
              </label>

              {field.type === "textarea" ? (

                <textarea
                  className="w-full border p-2 rounded"
                  required={field.required}
                  onChange={(e) =>
                    handleChange(
                      field.label,
                      e.target.value
                    )
                  }
                />

              ) : (

                <input
                  type={field.type}
                  className="w-full border p-2 rounded"
                  required={field.required}
                  onChange={(e) =>
                    handleChange(
                      field.label,
                      e.target.value
                    )
                  }
                />

              )}

            </div>

          );
        })}

        <button
          onClick={submitForm}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Submit
        </button>

      </div>

    </div>
  );
}