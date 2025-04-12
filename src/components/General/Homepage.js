import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";


const Homepage = () => {
    const sampleQuestions = [
        "What is React?",
        "Explain the virtual DOM.",
        "How does useEffect work?",
        "What is a closure in JavaScript?"
    ];
    
    const randomQuestion = sampleQuestions[Math.floor(Math.random() * sampleQuestions.length)];
    
    const progress = {
        questionsAnswered: 12,
        totalQuestions: 50,
        videosWatched: 5,
        totalVideos: 20,
    };
    
    return (
        <div className="p-6 bg-gray-50 min-h-screen">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            <Card className="rounded-2xl shadow-md bg-white hover:shadow-lg transition-shadow duration-300 md:col-span-2 cursor-pointer flex flex-col justify-between p-4">
            <CardContent className="flex flex-col h-full">
                <div>
                <h2 className="text-xl font-bold mb-2 text-purple-700">Random Question</h2>
                <p className="text-base text-gray-700 mb-4">{randomQuestion}</p>
                </div>
                <div className="mt-auto mb-6">
                    <a href="#" className="text-purple-700 hover:underline mt-auto mb-6">Go to Questions</a>
                </div>
            </CardContent>
            </Card>
    
            <Card className="rounded-2xl shadow-md bg-white hover:shadow-lg transition-shadow duration-300 cursor-pointer flex flex-col justify-between p-4">
            <CardContent className="flex flex-col h-full">
                <div>
                <h2 className="text-xl font-bold mb-2 text-purple-700">All Questions</h2>
                <ul className="list-disc list-inside text-gray-700">
                    {sampleQuestions.map((q, i) => (
                    <li key={i}>{q}</li>
                    ))}
                </ul>
                </div>
                <div className="mt-auto mb-6">
                <a href="#" className="text-purple-700 hover:underline mt-auto mb-6">View All</a>
                </div>
            </CardContent>
            </Card>
    

            <Card className="rounded-2xl shadow-md bg-white hover:shadow-lg transition-shadow duration-300 md:col-span-3 cursor-pointer flex flex-col justify-between p-4">
          <CardContent className="flex flex-col h-full">
            <div>
              <h2 className="text-xl font-bold mb-4 text-purple-700">YouTube Videos</h2>
              <div className="flex gap-4 overflow-x-auto">
  {[
    "dGcsHMXbSOA",
    "Tn6-PIqc4UM",
    "kZ2FDmK0sAU",
    "3qBXWUpoPHo",
    "Ke90Tje7VS0",
    "w7ejDZ8SWv8",
    "bMknfKXIFA8"
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
            <div className="mt-auto mb-6">
              <a href="#" className="text-purple-700 hover:underline mt-auto mb-6">See More Videos</a>
            </div>
          </CardContent>
        </Card>
    
            <Card className="rounded-2xl shadow-md bg-white hover:shadow-lg transition-shadow duration-300 md:col-span-3 cursor-pointer flex flex-col justify-between p-4">
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
                <div className="mt-auto mb-6">
                <a href="#" className="text-purple-700 hover:underline mt-auto mb-6">Go to Dashboard</a>
                </div>
            </CardContent>
            </Card>
        </div>
        </div>
    );
};
export default Homepage;