
import React, { useState, useEffect } from "react";
import { Save, Plus, Trash } from "lucide-react";
import axiosInstance from "../../../../utils/axiosInstance";

const EditAlumniProfile = () => {
  const [user, setUser] = useState(null);
  const [updatedUser, setUpdatedUser] = useState({ WorkExperiences: [] });

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const userId = localStorage.getItem("id");
        const response = await axiosInstance.get(`/alumni/${userId}`);

        setUser(response.data);

        // Ensure WorkExperiences is always an array
        setUpdatedUser({
          ...response.data,
          WorkExperiences: Array.isArray(response.data.WorkExperiences)
            ? response.data.WorkExperiences
            : [],
        });

      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };

    fetchUserDetails();
  }, []);

  const handleChange = (e) => {
    setUpdatedUser({ ...updatedUser, [e.target.name]: e.target.value });
  };

  const handleWorkExperienceChange = (index, field, value) => {
    const newWorkExp = [...updatedUser.WorkExperiences];
    newWorkExp[index][field] = value;
    setUpdatedUser({ ...updatedUser, WorkExperiences: newWorkExp });
  };

  const handleAddWorkExperience = () => {
    setUpdatedUser({
      ...updatedUser,
      WorkExperiences: [
        ...updatedUser.WorkExperiences,
        { companyName: "", role: "", yearsOfExperience: "" },
      ],
    });
  };

  const handleRemoveWorkExperience = (index) => {
    const newWorkExp = updatedUser.WorkExperiences.filter((_, i) => i !== index);
    setUpdatedUser({ ...updatedUser, WorkExperiences: newWorkExp });
  };

  const handleSave = async () => {
    try {
      const userId = localStorage.getItem("id");
      await axiosInstance.put(`/alumni/edit/${userId}`, updatedUser);
      setUser(updatedUser);
    } catch (error) {
      console.error("Error updating profile:", error);
    }
    alert("Profile Updated Successfully");
  };

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 p-6">
      <div className="mt-6 bg-white p-6 shadow-md rounded-lg w-full">
        <h2 className="text-2xl font-semibold mb-4 border-b-2 pb-2">
          Edit Alumni Profile
        </h2>
        {user ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-lg">
              <div>
                <strong>Name: </strong>
                <input
                  type="text"
                  name="name"
                  value={updatedUser.name}
                  onChange={handleChange}
                  className="ml-2 border p-1 w-full"
                />
              </div>
              <p>
                <strong>Email:</strong> {user.email}
              </p>
              <div>
                <strong>Bio: </strong>
                <input
                  type="text"
                  name="bio"
                  value={updatedUser.bio}
                  onChange={handleChange}
                  className="ml-2 border p-1 w-full"
                />
              </div>
              <div>
                <strong>College ID: </strong>
                <input
                  type="text"
                  name="collegeid"
                  value={updatedUser.collegeid}
                  onChange={handleChange}
                  className="ml-2 border p-1 w-full"
                />
              </div>
              <div>
                <strong>Branch:</strong> {user.branch.toUpperCase()}
              </div>
              <div>
                <strong>Graduation Year: </strong>
                <input
                  type="text"
                  name="graduateCollegeYear"
                  value={updatedUser.graduateCollegeYear}
                  onChange={handleChange}
                  className="ml-2 border p-1 w-full"
                />
              </div>
            </div>

            {/* Work Experience Section */}
            <div className="mt-6">
              <h3 className="text-2xl font-semibold mb-3 border-b-2 pb-1">
                Work Experience
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {updatedUser.WorkExperiences.map((work, index) => (
                  <div
                    key={index}
                    className="p-4 bg-gray-50 border border-gray-300 rounded-lg relative"
                  >
                    <div>
                      <strong>Company:</strong>
                      <input
                        type="text"
                        value={work.companyName}
                        onChange={(e) =>
                          handleWorkExperienceChange(
                            index,
                            "companyName",
                            e.target.value
                          )
                        }
                        className="ml-2 border p-1 w-full"
                      />
                    </div>
                    <div>
                      <strong>Role:</strong>
                      <input
                        type="text"
                        value={work.role}
                        onChange={(e) =>
                          handleWorkExperienceChange(index, "role", e.target.value)
                        }
                        className="ml-2 border p-1 w-full"
                      />
                    </div>
                    <div>
                      <strong>Years of Experience:</strong>
                      <input
                        type="text"
                        value={work.yearsOfExperience}
                        onChange={(e) =>
                          handleWorkExperienceChange(
                            index,
                            "yearsOfExperience",
                            e.target.value
                          )
                        }
                        className="ml-2 border p-1 w-full"
                      />
                    </div>
                    <button
                      onClick={() => handleRemoveWorkExperience(index)}
                      className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-md"
                    >
                      <Trash size={16} />
                    </button>
                  </div>
                ))}
              </div>
              <button
                onClick={handleAddWorkExperience}
                className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md flex items-center"
              >
                <Plus className="mr-2" /> Add More Work Experience
              </button>
            </div>

            <button
              onClick={handleSave}
              className="mt-4 bg-green-500 text-white px-4 py-2 rounded-md"
            >
              Save Changes
            </button>
          </>
        ) : (
          <p>Loading profile...</p>
        )}
      </div>
    </div>
  );
};

export default EditAlumniProfile;

























