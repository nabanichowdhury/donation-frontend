"use client";
import { getRequest } from "@/lib/utils/getRequest";
import { faBell } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
// import { Link } from "react-router-dom";
// import { toast } from "react-toastify";
// import {
//     getNotifications,
//     readAllNotification,
//     readNotification,
// } from "../../api/notification";

const NotificationDropdown = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const token = localStorage.getItem("token");
  const [notifying, setNotifying] = useState(true);
  const [notificationsData, setNotificationsData] = useState([]);

  const trigger = useRef(null);
  const dropdown = useRef(null);

  useEffect(() => {
    const clickHandler = ({ target }) => {
      if (!dropdown.current) return;
      if (
        !dropdownOpen ||
        dropdown.current.contains(target) ||
        trigger.current.contains(target)
      )
        return;
      setDropdownOpen(false);
    };
    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  });

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }) => {
      if (!dropdownOpen || keyCode !== 27) return;
      setDropdownOpen(false);
    };
    document.addEventListener("keydown", keyHandler);
    return () => document.removeEventListener("keydown", keyHandler);
  });

  const getNotificationsFun = async () => {
    const res = await getRequest();
    // console.log(res);
    if (res) {
      setNotificationsData(res);
    }
  };

  useEffect(() => {
    if (token) {
      setInterval(() => {
        getNotificationsFun();
      }, 10000);
    }
  }, []);

  function formatDate(timestamp) {
    // Convert timestamp to Date object
    const date = new Date(timestamp);

    // Define months array
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    // Extract year, month, and day
    const year = date.getUTCFullYear();
    const monthIndex = date.getUTCMonth();
    const day = date.getUTCDate();

    // Format the date
    const formattedDate = `${day}th ${months[monthIndex]} ${year}`;

    return formattedDate;
  }

  //   const markAsRead = async (id) => {
  //     const res = await readNotification({ id: id, is_read: true });
  //     if (res) {
  //       toast(res.detail, { type: "success" });
  //     }
  //   };

  //   const markAllAsRead = async () => {
  //     const res = await readAllNotification();
  //     if (res) {
  //       toast(res.detail, { type: "success" });
  //     }
  //   };

  return (
    <li className="relative">
      <Link
        ref={trigger}
        onClick={() => {
          setNotifying(false);
          setDropdownOpen(!dropdownOpen);
        }}
        href="#"
        className="relative flex h-8 w-8 items-center justify-center rounded-full border-[0.5px] border-stroke bg-white text-black hover:text-primary"
      >
        <span
          className={`absolute -top-1 right-0 z-1 h-2 w-2 rounded-full bg-meta-1 ${
            notifying === false ? "hidden" : "inline"
          }`}
        >
          <span className="absolute -z-1 inline-flex h-full w-full animate-ping rounded-full bg-meta-1 opacity-75"></span>
        </span>
        <FontAwesomeIcon icon={faBell} />
        {/* <svg
          className="fill-primary duration-300 ease-in-out"
          width="18"
          height="18"
          viewBox="0 0 18 18"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M16.1999 14.9343L15.6374 14.0624C15.5249 13.8937 15.4687 13.7249 15.4687 13.528V7.67803C15.4687 6.01865 14.7655 4.47178 13.4718 3.31865C12.4312 2.39053 11.0812 1.7999 9.64678 1.6874V1.1249C9.64678 0.787402 9.36553 0.478027 8.9999 0.478027C8.6624 0.478027 8.35303 0.759277 8.35303 1.1249V1.65928C8.29678 1.65928 8.24053 1.65928 8.18428 1.6874C4.92178 2.05303 2.4749 4.66865 2.4749 7.79053V13.528C2.44678 13.8093 2.39053 13.9499 2.33428 14.0343L1.7999 14.9343C1.63115 15.2155 1.63115 15.553 1.7999 15.8343C1.96865 16.0874 2.2499 16.2562 2.55928 16.2562H8.38115V16.8749C8.38115 17.2124 8.6624 17.5218 9.02803 17.5218C9.36553 17.5218 9.6749 17.2405 9.6749 16.8749V16.2562H15.4687C15.778 16.2562 16.0593 16.0874 16.228 15.8343C16.3968 15.553 16.3968 15.2155 16.1999 14.9343ZM3.23428 14.9905L3.43115 14.653C3.5999 14.3718 3.68428 14.0343 3.74053 13.6405V7.79053C3.74053 5.31553 5.70928 3.23428 8.3249 2.95303C9.92803 2.78428 11.503 3.2624 12.6562 4.2749C13.6687 5.1749 14.2312 6.38428 14.2312 7.67803V13.528C14.2312 13.9499 14.3437 14.3437 14.5968 14.7374L14.7655 14.9905H3.23428Z"
            fill=""
          />
        </svg> */}
      </Link>

      <div
        ref={dropdown}
        onFocus={() => setDropdownOpen(true)}
        onBlur={() => setDropdownOpen(false)}
        className={`absolute z-10 -right-27 mt-[2rem] flex h-90 w-75 flex-col rounded-sm border border-stroke bg-white hover:bg-white shadow-default sm:right-0 sm:w-80 ${
          dropdownOpen === true ? "block" : "hidden"
        }`}
      >
        <div className="px-4 py-3 flex justify-between w-full">
          <h5 className="text-sm font-medium text-bodydark2">Notification</h5>
          <p
            className="text-sm font-medium cursor-pointer"
            onClick={() => markAllAsRead()}
          >
            Mark as all read
          </p>
        </div>

        <ul className="flex h-auto flex-col overflow-y-auto">
          {notificationsData?.length > 0 ? (
            notificationsData?.map((item, index) => (
              <li key={index}>
                <Link
                  className={`${
                    !item?.hasRead ? "bg-gray-200" : ""
                  } flex flex-col gap-3 border-t border-stroke px-4 py-3 hover:bg-gray-100 dark:border-strokedark dark:hover:bg-meta-4`}
                  href="/"
                >
                  <p className="text-sm" onClick={() => markAsRead(item?.id)}>
                    <span className="text-black">{item?.category}</span> a
                  </p>

                  {/* <p className="text-xs">{formatDate(item?.category)}f</p> */}
                </Link>
              </li>
            ))
          ) : (
            <p className="text-sm p-4">There have no notifications</p>
          )}
        </ul>
      </div>
    </li>
  );
};

export default NotificationDropdown;
