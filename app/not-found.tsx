import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/Button";
import { SectionLabel } from "@/components/ui/SectionLabel";

export default function NotFound() {
  return (
    <section className="relative isolate flex min-h-[70svh] items-center overflow-hidden py-32">
      <div
        aria-hidden="true"
        className="dot-field dot-field-fade pointer-events-none absolute inset-0 opacity-50"
      />

      <Container className="relative text-center">
        <div className="flex justify-center">
          <SectionLabel>404</SectionLabel>
        </div>
        <h1 className="mt-6 text-2xl font-semibold tracking-[-0.03em] sm:text-3xl">
          No signal here.
        </h1>
        <p className="mx-auto mt-5 max-w-md text-base text-fg-muted">
          That page does not exist — or has not been built yet.
        </p>
        <div className="mt-9 flex flex-wrap justify-center gap-3">
          <ButtonLink href="/" withArrow>
            Back Home
          </ButtonLink>
          <ButtonLink href="/work" variant="secondary" withArrow>
            See Our Work
          </ButtonLink>
        </div>
      </Container>
    </section>
  );
}
