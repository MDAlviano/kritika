import StudentHeader from "../components/header";
import StudentHero from "./components/hero";
import TaskList from "./components/tasklist";
import WeekProgress from "./components/weekprogress";

export default function StudentDashboardPage() {
  return (
    <>
      <StudentHeader />
      <main className="space-y-10 px-8 py-10">
        {/* Hero card */}
        <StudentHero />

        {/* Tugas lainnya + Progress widget side by side */}
        <div className="flex flex-col gap-8">
          <div>
            <h2 className="text-2xl font-medium text-neutral-900">Tugas lainnya</h2>
            <p className="mt-1 text-neutral-500">
              Latihan dari kelas yang masih tersedia
            </p>
          </div>
          <div className="flex flex-col gap-6 lg:flex-row lg:items-start">
            <TaskList />
            <WeekProgress />
          </div>
        </div>
      </main>
    </>
  );
}
