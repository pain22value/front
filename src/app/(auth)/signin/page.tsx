import SigninForm from "@/features/auth/ui/SigninForm";

export default async function Page() {
  return (
    <main className="signin-page">
      <section>
        <SigninForm />
      </section>
    </main>
  );
}
