import Link from "next/link";
import React from "react";

const AdminLayout = ({ children }) => {
  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col ">
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
            <Link href="/admin/allDonations">All Existing donations</Link>
          </li>
          <li>
            <Link href="/admin/addDonation">Add a Donation type</Link>
          </li>
          <li>
            <Link href="/admin/donationStatistics">
              See donation statisticss
            </Link>
          </li>
          <li>
            <Link href="/admin/addAdmin">Add an Admin</Link>
          </li>
          <li>
            <Link href="/admin/allRequests">Donation Requests</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default AdminLayout;
