"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useAuthState, useSignOut } from "react-firebase-hooks/auth";
import auth from "../../../firebase.init";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useRouter } from "next/navigation";
import { getUser } from "@/lib/utils/getUser";
import NotificationDropdown from "../ui/Notification/NotificationDropdown";

const Navbar = () => {
  const router = useRouter();
  const [user, loading, error] = useAuthState(auth);
  const [signOut, signOutloading, signOuterror] = useSignOut(auth);
  const [admin, setAdmin] = useState(false);

  const handleLogout = () => {
    setAdmin(false);
    signOut();
    toast.success("Logged Out Successfully");
    router.push("/");
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (user) {
          const response = await getUser(user?.email);

          if (response) {
            if (response?.role == "admin") {
              setAdmin(true);
            }
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
              <>
                <li>
                  <Link className="bg-warning" href="/admin/allDonations">
                    Admin panel
                  </Link>
                </li>
                <NotificationDropdown />
              </>
            )}

            {!user && (
              <li>
                <Link href="/help">Need Help</Link>
              </li>
            )}
            <li>
              <Link className="bg-green-300" href="/donations">
                Donations
              </Link>
            </li>
            {user ? (
              <>
                <li>
                  <Link
                    className="bg-indigo-200"
                    href={`/myprofile/myDonationLogs`}
                  >
                    User Dashboard
                  </Link>
                </li>

                <li>
                  <button onClick={handleLogout} className="btn btn-ghost">
                    LogOut
                  </button>
                </li>
              </>
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
