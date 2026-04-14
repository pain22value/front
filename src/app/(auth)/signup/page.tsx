import SignupContainer from "@/features/auth/ui/SignupContainer";

export default async function SignupPage() {
  return (
    <main className="signup-page">
      <section className="flex flex-row items-center gap-8">
        <SignupContainer />
      </section>
    </main>
  );
}
