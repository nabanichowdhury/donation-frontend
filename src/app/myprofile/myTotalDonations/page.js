"use client";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../../../../firebase.init";
import { getUser } from "@/lib/utils/getUser";
function getBadgeColor(category) {
  switch (category) {
    case "Health":
      return "bg-red-300";
    case "Clothing":
      return "bg-green-300";
    case "Food":
      return "bg-yellow-300";
    case "Education":
      return "bg-purple-300";

    default:
      return "badge-secondary"; // Default color
  }
}
function getCardBackground(category) {
  switch (category) {
    case "Health":
      return "bg-red-100";
    case "Clothing":
      return "bg-green-100 ";
    case "Food":
      return "bg-yellow-100 ";
    case "Education":
      return "bg-purple-100 ";

    default:
      return "bg-primary";
  }
}

function getTextColor(category) {
  switch (category) {
    case "Health":
      return "text-red-900";
    case "Clothing":
      return "text-green-900";
    case "Food":
      return "text-yellow-900";
    case "Education":
      return "text-purple-900";

    default:
      return "text-primary-content";
  }
}

const TotalDonations = () => {
  const [userData, setUser] = useState();
  const [user, loading, error] = useAuthState(auth);

  useEffect(() => {
    const fetchDonations = async () => {
      if (user && !loading) {
        const u = await getUser(user?.email);
        setUser(u);
      }
    };
    fetchDonations();
  }, [user]);

  if (loading) return <div>Loading...</div>;

  const donationCategoryTotals = userData?.donations?.reduce(
    (accumulator, donation) => {
      const existingDonationType = accumulator.find(
        (item) => item.category === donation.category
      );

      if (existingDonationType) {
        existingDonationType.totalAmount += parseInt(donation.amount);
      } else {
        accumulator.push({
          category: donation.category,
          totalAmount: parseInt(donation.amount),
        });
      }

      return accumulator;
    },
    []
  );
  const donationTypeTotals = userData?.donations?.reduce(
    (accumulator, donation) => {
      const existingDonationType = accumulator.find(
        (item) => item.name === donation.name
      );

      if (existingDonationType) {
        existingDonationType.totalAmount += parseInt(donation.amount);
      } else {
        accumulator.push({
          name: donation.name,
          category: donation.category,
          totalAmount: parseInt(donation.amount),
        });
      }

      return accumulator;
    },
    []
  );
  const totalAmount = userData?.donations?.reduce((accumulator, donation) => {
    accumulator += parseInt(donation.amount);
    return accumulator;
  }, 0);

  return (
    <div>
      <h1 className="text-xl text-center font-bold">
        You Have total Donated : {totalAmount} dollar
      </h1>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <h1 className="text-xl text-center font-bold my-6">
            Category Wise Accumulated Donation
          </h1>
          <div className={`grid grid-cols-2 gap-4 my-6  mx-9  `}>
            {donationCategoryTotals?.map((donation, index) => (
              <div
                key={index}
                className={`card w-46 bg-base-100 shadow-xl ${getCardBackground(
                  donation.category
                )} ${getTextColor(donation.category)}`}
              >
                <div className="card-body">
                  <h2 className="card-title">{donation.category}</h2>
                  <p className="text-sm">
                    You have Donated{" "}
                    <span className="font-bold">${donation.totalAmount}</span>{" "}
                    in this category
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div>
          <h1 className="text-xl text-center font-bold my-6">
            Donation Type Wise Accumulated Donation
          </h1>
          <div className={`grid grid-cols-2 gap-4 my-6  mx-9  `}>
            {donationTypeTotals?.map((donation, index) => (
              <div
                key={index}
                className={`card w-46 bg-base-100 shadow-xl ${getCardBackground(
                  donation.category
                )} ${getTextColor(donation.category)}`}
              >
                <div className="card-body">
                  <h2 className="card-title">{donation.name}</h2>
                  <div
                    className={`badge ${getBadgeColor(
                      donation.category
                    )} ${getTextColor(donation.category)} `}
                  >
                    {donation.category}
                  </div>
                  <p className="text-sm">
                    You have Donated{" "}
                    <span className="font-bold">${donation.totalAmount}</span>{" "}
                    in this donation type
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TotalDonations;
