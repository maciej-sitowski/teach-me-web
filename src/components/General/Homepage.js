import React, { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { fetchRandomQuestion } from "../../services/api";

const Homepage = () => {
    const [randomQuestion, setRandomQuestion] = useState("Loading..."); // State to store the random question

    const sampleQuestions = [
        "What is React?",
        "Explain the virtual DOM.",
        "How does useEffect work?",
        "What is a closure in JavaScript?"
    ];

    useEffect(() => {
        const loadRandomQuestion = async () => {
            try {
                const question = await fetchRandomQuestion(); // Fetch the random question
                setRandomQuestion(question.title); // Update the state with the fetched question
            } catch (error) {
                console.error("Failed to fetch random question:", error);
                setRandomQuestion("Failed to load question."); // Handle errors
            }
        };

        loadRandomQuestion();
    }, []);


    const progress = {
        questionsAnswered: 12,
        totalQuestions: 50,
        videosWatched: 5,
        totalVideos: 20,
    };

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <Card className="rounded-2xl shadow-md bg-white hover:shadow-lg transition-shadow duration-300 md:col-span-2 cursor-pointer flex flex-col justify-between p-2">
                    <CardContent className="flex flex-col h-full">
                        <div>
                            <h2 className="text-xl font-bold mb-2 text-purple-700">Random Question</h2>
                            <p className="text-base text-gray-700 mb-4">{randomQuestion}</p>
                        </div>
                        <div className="mt-auto">
                            <a href="#" className="text-purple-700 hover:underline">Go to Questions</a>
                        </div>
                    </CardContent>
                </Card>

                <Card className="rounded-2xl shadow-md bg-white hover:shadow-lg transition-shadow duration-300 cursor-pointer flex flex-col justify-between p-2">
                    <CardContent className="flex flex-col h-full">
                        <div>
                            <h2 className="text-xl font-bold mb-2 text-purple-700">All Questions</h2>
                            <div className="all-questions">
                                <ul className="list-disc list-inside text-gray-700 space-y-2">
                                    {sampleQuestions.map((q, i) => (
                                        <li key={i} className="text-base text-gray-800">{q}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                        <div className="mt-auto pt-4">
                            <a href="/questions" className="text-purple-700 hover:underline">View All</a>
                        </div>
                    </CardContent>
                </Card>


                <Card className="rounded-2xl shadow-md bg-white hover:shadow-lg transition-shadow duration-300 md:col-span-3 cursor-pointer flex flex-col justify-between p-2">
                    <CardContent className="flex flex-col h-full">
                        <div>
                            <h2 className="text-xl font-bold mb-4 text-purple-700">YouTube Videos</h2>
                            <div className="flex gap-4 overflow-x-auto">
                                {[
                                    "MM9VQp-k0JQ",
                                    "g-Cytq7YDCc",
                                    "jxqGsJEhiAg",
                                    "tc713anE3UY",
                                    "ho24rK_AYrQ",
                                    "kBVZgCrdVCw",
                                    "TzpOdpdX7pE"
                                ].map((id, i) => (
                                    <iframe
                                        key={i}
                                        className="w-80 h-48 rounded-xl flex-shrink-0"
                                        src={`https://www.youtube.com/embed/${id}`}
                                        title={`Video ${i + 1}`}
                                        frameBorder="0"
                                        allowFullScreen
                                    ></iframe>
                                ))}
                            </div>
                        </div>
                        <div>
                            <a href="#" className="text-purple-700 hover:underline">See More Videos</a>
                        </div>
                    </CardContent>
                </Card>

                <Card className="rounded-2xl shadow-md bg-white hover:shadow-lg transition-shadow duration-300 md:col-span-3 cursor-pointer flex flex-col justify-between p-2">
                    <CardContent className="flex flex-col h-full">
                        <div>
                            <h2 className="text-xl font-bold mb-4 text-purple-700">Dashboard</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="bg-purple-50 p-4 rounded-xl">
                                    <p className="text-gray-800 font-semibold">Questions Answered</p>
                                    <p className="text-purple-700 text-lg">{progress.questionsAnswered} / {progress.totalQuestions}</p>
                                </div>
                                <div className="bg-blue-50 p-4 rounded-xl">
                                    <p className="text-gray-800 font-semibold">Videos Watched</p>
                                    <p className="text-blue-700 text-lg">{progress.videosWatched} / {progress.totalVideos}</p>
                                </div>
                            </div>
                        </div>
                        <div>
                            <a href="#" className="text-purple-700 hover:underline">Go to Dashboard</a>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};
export default Homepage;