import type { Metadata } from "next";
import Link from "next/link";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';

export const metadata: Metadata = {
  title: "FAQ | Project Water",
  description:
    "Frequently asked questions about Project Water, our mission, how to get involved, and how we approach water access solutions.",
};

const faqCategories = [
  {
    title: "About Project Water",
    questions: [
      {
        q: "What is Project Water's mission?",
        a: "Our mission is to help communities build and sustain water systems through locally guided construction, clear reporting, and ongoing repair support. We focus on durable solutions that continue working for years.",
      },
      {
        q: "How long has Project Water been working?",
        a: "Project Water was founded on the belief that every community deserves clean water. We've been building durable solutions and strengthening communities for years with proven impact.",
      },
      {
        q: "Where does Project Water work?",
        a: "We operate across sub-Saharan Africa, with projects in multiple countries. Our teams work directly with communities to assess needs and implement culturally appropriate, sustainable water solutions.",
      },
      {
        q: "What types of water solutions do you implement?",
        a: "We implement diverse solutions based on each community's needs: water wells, spring protections, rainwater catchment systems, small dams, and repair programs that ensure existing systems continue to function.",
      },
    ],
  },
  {
    title: "Donations & Giving",
    questions: [
      {
        q: "How do I make a donation?",
        a: "You can donate securely on our website at any amount. We also accept monthly recurring gifts, sponsorships, and fundraising campaigns. Every gift helps fund lasting water access.",
      },
      {
        q: "Where does my donation go?",
        a: "Your donation funds water infrastructure projects, community training, system maintenance, transparent reporting, and program operations. We publish annual reports showing exactly how funds are used.",
      },
      {
        q: "Is my donation tax-deductible?",
        a: "Yes. Project Water is a registered 501(c)(3) nonprofit organization, so donations are tax-deductible in the United States. We'll provide receipts for your records.",
      },
      {
        q: "Can I sponsor a specific community or project?",
        a: "Yes. Our sponsorship program lets you support a particular community or project and receive updates about the work you're helping to fund.",
      },
    ],
  },
  {
    title: "Getting Involved",
    questions: [
      {
        q: "How can I volunteer?",
        a: "We welcome volunteers with diverse skills. You can contribute remotely (professional expertise, fundraising help), organize locally (start a campaign in your area), or participate in field experiences. Visit our volunteer page to explore opportunities.",
      },
      {
        q: "Can I start a campaign?",
        a: "Absolutely. Our campaign program helps you turn birthdays, school projects, workplace events, or community efforts into fundraisers for clean water. We provide resources, messaging, and support.",
      },
      {
        q: "Does Project Water accept corporate partnerships?",
        a: "Yes. We partner with companies on giving initiatives, matching gifts, employee volunteerism, and cause-related campaigns. Contact us to explore partnership opportunities.",
      },
      {
        q: "Can I visit a project in the field?",
        a: "We arrange field visits for donors, volunteers, and partners who want to see the work firsthand. Contact us to discuss timing and logistics.",
      },
    ],
  },
  {
    title: "Impact & Results",
    questions: [
      {
        q: "How do you measure impact?",
        a: "We track metrics that matter: communities served, water systems installed, people with improved access, health outcomes, school attendance improvements, and long-term system sustainability. We publish detailed impact reports.",
      },
      {
        q: "How long do water systems last?",
        a: "Our approach emphasizes durability. By designing for local maintenance, training community caretakers, and reserving resources for repairs, we build systems designed to last decades, not just a few years.",
      },
      {
        q: "What happens after a water project is installed?",
        a: "We don't stop at installation. We provide training for community maintenance, monitor system performance, fund repairs as needed, and maintain contact with communities to ensure lasting access.",
      },
      {
        q: "Can I see before-and-after data?",
        a: "Yes. We publish impact reports with photos, stories, and data showing how water access changes health, education, and economic opportunity in the communities we serve.",
      },
    ],
  },
  {
    title: "Transparency & Trust",
    questions: [
      {
        q: "How transparent is Project Water?",
        a: "We believe transparency builds trust. We publish annual reports, detailed financial statements, independent audits, and project-level documentation. You can see exactly how funds are used and what results are achieved.",
      },
      {
        q: "What percentage of donations go to programs?",
        a: "The majority of every donation supports direct program work—water infrastructure, community training, maintenance, and monitoring. Our financial statements show the exact breakdown.",
      },
      {
        q: "Is Project Water rated by charity evaluators?",
        a: "Yes. We're evaluated by GiveWell, Charity Navigator, and other independent organizations that assess nonprofit effectiveness and accountability.",
      },
      {
        q: "How do I know my donation is being used responsibly?",
        a: "We conduct regular financial audits, publish transparent annual reports, welcome donor questions, and maintain accountability through board governance and external evaluations.",
      },
    ],
  },
  {
    title: "Getting Help",
    questions: [
      {
        q: "How do I contact Project Water with questions?",
        a: "Visit our contact page to reach our team via email, phone, or contact form. We're happy to answer questions about our work, donations, volunteering, or partnerships.",
      },
      {
        q: "I'm interested in a partnership. Who should I talk to?",
        a: "Contact our partnerships team. We work with corporations, foundations, faith organizations, schools, and other groups. We'll discuss how we can work together.",
      },
      {
        q: "I want to sponsor a specific project. How do I do that?",
        a: "Our sponsorship team can help match you with a community or project. Contact us to explore sponsorship options and learn about communities that need support.",
      },
      {
        q: "Can I get updates about a project I supported?",
        a: "Yes. We send regular updates to supporters about the projects they fund, including photos, impact metrics, and stories from the communities being served.",
      },
    ],
  },
];

export default function FAQPage() {
  return (
    <main className="bg-white text-slate-900">
      {/* Hero Section */}
      <section className="mx-auto max-w-7xl px-6 py-20 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-semibold text-cyan-700">
            Frequently Asked Questions
          </span>
          <h1 className="mt-6 text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
            Questions? We have answers.
          </h1>
          <p className="mt-4 text-lg leading-8 text-slate-600">
            Find answers to common questions about Project Water, our mission, how to support us, and what happens with your gift.
          </p>
        </div>
      </section>

      {/* FAQ Categories */}
      {faqCategories.map((category) => (
        <section key={category.title} className="border-b border-slate-200 py-12 sm:py-16">
          <div className="mx-auto max-w-4xl px-6 sm:px-8">
            <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              {category.title}
            </h2>

            <div className="mt-8 space-y-4">
              {category.questions.map((item, idx) => (
                <details
                  key={idx}
                  className="group rounded-2xl border border-slate-200 bg-white p-6 hover:border-cyan-300 transition"
                >
                  <summary className="flex cursor-pointer items-center justify-between font-semibold text-slate-900">
                    {item.q}
                    <FontAwesomeIcon icon={faChevronDown} className="h-5 w-5 text-slate-400 transition group-open:rotate-180" />
                  </summary>
                  <p className="mt-4 text-slate-600 leading-relaxed">{item.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>
      ))}

      {/* Still have questions */}
      <section className="bg-slate-50 py-20">
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
          <div className="rounded-3xl bg-white p-8 shadow-sm sm:p-12">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="text-3xl font-bold tracking-tight text-slate-900">
                Didn't find your answer?
              </h2>
              <p className="mt-4 text-lg leading-8 text-slate-600">
                Our team is here to help. Reach out with any questions about our work, how to get involved, or how your gift makes a difference.
              </p>

              <div className="mt-8 flex flex-wrap justify-center gap-4">
                <Link
                  href="/contact-us"
                  className="inline-flex items-center rounded-full bg-cyan-500 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400"
                >
                  Contact us
                </Link>
                <Link
                  href="/take-action/learn"
                  className="inline-flex items-center rounded-full border border-slate-300 px-6 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-50"
                >
                  Learn more
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Ready to support */}
      <section className="mx-auto max-w-7xl px-6 py-20 sm:px-8 lg:px-12">
        <div className="overflow-hidden rounded-3xl bg-gradient-to-r from-slate-900 to-slate-800 px-8 py-16 sm:px-12 sm:py-20">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Ready to support clean water access?
            </h2>
            <p className="mt-4 text-lg leading-8 text-slate-200">
              Whether through donations, volunteering, or advocacy, you can be part of bringing lasting water access to communities in need.
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Link
                href="/take-action/donate"
                className="inline-flex items-center rounded-full bg-cyan-500 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400"
              >
                Donate now
              </Link>
              <Link
                href="/volunteer"
                className="inline-flex items-center rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                Volunteer with us
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
