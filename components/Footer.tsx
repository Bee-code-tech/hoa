import logo from "@/assets/logo.png";

const Footer = () => {
  return (
    <footer className="border-t bg-card px-4 py-12">
      <div className="container mx-auto">
        <div className="grid gap-8 md:grid-cols-4">
          <div>
            <div className="mb-4 flex items-center gap-2.5">
              <img src={logo.src} alt="HOA Services" className="h-8 w-auto" />
              <div className="flex flex-col leading-none">
                <span className="text-sm font-bold text-primary">HOA Services</span>
                <span className="text-[9px] font-medium tracking-wider text-muted-foreground">HOUSE OF ABUNDANCE</span>
              </div>
            </div>
            <p className="text-sm text-muted-foreground">Professional security training courses across the UK. Your career starts here.</p>
          </div>
          {[
            { title: "Courses", links: ["Door Supervisor", "CCTV Operator", "First Aid", "Close Protection"] },
            { title: "Company", links: ["About Us", "Locations", "Blog", "Careers"] },
            { title: "Support", links: ["Contact", "FAQ", "Terms", "Privacy"] },
          ].map((col) => (
            <div key={col.title}>
              <h4 className="mb-3 text-sm font-semibold text-foreground">{col.title}</h4>
              <ul className="space-y-2">
                {col.links.map((link) => (
                  <li key={link}>
                    <a href="#" className="text-sm text-muted-foreground transition-colors hover:text-foreground">{link}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-10 border-t pt-6 text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} HOA Services — House of Abundance. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
