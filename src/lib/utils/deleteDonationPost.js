export const deleteDonationPost = async (id, user) => {
  try {
    const res = await fetch(`http://localhost:8000/delete-donation/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    if (!res.ok) {
      throw new Error(`HTTP error! Status: ${res.status}`);
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error deleting donation:", error);
    throw error;
  }
};
