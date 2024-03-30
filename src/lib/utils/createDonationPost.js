export const createDonationPost = async (data) => {
  const res = await fetch(
    "https://donation-server-roan.vercel.app/create-donation",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }
  );
  const result = await res.json();
  return result;
};
