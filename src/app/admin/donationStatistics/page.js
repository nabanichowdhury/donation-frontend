"use client";
import { getAllDonations } from "@/lib/utils/getAllDonations";
import React, { useEffect, useState } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
ChartJS.register(ArcElement, Tooltip, Legend);
const DonationStatistics = () => {
  const [donations, setDonations] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const data = await getAllDonations();
      setDonations(data);
    };
    fetchData();
  }, []);

  const calculateTotalAmountByCategory = (donations) => {
    const totalAmountByCategory = {};

    donations.forEach((donation) => {
      const category = donation.category;
      const donatedUsers = donation.donatedUser || [];
      const totalAmount = donatedUsers.reduce(
        (acc, user) => acc + parseInt(user.amount),
        0
      );

      totalAmountByCategory[category] =
        (totalAmountByCategory[category] || 0) + totalAmount;
    });
    const data = Object.entries(totalAmountByCategory).map(([name, value]) => ({
      name,
      value,
    }));

    return data;
  };

  const calculateTotalAmountByDonationType = (donations) => {
    const totalAmountByDonationType = {};

    donations.forEach((donation) => {
      const donationType = donation.donationType;
      const donatedUsers = donation.donatedUser || [];
      const totalAmount = donatedUsers.reduce(
        (acc, user) => acc + parseInt(user.amount),
        0
      );

      totalAmountByDonationType[donationType] =
        (totalAmountByDonationType[donationType] || 0) + totalAmount;
    });

    const data = Object.entries(totalAmountByDonationType).map(
      ([name, value]) => ({ name, value })
    );

    return data;
  };

  const dataByCategory = calculateTotalAmountByCategory(donations);

  const newData = dataByCategory.map((item) => {
    const totalValue = dataByCategory.reduce(
      (acc, curr) => acc + curr.value,
      0
    );
    const percentage = (item.value / totalValue) * 100;
    return [
      { name: item.name, value: percentage.toFixed(2) },
      { name: "others", value: (100 - percentage).toFixed(2) },
    ];
  });

  const dataByDonationType = calculateTotalAmountByDonationType(donations);
  const donationTypeStat = dataByDonationType.map((item) => {
    const totalValue = dataByDonationType?.reduce(
      (acc, curr) => acc + curr.value,
      0
    );
    const percentage = (item.value / totalValue) * 100;
    return [
      { name: item.name, value: percentage.toFixed(2) },
      { name: "others", value: (100 - percentage).toFixed(2) },
    ];
  });

  return (
    <div>
      <h1 className="text-xl text-center font-bold">
        {" "}
        Category Wise Donation Percentage{" "}
      </h1>
      <div className="grid grid-cols-3">
        {newData.map((item) => {
          return (
            <div className="w-64 shadow-xl mt ">
              <Doughnut
                data={{
                  labels: item.map((i) => i.name),
                  datasets: [
                    {
                      label: "Donation Percentage",
                      data: item.map((i) => i.value),
                      backgroundColor: ["#FF6384", "#36A2EB"],
                      hoverBackgroundColor: ["#FF6384", "#36A2EB"],
                    },
                  ],
                }}
              />
            </div>
          );
        })}
      </div>
      <h1 className="text-xl text-center font-bold">
        {" "}
        Donation Post Wise Percentage{" "}
      </h1>
      <div className="grid grid-cols-3">
        {donationTypeStat.map((item) => {
          return (
            <div className="w-64 shadow-xl mt ">
              <Doughnut
                data={{
                  labels: item.map((i) => i.name),
                  datasets: [
                    {
                      label: "Donation Percentage",
                      data: item.map((i) => i.value),
                      backgroundColor: ["#FF6384", "#36A2EB"],
                      hoverBackgroundColor: ["#FF6384", "#36A2EB"],
                    },
                  ],
                }}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DonationStatistics;
