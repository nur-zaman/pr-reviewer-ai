import HomeClient from "@/components/HomeClient";
import ThemeSwitcher from "@/components/ui/theme-toggle-button";
import AnimatedI from "@/components/AnimatedI";
import { Metadata } from "next";

export const dynamic = "force-dynamic";
export const maxDuration = 30;

export const metadata: Metadata = {
  title: "Custom Gemini AI",
};

export default function Home() {
  return (
    <div className="h-full min-h-screen w-full dark:bg-black bg-white dark:bg-dot-white/[0.2] bg-dot-black/[0.2] relative flex flex-col items-center justify-start p-4">
      <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_50%,black)] -z-50"></div>
      <div className="flex flex-col gap-6 w-full max-w-2xl items-center">
        <ThemeSwitcher />
        <div className="text-4xl sm:text-7xl font-bold text-center relative bg-clip-text mt-8">
          <h1>Custom</h1>
          <h1>
            Gemini A<AnimatedI />
          </h1>
        </div>
        <h6 className="text-sm sm:text-md font-bold text-center relative bg-clip-text ">
          Ask anything, get an answer
        </h6>
        <HomeClient />
      </div>
    </div>
  );
}
