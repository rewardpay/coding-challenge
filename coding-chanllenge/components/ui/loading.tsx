import { LoaderCircle } from "lucide-react";
export default function Loading() {
  return (
    <div className="flex items-center justify-center h-full mt-auto">
       <LoaderCircle className="animate-spin" />
    </div>
  );
}
