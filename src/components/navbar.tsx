"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Menu, X, Github, Linkedin, Mail, Calendar, Youtube } from "lucide-react"

const navItems = [
    { name: "Home", href: "/" },
    { name: "Blog", href: "/blog" },
    { name: "YouTube", href: "https://www.youtube.com/@piotr-wesolowski" },
]

export function Navbar() {
    const pathname = usePathname()
    const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false)
    const [scrolled, setScrolled] = React.useState(false)

    React.useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20)
        }
        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    return (
        <>
            <header
                className={cn(
                    "fixed top-0 z-50 w-full transition-all duration-300",
                    scrolled
                        ? "border-b bg-background/60 backdrop-blur-md supports-[backdrop-filter]:bg-background/60"
                        : "bg-transparent"
                )}
            >
                <div className="container flex h-16 items-center justify-between">
                    <Link href="/" className="flex items-center space-x-2">
                        <span className="text-xl font-bold tracking-tight">pioter.ai</span>
                    </Link>

                    {/* Desktop Nav */}
                    <nav className="hidden md:flex items-center space-x-8 text-sm font-medium">
                        {navItems.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                target={item.href.startsWith("http") ? "_blank" : undefined}
                                className={cn(
                                    "transition-colors hover:text-primary",
                                    pathname === item.href ? "text-primary" : "text-muted-foreground"
                                )}
                            >
                                {item.name}
                            </Link>
                        ))}
                    </nav>

                    <div className="hidden md:flex items-center space-x-4">
                        <Link href="https://github.com/pwesolowski" target="_blank" className="text-muted-foreground hover:text-primary transition-colors">
                            <Github className="h-5 w-5" />
                        </Link>
                        <Link href="https://www.linkedin.com/in/piotr-wesolowski/" target="_blank" className="text-muted-foreground hover:text-primary transition-colors">
                            <Linkedin className="h-5 w-5" />
                        </Link>
                        <Link href="https://www.youtube.com/@piotr-wesolowski" target="_blank" className="text-muted-foreground hover:text-primary transition-colors">
                            <Youtube className="h-5 w-5" />
                        </Link>
                        <Link href="https://calendly.com/piowes30/30min/" target="_blank" className="text-muted-foreground hover:text-primary transition-colors">
                            <Calendar className="h-5 w-5" />
                        </Link>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        className="inline-flex items-center justify-center rounded-md p-2 text-muted-foreground hover:bg-accent hover:text-accent-foreground md:hidden"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    >
                        <span className="sr-only">Open main menu</span>
                        {isMobileMenuOpen ? (
                            <X className="h-6 w-6" aria-hidden="true" />
                        ) : (
                            <Menu className="h-6 w-6" aria-hidden="true" />
                        )}
                    </button>
                </div>
            </header>

            {/* Mobile Menu Overlay */}
            {isMobileMenuOpen && (
                <div className="fixed inset-0 z-40 bg-background/95 backdrop-blur-sm md:hidden pt-20 px-6">
                    <nav className="flex flex-col space-y-4">
                        {navItems.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={cn(
                                    "text-lg font-medium transition-colors hover:text-primary",
                                    pathname === item.href ? "text-primary" : "text-muted-foreground"
                                )}
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                {item.name}
                            </Link>
                        ))}
                        <div className="flex space-x-6 pt-6 border-t">
                            <Link href="https://github.com/pwesolowski" target="_blank" className="text-muted-foreground hover:text-primary">
                                <Github className="h-6 w-6" />
                            </Link>
                            <Link href="https://linkedin.com/in/piotrwesolowski" target="_blank" className="text-muted-foreground hover:text-primary">
                                <Linkedin className="h-6 w-6" />
                            </Link>
                            <Link href="mailto:contact@piotrwesolowski.com" className="text-muted-foreground hover:text-primary">
                                <Mail className="h-6 w-6" />
                            </Link>
                        </div>
                    </nav>
                </div>
            )}
        </>
    )
}
