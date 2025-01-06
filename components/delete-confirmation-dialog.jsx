import React, { useState, useTransition } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { toast } from "react-hot-toast";
import { Loader2 } from "lucide-react";

const DeleteConfirmationDialog = ({
  open,
  onClose,
  onConfirm,
  defaultToast = true,
  toastMessage = "Successfully deleted",
}) => {
  const [isPending, startTransition] = useTransition();

  const handleConfirm = async () => {
    await onConfirm();
    onClose();
    if (defaultToast) {
      toast.success(toastMessage, {
        position: "top-right",
      });
    }
  };

  return (
    <AlertDialog open={open}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={onClose}>Cancel</AlertDialogCancel>
          <AlertDialogAction
            className={isPending && "pointer-events-none"}
            onClick={() => startTransition(handleConfirm)}
          >
            {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {isPending ? "Deleting.." : "Continue"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteConfirmationDialog;
