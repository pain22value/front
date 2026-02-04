import SignupForm from "@/components/auth/SignupForm";

export default async function Page() {
  return (
    <main className="signup-page">
      <section>
        <SignupForm />
      </section>
    </main>
  );
}
