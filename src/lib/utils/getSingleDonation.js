export const getSingleDonation = async (id) => {
  try {
    console.log("id:", id);
    const res = await fetch(`http://localhost:8000/donation/${id}`, {
      cache: "no-store",
    });
    if (!res.ok) {
      throw new Error(`HTTP error! Status: ${res.status}`);
    }
    const data = await res.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error("Error fetching single donation:", error);
    throw error;
  }
};
