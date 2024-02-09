"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useAuthState, useSignOut } from "react-firebase-hooks/auth";
import auth from "../../../firebase.init";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const router = useRouter();
  const [user, loading, error] = useAuthState(auth);
  const [signOut, signOutloading, signOuterror] = useSignOut(auth);
  const [admin, setAdmin] = useState(false);

  const handleLogout = () => {
    signOut();
    toast.success("Logged Out Successfully");
    router.push("/");
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (user) {
          const response = await axios.get(
            `http://localhost:8000/user/${user.email}`
          );
          console.log(response.data.role);
          if (response.data.role == "admin") {
            setAdmin(true);
          }
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData(); // Call the fetch function
  }, [user]);
  if (loading || signOutloading) return <div>Loading...</div>;

  return (
    <div>
      <div className="navbar bg-base-100">
        <div className="flex-1">
          <Link href="/" className="text-xl font-bold btn btn-ghost">
            Donation Camp
          </Link>
        </div>
        <div className="flex-none">
          <ul className="menu menu-horizontal px-1">
            {admin && (
              <li>
                <Link className="bg-warning" href="/admin">
                  Admin panel
                </Link>
              </li>
            )}
            <li>
              <Link href="/donations">Donations</Link>
            </li>

            {user ? (
              <li>
                <details>
                  <summary>Profile</summary>
                  <ul className="p-2 bg-base-100 rounded-t-none">
                    <li>
                      <a>My Profile</a>
                    </li>
                    <li>
                      <button onClick={handleLogout} className="btn btn-ghost">
                        LogOut
                      </button>
                    </li>
                  </ul>
                </details>
              </li>
            ) : (
              <li>
                <Link href="/login">Login</Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
