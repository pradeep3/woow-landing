import type { Metadata } from "next";

import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { TechStackGrid } from "@/components/sections/TechStackGrid";
import { ButtonLink } from "@/components/ui/Button";
import { techFraming } from "@/content/technology";

export const metadata: Metadata = {
  title: "Technology",
  description:
    "The stack WoowSignal builds on — frontend, backend, cloud, data, and commerce — and the reasoning behind each layer.",
};

export default function TechnologyPage() {
  return (
    <>
      <PageHero
        label="Technology"
        title="Built on modern technology."
        intro={techFraming}
      />

      <Container size="wide" className="pb-8">
        <TechStackGrid variant="full" />
      </Container>

      <Section
        label="How we decide"
        title="Boring where it counts."
        intro="New tools have to earn their place. We pick for the load the system will actually carry and for the team that has to maintain it after we hand it over — which usually means a smaller stack than the one a greenfield project is tempted into."
        action={
          <ButtonLink href="/contact" size="large" withArrow>
            Talk Through Your Stack
          </ButtonLink>
        }
      />
    </>
  );
}
