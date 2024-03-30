export const updateDonation = async (id, data) => {
  const res = await fetch(
    `https://donation-server-roan.vercel.app/update-donation/${id}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
      cache: "no-store",
    }
  );
  const result = await res.json();
  return result;
};
