import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/core/ui/accordion";
import { SectionWrapper } from "@/core/sections/layout/section-wrapper";
import { SectionHeading } from "@/core/sections/layout/section-heading";
import type { FaqSectionSchema } from "@/core/schema/tenant-config.schema";
import type { z } from "zod";

type FaqSectionData = z.infer<typeof FaqSectionSchema>;

export function FAQAccordion({ section }: { section: FaqSectionData }) {
  return (
    <SectionWrapper id={section.id} size="narrow">
      <SectionHeading
        eyebrow={section.eyebrow}
        title={section.title}
        subtitle={section.subtitle}
      />

      <div className="rounded-lg border border-border bg-card px-6">
        <Accordion type="single" collapsible className="w-full">
          {section.items.map((item, idx) => (
            <AccordionItem
              key={item.question}
              value={`faq-${idx}`}
              className={idx === section.items.length - 1 ? "border-b-0" : undefined}
            >
              <AccordionTrigger>{item.question}</AccordionTrigger>
              <AccordionContent>{item.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </SectionWrapper>
  );
}
