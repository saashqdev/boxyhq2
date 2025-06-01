"use client";

import { useTranslation } from "react-i18next";
import { toast } from "sonner";
import { Button } from "../ui/button";
import Link from "next/link";
import GitHubIcon from "../ui/icons/GitHubIcon";
import DarkModeToggle from "../ui/selectors/DarkModeToggle";
import LocaleSelector from "../ui/selectors/LocaleSelector";
import ThemeSelector from "../ui/selectors/ThemeSelector";

const GITHUB_URL = "https://github.com/saashqdev/boxyhq2.git";
const now = new Date();

export default function LandingPage() {
  const { t } = useTranslation();
  return (
    <div className="min-h-screen">
      <div className="mx-auto max-w-2xl space-y-6 p-4 py-8 sm:py-16">
        <div className="flex flex-col items-center justify-between gap-2 sm:flex-row">
          <h1 className="text-2xl font-bold sm:text-3xl">BoxyHQ2 Starter Kit 🦾</h1>
          <div className="flex flex-wrap items-center justify-center gap-2">
            <Button variant="ghost" asChild size="sm">
              <Link href={GITHUB_URL}>
                <GitHubIcon className="h-5 w-5 text-muted-foreground" />
              </Link>
            </Button>
            <LocaleSelector />
            <DarkModeToggle />
            <ThemeSelector />
          </div>
        </div>
        <div className="space-y-1">
          <div className="text-muted-foreground">
            The best way to start a{" "}
            <Link href="https://nextjs.org/" className="font-bold text-foreground hover:underline">
              BoxyHQ SSO
            </Link>{" "}
            project with{" "}
            <Link href="https://tailwindcss.com/" className="font-bold text-foreground hover:underline">
              Tailwind CSS
            </Link>
            ,{" "}
            <Link href="https://ui.shadcn.com/" className="font-bold text-foreground hover:underline">
              shadcn/ui
            </Link>
            , and{" "}
            <Link href="https://github.com/sergiodxa/remix-i18next" className="font-bold text-foreground hover:underline">
              i18n
            </Link>
            .
          </div>
          <div className="space-y-2">
            <pre className="relative truncate rounded-lg bg-secondary p-2 text-secondary-foreground">
              <Button size="sm" variant="default"
                className="absolute right-1 top-1 rounded-lg bg-primary text-primary-foreground"
                onClick={() => {
                  navigator.clipboard.writeText(`git clone ${GITHUB_URL}`);
                  toast("URL has been copied", {
                    description: `${now}`,
                    action: {
                      label: "Undo",
                      onClick: () => console.log("Undo"),
                    },
                  })
                }}
              >
                {t("copy")}
              </Button>
              <code className="text-sm">git clone {GITHUB_URL}</code>
            </pre>
            <div className="flex justify-between text-sm text-muted-foreground">
              <div className="flex items-center space-x-2 font-medium">
                The BoxyHQ Starter Kit running the latest Nextjs 15 features including App Router.
              </div>
            </div>
          </div>

          <div className="space-y-2 pt-12">
            <h3 className="text-sm font-bold">Demos</h3>
            <div className="grid grid-cols-3 gap-4">
              <Link
                href="#"
                className="h-12 rounded-md border border-border bg-background p-3 text-primary hover:bg-secondary/90 hover:text-secondary-foreground"
              >
                <div className="flex justify-center text-sm font-medium">SSO Login</div>
              </Link>
              <Link
                href="#"
                className="h-12 rounded-md border border-border bg-background p-3 text-primary hover:bg-secondary/90 hover:text-secondary-foreground"
              >
                <div className="flex justify-center text-sm font-medium">Setup BoxyHQ Server</div>
              </Link>              
              <div className="h-12 rounded-md border border-dashed border-border bg-secondary p-3 text-primary opacity-50"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}