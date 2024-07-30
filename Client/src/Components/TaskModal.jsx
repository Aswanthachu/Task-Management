import { useState, useCallback, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { AiOutlineUpload } from "react-icons/ai";

const TaskModal = ({ isOpen, onClose, onSave, task }) => {
  const [formData, setFormData] = useState({
    heading: "",
    description: "",
    date: "",
    time: "",
    priority: "Low",
    image: ""
  });

  const [imagePreview, setImagePreview] = useState("");
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (task) {
      setFormData({
        heading: task.heading,
        description: task.description,
        date: task.date,
        time: task.time,
        priority: task.priority,
        image: task.image
      });
      setImagePreview(task.image);
    }
  }, [task]);

  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prevData) => ({ ...prevData, image: reader.result }));
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop, accept: 'image/*' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { heading, description, date, time, priority } = formData;
    const newErrors = {};

    if (!heading) newErrors.heading = "Heading is required";
    if (!description) newErrors.description = "Description is required";
    if (!date) newErrors.date = "Date is required";
    if (!time) newErrors.time = "Time is required";
    if (!priority) newErrors.priority = "Priority is required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      setErrors({});
      onSave(formData);
    }
  };

  return (
    isOpen && (
      <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
        <div className="bg-white px-8 py-3 rounded-lg shadow-lg w-96 lg:w-[450px] max-h-[calc(100vh-50px)] max-w-[calc(100vw-20px)] overflow-y-auto">
          <h2 className="text-2xl font-semibold mb-4">
            {task ? "Edit Task" : "Add Task"}
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Heading
              </label>
              <input
                type="text"
                name="heading"
                className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                value={formData.heading}
                onChange={handleChange}
                required
              />
              {errors.heading && <p className="text-red-500 text-xs mt-1">{errors.heading}</p>}
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Description
              </label>
              <textarea
                name="description"
                className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                value={formData.description}
                onChange={handleChange}
                required
              />
              {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description}</p>}
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Date
              </label>
              <input
                type="date"
                name="date"
                className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                value={formData.date}
                onChange={handleChange}
                required
              />
              {errors.date && <p className="text-red-500 text-xs mt-1">{errors.date}</p>}
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Time
              </label>
              <input
                type="time"
                name="time"
                className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                value={formData.time}
                onChange={handleChange}
                required
              />
              {errors.time && <p className="text-red-500 text-xs mt-1">{errors.time}</p>}
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Priority
              </label>
              <select
                name="priority"
                className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                value={formData.priority}
                onChange={handleChange}
                required
              >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
              {errors.priority && <p className="text-red-500 text-xs mt-1">{errors.priority}</p>}
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Image
              </label>
              <div
                {...getRootProps()}
                className={`mt-1 flex items-center justify-center p-6 border-2 border-dashed rounded-md cursor-pointer ${
                  isDragActive ? "border-blue-500" : "border-gray-300"
                }`}
              >
                <input {...getInputProps()} />
                {isDragActive ? (
                  <p className="text-gray-700">Drop the files here...</p>
                ) : (
                  <div className="flex items-center space-x-2">
                    <AiOutlineUpload className="text-gray-700 w-10 h-10" />
                    <span className="text-gray-700">Drag & drop an image here, or click to select one</span>
                  </div>
                )}
              </div>
              {imagePreview && (
                <img
                  src={imagePreview}
                  alt="Image Preview"
                  className="mt-2 w-full h-auto max-h-48 object-cover"
                />
              )}
            </div>
            <div className="flex justify-end space-x-2">
              <button
                type="button"
                className="bg-gray-500 text-white py-1 px-3 rounded hover:bg-gray-600"
                onClick={onClose}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-blue-500 text-white py-1 px-3 rounded hover:bg-blue-600"
              >
                {task ? "Update" : "Add"}
              </button>
            </div>
          </form>
        </div>
      </div>
    )
  );
};

export default TaskModal;
