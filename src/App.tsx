import React from 'react';
import { Navbar } from './components/layouts/Navbar';
import { Footer } from './components/layouts/Footer';
import { FoundationStatus } from './components/features/FoundationStatus';

export default function App() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50/50 text-slate-900 font-sans antialiased selection:bg-emerald-100 selection:text-emerald-900">
      <Navbar />
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8">
        <FoundationStatus />
      </main>
      <Footer />
    </div>
  );
}
