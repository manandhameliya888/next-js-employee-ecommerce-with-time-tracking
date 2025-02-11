"use client";

import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import { useAttendance } from "@/lib/AttendanceContext";

const rewards = [
  {
    id: 1,
    name: "Spotify Premium (1 Month)",
    points: 20,
    actualPrice: "$9.99",
    image: "https://images.unsplash.com/photo-1614680376593-902f74cf0d41?w=400",
  },
  {
    id: 2,
    name: "Amazon Gift Card",
    points: 50,
    actualPrice: "$25",
    image: "https://images.unsplash.com/photo-1622547748225-3fc4abd2cca0?w=400",
  },
  {
    id: 3,
    name: "Netflix Subscription",
    points: 40,
    actualPrice: "$15.99",
    image: "https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?w=400",
  },
  {
    id: 4,
    name: "Disney Subscription",
    points: 80,
    actualPrice: "$95.99",
    image: "https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?w=400",
  }
];

export default function ShopPage() {


  //dynamic banavu hoy etle ke attendance page na points sathe connect karvu hoy to niche no code uncomment kari devano
  // const { dayLogs } = useAttendance();

  // const calculateTotalHours = () => {
  //   let totalMilliseconds = 0;

  //   dayLogs.forEach(dayLog => {
  //     dayLog.timeLogs.forEach(log => {
  //       if (log.clockOut) {
  //         totalMilliseconds += log.clockOut.getTime() - log.clockIn.getTime();
  //       }
  //     });
  //   });
  //   const hours = Math.floor(totalMilliseconds / (1000 * 60 * 60));
  //   const minutes = Math.floor((totalMilliseconds % (1000 * 60 * 60)) / (1000 * 60));

  //   return { totalHours: hours, totalMinutes: minutes };
  // };
  // const { totalHours, totalMinutes } = useMemo(calculateTotalHours, [dayLogs]);
  // const points = Math.floor(totalHours * 5);


  // const [userPoints, setUserPoints] = useState(points); 
  // const [redeemedRewards, setRedeemedRewards] = useState<number[]>([]);


  // const handleRedeem = (rewardId: number, points: number) => {
  //   if (userPoints >= points) {
  //     setUserPoints((prev) => prev - points);
  //     setRedeemedRewards((prev) => [...prev, rewardId]);
  //   }
  // };


  const [userPoints, setUserPoints] = useState(75); 
  const [redeemedRewards, setRedeemedRewards] = useState<number[]>([]);

  const { dayLogs } = useAttendance();

  const handleRedeem = (rewardId: number, points: number) => {
    if (userPoints >= points) {
      setUserPoints((prev) => prev - points);
      setRedeemedRewards((prev) => [...prev, rewardId]);
    }
  };

  const calculateTotalHours = () => {
    let totalMilliseconds = 0;

    dayLogs.forEach(dayLog => {
      dayLog.timeLogs.forEach(log => {
        if (log.clockOut) {
          totalMilliseconds += log.clockOut.getTime() - log.clockIn.getTime();
        }
      });
    });
    const hours = Math.floor(totalMilliseconds / (1000 * 60 * 60));
    const minutes = Math.floor((totalMilliseconds % (1000 * 60 * 60)) / (1000 * 60));

    return { totalHours: hours, totalMinutes: minutes };
  };
  const { totalHours, totalMinutes } = useMemo(calculateTotalHours, [dayLogs]);
  const points = Math.floor(totalHours * 5);



  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-2">Rewards Shop</h1>
        <p className="text-gray-600">
          Your Points Balance: <span className="font-bold">{userPoints}</span>
          {/* Your Points Balance: <span className="font-bold">{points}</span> */}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {rewards.map((reward) => {
          const isRedeemed = redeemedRewards.includes(reward.id);
          return (
            <Card
              key={reward.id}
              className={`relative ${isRedeemed ? "opacity-50" : ""}`}
            >
              <img
                src={reward.image}
                alt={reward.name}
                className="w-full h-48 object-cover rounded-t-lg"
              />
              <CardHeader>
                <CardTitle className="truncate w-50">{reward.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <p className="text-sm text-gray-500">Market Price</p>
                    <p className="font-bold">{reward.actualPrice}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Points Required</p>
                    <p className="font-bold text-green-600">{reward.points} pts</p>
                  </div>
                </div>
                {isRedeemed ? (
                  <div className="absolute inset-0 flex items-center justify-center text-yellow-600 bg-black bg-opacity-80 text-3xl font-bold">
                    Redeemed
                  </div>
                ) : (
                  <Button
                    className="w-full"
                    disabled={userPoints < reward.points}
                    onClick={() => handleRedeem(reward.id, reward.points)}
                  >
                    Redeem
                  </Button>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
