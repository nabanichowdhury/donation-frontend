"use client";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { getUser } from "@/lib/utils/getUser";
import auth from "../../../../firebase.init";
import {
  useAuthState,
  useCreateUserWithEmailAndPassword,
} from "react-firebase-hooks/auth";
import { updateUser } from "@/lib/utils/updateUser";
import { createUser } from "@/lib/utils/createUser";

const AddAdmin = () => {
  const router = useRouter();
  const [adminName, setAdminName] = useState("");
  const [adminEmail, setAdminEmail] = useState("");
  const [adminRole, setAdminRole] = useState("admin");
  const [adminPassword, setAdminPassword] = useState("admin");
  const [userData, userLoading] = useAuthState(auth);
  const [createUserWithEmailAndPassword, user, loading, error] =
    useCreateUserWithEmailAndPassword(auth);

  const handleAdminNameChange = (event) => {
    setAdminName(event.target.value);
  };

  const handleAdminEmailChange = (event) => {
    setAdminEmail(event.target.value);
  };

  const handleAdminRoleChange = (event) => {
    setAdminRole(event.target.value);
  };

  useEffect(() => {
    const fetchUser = async () => {
      if (!userLoading && !userData) {
        router.push("/login");
      }
      if (userData && !userLoading) {
        const u = await getUser(userData?.email);

        if (u.role !== "admin") {
          router.push("/");
        }
      }
    };
    fetchUser();
  }, [userData, userLoading, router]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const adminData = {
      name: adminName,
      email: adminEmail,
      role: adminRole,
      password: adminPassword,
    };
    const res = await getUser(adminEmail);

    if (res) {
      const data = {
        name: adminName,
        email: adminEmail,
        role: adminRole,
      };
      const result = await updateUser(res._id, data);
      if (result.success) {
        setAdminName("");
        setAdminEmail("");

        setAdminPassword("");
        toast.success("User is updated to admin successfully");
      } else {
        toast.error("Error updating user to admin");
      }
    } else {
      await createUserWithEmailAndPassword(adminEmail, adminPassword);
      const result = await createUser(adminData);
      if (result.success) {
        setAdminName("");
        setAdminEmail("");

        setAdminPassword("");
        toast.success("Admin added successfully");
      } else {
        toast.error("Error adding admin");
      }
    }
  };
  if (userLoading) return <div>Loading...</div>;

  return (
    <div className="card shrink-0 w-full max-w-sm container mx-auto ">
      <h1 className="text-xl text-center font-bold">Add Admin</h1>
      <form className="card-body " onSubmit={handleSubmit}>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Name</span>
          </label>
          <input
            type="text"
            placeholder="Enter admin name"
            className="input input-bordered"
            value={adminName}
            onChange={handleAdminNameChange}
            required
          />
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input
            type="email"
            placeholder="Enter admin email"
            className="input input-bordered"
            value={adminEmail}
            onChange={handleAdminEmailChange}
            required
          />
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text">Role</span>
          </label>
          <input
            type="text"
            disabled
            className="input input-bordered"
            value={adminRole}
            onChange={handleAdminRoleChange}
            required
          />
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text">Default Admin Password</span>
          </label>
          <input
            disabled
            type="text"
            placeholder="Enter admin password"
            className="input input-bordered"
            value={adminPassword}
            required
          />
        </div>

        <div className="form-control mt-6">
          <button type="submit" className="btn btn-primary">
            Add Admin
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddAdmin;
