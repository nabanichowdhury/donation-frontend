export const createDonationPost = async (data) => {
  const res = await fetch("http://localhost:8000/create-donation", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  const result = await res.json();
  return result;
};
