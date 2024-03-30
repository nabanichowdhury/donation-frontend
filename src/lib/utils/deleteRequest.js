export const deleteRequest = async (id) => {
  try {
    const res = await fetch(`http://localhost:8000/delete-request/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });
    if (!res.ok) {
      throw new Error(`HTTP error! Status: ${res.status}`);
    }
    const data = await res.json();

    return data;
  } catch (error) {
    console.error("Error fetching single donation:", error);
    throw error;
  }
};
