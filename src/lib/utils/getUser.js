export const getUser = async (email) => {
  try {
    const res = await fetch(
      `https://donation-server-roan.vercel.app/user/${email}`,
      {
        cache: "no-store",
      }
    );

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching user:", error);
    throw error;
  }
};
