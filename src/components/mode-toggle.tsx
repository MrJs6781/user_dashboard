import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/components/theme-provider";

export function ModeToggle() {
  const { setTheme } = useTheme();

  return (
    <>
      <Sun
        className="h-[20px] w-[20px] cursor-pointer hidden dark:flex"
        onClick={() => setTheme("light")}
      />
      <Moon
        className="h-[20px] w-[20px] cursor-pointer flex dark:hidden"
        onClick={() => setTheme("dark")}
      />
    </>
  );
}
