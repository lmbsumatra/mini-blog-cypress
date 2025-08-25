import { FaArrowUpRightDots } from "react-icons/fa6";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

export default function AboutProject() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="w-fit h-fit flex text-white hover:underline items-center gap-2 cursor-pointer bg-white/1 px-4 py-3 rounded-full border-1">
          What is the project for? <FaArrowUpRightDots />
        </div>
      </DialogTrigger>
      <DialogContent className="text-sm text-gray-700 space-y-3">
        <p>
          <strong>Anon Stories</strong> is a simple CRUD application that allows
          users to create, read, and explore anonymous stories. The project is
          intentionally kept lightweight and minimal to focus on fundamental
          functionality over features.
        </p>
        <p>
          The core purpose of this project is to serve as a personal refresher
          and a practical playground for both manual testing and automation
          testing using <strong>Cypress</strong>. It offers a clear, real-world
          context for writing test cases that cover user flows, UI interactions,
          error handling, and data validation.
        </p>
        <p>
          By building and testing this app from the ground up, I aim to sharpen
          my QA skills, revisit testing patterns, and establish a solid
          foundation for more advanced Cypress and testing tool integrations
          down the line.
        </p>
        <a
          href="https://docs.google.com/spreadsheets/d/1nlUw8MY5W8n4M9sBpXyarRjX4EeFKufWEo6Sp8IZLCI/edit?gid=323573463#gid=323573463"
          target="_blank"
          className="text-blue-500 hover:underline flex gap-1 items-center font-bold"
        >
          Documentation <FaArrowUpRightDots/>
        </a>
      </DialogContent>
    </Dialog>
  );
}
