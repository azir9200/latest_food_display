
export default function Footer() {
  return (
    <footer className="py-10 text-sm text-slate-500 dark:text-slate-400 border-t border-slate-100 dark:border-slate-800 mt-12">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
        <div>
          © {new Date().getFullYear()} AI-Powered Food Finder — All rights
          reserved.
        </div>
        <div className="flex gap-4">
          <a href="/terms">Terms</a>
          <a href="/privacy">Privacy</a>
          <a href="/contact">Contact</a>
        </div>
      </div>
    </footer>
  );
}
