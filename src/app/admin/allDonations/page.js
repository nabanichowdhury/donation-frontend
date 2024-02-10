"use client";
import { getAllDonations } from "@/lib/utils/getAllDonations";
import { getUser } from "@/lib/utils/getUser";
import { useEffect, useState } from "react";
import auth from "../../../../firebase.init";
import { deleteDonationPost } from "@/lib/utils/deleteDonationPost";
import { toast } from "react-toastify";
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

    default:
      return "badge-secondary";
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

const AllDonations = () => {
  const [donations, setDonations] = useState([]);
  const [deleteDonation, setDeleteDonation] = useState("");
  useEffect(() => {
    const fetchData = async () => {
      const data = await getAllDonations();
      setDonations(data);
    };
    fetchData();
  }, []);
  const handleDeleteDonation = (id) => {
    setDeleteDonation(id);
  };
  const handleDelete = async () => {
    const user = await getUser(auth.currentUser.email);

    const res = await deleteDonationPost(deleteDonation, user);
    setDeleteDonation("");
    if (res.success) {
      toast("Donation Post Deleted Successfully");
    }
    const data = await getAllDonations();

    setDonations(data);
  };
  return (
    <div className="grid grid-cols-2 gap-6 mx-20">
      {donations.map((donation) => {
        return (
          <div key={donation._id} className="card card-side shadow-xl">
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
                <label
                  htmlFor="my_modal_6"
                  className={`btn bg-red-900 text-white`}
                  onClick={() => handleDeleteDonation(donation._id)}
                >
                  Delete
                </label>
                <input
                  type="checkbox"
                  id="my_modal_6"
                  className="modal-toggle"
                />
                <div className="modal" role="dialog">
                  <div className="modal-box">
                    <h3 className="font-bold text-lg">
                      Do you want to Delete {donation.donationType}?
                    </h3>
                    <p className="py-4">Click the buttons Accordingly</p>
                    <div className="modal-action">
                      <label
                        htmlFor="my_modal_6"
                        onClick={handleDelete}
                        className="btn bg-red-900 text-white"
                      >
                        Yes I want to delete
                      </label>
                      <label htmlFor="my_modal_6" className="btn">
                        No I don't
                      </label>
                    </div>
                  </div>
                </div>
                <Link
                  href={`/admin/allDonations/updateDonation/${donation._id}`}
                >
                  <button className={`btn bg-amber-500 text-white`}>
                    Edit
                  </button>
                </Link>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default AllDonations;
