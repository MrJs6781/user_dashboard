import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/components/theme-provider";

export function ModeToggle() {
  const { setTheme } = useTheme();

  return (
    <>
      <Sun
        className="h-[1.2rem] w-[1.2rem] cursor-pointer hidden dark:flex"
        onClick={() => setTheme("light")}
      />
      <Moon
        className="h-[1.2rem] w-[1.2rem] cursor-pointer flex dark:hidden"
        onClick={() => setTheme("dark")}
      />
    </>
  );
}
