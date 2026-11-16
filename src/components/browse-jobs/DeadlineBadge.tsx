"use client";

import { useState } from "react";

export default function DeadlineBadge({ deadline }: { deadline?: string }) {
  const [expired] = useState(() =>
    deadline ? new Date(deadline).getTime() < Date.now() : false
  );

  return (
    <span className={expired ? "text-red-500" : "text-green-600"}>
      {expired ? "Expired" : "Active"}
    </span>
  );
}