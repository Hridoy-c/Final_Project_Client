"use client";

import React from "react";
import { Copy, Eye, Lock, MoreVertical, Users } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { TcreatejobForm } from "@/types/jobsTypes";

const itemClass =
  "cursor-pointer gap-2 rounded-md px-2.5 py-2 text-xs text-[#d6d6dc] focus:bg-white/[0.06] focus:text-white";

const JobMoreActions = ({ job }: { job: TcreatejobForm }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <button
            type="button"
            aria-label="More actions"
            className="flex h-8 w-8 items-center justify-center rounded-lg text-[#8e8e96] transition-colors hover:bg-white/[0.06] hover:text-white"
          />
        }
      >
        <MoreVertical className="h-4 w-4" />
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        className="w-48 border-white/10 bg-[#161619] p-1 text-white"
      >
        <DropdownMenuItem
          className={itemClass}
          onClick={() => {
            // TODO: view details (job._id)
          }}
        >
          <Eye className="h-4 w-4" />
          View Details
        </DropdownMenuItem>

        <DropdownMenuItem
          className={itemClass}
          onClick={() => {
            // TODO: view applicants
          }}
        >
          <Users className="h-4 w-4" />
          View Applicants
        </DropdownMenuItem>

        <DropdownMenuItem
          className={itemClass}
          onClick={() => {
            // TODO: duplicate job
          }}
        >
          <Copy className="h-4 w-4" />
          Duplicate Job
        </DropdownMenuItem>

        <DropdownMenuSeparator className="bg-white/10" />

        <DropdownMenuItem
          className={itemClass}
          onClick={() => {
            // TODO: close job
          }}
        >
          <Lock className="h-4 w-4" />
          Close Job
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default JobMoreActions;