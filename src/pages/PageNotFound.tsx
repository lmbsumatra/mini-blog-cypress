import { Button } from "@/components/ui/button";
import CustomHeading from "@/components/ui/custom/CustomHeading";
import { useNavigate } from "react-router-dom";

export default function PageNotFound() {
  const navigate = useNavigate();
  return (
    <>
      <CustomHeading label="404 Not found" />
      <Button onClick={() => navigate(-1)} className="cursor-pointer">
        Back
      </Button>
    </>
  );
}
