import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { getHomePageContent, type HomeFooterLink, type HomeFooterSection } from "../api/api";

const fallbackCompanyLinks: HomeFooterLink[] = [
  { id: -1, group: "company", label: "About", url: "/about", display_order: 1, is_active: true },
  { id: -2, group: "company", label: "Services", url: "/services", display_order: 2, is_active: true },
  { id: -3, group: "company", label: "Contact", url: "/contact", display_order: 3, is_active: true },
];

const fallbackServiceLinks: HomeFooterLink[] = [
  { id: -4, group: "services", label: "Software", url: "/services", display_order: 1, is_active: true },
  { id: -5, group: "services", label: "Cloud", url: "/services", display_order: 2, is_active: true },
  { id: -6, group: "services", label: "Networking", url: "/services", display_order: 3, is_active: true },
];

function FooterHref({ link }: { link: HomeFooterLink }) {
  const className = "block w-fit text-sm text-slate-600 transition hover:text-cyan-600 dark:text-slate-400 dark:hover:text-cyan-300";
  const internal = link.url.startsWith("/") && !link.url.startsWith("//");
  const externalWeb = /^https?:\/\//i.test(link.url);

  if (internal) {
    return <Link className={className} to={link.url}>{link.label}</Link>;
  }

  return (
    <a
      className={className}
      href={link.url}
      target={externalWeb ? "_blank" : undefined}
      rel={externalWeb ? "noopener noreferrer" : undefined}
    >
      {link.label}
    </a>
  );
}

export default function Footer() {
  const [footer, setFooter] = useState<HomeFooterSection | null>(null);

  useEffect(() => {
    let mounted = true;
    getHomePageContent()
      .then((content) => {
        if (mounted) setFooter(content.footer_section ?? null);
      })
      .catch((error) => {
        console.error("Failed to load footer content:", error);
      });

    return () => {
      mounted = false;
    };
  }, []);

  const links = footer?.links ?? [];
  const companyLinks = useMemo(
    () => footer ? links.filter((link) => link.group === "company") : fallbackCompanyLinks,
    [footer, links],
  );
  const serviceLinks = useMemo(
    () => footer ? links.filter((link) => link.group === "services") : fallbackServiceLinks,
    [footer, links],
  );
  const socialLinks = useMemo(
    () => links.filter((link) => link.group === "social"),
    [links],
  );

  if (footer && !footer.is_active) return null;

  const brandName = footer?.brand_name || "KreativeTech";
  const description = footer?.description || "Delivering innovative software, cloud and IT solutions.";
  const companyHeading = footer?.company_heading || "Company";
  const servicesHeading = footer?.services_heading || "Services";
  const contactHeading = footer?.contact_heading || "Contact";
  const email = footer?.contact_email || "kreative_tech@rediffmail.com";
  const phone = footer?.contact_phone || "+91 9861152922";
  const address = footer?.contact_address || "";
  const copyright = footer?.copyright_text || `© ${brandName}. All rights reserved.`;

  return (
    <footer className="bg-slate-100 py-16 text-slate-900 dark:bg-slate-950 dark:text-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 md:grid-cols-4">
        <div>
          <h2 className="text-3xl font-bold">{brandName}</h2>
          <p className="mt-5 whitespace-pre-line text-sm leading-6 text-slate-600 dark:text-slate-400">
            {description}
          </p>
          {socialLinks.length > 0 && (
            <div className="mt-6">
              <h3 className="mb-3 text-sm font-semibold">Follow Us</h3>
              <div className="flex flex-col gap-3">
                {socialLinks.map((link) => <FooterHref key={link.id} link={link} />)}
              </div>
            </div>
          )}
        </div>

        <div>
          <h3 className="mb-4 font-semibold">{companyHeading}</h3>
          <div className="flex flex-col gap-3">
            {companyLinks.map((link) => <FooterHref key={link.id} link={link} />)}
          </div>
        </div>

        <div>
          <h3 className="mb-4 font-semibold">{servicesHeading}</h3>
          <div className="flex flex-col gap-3">
            {serviceLinks.map((link) => <FooterHref key={link.id} link={link} />)}
          </div>
        </div>

        <div>
          <h3 className="mb-4 font-semibold">{contactHeading}</h3>
          <div className="flex flex-col gap-3 text-sm text-slate-600 dark:text-slate-400">
            {email && <a className="w-fit hover:text-cyan-600 dark:hover:text-cyan-300" href={`mailto:${email}`}>{email}</a>}
            {phone && <a className="w-fit hover:text-cyan-600 dark:hover:text-cyan-300" href={`tel:${phone.replace(/[^+\d]/g, "")}`}>{phone}</a>}
            {address && <p className="whitespace-pre-line leading-6">{address}</p>}
          </div>
        </div>
      </div>

      {copyright && (
        <div className="mx-auto mt-12 max-w-7xl border-t border-slate-200 px-6 pt-6 text-center text-xs text-slate-500 dark:border-white/10 dark:text-slate-500">
          {copyright}
        </div>
      )}
    </footer>
  );
}
