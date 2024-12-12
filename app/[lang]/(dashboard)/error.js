"use client"; 
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription} from "@/components/ui/alert";
import { Info } from "lucide-react";

export default function Error({ error, reset }) {
  return (
    <div className="space-y-4">
      <Alert color="destructive" variant="soft">
        <Info class="h-5 w-5" />
        <AlertDescription>Something went wrong!</AlertDescription>
      </Alert>
      <Button onClick={() => reset()} color="destructive" size="sm">
        Try again
      </Button>
    </div>
  );
}
