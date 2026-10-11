import ActiveTasks from "./components/activetask";
import ClassList from "./components/classlist";
import Header from "./components/header";
import Hero from "./components/hero";
import StatCards from "./components/startcards";

export default function AdminBerandaPage() {
  return (
    <>
      <Header />
      <main className="space-y-10 px-8 py-10">
        <Hero />
        <StatCards />
        <ClassList />
        <ActiveTasks />
      </main>
    </>
  );
}