import { PageHero } from "@/components/shared/PageHero";
import { ContactContent } from "@/components/contact/ContactContent";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with CPA Otene and Associates LLP. Book a consultation, make an inquiry, or visit one of our offices across Kenya.",
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        label="Get in Touch"
        title="Connect with"
        titleHighlight="Our Advisors"
        description="Our team of professional advisors is ready to discuss your needs. Reach out to schedule a consultation or simply to learn more about how we can serve your organisation."
        breadcrumbs={[{ label: "Contact Us" }]}
      />
      <ContactContent />
    </>
  );
}
