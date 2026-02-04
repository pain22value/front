import SigninForm from "@/components/auth/SigninForm";

export default async function Page() {
  return (
    <main className="signin-page">
      <section>
        <SigninForm />
      </section>
    </main>
  );
}
