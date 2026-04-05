const Description = () => {
  return (
    <section className="pt-16 md:pt-24">
      <div className="max-w-6xl mx-auto py-16 md:py-20 space-y-16 rounded-3xl border border-orange-100/70 bg-white/80 px-4 md:px-8 shadow-xl shadow-orange-100/50 backdrop-blur-sm dark:border-slate-800 dark:bg-slate-900/50 dark:shadow-none">
        {/* Page Title */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight leading-tight">
            About{" "}
            <span className="bg-gradient-to-r from-orange-500 to-cyan-500 bg-clip-text text-transparent">
              Food Book
            </span>
          </h1>
          <p className="text-slate-600 dark:text-slate-300 text-lg">
            A community-driven platform for sharing real food experiences.
          </p>
        </div>

        {/* About Section */}
        <div className="max-w-4xl mx-auto space-y-6 rounded-2xl border border-cyan-100 bg-gradient-to-br from-orange-50 via-white to-cyan-50 p-6 md:p-8 text-slate-700 leading-relaxed text-base md:text-lg dark:border-slate-700 dark:from-slate-900 dark:via-slate-900 dark:to-slate-800 dark:text-slate-300">
          <p>
            <strong className="text-slate-900 dark:text-slate-100">
              Food Book
            </strong>{" "}
            is a food-sharing platform designed for people who love discovering
            and sharing food experiences. The goal of Food Book is to create a
            community where users can post dishes they have tried, recommend
            their favourite food, and help others discover great meals and
            locations.
          </p>

          <p>
            Users can share detailed food posts including the dish name,
            description, photos, and location. Other users can interact with
            posts by liking, commenting, sharing, and browsing food content from
            different places.
          </p>

          <p>
            Food Book encourages food lovers to share authentic experiences —
            whether it’s street food, home-cooked meals, or restaurant dishes.
          </p>
        </div>

        {/* Tech Stack Section */}
        <div className="max-w-5xl mx-auto space-y-8">
          <h2 className="text-3xl font-semibold text-center text-slate-900 dark:text-slate-100">
            Tools & Technologies
          </h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <TechCard
              title="Framework & Language"
              description="Next.js, React, TypeScript for scalability, performance, and maintainable code."
            />

            <TechCard
              title="UI & Styling"
              description="Tailwind CSS and Radix UI for accessible, responsive, and modern interfaces, enhanced with clsx and tailwind-merge."
            />

            <TechCard
              title="Forms & Validation"
              description="React Hook Form with Zod and @hookform/resolvers for robust and scalable form validation."
            />

            <TechCard
              title="Authentication & Security"
              description="NextAuth.js, JWT, and jwt-decode for secure authentication and role-based authorization."
            />

            <TechCard
              title="UX & Animations"
              description="Framer Motion for smooth animations and Sonner for user-friendly notifications."
            />

            <TechCard
              title="Data & Performance"
              description="Recharts for data visualization, date-fns for date handling, ESLint and Next.js Bundle Analyzer for quality and optimization."
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Description;

/* Reusable Tech Card */
const TechCard = ({
  title,
  description,
}: {
  title: string;
  description: string;
}) => (
  <div className="rounded-2xl border border-cyan-100 bg-gradient-to-br from-white via-white to-orange-50 p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg dark:border-slate-700 dark:from-slate-900 dark:via-slate-900 dark:to-slate-800">
    <h3 className="font-semibold text-lg mb-2 text-slate-900 dark:text-slate-100">
      {title}
    </h3>
    <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
      {description}
    </p>
  </div>
);
