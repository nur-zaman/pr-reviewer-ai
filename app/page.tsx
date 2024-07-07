import ThemeSwitcher from "@/components/ui/theme-toggle-button";
import AnimatedI from "@/components/AnimatedI";
import { Metadata } from "next";
import GitHubPRAnalyzer from "@/components/GitHubPRAnalyzer";
import { Github } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import ArrowText from "@/components/ArrowText";

export const dynamic = "force-dynamic";
export const maxDuration = 30;

export const metadata: Metadata = {
  title: "PR Code Reviewer AI",
  openGraph: {
    title: "PR Code Reviewer AI",
    description: "AI powered pull request code reviewer",
    type: "website",
    url: "https://pr-reviewer-ai.vercel.app/",
    images: [
      {
        url: "https://pr-reviewer-ai.vercel.app/images/opengraph.pngs",
        alt: "PR Code Reviewer AI",
        width: 1200,
        height: 630,
      },
    ],
  },
};

export default function Home() {
  return (
    <div className="h-full min-h-screen w-full dark:bg-black bg-white dark:bg-dot-white/[0.2] bg-dot-black/[0.2] relative flex flex-col items-center justify-start p-4">
      <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_50%,black)] -z-50"></div>
      <div className="flex flex-col gap-6 w-full max-w-2xl items-center">
        <ThemeSwitcher />
        <div className="text-4xl sm:text-7xl font-bold text-center relative mt-8">
          <h1 className="relative inline-block">
            <span className="relative z-10">Pull Request</span>
            <Button
              variant="ghost"
              size="icon"
              className="absolute -top-4 -left-2 transform -rotate-12 z-20"
              asChild
            >
              <Link
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github className="w-8 h-8" />
              </Link>
            </Button>

            <ArrowText className="absolute top-[-6rem] -left-24 w-24 h-24 z-10 pointer-events-none " />
          </h1>
          <h1>
            Reviewer A<AnimatedI />
          </h1>
        </div>
        <h6 className="text-sm sm:text-md font-bold text-center relative bg-clip-text ">
          Enter a Public GitHub repository name and PR number below to get
          started.
        </h6>
        <GitHubPRAnalyzer />
      </div>
    </div>
  );
}
