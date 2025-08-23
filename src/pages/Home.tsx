import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { FaBookOpen } from "react-icons/fa";

export default function Home() {
  return (
    <div className="flex flex-col items-center w-full h-full  p-4 ">
      <div className="max-w-100 w-full  p-4 rounded">
        <Textarea
          className="w-full  p-2 rounded"
          placeholder="What's your story?"
          aria-label="Story input"
        />
        <Button
          className="mt-2 bg-white text-neutral-900 px-4 py-2 rounded"
          type="button"
          onClick={() => console.log("Create clicked")}
        >
          Create
        </Button>
      </div>

      <div className="flex flex-col items-center">
        <FaBookOpen size={64}/>
        <h3 className="font-bold">No stories yet</h3>
        <span>Start wiring your story!</span>
      </div>
    </div>
  );
}
