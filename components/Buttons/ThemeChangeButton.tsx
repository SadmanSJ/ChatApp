"use client";
import { useTheme } from "next-themes";
import { MdDarkMode, MdLightMode } from "react-icons/md";
import { VscColorMode } from "react-icons/vsc";

const ThemeChangeButton = () => {
  const { theme, setTheme } = useTheme();

  return (
    <div className="flex space-x-4 justify-center items-center">
      <button
        title="LightMode Button"
        type="button"
        onClick={() => setTheme("light")}
      >
        <MdLightMode
          className={`${
            theme === "light"
              ? "text-yellow-400"
              : "text-slate-500 dark:text-slate-600"
          }`}
          size={26}
        />
      </button>
      <button
        title="DarkMode Button"
        type="button"
        onClick={() => setTheme("dark")}
      >
        <MdDarkMode
          className={`${
            theme === "dark"
              ? "text-yellow-500"
              : " text-slate-500 dark:text-slate-600"
          }`}
          size={26}
        />
      </button>
      <button
        title="AutoMode Button"
        type="button"
        onClick={() => setTheme("system")}
      >
        <VscColorMode
          className={`${
            theme === "system"
              ? "text-yellow-400 dark:text-yellow-500"
              : "text-slate-500 dark:text-slate-600"
          }`}
          size={26}
        />
      </button>
    </div>
  );
};

export default ThemeChangeButton;
