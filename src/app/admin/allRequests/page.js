"use client";
import { createDonationPost } from "@/lib/utils/createDonationPost";
import { deleteRequest } from "@/lib/utils/deleteRequest";
import { getRequest } from "@/lib/utils/getRequest";
import { getUser } from "@/lib/utils/getUser";
import { updateRequest } from "@/lib/utils/updateRequest";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import auth from "../../../../firebase.init";
import { useRouter } from "next/navigation";
import emailjs from "@emailjs/browser";
function getBadgeColor(category) {
  switch (category) {
    case "Health":
      return "btn-red-300";
    case "Clothing":
      return "btn-green-300";
    case "Food":
      return "btn-yellow-300";
    case "Education":
      return "btn-purple-300";

    default:
      return "badge-secondary";
  }
}
function getCardBackground(category) {
  switch (category) {
    case "health":
      return "bg-red-100";
    case "clothing":
      return "bg-green-100 ";
    case "food":
      return "bg-yellow-100 ";
    case "education":
      return "bg-purple-100 ";

    default:
      return "bg-primary";
  }
}

function getTextColor(category) {
  switch (category) {
    case "health":
      return "text-red-900";
    case "clothing":
      return "text-green-900";
    case "food":
      return "text-yellow-900";
    case "education":
      return "text-purple-900";

    default:
      return "text-primary-content";
  }
}

const allRequest = () => {
  const router = useRouter();
  const [postHeading, setPostHeading] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [imageLink, setImageLink] = useState("");
  const [data, setData] = useState([]);
  const token = localStorage.getItem("token");

  const getNotificationsFun = async () => {
    const res = await getRequest();

    if (res) {
      setData(res);
    }
  };
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
  useEffect(() => {
    getNotificationsFun();
  }, []);
  useEffect(() => {
    if (token) {
      setInterval(() => {
        getNotificationsFun();
      }, 500000);
    }
  }, []);

  const handleDelete = async (item) => {
    const res = await deleteRequest(item._id);
    if (res) {
      toast.error("Request Deleted Successfully");
      const serviceId = "service_60fiu6i";
      const templateId = "template_y1wuehc";
      const publicKeys = "SXleEXDE2HQx-0EzG";

      const subject = `Your request for category ${item.category} has been Denied`;

      emailjs
        .send(
          serviceId,
          templateId,
          {
            subject: subject,
            to_email: item.email,
          },
          publicKeys
        )
        .then(
          function (response) {
            console.log("SUCCESS!", response.status, response.text);
          },
          function (error) {
            console.log("FAILED...", error);
          }
        );
    }
  };
  const handleApproval = async (item) => {
    const res = await updateRequest(item._id);

    if (res) {
      toast.success("Request Approved Successfully");
      const user = await getUser(auth.currentUser.email);
      const str = item.category;
      const cat = str.charAt(0).toUpperCase() + str.slice(1);
      const donation = {
        category: cat,
        donationType: postHeading,
        description: description,
        image: imageLink,
        donatedUser: [],
      };
      const data = {
        user: user,
        donation: donation,
      };
      const result = await createDonationPost(data);
      if (result.success) {
        setPostHeading("");
        setCategory("");
        setDescription("");
        setImageLink("");
        toast.success("Donation added successfully");
        router.push("/admin/allDonations");
      } else {
        toast.error("Error adding donation");
      }
      const serviceId = "service_u3otidn";
      const templateId = "template_3jwx1zx";
      const publicKeys = "JFLSXojdQDlaQJjlM";

      const subject = `Confirmation of Accepted Donation Request category ${item.category}`;

      emailjs
        .send(
          serviceId,
          templateId,
          {
            subject: subject,
            to_email: item.email,
          },
          publicKeys
        )
        .then(
          function (response) {
            console.log("SUCCESS!", response.status, response.text);
          },
          function (error) {
            console.log("FAILED...", error);
          }
        );
    }
  };

  return (
    <div>
      <div className="grid grid-cols-3 gap-4 container mx-auto">
        {data.map((item, index) => {
          return (
            <div
              key={index}
              className={`${getCardBackground(item.category)} ${getTextColor(
                item.category
              )} card   col-span-3 md:col-span-1`}
            >
              <div className="card-body items-center text-center">
                <h2 className="card-title">{item.category}</h2>
                <p>{item.description}</p>
                <div className="card-actions justify-end">
                  <label
                    htmlFor="my_modal_1"
                    className={`btn bg-green-900 text-white`}
                    // onClick={() => handleDeleteDonation(donation._id)}
                  >
                    Approve Request
                  </label>
                  <input
                    type="checkbox"
                    id="my_modal_1"
                    className="modal-toggle"
                  />
                  <div className="modal" role="dialog">
                    <div className="modal-box">
                      <h3 className="font-bold text-lg">
                        You are approving the request of {item.email}?
                      </h3>
                      <div className="card shrink-0 w-full max-w-sm  bg-base-100">
                        <form className="card-body">
                          <div className="form-control">
                            <label className="label">
                              <span className="label-text">
                                Donation Post Heading
                              </span>
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
                              <span className="label-text">
                                Donation Category
                              </span>
                            </label>
                            <input
                              type="text"
                              placeholder="Enter donation category"
                              className="input input-bordered"
                              value={item.category}
                              onChange={handleCategoryChange}
                              required
                              disabled
                            />
                          </div>
                          <div className="form-control">
                            <label className="label">
                              <span className="label-text">
                                Donation Description
                              </span>
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
                        </form>
                      </div>
                      <div className="modal-action">
                        <label
                          htmlFor="my_modal_1"
                          onClick={() => handleApproval(item)}
                          className="btn bg-red-900 text-white"
                        >
                          Yes donation post created
                        </label>
                        <label htmlFor="my_modal_1" className="btn">
                          No I donot
                        </label>
                      </div>
                    </div>
                  </div>
                  <label
                    htmlFor="my_modal_7"
                    className={`btn bg-red-900 text-white`}
                    // onClick={() => handleDeleteDonation(donation._id)}
                  >
                    Delete
                  </label>
                  <input
                    type="checkbox"
                    id="my_modal_7"
                    className="modal-toggle"
                  />
                  <div className="modal" role="dialog">
                    <div className="modal-box">
                      <h3 className="font-bold text-lg">
                        Do you want to delete request of {item.email}?
                      </h3>
                      <p className="py-4">Click the buttons Accordingly</p>
                      <div className="modal-action">
                        <label
                          htmlFor="my_modal_7"
                          onClick={() => handleDelete(item)}
                          className="btn bg-red-900 text-white"
                        >
                          Yes I want to delete
                        </label>
                        <label htmlFor="my_modal_7" className="btn">
                          No I donot
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default allRequest;
