"use client";
import Image from "next/image";
import axios from "axios";
import img from "@/assets/Clothing.png";
import { useEffect, useState } from "react";
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
      return "text-red-900"; // Change this to the desired text color class
    case "Clothing":
      return "text-green-900"; // Change this to the desired text color class
    case "Food":
      return "text-yellow-900"; // Change this to the desired text color class
    case "Education":
      return "text-purple-900"; // Change this to the desired text color class
    // Add more cases as needed
    default:
      return "text-primary-content"; // Default text color
  }
}

const Donations = () => {
  const [donations, setDonations] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8000/donations");
        setDonations(response.data);
      } catch (error) {
        console.error("Error fetching donations:", error);
      }
    };

    fetchData();
  }, []);
  return (
    <>
      <div className="grid grid-cols-3 gap-4 mx-20 my-20 ">
        {donations.map((donation) => {
          return (
            <div key={donation._id} className="card w-96">
              <figure>
                <Image src={img} width={500} alt="img" />
              </figure>
              <div
                className={`${getCardBackground(
                  donation.category
                )} ${getTextColor(donation.category)} card-body`}
              >
                <h2 className="card-title">
                  {donation.donationType}
                  <div className={`badge ${getBadgeColor(donation.category)}`}>
                    {donation.category}
                  </div>
                </h2>
                <p>{donation.description}</p>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Donations;
