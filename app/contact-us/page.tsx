import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Building2,
  Clock3,
  Handshake,
  Mail,
  MapPin,
  Phone,
  ShieldCheck,
} from "lucide-react";

import CTASection from "@/components/CTASection";
import HeroSection from "@/components/HeroSection";

export const metadata: Metadata = {
  title: "Contact Us | The Water Project",
  description:
    "Reach The Water Project for donor support, partnership inquiries, and general questions about our mission, programs, and community water work.",
};

const contactDetails = [
  {
    title: "Office address",
    value: "PO Box 3353, Concord, NH 03302",
    icon: MapPin,
    href: "https://maps.google.com/?q=PO+Box+3353+Concord+NH+03302",
  },
  {
    title: "Email",
    value: "info@thewaterproject.org",
    icon: Mail,
    href: "mailto:info@thewaterproject.org",
  },
  {
    title: "Phone",
    value: "(800) 460-6030",
    icon: Phone,
    href: "tel:+18004606030",
  },
];

const inquiryTypes = [
  {
    title: "Partnership inquiries",
    description:
      "If you are exploring a collaboration, church campaign, school initiative, or corporate giving opportunity, our team can help identify the best next step.",
    icon: Handshake,
  },
  {
    title: "Donor support",
    description:
      "Questions about giving, campaigns, receipts, recurring support, or project updates are welcome. We want supporters to feel informed and cared for.",
    icon: ShieldCheck,
  },
  {
    title: "Organizational questions",
    description:
      "Need more detail about our model, our mission, or how water projects are selected and communicated? We are happy to point you to the right resources.",
    icon: Building2,
  },
];

const supportExpectations = [
  {
    title: "Typical response times",
    description:
      "Our team aims to respond to most inquiries within a few business days. During holidays or high-volume periods, it may take a little longer, but every message matters to us.",
  },
  {
    title: "Helpful details to include",
    description:
      "Sharing the purpose of your request, your organization name, and any relevant campaign or donation information helps us direct your message quickly.",
  },
  {
    title: "Field and office coordination",
    description:
      "Some answers require coordination across administrative and field relationships. We will keep communication clear while gathering the right information.",
  },
];

export default function ContactUsPage() {
  return (
    <main className="bg-white text-slate-900">
      <HeroSection
        headline="Contact Us"
        subheadline="We would love to hear from you. Reach out with questions about giving, partnerships, campaigns, or the work of bringing safe water within reach."
        backgroundImage="/contact.jpg"
        primaryButtonText="Support Us"
        primaryButtonHref="/take-action/donate"
        secondaryButtonText="Learn More"
        secondaryButtonHref="/our-mission"
      />

      <section className="px-6 py-20 sm:px-8 lg:px-12">
        <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="rounded-[2rem] border border-slate-200 bg-slate-50 p-8 shadow-sm sm:p-10">
            <span className="inline-flex items-center rounded-full bg-cyan-50 px-4 py-2 text-sm font-semibold text-cyan-700">
              Get in touch
            </span>
            <h2 className="mt-6 text-3xl font-semibold tracking-tight text-slate-900">
              We are here to help
            </h2>
            <p className="mt-4 text-lg leading-8 text-slate-600">
              Whether you are a donor, a prospective partner, or someone learning
              more about our mission, we welcome your questions and will do our best
              to connect you with the right information.
            </p>

            <div className="mt-8 space-y-4">
              {contactDetails.map(({ title, value, icon: Icon, href }) => (
                <a
                  key={title}
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel={href.startsWith("http") ? "noreferrer" : undefined}
                  className="flex items-start gap-4 rounded-3xl border border-slate-200 bg-white p-5 transition hover:border-cyan-200 hover:shadow-sm"
                >
                  <div className="inline-flex rounded-2xl bg-slate-100 p-3 text-slate-700">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">
                      {title}
                    </p>
                    <p className="mt-1 text-base font-medium text-slate-900">
                      {value}
                    </p>
                  </div>
                </a>
              ))}
            </div>
          </div>

          <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm sm:p-10">
            <span className="inline-flex items-center rounded-full bg-emerald-50 px-4 py-2 text-sm font-semibold text-emerald-700">
              Before you send a note
            </span>
            <h2 className="mt-6 text-3xl font-semibold tracking-tight text-slate-900">
              What to expect from our team
            </h2>
            <div className="mt-8 grid gap-5">
              {supportExpectations.map((item) => (
                <div
                  key={item.title}
                  className="rounded-3xl border border-slate-200 bg-slate-50 p-6"
                >
                  <div className="flex items-start gap-4">
                    <div className="inline-flex rounded-2xl bg-white p-3 text-cyan-700 shadow-sm">
                      <Clock3 className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-slate-900">
                        {item.title}
                      </h3>
                      <p className="mt-2 leading-7 text-slate-600">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 rounded-3xl bg-slate-950 p-6 text-white">
              <h3 className="text-lg font-semibold">Looking for a next step?</h3>
              <p className="mt-2 leading-7 text-slate-300">
                If you already know how you would like to get involved, explore our
                action pages for immediate ways to support clean water access.
              </p>
              <div className="mt-5 flex flex-wrap gap-3">
                <Link
                  href="/take-action/donate"
                  className="inline-flex items-center gap-2 rounded-full bg-cyan-500 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400"
                >
                  Donate
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/take-action/campaign"
                  className="inline-flex items-center gap-2 rounded-full border border-white/15 px-5 py-3 text-sm font-semibold text-white transition hover:border-cyan-300 hover:text-cyan-200"
                >
                  Start a campaign
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-slate-50 px-6 py-20 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-6xl">
          <div className="max-w-3xl space-y-4">
            <span className="inline-flex items-center rounded-full bg-cyan-50 px-4 py-2 text-sm font-semibold text-cyan-700">
              Inquiry pathways
            </span>
            <h2 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
              The kinds of conversations we can support
            </h2>
            <p className="text-lg leading-8 text-slate-600">
              From donor care to partnerships, we want every inquiry to reach the
              right place and receive a thoughtful response.
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {inquiryTypes.map(({ title, description, icon: Icon }) => (
              <div
                key={title}
                className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm"
              >
                <div className="inline-flex rounded-2xl bg-cyan-50 p-3 text-cyan-700">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="mt-6 text-xl font-semibold text-slate-900">
                  {title}
                </h3>
                <p className="mt-3 leading-7 text-slate-600">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-20 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-6xl overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-sm">
          <div className="grid gap-0 lg:grid-cols-[0.85fr_1.15fr]">
            <div className="bg-slate-950 p-8 text-white sm:p-10">
              <span className="inline-flex items-center rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm font-semibold text-cyan-200">
                Office & presence
              </span>
              <h2 className="mt-6 text-3xl font-semibold tracking-tight">
                Connected through office support and field relationships
              </h2>
              <p className="mt-4 leading-8 text-slate-300">
                Our administrative support helps donors and partners stay informed,
                while our field relationships keep the work grounded in real
                community needs. That combination helps us serve with clarity,
                consistency, and care.
              </p>
              <p className="mt-4 leading-8 text-slate-300">
                If your message involves a project update, giving history, or a
                campaign question, include any helpful details so we can route your
                inquiry efficiently.
              </p>
            </div>

            <div className="min-h-[420px]">
              <iframe
                title="The Water Project office map"
                src="https://www.google.com/maps?q=Concord%2C%20NH%2003302&z=13&output=embed"
                className="h-full min-h-[420px] w-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </section>

      <CTASection
        title="Need a meaningful way to help?"
        description="Support clean water access today, or start a campaign that invites your community to make an impact with you."
        buttonText="Give now"
        buttonHref="/take-action/donate"
      />
    </main>
  );
}