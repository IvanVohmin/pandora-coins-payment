"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useTheme } from "next-themes";
import { Monitor, Moon, Sun } from "lucide-react";
import Link from "next/link";

const themeChain = ["light", "dark", "system"];

const Navbar = () => {
  const { theme, setTheme } = useTheme();

  const renderThemeIcon = () => {
    if (theme === "system") {
      return <Monitor />;
    } else if (theme === "light") {
      return <Sun />;
    } else if (theme === "dark") {
      return <Moon />;
    }
    return <Monitor />;
  };

  const changeTheme = () => {
    const currentTheme = theme || "system";
    const currentThemeIdx = themeChain.indexOf(currentTheme);

    const nextThemeIdx = (currentThemeIdx + 1) % themeChain.length;
    setTheme(themeChain[nextThemeIdx]);
  };

  return (
    <>
      <div className="w-full my-6 flex items-center justify-between">
        <Link href={"/"} className="flex items-center">
          <h5 className="font-bold ml-1.5 text-2xl">Pandora</h5>
        </Link>
        <div>
          <Button
            variant={"outline"}
            size={"sm"}
            onClick={changeTheme}
            className="flex items-center gap-1.5"
          >
            {renderThemeIcon()}
          </Button>
        </div>
      </div>
    </>
  );
};

export default Navbar;
