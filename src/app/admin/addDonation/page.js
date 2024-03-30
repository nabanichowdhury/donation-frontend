"use client";
import { getUser } from "@/lib/utils/getUser";
import React, { useEffect, useState } from "react";
import auth from "../../../../firebase.init";
import { createDonationPost } from "@/lib/utils/createDonationPost";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { useAuthState } from "react-firebase-hooks/auth";

const AddDonation = () => {
  const router = useRouter();
  const [postHeading, setPostHeading] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [imageLink, setImageLink] = useState("");
  const [user, loading, error] = useAuthState(auth);
  useEffect(() => {
    const fetchData = async () => {
      if (user) {
        const u = await getUser(user?.email);
        if (u.role !== "admin") {
          router.push("/");
        }
      } else {
        router.push("/login");
      }
    };
    fetchData();
  }, [user, router]);

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
    const user = await getUser(auth.currentUser.email);
    const donation = {
      category: category,
      donationType: postHeading,
      description: description,
      image: imageLink,
      donatedUser: [],
    };
    const data = {
      user: user,
      donation: donation,
    };
    const res = await createDonationPost(data);
    if (res.success) {
      setPostHeading("");
      setCategory("");
      setDescription("");
      setImageLink("");
      toast.success("Donation added successfully");
      router.push("/admin/allDonations");
    } else {
      toast.error("Error adding donation");
    }
  };

  return (
    <div className="card shrink-0 w-full max-w-sm container mx-auto ">
      <h1 className="text-xl text-center font-bold">Add Donation</h1>
      <form className="card-body " onSubmit={handleSubmit}>
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
            Add Donation
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddDonation;
