export const getAllDonations = async () => {
  const res = await fetch("http://localhost:8000/donations", {
    cache: "no-store",
  });
  const data = await res.json();
  return data;
};
