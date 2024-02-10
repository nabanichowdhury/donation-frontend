"use client";
import React, { useEffect, useState } from "react";

import { useRouter } from "next/navigation";
import { updateDonation } from "@/lib/utils/updateDonation";
import { getSingleDonation } from "@/lib/utils/getSingleDonation";
import auth from "../../../../../../firebase.init";
import { getUser } from "@/lib/utils/getUser";
import { toast } from "react-toastify";
import { getAllDonations } from "@/lib/utils/getAllDonations";

const UpdateDonation = ({ params }) => {
  const router = useRouter();
  const [postHeading, setPostHeading] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [imageLink, setImageLink] = useState("");
  const [id, setId] = useState("");
  const [user, setUser] = useState("");
  useEffect(() => {
    const fetchData = async () => {
      const userData = await getUser(auth.currentUser.email);
      setUser(userData);
      if (userData.role !== "admin") {
        router.push("/");
      }
      const data = await getSingleDonation(params.id);

      setPostHeading(data.donationType);
      setCategory(data.category);
      setDescription(data.description);
      setImageLink(data.image);
      setId(data._id);
    };
    fetchData();
  }, [params]);

  const handlePostHeadingChange = (event) => {
    setPostHeading(event.target.value);
  };

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleImageLinkChange = (event) => {
    setImageLink(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const donation = {
      category: category,
      donationType: postHeading,
      description: description,
      image: imageLink,
    };
    const data = {
      user: user,
      donation: donation,
    };

    const res = await updateDonation(id, data);

    if (res.success) {
      toast.success("Donation Updated Successfully");
      router.push("/admin/allDonations");
    } else {
      toast.error("Error adding donation");
    }
  };

  return (
    <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
      <h1 className="text-xl text-center font-bold">Update Donation</h1>
      <form className="card-body shadow-xl" onSubmit={handleSubmit}>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Donation Post Heading</span>
          </label>
          <input
            type="text"
            placeholder="Enter donation post heading"
            className="input input-bordered"
            value={postHeading}
            onChange={handlePostHeadingChange}
            required
          />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Donation Category</span>
          </label>
          <input
            type="text"
            placeholder="Enter donation category"
            className="input input-bordered"
            value={category}
            onChange={handleCategoryChange}
            required
          />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Donation Description</span>
          </label>
          <textarea
            type="text"
            placeholder="Enter donation description"
            className="textarea textarea-bordered"
            value={description}
            onChange={handleDescriptionChange}
            required
          />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Image Link</span>
          </label>
          <input
            type="text"
            placeholder="Enter image link"
            className="input input-bordered"
            value={imageLink}
            onChange={handleImageLinkChange}
            required
          />
        </div>
        <div className="form-control mt-6">
          <button type="submit" className="btn btn-primary">
            Update Donation Post
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateDonation;
