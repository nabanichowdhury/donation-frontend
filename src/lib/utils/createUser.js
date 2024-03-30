export const createUser = async (user) => {
  try {
    const res = await fetch(
      "https://donation-server-roan.vercel.app/createUser",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      }
    );
    if (!res.ok) {
      throw new Error(`HTTP error! Status: ${res.status}`);
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error creating user:", error);
    throw error;
  }
};
