import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
} from "@/components/ui/alert-dialog";

interface DeletingProductDialogProps {
  open: boolean;
}

export function DeletingProductDialog({
  open,
}: DeletingProductDialogProps) {
  return (
    <AlertDialog open={open}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Deleting product...
          </AlertDialogTitle>

          <AlertDialogDescription>
            Please wait while the product is being deleted.
          </AlertDialogDescription>
        </AlertDialogHeader>
      </AlertDialogContent>
    </AlertDialog>
  );
}