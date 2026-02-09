import SigninForm from "@/features/auth/ui/SigninForm";

export default async function SigninPage() {
  return (
    <main className="signin-page">
      <section>
        <SigninForm />
      </section>
    </main>
  );
}
