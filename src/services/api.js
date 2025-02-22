const API_URL = process.env.REACT_APP_API_URL;

console.log(process.env)


export const fetchQuestions = async () => {
    const response = await fetch(`${API_URL}/questions/`);
    if (!response.ok) throw new Error("Failed to fetch questions");
    return response.json();
};

export const fetchRandomQuestion = async () => {
    const response = await fetch(`${API_URL}/questions/random/`);
    if (!response.ok) throw new Error("Failed to fetch questions");
    return response.json();
};

export const addQuestion = async (question) => {
    const response = await fetch(`${API_URL}/questions/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(question),
    });
    if (!response.ok) throw new Error("Failed to add question");
    return response.json();
};

export const deleteQuestion = async (id) => {
    const response = await fetch(`${API_URL}/questions/${id}`, {
        method: "DELETE",
    });
    if (!response.ok) throw new Error("Failed to delete question");
    return response;
};

export const updateQuestion = async (id, updatedData) => {
    const response = await fetch(`${API_URL}/questions/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedData),
    });
  
    if (!response.ok) {
      throw new Error(`Failed to update question. Status: ${response.status}`);
    }
  
    return response.json();
  };