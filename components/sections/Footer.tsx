import FadeIn from "@/components/ui/FadeIn";
import ContactButton from "@/components/ui/ContactButton";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-background">
      <div className="container max-w-6xl px-4 py-12 mx-auto">
        <FadeIn>
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <span className="text-2xl font-bold gold-text">Websarthi</span>
              <p className="text-muted-foreground text-sm mt-1">
                Your growth partner — from lead to close.
              </p>
            </div>

            <nav className="flex flex-wrap gap-6 text-sm text-muted-foreground">
              <a href="#services" className="hover:text-foreground transition-colors">
                Services
              </a>
              <a href="#showcase" className="hover:text-foreground transition-colors">
                Our Work
              </a>
              <a href="#why-us" className="hover:text-foreground transition-colors">
                Why Us
              </a>
              <ContactButton className="inline-flex items-center gap-1 hover:text-gold-500 dark:hover:text-indigo-400 transition-colors font-medium" />
            </nav>
          </div>
        </FadeIn>

        <div className="mt-8 pt-8 border-t border-border text-center text-muted-foreground text-sm">
          © {year} Websarthi. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
