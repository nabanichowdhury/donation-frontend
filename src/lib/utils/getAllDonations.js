export const getAllDonations = async () => {
  const res = await fetch("https://donation-server-roan.vercel.app/donations", {
    cache: "no-store",
  });
  const data = await res.json();
  return data;
};
