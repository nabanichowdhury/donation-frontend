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

const HomePage = () => {
  const [donations, setDonations] = useState([]);
  const [filteredDonations, setFilteredDonations] = useState([]);
  const [filterText, setFilterText] = useState("");

  useEffect(() => {
    setFilteredDonations(
      donations.filter((donation) =>
        donation.category.toLowerCase().includes(filterText.toLowerCase())
      )
    );
  }, [donations, filterText]);

  const handleFilterChange = (event) => {
    setFilterText(event.target.value);
  };
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
      <div
        className="hero min-h-96"
        style={{
          backgroundImage: "url(https://i.ibb.co/7Ks3SnB/purple.jpg)",
        }}
      >
        <div className=" "></div>
        <div className="hero-content text-center">
          <div className="max-w-md">
            <h1 className="mb-5 text-3xl text-black font-bold">
              We are here to donate
            </h1>
            <div>
              <input
                type="text"
                placeholder="Search Catagory Here"
                className="input input-bordered input-secondary w-full max-w-xs"
                value={filterText}
                onChange={handleFilterChange}
              />
            </div>
            <button className="btn btn-primary  mt-4">Search</button>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-4 mx-20 my-20 ">
        {filteredDonations.map((donation) => {
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

export default HomePage;