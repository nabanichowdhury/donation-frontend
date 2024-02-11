"use client";
import { getAllDonations } from "@/lib/utils/getAllDonations";
import { getUser } from "@/lib/utils/getUser";
import React, { useEffect, useState } from "react";
import auth from "../../../../firebase.init";
import { useAuthState } from "react-firebase-hooks/auth";

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
    // Add more cases as needed
    default:
      return "badge-secondary"; // Default color
  }
}
function getCardBackground(category) {
  switch (category) {
    case "Health":
      return "bg-red-100"; // Change this to the desired background color class
    case "Clothing":
      return "bg-green-100 "; // Change this to the desired background color class
    case "Food":
      return "bg-yellow-100 "; // Change this to the desired background color class
    case "Education":
      return "bg-purple-100 "; // Change this to the desired background color class
    // Add more cases as needed
    default:
      return "bg-primary"; // Default background color
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

const MyDonations = () => {
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

  const userDonations = userData?.donations?.map((donation) => ({
    donationType: donation.name,
    category: donation.category,
    donatedAmount: donation.amount,
    date: donation.date,
  }));

  return (
    <div>
      <h1 className="text-xl text-center font-bold">My Donation Logs</h1>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Donation Category</th>
              <th>Donation Type</th>
              <th>Donated amount in Dollar</th>
              <th>Date of Donation</th>
            </tr>
          </thead>
          <tbody>
            {userDonations?.map((donation, index) => {
              return (
                <tr
                  key={index}
                  className={`${getCardBackground(donation.category)}`}
                >
                  <td>{index + 1}</td>
                  <td>
                    <div
                      className={`badge ${getBadgeColor(
                        donation.category
                      )} ${getTextColor(donation.category)} `}
                    >
                      {donation.category}
                    </div>
                  </td>
                  <td>{donation.donationType}</td>
                  <td>$ {donation.donatedAmount}</td>
                  <td>{donation.date}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyDonations;
