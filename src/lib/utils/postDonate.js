export const postDonate = async (id, user) => {
  try {
    const res = await fetch(
      `https://donation-server-roan.vercel.app/donate/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
        cache: "no-store",
      }
    );
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
