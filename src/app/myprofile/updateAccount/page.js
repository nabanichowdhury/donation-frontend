"use client";
import React, { useEffect, useState } from "react";
import auth from "../../../../firebase.init";
import {
  useAuthState,
  useUpdateEmail,
  useUpdatePassword,
  useUpdateProfile,
} from "react-firebase-hooks/auth";
import { getUser } from "@/lib/utils/getUser";
import { updateUser } from "@/lib/utils/updateUser";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

const UpdateAccount = () => {
  const router = useRouter();
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [user, loading, error] = useAuthState(auth);
  const [updateProfile, updating, updateerror] = useUpdateProfile(auth);
  const [updatePassword, updatingPassword, updatePasswordError] =
    useUpdatePassword(auth);
  const [updateEmail, updatingEmail, updateEmailError] = useUpdateEmail(auth);
  useEffect(() => {
    const fetchUser = async () => {
      if (!user) {
        router.push("/login");
      }
      if (user && !loading) {
        const u = await getUser(user?.email);
        console.log(u);
        setName(u.name);
        setEmail(u.email);
        setPassword(u.password);
        setRole(u.role);
        setId(u._id);
      }
    };
    fetchUser();
  }, [user, loading, router]);
  if (loading) return <div>Loading...</div>;

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleRoleChange = (e) => {
    setRole(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updateres = await updateUser(id, {
      name: name,
      email: email,
      role: role,
      password: password,
    });
    const res = await updateProfile({
      displayName: name,
    });
    // const passwordres = await updatePassword(password);
    const emailres = await updateEmail(email);
    if (updatePasswordError)
      if (res && updateres.success && emailres) {
        toast.success("User updated successfully");
      } else {
        toast.error("Something went wrong! Please try again.");
      }
    console.log(res);
    console.log(updateres);

    console.log(emailres);
  };

  return (
    <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
      <h1 className="text-xl text-center font-bold mt-6">
        Update your profile
      </h1>
      <form className="card-body" onSubmit={handleSubmit}>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Name</span>
          </label>
          <input
            type="text"
            placeholder="Name"
            className="input input-bordered"
            required
            value={name}
            onChange={handleNameChange}
          />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input
            type="email"
            placeholder="Email"
            className="input input-bordered"
            required
            value={email}
            onChange={handleEmailChange}
          />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Password</span>
          </label>
          <input
            type="password"
            disabled
            placeholder="Password"
            className="input input-bordered"
            required
            value={password}
          />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Role</span>
          </label>
          <input
            type="role"
            disabled
            placeholder="Role"
            className="input input-bordered"
            required
            value={role}
          />
        </div>
        <div className="form-control mt-6">
          <button type="submit" className="btn btn-primary">
            Update Account
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateAccount;
