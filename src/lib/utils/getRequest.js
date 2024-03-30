export const getRequest = async () => {
  try {
    const res = await fetch(
      "https://donation-server-roan.vercel.app/notification",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (!res.ok) {
      throw new Error(`HTTP error! Status: ${res.status}`);
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error getting request:", error);
    throw error;
  }
};
