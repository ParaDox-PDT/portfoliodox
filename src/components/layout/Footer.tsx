import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Profile } from "@/types";
import { personData } from "@/lib/seo.config";
export function Footer({ profile }: { profile?: Profile | null }) {
  return (
    <footer className="portfolio-footer">
      <div className="portfolio-container">
        <Link className="portfolio-brand" href="/">
          paradox<span className="brand-dot">.</span>
        </Link>
        <p>
          © {new Date().getFullYear()} {profile?.name || personData.name}
        </p>
        <Link className="portfolio-text-link" href="/#projects">
          Explore the work <ArrowUpRight size={15} />
        </Link>
      </div>
    </footer>
  );
}
export default Footer;
