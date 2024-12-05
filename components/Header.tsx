"use client"

import * as React from "react"
import Link from "next/link"
import { ModeToggle } from "./ModeToggle"
import { Github } from "lucide-react"
import { Button } from "./ui/button"
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuContent,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { NavigationMobile } from "./NavigationMobile"

type SubMenuItem = {
  title: string;
  href: string;
  description: string;
}

type MenuItem = {
  title: string;
  type: "dropdown" | "link";
  href?: string;
  items?: SubMenuItem[];
}

const menuItems: MenuItem[] = [
  {
    title: "Algorithms",
    type: "dropdown",
    items: [
      {
        title: "First Come First Serve",
        href: "/algorithms/fcfs",
        description: "Learn about the simplest CPU scheduling algorithm"
      },
      {
        title: "Round Robin",
        href: "/algorithms/round-robin",
        description: "Understand time-quantum based scheduling"
      },
      {
        title: "Shortest Job First",
        href: "/algorithms/sjf",
        description: "Explore non-preemptive priority scheduling"
      },
      {
        title: "Shortest Remaining Time First",
        href: "/algorithms/srtf",
        description: "Learn about preemptive SJF scheduling"
      }
    ]
  },
  {
    title: "Documentation",
    type: "link",
    href: "/docs",
  },
  {
    title: "About",
    type: "link",
    href: "/about",
  }
]

export function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-background/40 backdrop-blur-lg supports-backdrop-blur:bg-background/90">
      <div className="flex h-16 items-center justify-between px-4 max-w-7xl mx-auto">
        <div className="flex items-center gap-6 md:gap-8">
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-xl font-bold">CPU Scheduler</span>
          </Link>
          <div className="hidden md:block">
            <NavigationMenu>
              <NavigationMenuList>
                {menuItems.map((item) => (
                  <NavigationMenuItem key={item.title}>
                    {item.type === "dropdown" && item.items ? (
                      <>
                        <NavigationMenuTrigger>{item.title}</NavigationMenuTrigger>
                        <NavigationMenuContent>
                          <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2">
                            {item.items.map((subItem) => (
                              <li key={subItem.title}>
                                <NavigationMenuLink asChild>
                                  <Link
                                    href={subItem.href}
                                    className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                                  >
                                    <div className="text-sm font-medium leading-none">{subItem.title}</div>
                                    <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                                      {subItem.description}
                                    </p>
                                  </Link>
                                </NavigationMenuLink>
                              </li>
                            ))}
                          </ul>
                        </NavigationMenuContent>
                      </>
                    ) : (
                      item.href && (
                        <Link href={item.href} legacyBehavior passHref>
                          <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                            {item.title}
                          </NavigationMenuLink>
                        </Link>
                      )
                    )}
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="md:hidden">
            <NavigationMobile menuItems={menuItems} />
          </div>
          <Button variant="ghost" size="icon" asChild>
            <Link 
              href="https://github.com/yourusername/your-repo" 
              target="_blank"
              rel="noopener noreferrer"
            >
              <Github className="h-5 w-5" />
              <span className="sr-only">GitHub</span>
            </Link>
          </Button>
          <ModeToggle />
        </div>
      </div>
    </header>
  )
}