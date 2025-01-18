import React, { useEffect, useState } from 'react';
import axios from 'axios';

const GetBookmarks = () => {
    const [bookmarks, setBookmarks] = useState([]);

    useEffect(() => {
        const fetchBookmarks = async () => {
            try {
                const result = await axios.get("http://localhost:3000/getDetails", {
                    headers: {
                        token: localStorage.getItem("jwtToken")
                    }
                });
                setBookmarks(result.data.urls);
            } catch (error) {
                console.error("Error fetching bookmarks:", error);
            }
        };
        fetchBookmarks();
    }, []);

    return (
        <div className="mt-8 w-full max-w-3xl mx-auto space-y-6">
            {bookmarks.length === 0 ? (
                <p className="text-center text-gray-500 text-xl">No Bookmarks available</p>
            ) : (
                bookmarks.map((bookmark, index) => (
                    <div key={index} className="p-6 bg-white shadow-lg rounded-lg hover:shadow-xl transition-all duration-300 border border-gray-300">
                        <p className="text-lg font-semibold text-gray-700"><strong>URL Name:</strong> {bookmark.urlName}</p>
                        <p className="text-sm text-gray-600"><strong>URL:</strong> <a href={bookmark.url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">{bookmark.url}</a></p>
                        <p className="text-sm text-gray-600"><strong>Type:</strong> {bookmark.type}</p>
                    </div>
                ))
            )}
        </div>
    );
};

export default GetBookmarks;
