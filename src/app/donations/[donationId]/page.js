import img from "@/assets/clothing.jpeg";
import { getSingleDonation } from "@/lib/utils/getSingleDonation";

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

const DonationDetailsPage = async ({ params }) => {
  const data = await getSingleDonation(params.donationId);

  return (
    <div className="hero min-h-80 ">
      <div className="hero-content flex-col lg:flex-row">
        <Image
          src={getImage(data?.category)}
          width={500}
          height={500}
          alt="img"
        />
        <div>
          <h1 className="text-5xl font-bold">{data?.donationType}</h1>
          <p className="py-6">{data?.description}</p>
          <button className="btn btn-primary">
            <Link href={`/donate/${data?._id}`}>Donate here</Link>
          </button>
        </div>
      </div>
    </div>
  );
};

export default DonationDetailsPage;
