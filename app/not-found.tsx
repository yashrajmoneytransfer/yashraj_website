import Link from "next/link"

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-900 px-4 py-16">
      <div className="text-center space-y-6 max-w-md">
        <div className="w-20 h-20 bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 rounded-3xl flex items-center justify-center text-3xl font-bold mx-auto shadow-sm">
          404
        </div>
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Page Not Found</h1>
        <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
          Sorry, the page you are looking for does not exist or has been moved.
        </p>
        <div>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white font-semibold text-sm rounded-xl transition-all shadow-md hover:shadow-lg"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  )
}
