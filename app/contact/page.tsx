import type { Metadata } from "next";

import { PageHero } from "@/components/ui/PageHero";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { ContactForm } from "@/components/forms/ContactForm";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { processSteps } from "@/content/home";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Tell WoowSignal what you are building. Product, software, or commerce — start with a short conversation.",
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        label="Contact"
        title="Tell us what you're building."
        intro="A short description of the problem is enough to start. We will come back with an honest read on whether we are the right team for it."
      />

      <Container className="pb-24 lg:pb-32">
        <div className="grid gap-14 lg:grid-cols-[1.4fr_1fr] lg:gap-20">
          <Reveal>
            <ContactForm />
          </Reveal>

          <Reveal delay={0.1} className="space-y-10">
            <div className="border border-border bg-surface p-7">
              <SectionLabel>Direct</SectionLabel>
              <a
                href={`mailto:${site.email}`}
                className="mt-4 block text-lg font-medium tracking-tight text-fg transition-colors hover:text-accent"
              >
                {site.email}
              </a>
              <p className="mt-3 text-sm leading-relaxed text-fg-muted">
                Email works just as well as the form. There is no chat widget on
                this site — a person reads what you send.
              </p>
            </div>

            <div>
              <SectionLabel>What happens next</SectionLabel>
              <ol className="mt-5 space-y-4">
                {processSteps.slice(0, 3).map((step) => (
                  <li key={step.index} className="flex gap-4">
                    <span className="mt-0.5 font-mono text-2xs tracking-[0.16em] text-accent">
                      {step.index}
                    </span>
                    <span>
                      <span className="block text-sm font-medium text-fg">
                        {step.title}
                      </span>
                      <span className="mt-1 block text-sm leading-relaxed text-fg-muted">
                        {step.body}
                      </span>
                    </span>
                  </li>
                ))}
              </ol>
            </div>
          </Reveal>
        </div>
      </Container>
    </>
  );
}
