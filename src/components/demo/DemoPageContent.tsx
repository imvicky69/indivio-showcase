// src/components/DemoPageContent.tsx
'use client';

import { useState } from 'react';
import { Eye, Edit } from 'lucide-react';
import { AnimatedElement } from '../ui/AnimatedElement';
import { CtaSection } from '../ui/CtaSection';

// Define interfaces for our data types
interface Topper {
  id: number;
  name: string;
  score: string;
  class: string;
}

interface Event {
  id: number;
  title: string;
  date: string;
}

// --- Mock Data: A small, self-contained "database" for our demo ---
const initialToppers: Topper[] = [
  { id: 1, name: 'Priya Sharma', score: '98.6%', class: 'Class 12 Science' },
  { id: 2, name: 'Rahul Verma', score: '97.8%', class: 'Class 12 Commerce' },
  { id: 3, name: 'Anjali Singh', score: '99.2%', class: 'Class 10' },
];

const initialEvents: Event[] = [
  { id: 1, title: 'Annual Sports Day', date: 'Oct 15, 2025' },
  { id: 2, title: 'Science Exhibition', date: 'Nov 01, 2025' },
];

// --- Sub-Component: The simulated Public Website ---
function DemoWebsiteView({
  toppers,
  events,
}: {
  toppers: Topper[];
  events: Event[];
}) {
  return (
    <div className="h-full rounded-lg bg-white p-6">
      <h2 className="mb-4 font-display text-2xl font-bold text-primary">
        Our Toppers
      </h2>
      <div className="grid grid-cols-3 gap-4">
        {toppers.map((t) => (
          <div key={t.id} className="rounded-md bg-secondary p-4 text-center">
            <div className="mx-auto mb-2 h-16 w-16 rounded-full bg-muted"></div>
            <p className="font-semibold text-foreground">{t.name}</p>
            <p className="font-bold text-accent">{t.score}</p>
            <p className="text-sm text-muted-foreground">{t.class}</p>
          </div>
        ))}
      </div>
      <hr className="my-6" />
      <h2 className="mb-4 font-display text-2xl font-bold text-primary">
        Upcoming Events
      </h2>
      <ul className="space-y-2">
        {events.map((e) => (
          <li
            key={e.id}
            className="flex items-center justify-between rounded-md bg-secondary p-2"
          >
            <span className="text-foreground">{e.title}</span>
            <span className="text-sm font-semibold text-muted-foreground">
              {e.date}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

// --- Sub-Component: The simulated Admin Dashboard ---
function DemoAdminView({
  toppers,
  onAddTopper,
}: {
  toppers: Topper[];
  onAddTopper: (name: string) => void;
}) {
  const [newName, setNewName] = useState('');
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newName) {
      onAddTopper(newName);
      setNewName('');
    }
  };
  return (
    <div className="h-full rounded-lg bg-white p-6">
      <h2 className="font-display text-2xl font-bold text-foreground">
        InDashboard Lite
      </h2>
      <p className="mb-4 text-muted-foreground">
        This is a simplified demo. The real dashboard has many more features!
      </p>
      <div className="rounded-lg bg-secondary p-4">
        <h3 className="mb-2 font-semibold text-foreground">Add New Topper</h3>
        <form onSubmit={handleSubmit} className="flex gap-2">
          <input
            type="text"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            placeholder="Enter topper's name"
            className="flex-grow rounded-md border border-border p-2"
          />
          <button
            type="submit"
            className="rounded-md bg-primary px-4 py-2 font-semibold text-primary-foreground"
          >
            Add
          </button>
        </form>
        <p className="mt-4 text-sm text-muted-foreground">
          Current Toppers: {toppers.length}
        </p>
      </div>
    </div>
  );
}

// --- Main Component: The Demo Page Manager ---
export function DemoPageContent() {
  const [view, setView] = useState<'website' | 'admin'>('website');
  const [toppers, setToppers] = useState(initialToppers);
  const [events] = useState(initialEvents);

  const handleAddTopper = (name: string) => {
    const newTopper = {
      id: Date.now(),
      name: name,
      score: '99.9%',
      class: 'Class 12 Science',
    };
    setToppers((prev) => [...prev, newTopper]);
    // Switch back to website view to show the instant update!
    setView('website');
  };

  return (
    <section className="min-h-screen bg-secondary pb-20 pt-32">
      <div className="container mx-auto px-6">
        <AnimatedElement direction="fade" className="text-center">
          <h1 className="font-display text-4xl font-bold text-foreground sm:text-5xl">
            Experience School Management Made Simple
          </h1>
          <p className="mx-auto mt-6 max-w-3xl text-lg text-muted-foreground">
            See how easy it is to manage your school's website and showcase student achievements. 
            This interactive demo shows real features that teachers and administrators use daily.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-4 text-sm">
            <span className="rounded-full bg-green-100 px-3 py-1 text-green-700">
              ✅ No Technical Knowledge Required
            </span>
            <span className="rounded-full bg-blue-100 px-3 py-1 text-blue-700">
              ✅ Real-time Updates
            </span>
            <span className="rounded-full bg-purple-100 px-3 py-1 text-purple-700">
              ✅ Mobile Friendly
            </span>
          </div>
          </h1>
          <p className="mx-auto mt-4 max-w-3xl text-lg text-muted-foreground">
            This is a live, interactive demo. Use the toggle to switch between
            the public website and the simple admin dashboard to see how easy it
            is to make changes.
          </p>
        </AnimatedElement>

        {/* The Toggle */}
        <AnimatedElement delay={0.1} className="my-8 flex justify-center">
          <div className="flex items-center gap-2 rounded-full border bg-card p-1.5">
            <button
              onClick={() => setView('website')}
              className={`rounded-full px-4 py-2 font-semibold transition-colors ${view === 'website' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground'}`}
            >
              <Eye className="mr-2 inline h-5 w-5" /> Website View
            </button>
            <button
              onClick={() => setView('admin')}
              className={`rounded-full px-4 py-2 font-semibold transition-colors ${view === 'admin' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground'}`}
            >
              <Edit className="mr-2 inline h-5 w-5" /> Admin Dashboard
            </button>
          </div>
        </AnimatedElement>

        {/* The Demo Environment */}
        <AnimatedElement delay={0.2}>
          <div className="mx-auto max-w-5xl rounded-2xl border bg-background p-4 shadow-2xl">
            {/* Header bar of the "browser" window */}
            <div className="mb-4 flex items-center gap-1.5">
              <div className="h-3 w-3 rounded-full bg-red-500"></div>
              <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
              <div className="h-3 w-3 rounded-full bg-green-500"></div>
            </div>
            {/* Conditionally rendered content */}
            <div className="min-h-[400px]">
              {view === 'website' ? (
                <DemoWebsiteView toppers={toppers} events={events} />
              ) : (
                <DemoAdminView
                  toppers={toppers}
                  onAddTopper={handleAddTopper}
                />
              )}
            </div>
          </div>
        </AnimatedElement>

        {/* The "What You're Experiencing" Section */}
        <AnimatedElement delay={0.3} className="mt-16 text-center">
          <h2 className="font-display text-3xl font-bold text-foreground">
            What You&apos;re Experiencing
          </h2>
          <div className="mx-auto mt-8 grid max-w-5xl grid-cols-1 gap-8 md:grid-cols-3">
            <div className="rounded-lg border bg-card p-6">
              <h3 className="font-bold text-primary">Instant Updates</h3>
              <p className="mt-2 text-muted-foreground">
                Notice how adding a topper in the admin panel reflects instantly
                on the website. That&apos;s the power of a modern React-based
                platform.
              </p>
            </div>
            <div className="rounded-lg border bg-card p-6">
              <h3 className="font-bold text-primary">Blazing-Fast</h3>
              <p className="mt-2 text-muted-foreground">
                This entire demo is running in your browser, showcasing the
                speed and fluidity your parents and students will experience.
              </p>
            </div>
            <div className="rounded-lg border bg-card p-6">
              <h3 className="font-bold text-primary">Simple & Intuitive</h3>
              <p className="mt-2 text-muted-foreground">
                No technical skills, no complex menus. Our InDashboard is
                designed for educators, not developers.
              </p>
            </div>
          </div>
        </AnimatedElement>

        {/* Final CTA */}
        <div className="mt-20">
          <CtaSection
            heading="Ready to Get Your Own?"
            subheading="Let's build a digital campus that you and your community will love."
            buttons={[
              { text: 'Book My Plan Now', href: '/booking', primary: true },
            ]}
          />
        </div>
      </div>
    </section>
  );
}
