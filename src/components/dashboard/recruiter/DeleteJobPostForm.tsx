"use client";

import React, { useState } from "react";
import { Trash2 } from "lucide-react";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import type { TcreatejobForm } from "@/types/jobsTypes";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { deleteJob } from "@/lib/actions/jobs";

const DeleteJobPostForm = ({ job }: { job: TcreatejobForm }) => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [deleting, setDeleting] = useState(false);


const handleDelete = async () => {
  if (!job._id) return;

  setDeleting(true);
  try {
    await deleteJob(job._id);

    toast.success("Job deleted successfully!");
    setOpen(false);
    router.refresh();
  } catch (error: unknown) {
    toast.error(
      error instanceof Error ? error.message : "Failed to delete job",
    );
  } finally {
    setDeleting(false);
  }
};
  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger
        render={
          <button
            type="button"
            aria-label="Delete job"
            className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#1a1a1d] text-[#8e8e96] transition-colors hover:bg-red-500/10 hover:text-red-400"
          />
        }
      >
        <Trash2 className="h-4 w-4" />
      </AlertDialogTrigger>

      <AlertDialogContent className="border border-white/10 bg-[#0c0c0e] p-5 text-white sm:max-w-md">
        <AlertDialogHeader className="sm:place-items-start sm:text-left">
          <span className="mb-2 flex h-10 w-10 items-center justify-center rounded-lg bg-red-500/10 text-red-400">
            <Trash2 className="h-5 w-5" />
          </span>
          <AlertDialogTitle className="text-lg font-semibold">
            Delete this job post?
          </AlertDialogTitle>
          <AlertDialogDescription className="text-sm text-[#8e8e96]">
            <span className="font-medium text-white">
              {job.title || "Untitled"}
            </span>{" "}
            at {job.company} will be permanently removed. This action cannot be
            undone.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter className="-mx-5 -mb-5 border-white/10 bg-white/[0.03] p-4">
          <AlertDialogCancel
            disabled={deleting}
            className="h-10 border-white/10 bg-[#1a1a1d] text-white hover:bg-[#232327]"
          >
            Cancel
          </AlertDialogCancel>
          <Button
            type="button"
            onClick={handleDelete}
            disabled={deleting}
            className="h-10 bg-red-500 text-white hover:bg-red-600"
          >
            {deleting ? "Deleting..." : "Delete"}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteJobPostForm;