"use client";

import { useSearchParams } from "next/navigation";
import { AlertCircle, ArrowLeft, ShieldAlert } from "lucide-react";
import Link from "next/link";

enum AuthError {
  Configuration = "Configuration",
  AccessDenied = "AccessDenied",
  Verification = "Verification",
  Default = "Default",
}

const errorMap = {
  [AuthError.Configuration]: {
    title: "Configuration Error",
    icon: <AlertCircle className="h-12 w-12 text-amber-500" />,
    message: (
      <p className="text-gray-600">
        There was a problem with authentication configuration. Please contact
        support if this error persists.
        <br />
        <span className="mt-2 inline-block rounded-md bg-gray-100 px-2 py-1 font-mono text-sm">
          Error: Configuration
        </span>
      </p>
    ),
  },
  [AuthError.AccessDenied]: {
    title: "Access Denied",
    icon: <ShieldAlert className="h-12 w-12 text-red-500" />,
    message: (
      <p className="text-gray-600">
        You don&apos;t have permission to access this application. If you
        believe this is a mistake, please contact your administrator.
      </p>
    ),
  },
  [AuthError.Verification]: {
    title: "Email Verification Required",
    icon: <AlertCircle className="h-12 w-12 text-blue-500" />,
    message: (
      <p className="text-gray-600">
        Please verify your email address to continue. Check your inbox for a
        verification link.
        <button
          type="button"
          className="mt-4 block w-full rounded-lg bg-blue-500 px-4 py-2 text-center text-sm font-medium text-white hover:bg-blue-600 focus:ring-4 focus:ring-blue-300 focus:outline-none"
        >
          Resend Verification Email
        </button>
      </p>
    ),
  },
  [AuthError.Default]: {
    title: "Unexpected Error",
    icon: <AlertCircle className="h-12 w-12 text-gray-500" />,
    message: (
      <p className="text-gray-600">
        An unexpected error occurred. Please try again or contact support if the
        issue persists.
      </p>
    ),
  },
};

const AuthErrorPage = () => {
  const search = useSearchParams();
  const error = search.get("error") as AuthError;
  const errorContent = errorMap[error] || errorMap[AuthError.Default];

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-16 sm:px-6 sm:py-24 md:grid md:place-items-center lg:px-8">
      <div className="mx-auto max-w-max">
        <main className="sm:flex">
          <div className="text-center sm:text-left">
            <div className="rounded-xl bg-white p-8 shadow-2xl ring-1 ring-gray-200/50">
              <div className="flex flex-col items-center">
                {errorContent.icon}
                <h1 className="mt-4 text-2xl font-bold tracking-tight text-gray-900">
                  {errorContent.title}
                </h1>
                <div className="mt-4 max-w-lg">{errorContent.message}</div>

                <div className="mt-8 flex items-center justify-center space-x-4">
                  <Link
                    href="/"
                    className="inline-flex items-center space-x-2 text-sm font-medium text-gray-500 hover:text-gray-700"
                  >
                    <ArrowLeft className="h-4 w-4" />
                    <span>Back to Login</span>
                  </Link>
                  <Link
                    href="/help-center"
                    className="text-sm font-medium text-blue-600 hover:text-blue-500"
                  >
                    Help Center
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AuthErrorPage;
