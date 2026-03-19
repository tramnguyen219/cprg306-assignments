"use client";

import React from "react";
import { useUserAuth } from "./_utils/auth-context";
import Link from "next/link";

export default function Page() {
  const { user, gitHubSignIn, firebaseSignOut } = useUserAuth();

  const handleSignIn = async () => {
    await gitHubSignIn();
  };

  const handleSignOut = async () => {
    await firebaseSignOut();
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-xl p-8 text-center w-[400px]">
        <h1 className="text-2xl font-bold mb-6 text-gray-800">
          Shopping List App
        </h1>

        {!user && (
          <button
            onClick={handleSignIn}
            className="bg-gray-900 text-white px-6 py-2 rounded-lg hover:bg-gray-700 transition"
          >
            Sign In with GitHub
          </button>
        )}

        {user && (
          <div className="space-y-4">
            <p className="text-gray-700">
              Welcome, <span className="font-semibold">{user.displayName}</span>
            </p>

            <p className="text-sm text-gray-500">{user.email}</p>

            <div className="flex flex-col gap-3 mt-4">
              <Link
                href="/week-8/shopping-list"
                className="bg-green-600 text-white py-2 rounded-lg hover:bg-green-500 transition"
              >
            Shopping List
              </Link>

              <button
                onClick={handleSignOut}
                className="bg-red-500 text-white py-2 rounded-lg hover:bg-red-400 transition"
              >
                Sign Out
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}