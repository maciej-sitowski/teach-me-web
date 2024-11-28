const BASE_URL = process.env.REACT_APP_API_URL;

export const login = async (username, password) => {
  const response = await fetch(`${BASE_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({ username, password }),
  });

  if (!response.ok) {
    throw new Error("Invalid username or password");
  }

  return response.json(); // Returns the token
};