import { useEffect, useState } from "react";
import API from "../api";
import { useNavigate, Link } from "react-router-dom";

export default function Dashboard() {
  const [forms, setForms] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/");
      return;
    }

    fetchForms();
  }, []);

  // FETCH FORMS
  const fetchForms = async () => {
    try {
      const res = await API.get("/forms");
      setForms(res.data);

    } catch (err) {
      console.error(err);
    }
  };

  // CREATE NEW FORM
  const createForm = async () => {
    try {
      const res = await API.post("/forms", {
        title: "Untitled Form",
        fields: []
      });

      navigate(`/builder/${res.data._id}`);

    } catch (err) {
      console.error(err);
    }
  };

  // DELETE FORM
  const deleteForm = async (id) => {

    const confirmDelete =
      window.confirm("Delete this form?");

    if (!confirmDelete) return;

    try {

      await API.delete(`/forms/${id}`);

      setForms(forms.filter(f => f._id !== id));

    } catch (err) {

      console.error(err);

      alert("Delete failed");
    }
  };

  // LOGOUT
  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  // COPY PUBLIC LINK
  const copyLink = (id) => {

    navigator.clipboard.writeText(
      `http://localhost:5173/form/${id}`
    );

    alert("Public link copied!");
  };

  return (
    <div className="min-h-screen bg-gray-100">

      {/* NAVBAR */}
      <div className="bg-white shadow p-4 flex justify-between items-center">

        <h1 className="text-2xl font-bold text-blue-600">
          AI Form Builder
        </h1>

        <button
          onClick={logout}
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          Logout
        </button>

      </div>

      {/* MAIN */}
      <div className="p-6">

        {/* HEADER */}
        <div className="flex justify-between items-center mb-6">

          <h2 className="text-2xl font-semibold">
            My Forms
          </h2>

          <button
            onClick={createForm}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            + Create Form
          </button>

        </div>

        {/* FORMS GRID */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">

          {forms.map((form) => (

            <div
              key={form._id}
              className="bg-white p-5 rounded-xl shadow"
            >

              <h3 className="text-xl font-bold mb-2">
                {form.title}
              </h3>

              <p className="text-gray-500 mb-4">
                {form.fields.length} fields
              </p>

              {/* ACTION BUTTONS */}
              <div className="flex gap-2 flex-wrap">

                <Link
                  to={`/builder/${form._id}`}
                  className="bg-green-500 text-white px-3 py-2 rounded"
                >
                  Edit
                </Link>

                <button
                  onClick={() => copyLink(form._id)}
                  className="bg-gray-700 text-white px-3 py-2 rounded"
                >
                  Copy Link
                </button>

                <Link
                  to={`/analytics/${form._id}`}
                  className="bg-purple-500 text-white px-3 py-2 rounded"
                >
                  Analytics
                </Link>

                <button
                  onClick={() => deleteForm(form._id)}
                  className="bg-red-500 text-white px-3 py-2 rounded"
                >
                  Delete
                </button>

              </div>

            </div>

          ))}

        </div>

      </div>

    </div>
  );
}