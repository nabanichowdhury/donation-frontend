import { getAllDonations } from "@/lib/utils/getAllDonations";
import React from "react";

import Image from "next/image";
import Link from "next/link";
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

    default:
      return "badge-secondary";
  }
}
function getCardBackground(category) {
  switch (category) {
    case "Health" || "health":
      return "bg-red-100";
    case "Clothing" || "clothing":
      return "bg-green-100 ";
    case "Food" || "food":
      return "bg-yellow-100 ";
    case "Education" || "education":
      return "bg-purple-100 ";

    default:
      return "bg-primary";
  }
}

function getTextColor(category) {
  switch (category) {
    case "Health" || "health":
      return "text-red-900";
    case "Clothing" || "clothing":
      return "text-green-900";
    case "Food" || "food":
      return "text-yellow-900";
    case "Education" || "education":
      return "text-purple-900";

    default:
      return "text-primary-content";
  }
}
const Denations = async () => {
  const data = await getAllDonations();

  return (
    <div className="grid grid-cols-2 gap-8 mx-20">
      {data.map((donation, index) => {
        return (
          <div key={index} className="card card-side shadow-xl h-56">
            <Image
              src={getImage(donation.category)}
              width={350}
              height={300}
              alt="img"
            />

            <div
              className={`${getCardBackground(
                donation.category
              )} ${getTextColor(donation.category)} card-body`}
            >
              <h2 className="card-title">{donation.donationType}</h2>
              <div className={`badge ${getBadgeColor(donation.category)}`}>
                {donation.category}
              </div>
              <p className="text-xs">
                {donation.description.split(" ").slice(0, 8).join(" ")}
                {donation.description.split(" ").length > 10 && "... "}
              </p>

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
