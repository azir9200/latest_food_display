const Category = () => {
  return (
    <section>
      <div className="py-8 md:py-10">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-orange-500 to-cyan-500 bg-clip-text text-transparent mb-4">
            How Food Book Works
          </h2>
          <p className="text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
            Discover, share, and enjoy the best street food experiences around
            you with our simple process.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="text-center rounded-2xl border border-orange-100 bg-gradient-to-br from-white to-orange-50 p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg dark:border-slate-700 dark:from-slate-900 dark:to-slate-800">
            <div className="bg-[#FFFBF1] dark:bg-slate-700 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <span className="text-[#FF6b35] text-2xl font-bold">1</span>
            </div>
            <h3 className="text-xl font-bold mb-2 text-slate-900 dark:text-slate-100">
              Discover Spots
            </h3>
            <p className="text-slate-600 dark:text-slate-300">
              Browse through our curated list of street food spots or search for
              specific cuisines.
            </p>
          </div>

          {/* Step 2 */}
          <div className="text-center rounded-2xl border border-cyan-100 bg-gradient-to-br from-white to-cyan-50 p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg dark:border-slate-700 dark:from-slate-900 dark:to-slate-800">
            <div className="bg-[#FFFBF1] dark:bg-slate-700 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <span className="text-[#FF6B35] text-2xl font-bold">2</span>
            </div>
            <h3 className="text-xl font-bold mb-2 text-slate-900 dark:text-slate-100">
              Rate & Review
            </h3>
            <p className="text-slate-600 dark:text-slate-300">
              Share your experiences by rating and reviewing the spots
              you&apos;ve visited.
            </p>
          </div>

          {/* Step 3 */}
          <div className="text-center rounded-2xl border border-amber-100 bg-gradient-to-br from-white to-amber-50 p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg dark:border-slate-700 dark:from-slate-900 dark:to-slate-800">
            <div className="bg-[#FFFBF1] dark:bg-slate-700 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <span className="text-[#FF6B35] text-2xl font-bold">3</span>
            </div>
            <h3 className="text-xl font-bold mb-2 text-slate-900 dark:text-slate-100">
              Share Discoveries
            </h3>
            <p className="text-slate-600 dark:text-slate-300">
              Found a hidden gem? Add new spots to our platform and help others
              discover great food.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Category;
