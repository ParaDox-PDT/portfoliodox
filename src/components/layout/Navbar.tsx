"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, ArrowUpRight } from "lucide-react";
const navItems = [
  { label: "About", href: "/#about" },
  { label: "Experience", href: "/#experience" },
  { label: "Skills", href: "/#skills" },
  { label: "Certificates", href: "/#certificates" },
  { label: "Projects", href: "/#projects" },
];
export function Navbar({ name }: { name?: string }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const toggle = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    setOpen(false);
  }, [pathname]);
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape" && open) {
        setOpen(false);
        toggle.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);
  return (
    <>
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <header className="portfolio-nav">
        <nav
          className="portfolio-container nav-inner"
          aria-label="Main navigation"
        >
          <Link
            href="/"
            className="portfolio-brand"
            aria-label={name ? `${name} home` : "ParaDox home"}
          >
            <Image src="/logo.png" alt="" width={34} height={34} />
            <span>
              para<span className="brand-light">dox</span>
              <span className="brand-dot">.</span>
            </span>
          </Link>
          <div className="desktop-nav">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href}>
                {item.label}
              </Link>
            ))}
          </div>
          <Link href="/#contact" className="nav-contact">
            Let’s talk <ArrowUpRight size={16} />
          </Link>
          <button
            ref={toggle}
            className="mobile-menu-toggle"
            onClick={() => setOpen(!open)}
            aria-label={open ? "Close navigation" : "Open navigation"}
            aria-expanded={open}
            aria-controls="mobile-navigation"
          >
            {open ? <X /> : <Menu />}
          </button>
        </nav>
        {open && (
          <nav
            id="mobile-navigation"
            className="mobile-navigation"
            aria-label="Mobile navigation"
          >
            {[...navItems, { label: "Let’s talk", href: "/#contact" }].map(
              (item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                  <ArrowUpRight size={18} />
                </Link>
              ),
            )}
          </nav>
        )}
      </header>
    </>
  );
}
export default Navbar;
