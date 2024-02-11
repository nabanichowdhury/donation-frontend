import Link from "next/link";
import React from "react";

const layout = ({ children }) => {
  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content ">
        {children}
        <label
          htmlFor="my-drawer-2"
          className="btn btn-primary drawer-button lg:hidden"
        >
          Open drawer
        </label>
      </div>
      <div className="drawer-side">
        <label
          htmlFor="my-drawer-2"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
          {/* Sidebar content here */}
          <li>
            <Link href="/myprofile/myDonationLogs">My Donation Logs</Link>
          </li>
          <li>
            <Link href="/myprofile/myTotalDonations">Total Donation</Link>
          </li>
          <li>
            <Link href="/myprofile/updateAccount">Update Account</Link>
          </li>
          <li>
            <Link href="/myprofile/myDonationStatistics">
              My Donation Statistics
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default layout;
