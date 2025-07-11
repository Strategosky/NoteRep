import React from 'react';

export default function About() {
  return (
    <div className="bg-gray-50 min-h-screen flex flex-col">
      <header className="bg-white p-4 shadow-md">
        <h1 className="text-2xl font-bold text-gray-900">NoteRep</h1>
      </header>
      <main className="flex-grow p-4 max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-6">About NoteRep</h1>
        <p className="text-lg text-gray-700 mb-8">
          NoteRep is a comprehensive platform designed to support students and educators at MS Ramaiah Institute of Technology with resources, schedules, and interactive tools. Our mission is to streamline access to academic information and foster a collaborative learning environment.
        </p>

        <h2 className="text-3xl font-bold text-gray-900 mb-6">Features</h2>
        <ul className="list-disc pl-5 space-y-2 text-lg text-gray-700">
          <li><span className="font-bold">Course Syllabi:</span> Access detailed syllabi for various semesters and departments including CSE, AI & ML, Cyber Security, and more.</li>
          <li><span className="font-bold">Timetables:</span> View and manage timetables for different years and departments with components like Timetable, Timetable1styear, and more.</li>
          <li><span className="font-bold">Chat & Bots:</span> Engage with interactive chat features and bots such as NoteRepBot, ExamRoastBot, and ComplimentBot for assistance and entertainment.</li>
          <li><span className="font-bold">Academic Resources:</span> Download documents and past papers for multiple semesters and courses directly from our public repository.</li>
          <li><span className="font-bold">Calendar & Schedules:</span> Stay updated with academic calendars and schedules tailored for different departments and years.</li>
          <li><span className="font-bold">Forum:</span> Participate in the NoteRep Forum to discuss topics, share notes, and collaborate with peers.</li>
          <li><span className="font-bold">Calculla:</span> Utilize our calculator tool for quick computations related to academic needs.</li>
          <li><span className="font-bold">CommuniLink:</span> Connect with community links and resources for additional support and networking.</li>
          <li><span className="font-bold">Newsletter:</span> Subscribe to our newsletter for the latest updates and announcements.</li>
          <li><span className="font-bold">Live Chat Support:</span> Get real-time assistance through our Live Chat Button integrated across the platform.</li>
          <li><span className="font-bold">SyllabusGPT:</span> An AI-powered tool to assist with syllabus queries and explanations.</li>
          <li><span className="font-bold">MiniSIS:</span> A simplified Student Information System for quick access to personal academic data.</li>
          <li><span className="font-bold">How It Works:</span> A dedicated guide to help users navigate and make the most of NoteRep's features.</li>
        </ul>

        <h2 className="text-3xl font-bold text-gray-900 mt-10 mb-6">Developer Information</h2>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Shravan MR</h3>
          <p className="text-gray-700 mb-4">Lead Developer & Creator of NoteRep</p>
          <div className="flex space-x-4">
            <a href="mailto:shravan.mr@example.com" className="text-blue-600 hover:text-blue-800">
              Email
            </a>
            <a href="https://github.com/shravanmr" target="_blank" rel="noopener noreferrer" className="text-gray-800 hover:text-black">
              GitHub
            </a>
            <a href="https://linkedin.com/in/shravanmr" target="_blank" rel="noopener noreferrer" className="text-blue-700 hover:text-blue-900">
              LinkedIn
            </a>
          </div>
        </div>
      </main>
      <footer className="bg-gray-800 text-white p-4 text-center">
        <p>Platform developed by Shravan</p>
      </footer>
    </div>
  );
}
