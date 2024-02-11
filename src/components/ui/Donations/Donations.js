"use client";
import Image from "next/image";
import axios from "axios";
import { useEffect, useState } from "react";
import colthingImg from "@/assets/clothing.jpeg";
import foodImg from "@/assets/Food.png";
import healthImg from "@/assets/Health.png";
import educationImg from "@/assets/Education.png";
import otherImg from "@/assets/other.jpg";
function getImage(category) {
  switch (category) {
    case "Health" || "health":
      return healthImg;
    case "Clothing" || "clothing":
      return colthingImg;
    case "Food" || "food":
      return foodImg;
    case "Education" || "education":
      return educationImg;
    default:
      return otherImg;
  }
}
function getBadgeColor(category) {
  switch (category) {
    case "Health" || "health":
      return "bg-red-300";
    case "Clothing" || "clothing":
      return "bg-green-300";
    case "Food" || "food":
      return "bg-yellow-300";
    case "Education" || "education":
      return "bg-purple-300";
    // Add more cases as needed
    default:
      return "badge-secondary"; // Default color
  }
}
function getCardBackground(category) {
  switch (category) {
    case "Health" || "health":
      return "bg-red-100"; // Change this to the desired background color class
    case "Clothing" || "clothing":
      return "bg-green-100 "; // Change this to the desired background color class
    case "Food" || "food":
      return "bg-yellow-100 "; // Change this to the desired background color class
    case "Education" || "education":
      return "bg-purple-100 "; // Change this to the desired background color class
    // Add more cases as needed
    default:
      return "bg-primary"; // Default background color
  }
}

function getTextColor(category) {
  switch (category) {
    case "Health" || "health":
      return "text-red-900"; // Change this to the desired text color class
    case "Clothing" || "clothing":
      return "text-green-900"; // Change this to the desired text color class
    case "Food" || "food":
      return "text-yellow-900"; // Change this to the desired text color class
    case "Education" || "education":
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
        const response = await axios.get(
          "https://donation-server-roan.vercel.app/donations"
        );
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
                <Image
                  src={getImage(donation.category)}
                  width={500}
                  height={500}
                  alt="img"
                />
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
