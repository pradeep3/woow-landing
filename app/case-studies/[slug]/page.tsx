import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import {
  CaseStudyList,
  CaseStudyProse,
  CaseStudySection,
} from "@/components/sections/CaseStudySection";
import { caseStudies, getCaseStudy } from "@/content/case-studies";

export function generateStaticParams() {
  return caseStudies.map((study) => ({ slug: study.slug }));
}

export async function generateMetadata(
  props: PageProps<"/case-studies/[slug]">,
): Promise<Metadata> {
  const { slug } = await props.params;
  const study = getCaseStudy(slug);

  if (!study) return { title: "Case study not found" };

  return {
    title: `${study.title} — Case Study`,
    description: study.preview.challenge,
  };
}

export default async function CaseStudyPage(
  props: PageProps<"/case-studies/[slug]">,
) {
  const { slug } = await props.params;
  const study = getCaseStudy(slug);

  if (!study) notFound();

  const next = caseStudies.find((item) => item.slug !== study.slug);

  return (
    <>
      <PageHero
        label={study.category}
        title={study.title}
        intro={study.subtitle}
        meta={
          study.placeholder ? (
            <span className="inline-flex items-center border border-border px-2.5 py-1 font-mono text-2xs tracking-[0.14em] text-fg-muted uppercase">
              Placeholder — not a real project
            </span>
          ) : (
            <span className="inline-flex items-center gap-2 border border-accent-line px-2.5 py-1 font-mono text-2xs tracking-[0.14em] text-accent uppercase">
              <span aria-hidden="true" className="ping-dot" />
              Case study
            </span>
          )
        }
      />

      <Container size="wide" className="pb-8">
        <CaseStudySection index="01" label="Challenge">
          <CaseStudyProse>{study.challenge}</CaseStudyProse>
        </CaseStudySection>

        <CaseStudySection index="02" label="Approach">
          <CaseStudyProse>{study.approach}</CaseStudyProse>
        </CaseStudySection>

        <CaseStudySection index="03" label="Technology">
          <ul className="grid gap-px">
            {study.technology.map((group) => (
              <li
                key={group.group}
                className="grid gap-3 border-b border-border py-5 first:border-t first:border-border sm:grid-cols-[10rem_1fr] sm:items-baseline"
              >
                <span className="font-mono text-2xs tracking-[0.16em] text-fg-muted uppercase">
                  {group.group}
                </span>
                <span className="flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <span
                      key={item}
                      className="border border-border px-2.5 py-1 text-xs text-fg"
                    >
                      {item}
                    </span>
                  ))}
                </span>
              </li>
            ))}
          </ul>
        </CaseStudySection>

        <CaseStudySection index="04" label="Solution">
          <CaseStudyProse>{study.solution}</CaseStudyProse>
        </CaseStudySection>

        <CaseStudySection index="05" label="Outcome">
          <CaseStudyList items={study.outcome} />
        </CaseStudySection>
      </Container>

      <Section
        label="Keep reading"
        title="More work"
        action={
          <ButtonLink href="/work" variant="secondary" withArrow>
            All Work
          </ButtonLink>
        }
      >
        {next ? (
          <Reveal>
            <Link
              href={`/case-studies/${next.slug}`}
              className="group theme-fade flex flex-col gap-3 border border-border bg-surface p-8 transition-colors hover:border-fg-muted sm:flex-row sm:items-center sm:justify-between"
            >
              <span>
                <span className="font-mono text-2xs tracking-[0.16em] text-accent uppercase">
                  {next.category}
                </span>
                <span className="mt-2 block text-xl font-semibold tracking-tight text-fg">
                  {next.title}
                </span>
              </span>
              <span
                aria-hidden="true"
                className="text-lg text-fg-muted transition-transform duration-200 group-hover:translate-x-1 group-hover:text-accent"
              >
                →
              </span>
            </Link>
          </Reveal>
        ) : null}
      </Section>
    </>
  );
}
