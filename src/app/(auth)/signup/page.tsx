import SignupForm from "@/features/auth/ui/SignupForm";

export default async function Page() {
  return (
    <main className="signup-page">
      <section className="flex flex-row items-center gap-8">
        <SignupForm />
      </section>
    </main>
  );
}
