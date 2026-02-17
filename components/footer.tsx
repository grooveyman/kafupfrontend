import { ThemeToggle } from "@/components/theme-toggle";

export default function Footer() {
  const date = new Date();
  const year = date.getFullYear();

  return (
    <>
      {" "}
      {/* Footer */}
      <footer className="border-t border-border py-12 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="font-display font-bold text-foreground mb-4">
                KafUP
              </h3>
              <p className="font-body text-sm text-muted-foreground">
                Curated designer fashion from independent artisans
              </p>
            </div>
            <div>
              <h4 className="font-body font-semibold text-foreground mb-4">
                Shop
              </h4>
              <ul className="space-y-2 font-body text-sm text-muted-foreground">
                <li>
                  <a
                    href="#"
                    className="hover:text-foreground transition-colors"
                  >
                    Designers
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-foreground transition-colors"
                  >
                    Collections
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-foreground transition-colors"
                  >
                    New Arrivals
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-body font-semibold text-foreground mb-4">
                Company
              </h4>
              <ul className="space-y-2 font-body text-sm text-muted-foreground">
                <li>
                  <a
                    href="/about"
                    className="hover:text-foreground transition-colors"
                  >
                    About
                  </a>
                </li>
                <li>
                  <a
                    href="/contact"
                    className="hover:text-foreground transition-colors"
                  >
                    Contact
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-foreground transition-colors"
                  >
                    Sustainability
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-body font-semibold text-foreground mb-4">
                Customer Service
              </h4>
              <ul className="space-y-2 font-body text-sm text-muted-foreground">
                <li>
                  <a
                    href="#"
                    className="hover:text-foreground transition-colors"
                  >
                    Shipping & Returns
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-foreground transition-colors"
                  >
                    FAQ
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-foreground transition-colors"
                  >
                    Size Guide
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-border pt-8 flex flex-col md:flex-row items-center justify-between font-body text-sm text-muted-foreground">
            <p>&copy; {year} KafUP. All rights reserved.</p>
            <div className="flex gap-6 mt-4 md:mt-0">
              <a href="#" className="hover:text-foreground transition-colors">
                Privacy
              </a>
              <a href="#" className="hover:text-foreground transition-colors">
                Terms
              </a>
              {/* <a href="#" className="hover:text-foreground transition-colors">
                Cookies
              </a> */}
              <ThemeToggle />
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
