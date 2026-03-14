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
            { title: "Company", links: ["About Us", "Location", "Terms", "Privacy"] },
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
          <div>
            <h4 className="mb-3 text-sm font-semibold text-foreground">Contact Us</h4>
            <div className="space-y-3 text-sm text-muted-foreground">
              <p className="flex flex-col">
                <span className="font-medium text-foreground">Phone</span>
                <a href="tel:+447776727184" className="hover:text-gold transition-colors">+44 7776 727184</a>
              </p>
              <p className="flex flex-col">
                <span className="font-medium text-foreground">Email</span>
                <a href="mailto:hoalearning@hoaservices.co.uk" className="hover:text-gold transition-colors">hoalearning@hoaservices.co.uk</a>
              </p>
              <p className="flex flex-col">
                <span className="font-medium text-foreground">Address</span>
                <span>Union Building</span>
                <span>111 New Union Street</span>
                <span>Coventry, CV1 2NT</span>
              </p>
            </div>
          </div>
        </div>
        <div className="mt-10 border-t pt-6 text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} HOA Services — House of Abundance. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
