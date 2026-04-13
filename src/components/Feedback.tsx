import { useState } from "react";

const Feedback: React.FC = () => {
  const [formData, setFormData] = useState({
    studentName: "",
    course: "",
    rating: "",
    comments: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.studentName || !formData.course || !formData.rating || !formData.comments) {
      alert("All fields are required.");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/feedback", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          rating: parseInt(formData.rating),
        }),
      });

      const data = await res.json();
      alert(data.message);

      setFormData({
        studentName: "",
        course: "",
        rating: "",
        comments: "",
      });
    } catch (error) {
      console.error(error);
      alert("Submission failed. Please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Course Feedback System</h1>
      <input type="text" name="studentName" placeholder="Student Name" value={formData.studentName} onChange={handleChange} /><br />

      <select name="course" value={formData.course} onChange={handleChange}>
        <option value="">Select a course</option>
        <option value="Computer Engineering">Computer Engineering</option>
        <option value="Computer Science">Computer Science</option>
        <option value="Information Technology">Information Technology</option>
        <option value="Multimedia">Multimedia</option>

      </select><br />

      <label>Rating:</label><br />
      <input type="radio" name="rating" value="1" checked={formData.rating === "1"} onChange={handleChange} /> 1
      <input type="radio" name="rating" value="2" checked={formData.rating === "2"} onChange={handleChange} /> 2
      <input type="radio" name="rating" value="3" checked={formData.rating === "3"} onChange={handleChange} /> 3
      <input type="radio" name="rating" value="4" checked={formData.rating === "4"} onChange={handleChange} /> 4
      <input type="radio" name="rating" value="5" checked={formData.rating === "5"} onChange={handleChange} /> 5<br />

      <textarea name="comments" placeholder="Comments" value={formData.comments} onChange={handleChange} /><br />

      <button type="submit">Submit Feedback</button>
    </form>
  );
};

export default Feedback;