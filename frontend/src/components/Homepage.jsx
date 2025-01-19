import axios from 'axios';
import React, { useState } from 'react';
import GetBookmarks from './GetBookmarks';

const Homepage = () => {
    const [urlName, setUrlName] = useState("");
    const [url, setUrl] = useState("");
    const [type, setType] = useState("");
    const [empty, setEmpty] = useState(false);

    const handleChange = (e) => {
        setType(e.target.value);
    };

    const submitButton = async () => {
        try {
            if (urlName.trim() === "" || url.trim() === "" || type.trim() === "") {
                setEmpty(true);
                return;
            }
            setEmpty(false); 

            const response = await axios.post("https://bookmark-manager-chi.vercel.app/details", {
                urlName: urlName,
                url: url,
                type: type
            }, {
                headers: {
                    token: localStorage.getItem("jwtToken")
                }
            });

            const message = response.data.message;
            alert(message);

        } catch (error) {
            if (error.response && error.response.data) {
                alert("Error: " + error.response.data.message);
            } else {
                alert("Error: Something went wrong!");
            }
        }
    };

    return (
        <div className="bg-gradient-to-b from-indigo-800 to-black min-h-screen flex flex-col justify-center items-center p-8">
            <div className="bg-white shadow-2xl rounded-lg p-6 w-full max-w-md">
                <h2 className="text-3xl font-semibold text-gray-700 text-center mb-6">Add a Bookmark</h2>
                <div className="space-y-4">
                    <input 
                        type="text" 
                        placeholder="Enter bookmark name" 
                        value={urlName} 
                        onChange={(e) => setUrlName(e.target.value)} 
                        className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                    <input 
                        type="text" 
                        placeholder="Enter the URL" 
                        value={url} 
                        onChange={(e) => setUrl(e.target.value)} 
                        className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                    <select value={type} onChange={handleChange} className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500">
                        <option value="">Select Type</option>
                        <option value="Work">Work</option>
                        <option value="Personal">Personal</option>
                        <option value="Education">Education</option>
                        <option value="Entertainment">Entertainment</option>
                    </select>
                    <button 
                        onClick={submitButton} 
                        className="w-full bg-gradient-to-r from-purple-500 to-teal-500 text-white p-4 rounded-lg hover:from-teal-500 hover:to-purple-500 transition-all duration-300"
                    >
                        Add Bookmark
                    </button>
                    {empty && <p className="text-red-500 text-center font-semibold">Please fill in all fields!</p>} 
                </div>
            </div>
            <GetBookmarks />
        </div>
    );
};

export default Homepage;
