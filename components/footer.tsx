import { DaemonLogo } from "@/components/daemon-logo";
import { Linkedin } from "lucide-react";
import type { ReactNode } from "react";

const SOCIAL_LINKS = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/daemonprotocol/about/",
    ariaLabel: "Daemon on LinkedIn",
  },
  {
    label: "X",
    href: "https://x.com/DaemonProtocol",
    ariaLabel: "Daemon on X",
  },
] as const;

const linkColumns: ReadonlyArray<{
  label?: string;
  items: ReadonlyArray<{ label: string; href: string }>;
}> = [
  {
    label: "Company",
    items: [
      { label: "Products", href: "#modules" },
      { label: "How it works", href: "#how-it-works" },
      { label: "FAQ", href: "#faq" },
      { label: "Contact", href: "#contact" },
    ],
  },
  {
    label: "Products",
    items: [
      { label: "Daemon Protocol", href: "https://daemonprotocol.com/" },
      { label: "ARES", href: "https://aressystem.dev/" },
      { label: "Grond", href: "https://daemonsystem.tech/" },
      { label: "Obscura", href: "https://obscura-app.com/" },
    ],
  },
];

function XIcon(): ReactNode {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-4 w-4 fill-current"
    >
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

export function Footer(): ReactNode {
  return (
    <section className="bg-background p-3 sm:p-4 lg:p-6">
      <div className="rounded-3xl border border-border bg-card px-5 py-8 text-card-foreground sm:px-8 sm:py-10 lg:px-10 lg:py-12">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[auto_1fr] lg:gap-16">
          <div>
            <a
              href="#main-content"
              className="focus-ring inline-flex items-center gap-2 rounded-sm text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              Back to top
              <span aria-hidden="true">↑</span>
            </a>
          </div>

          <nav
            aria-label="Footer"
            className="grid grid-cols-2 gap-x-8 gap-y-10 lg:gap-x-12"
          >
            {linkColumns.map((column, i) => (
              <div key={column.label ?? `col-${i}`}>
                {column.label ? (
                  <p className="mb-5 text-sm text-muted-foreground">
                    {column.label}
                  </p>
                ) : (
                  <p
                    className="mb-5 text-sm text-muted-foreground"
                    aria-hidden="true"
                  >
                    &nbsp;
                  </p>
                )}
                <ul className="space-y-3">
                  {column.items.map((item) => (
                    <li key={item.label}>
                      <a
                        href={item.href}
                        className="focus-ring rounded-sm text-sm text-foreground transition-colors hover:text-primary"
                      >
                        {item.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        <div className="mt-16 flex flex-col gap-6 border-t border-border pt-8 lg:mt-24">
          <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
            <DaemonLogo href="#main-content" />

            <ul className="flex items-center gap-3">
              {SOCIAL_LINKS.map((social) => (
                <li key={social.label}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.ariaLabel}
                    className="focus-ring inline-flex h-10 w-10 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:border-foreground/30 hover:text-foreground"
                  >
                    {social.label === "LinkedIn" ? (
                      <Linkedin className="h-4 w-4" />
                    ) : (
                      <XIcon />
                    )}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Daemon Protocol. All rights reserved.
          </p>
        </div>
      </div>
    </section>
  );
}
