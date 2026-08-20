"use client";

import Script from "next/script";

export function GoogleReviewsWidget() {
  return (
    <>
      <div
        id="featurable-f875742a-004d-4d92-a7af-80894f729e7c"
        data-featurable-async
        className="w-full"
      />
      <Script
        src="https://cdn.featurable.com/widget/v2/embed.js"
        strategy="afterInteractive"
        defer
      />
    </>
  );
}
