export const createRequest = async (request) => {
  try {
    const res = await fetch("http://localhost:8000/create-request", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(request),
    });
    if (!res.ok) {
      throw new Error(`HTTP error! Status: ${res.status}`);
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error creating request:", error);
    throw error;
  }
};
