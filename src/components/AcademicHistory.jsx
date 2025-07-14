import React from 'react'

const AcademicHistory = ({ studentData }) => {
  const history = studentData?.academicHistory

  if (!history || (!history.cumulative && !history.semesters)) {
    return (
      <div className="my-4 rounded-md border bg-white p-4 text-center shadow dark:bg-gray-800">
        <p>No academic history found.</p>
      </div>
    )
  }

  return (
    <div className="my-4 rounded-md border bg-white p-4 shadow dark:bg-gray-800">
      <h3 className="mb-4 text-center text-xl font-bold">Academic History</h3>

      {/* Cumulative Stats */}
      <div className="mb-6 grid grid-cols-3 gap-4 border-b pb-4">
        <div className="text-center">
          <p className="text-sm text-gray-600 dark:text-gray-400">CGPA</p>
          <p className="text-xl font-bold text-emerald-500">
            {history.cumulative.cgpa}
          </p>
        </div>
        <div className="text-center">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Credits Earned
          </p>
          <p className="text-xl font-bold text-emerald-500">
            {history.cumulative.creditsEarned}
          </p>
        </div>
        <div className="text-center">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Credits Remaining
          </p>
          <p className="text-xl font-bold text-emerald-500">
            {history.cumulative.creditsToBeEarned}
          </p>
        </div>
      </div>

      {/* Semester History */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {(() => {
          let regularSemCount = 0;
          return history.semesters.map((sem, index) => {
            const isSupplementary = sem.semester.toLowerCase().includes('supplementary');
            if (!isSupplementary) regularSemCount++;
            return (
              <div
                key={index}
                className="rounded-lg border p-4 text-center shadow-sm transition-all duration-300 hover:shadow-lg dark:border-gray-700"
              >
                <p className="mb-2 font-semibold text-gray-900 dark:text-gray-100">
                  {isSupplementary 
                    ? sem.semester 
                    : `Sem ${regularSemCount} (${sem.semester})`}
                </p>
                <div className="space-y-1">
                  <p className="text-2xl font-bold text-emerald-500">{sem.sgpa}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    CGPA: {sem.cgpa || 'N/A'}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Credits: {sem.creditsEarned}/{sem.creditsRegistered}
                  </p>
                </div>
              </div>
            );
          });
        })()}
      </div>
    </div>
  )
}

export default AcademicHistory
