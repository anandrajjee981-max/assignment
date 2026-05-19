import React, { useState } from "react";
import axios from "axios";

const Form = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    city: "",
    service: "Service 1",
    description: ""
  });

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState({ type: "", message: "" });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setStatus({ type: "", message: "" });

      // DEBUG (IMPORTANT)
      console.log("Sending payload:", formData);

      const res = await axios.post(
        "https://assignment-5skg.onrender.com/api/auth/lead",
        {
          name: formData.name.trim(),
          phone: String(formData.phone),
          city: formData.city.trim(),
          service: formData.service,
          description: formData.description.trim()
        },
        {
          headers: {
            "Content-Type": "application/json"
          }
        }
      );

      setStatus({
        type: "success",
        message: res.data.message || "Submitted successfully"
      });

      setFormData({
        name: "",
        phone: "",
        city: "",
        service: "Service 1",
        description: ""
      });

    } catch (err) {
      console.log("ERROR:", err.response?.data || err.message);

      setStatus({
        type: "error",
        message:
          err.response?.data?.message ||
          "Something went wrong"
      });

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 text-white p-4">

      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white/5 p-6 rounded-xl border border-white/10 space-y-4"
      >

        <h1 className="text-xl font-bold">Submit Query</h1>

        <input
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Name"
          className="w-full p-2 bg-black/30 border border-white/10 rounded"
          required
        />

        <input
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          placeholder="Phone"
          className="w-full p-2 bg-black/30 border border-white/10 rounded"
          required
        />

        <input
          name="city"
          value={formData.city}
          onChange={handleChange}
          placeholder="City"
          className="w-full p-2 bg-black/30 border border-white/10 rounded"
          required
        />

        <select
          name="service"
          value={formData.service}
          onChange={handleChange}
          className="w-full p-2 bg-black/30 border border-white/10 rounded"
        >
          <option>Service 1</option>
          <option>Service 2</option>
          <option>Service 3</option>
          <option>Service 4</option>
        </select>

        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Description"
          className="w-full p-2 bg-black/30 border border-white/10 rounded"
          required
        />

        <button
          disabled={loading}
          className="w-full bg-white text-black p-2 rounded font-bold"
        >
          {loading ? "Submitting..." : "Submit"}
        </button>

        {status.message && (
          <p
            className={
              status.type === "success"
                ? "text-green-400"
                : "text-red-400"
            }
          >
            {status.message}
          </p>
        )}

      </form>
    </div>
  );
};

export default Form;