import { useEffect, useRef, useState } from "react";
import { addSeconds, intervalToDuration } from "date-fns";

export const useTimeout = (blocksUntilAuctionEnd: number): string => {
  let intervalHandle = useRef<ReturnType<typeof setTimeout>>();
  const [auctionDuration, updateAuctionDuration] = useState<Duration | null>(
    null
  );

  const resetTimeout = () => {
    intervalHandle.current && clearInterval(intervalHandle.current);
  };

  useEffect(() => {
    if (!blocksUntilAuctionEnd) return;
    resetTimeout();
    const startDate = new Date();
    intervalHandle.current = setInterval(() => {
      const duration = intervalToDuration({
        start: new Date(),
        end: addSeconds(startDate, blocksUntilAuctionEnd * 4 * 60),
      });
      updateAuctionDuration(duration);
    }, 1000);

    return () => {
      resetTimeout();
    };
  }, [blocksUntilAuctionEnd]);

  if (!auctionDuration) return "";

  const {
    years = 0,
    months = 0,
    days = 0,
    hours = 0,
    minutes = 0,
  } = auctionDuration;

  let timeoutLabel = "";

  const formattedDays = years * 365 + months * 30 + days;

  const dayLabel = ` day${formattedDays > 1 ? "s" : ""} `;
  const hourLabel = ` hour${hours > 1 ? "s" : ""} `;
  const minuteLabel = ` minute${minutes > 1 ? "s" : ""} `;

  if (formattedDays) timeoutLabel += formattedDays + dayLabel;
  if (hours) timeoutLabel += hours + hourLabel;
  if (minutes) timeoutLabel += minutes + minuteLabel;

  return timeoutLabel;
};
