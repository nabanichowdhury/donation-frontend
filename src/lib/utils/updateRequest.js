export const updateRequest = async (id) => {
  try {
    const res = await fetch(`http://localhost:8000/update-request/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },

      cache: "no-store",
    });
    if (!res.ok) {
      throw new Error(`HTTP error! Status: ${res.status}`);
    }
    const response = await res.json();

    return response;
  } catch (error) {
    console.error("Error updating request:", error);
    throw error;
  }
};
