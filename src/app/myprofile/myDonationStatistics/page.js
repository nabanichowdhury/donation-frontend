"use client";
import { getUser } from "@/lib/utils/getUser";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../../../../firebase.init";
import { getAllDonations } from "@/lib/utils/getAllDonations";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { useRouter } from "next/navigation";
ChartJS.register(ArcElement, Tooltip, Legend);

const DonationStatistics = () => {
  const [userData, setUser] = useState();
  const [user, loading, error] = useAuthState(auth);
  const [donations, setDonations] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const fetchDonations = async () => {
      const allDonations = await getAllDonations();
      if (!user) {
        router.push("/login");
      }
      setDonations(allDonations);
      if (user && !loading) {
        const u = await getUser(user?.email);
        setUser(u);
      }
    };
    fetchDonations();
  }, [user, loading, router]);

  if (loading) return <div>Loading...</div>;
  const userId = userData?._id;

  function aggregateDonationsByCategoryForUser(donations, userId) {
    const aggregatedData = {};

    donations?.forEach((donation) => {
      const category = donation?.category;
      const donatedByUser = donation?.donatedUser?.reduce((total, user) => {
        if (user._id === userId) {
          return total + parseInt(user.amount);
        }
        return total;
      }, 0);
      const donatedByOthers = donation?.donatedUser?.reduce((total, user) => {
        if (user._id !== userId) {
          return total + parseInt(user.amount);
        }
        return total;
      }, 0);
      if (!aggregatedData[category]) {
        aggregatedData[category] = {
          donatedByUser: 0,
          donatedByOthers: 0,
          category: category,
        };
      }
      aggregatedData[category].donatedByUser += donatedByUser;
      aggregatedData[category].donatedByOthers += donatedByOthers;
    });

    return Object.values(aggregatedData);
  }
  const donationCategoryTotals = aggregateDonationsByCategoryForUser(
    donations,
    userId
  );

  function aggregateDonationsByTypeForUser(donations, userId) {
    const aggregatedData = {};

    donations?.forEach((donation) => {
      const donationType = donation?.donationType;
      const donatedByUser = donation?.donatedUser?.reduce((total, user) => {
        if (user._id === userId) {
          return total + parseInt(user.amount);
        }
        return total;
      }, 0);
      const donatedByOthers = donation?.donatedUser?.reduce((total, user) => {
        if (user._id !== userId) {
          return total + parseInt(user.amount);
        }
        return total;
      }, 0);
      if (!aggregatedData[donationType]) {
        aggregatedData[donationType] = {
          donatedByUser: 0,
          donatedByOthers: 0,
          donationType: donationType,
        };
      }
      aggregatedData[donationType].donatedByUser += donatedByUser;
      aggregatedData[donationType].donatedByOthers += donatedByOthers;
    });

    return Object.values(aggregatedData);
  }
  const donationTypeTotals = aggregateDonationsByTypeForUser(donations, userId);

  const finalData = donationCategoryTotals?.map((item) => {
    return [
      {
        name: item.category,
        value: item.donatedByUser,
      },
      {
        name: "Donated by Others",
        value: item.donatedByOthers,
      },
    ];
  });

  const finalData1 = donationTypeTotals?.map((item) => {
    return [
      {
        name: item.donationType,
        value: item.donatedByUser,
      },
      {
        name: "Donated by Others",
        value: item.donatedByOthers,
      },
    ];
  });

  const totalAmountOfUser = userData?.donations?.reduce(
    (accumulator, donation) => {
      const donationAmount = parseInt(donation.amount);
      return isNaN(donationAmount) ? accumulator : accumulator + donationAmount;
    },
    0
  );

  const totalAmountDonated = donations?.reduce((total, donation) => {
    const donationAmount = donation?.donatedUser?.reduce((acc, user) => {
      const userAmount = parseInt(user.amount);
      return isNaN(userAmount) ? acc : acc + userAmount;
    }, 0);

    return isNaN(donationAmount) ? total : total + donationAmount;
  }, 0);

  const data = {
    labels: ["My Total Donated Amount", "Others Donated Amount"],
    datasets: [
      {
        label: "Donation Percentage",
        data: [
          (totalAmountOfUser / totalAmountDonated) * 100,
          ((totalAmountDonated - totalAmountOfUser) / totalAmountDonated) * 100,
        ],
        backgroundColor: ["#FF6384", "#36A2EB"],
        hoverBackgroundColor: ["#FF6384", "#36A2EB"],
      },
    ],
  };

  return (
    <div>
      <h1 className="text-xl text-center font-bold">My donation Statistics</h1>
      <div className="w-80 mx-auto ">
        <Doughnut data={data} />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <h1 className="text-xl text-center font-bold">
            {" "}
            Category Wise Donation Percentage{" "}
          </h1>
          <div>
            <div className="grid grid-cols-2">
              {finalData?.map((item, index) => {
                return (
                  <div key={index} className="w-64 shadow-xl my-7 ">
                    <h1 className="text-md text-center font-bold">
                      {item[0].name}
                    </h1>
                    <Doughnut
                      data={{
                        labels: [
                          "My Total Donated Amount",
                          "Others Donated Amount",
                        ],
                        datasets: [
                          {
                            label: "Donation Percentage",
                            data: [item[0].value, item[1].value],
                            backgroundColor: ["#FF6384", "#36A2EB"],
                            hoverBackgroundColor: ["#FF6384", "#36A2EB"],
                          },
                        ],
                      }}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <div>
          <h1 className="text-xl text-center font-bold">
            {" "}
            Donation Type Wise Donation Percentage{" "}
          </h1>
          <div>
            <div className="grid grid-cols-2">
              {finalData1?.map((item, index) => {
                return (
                  <div key={index} className="w-64 shadow-xl my-7 ">
                    <h1 className="text-md text-center font-bold">
                      {item[0].name}
                    </h1>
                    <Doughnut
                      data={{
                        labels: [
                          "My Total Donated Amount",
                          "Others Donated Amount",
                        ],
                        datasets: [
                          {
                            label: "Donation Percentage",
                            data: [item[0].value, item[1].value],
                            backgroundColor: ["#FF6384", "#36A2EB"],
                            hoverBackgroundColor: ["#FF6384", "#36A2EB"],
                          },
                        ],
                      }}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DonationStatistics;
