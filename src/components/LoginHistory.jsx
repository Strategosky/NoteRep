import React from 'react';

const LoginHistory = ({ loginHistory, onQuickLogin, onRemoveHistory }) => {
  if (!loginHistory || loginHistory.length === 0) {
    return null;
  }

  return (
    <div className="mb-6">
      <h3 className="mb-4 text-center font-bold">Quick Login</h3>
      <div className="grid gap-3">
        {loginHistory.map((entry) => (
          <div
            key={entry.usn}
            className="flex items-center justify-between rounded-lg border bg-white p-3 shadow-sm dark:border-gray-700 dark:bg-gray-800"
          >
            <div className="flex flex-col">
              <span className="font-medium">{entry.name}</span>
              <span className="text-sm text-gray-600 dark:text-gray-400">
                {entry.usn}
              </span>
              <span className="text-xs text-gray-500 dark:text-gray-500">
                Last login: {new Date(entry.lastUsed).toLocaleDateString()}
              </span>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => onQuickLogin(entry)}
                className="rounded bg-blue-600 px-3 py-1 text-sm text-white hover:bg-blue-700"
              >
                Login
              </button>
              <button
                onClick={() => onRemoveHistory(entry.usn)}
                className="rounded bg-red-600 px-3 py-1 text-sm text-white hover:bg-red-700"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4 border-t border-gray-200 pt-4 dark:border-gray-700"></div>
    </div>
  );
};

export default LoginHistory;
