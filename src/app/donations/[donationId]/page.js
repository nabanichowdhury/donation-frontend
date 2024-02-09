import img from "@/assets/Clothing.png";
import { getSingleDonation } from "@/lib/utils/getSingleDonation";

import Image from "next/image";
import Link from "next/link";

const DonationDetailsPage = async ({ params }) => {
  const data = await getSingleDonation(params.donationId);

  return (
    <div className="hero min-h-80 ">
      <div className="hero-content flex-col lg:flex-row">
        <Image src={img} />
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
