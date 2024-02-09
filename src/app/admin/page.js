"use client";
import React, { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../../../firebase.init";
import axios from "axios";
import { useRouter } from "next/navigation";

const AdminPanel = () => {
  const [user, loading, error] = useAuthState(auth);
  const router = useRouter();
  if (!user) {
    router.push("/login");
  }
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (user) {
          const response = await axios.get(
            `http://localhost:8000/user/${user.email}`
          );

          if (response.data.role != "admin") {
            router.push("/login");
          }
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData(); // Call the fetch function
  }, [user]);

  return (
    <div>
      <h1>Admin Panel</h1>
    </div>
  );
};

export default AdminPanel;
