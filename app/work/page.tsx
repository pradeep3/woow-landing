import type { Metadata } from "next";

import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { WorkGrid } from "@/components/work/WorkGrid";
import { ButtonLink } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Client projects built by WoowSignal — commerce systems, software, and platforms, with the case study behind each one.",
};

export default function WorkPage() {
  return (
    <>
      <PageHero
        label="Work"
        title="Built, shipped, and still running."
        intro="A selection of client projects. Each one links to the case study behind it — the problem, the build, and what changed."
      />

      <Container className="pb-20 lg:pb-28">
        <WorkGrid />
      </Container>

      <Section
        label="Your project"
        title="There's room on this page."
        intro="If you are building something and need a team that will still be around after launch, start here."
        action={
          <ButtonLink href="/contact" size="large" withArrow>
            Start a Project
          </ButtonLink>
        }
      />
    </>
  );
}
