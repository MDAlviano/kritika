import Header from "@/app/teacher/components/header";
import AssignmentList from "./Assignments";

export default async function AssignmentsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <>
      <Header
        title="Daftar tugas"
        subtitle="Kelola semua tugas membaca aktif dari satu tempat."
      />
      <main className="px-8 py-10">
        <AssignmentList classId={id} />
      </main>
    </>
  );
}