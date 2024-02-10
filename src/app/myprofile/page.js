"use client";
import React from "react";
import auth from "../../../firebase.init";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from "next/navigation";

const MyProfile = () => {
  const [user, error, loading] = useAuthState(auth);
  const router = useRouter();
  if (loading) return <div>Loading...</div>;
  if (!user) {
    router.push("/login");
  } else {
    router.push("/myprofile/myDonations");
  }
  return <div></div>;
};

export default MyProfile;
