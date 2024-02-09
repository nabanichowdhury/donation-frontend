import { getAllDonations } from "@/lib/utils/getAllDonations";
import React from "react";
import img from "@/assets/Clothing.png";
import Image from "next/image";
import Link from "next/link";

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
const Denations = async () => {
  const data = await getAllDonations();

  return (
    <div className="grid grid-cols-2 gap-6 mx-20">
      {data.map((donation) => {
        return (
          <div className="card card-side shadow-xl">
            <Image src={img} alt="img" />

            <div
              className={`${getCardBackground(
                donation.category
              )} ${getTextColor(donation.category)} card-body`}
            >
              <h2 className="card-title">{donation.donationType}</h2>
              <div className={`badge ${getBadgeColor(donation.category)}`}>
                {donation.category}
              </div>
              <p>{donation.description}</p>

              <div className="card-actions justify-end">
                <button
                  className={`btn ${getBadgeColor(
                    donation.category
                  )} ${getTextColor(donation.category)}`}
                >
                  <Link href={`/donations/${donation._id}`}>See details</Link>
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Denations;
