export default function Footer() {
  const year = new Date().getFullYear();
  const portalUrl = process.env.NEXT_PUBLIC_CMS_PORTAL_URL ?? "#";

  return (
    <footer className="border-t border-white/5 bg-navy-900">
      <div className="container max-w-6xl px-4 py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <span className="text-2xl font-bold gold-text">Websaarthi</span>
            <p className="text-slate-500 text-sm mt-1">
              Your growth partner — from lead to close.
            </p>
          </div>

          <nav className="flex flex-wrap gap-6 text-sm text-slate-400">
            <a href="#services" className="hover:text-white transition-colors">
              Services
            </a>
            <a href="#why-us" className="hover:text-white transition-colors">
              Why Us
            </a>
            <a
              href={portalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gold-400 transition-colors font-medium"
            >
              Lead CMS Portal ↗
            </a>
          </nav>
        </div>

        <div className="mt-8 pt-8 border-t border-white/5 text-center text-slate-600 text-sm">
          © {year} Websaarthi. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
