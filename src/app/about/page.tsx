import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import TrackPageView from "@/components/TrackPageView";
import { values } from "@/data/about";
import { services, buildWhatsAppLink } from "@/data/site";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "KIA-Start Up Consult helps people in Ghana navigate international career, education and travel opportunities with practical, honest guidance.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <>
      <TrackPageView eventName="about_view" />

      <PageHero
        kicker="About"
        title="Who we are."
        description="KIA-Start Up Consult is a Ghanaian company helping people navigate international career, education and travel opportunities — with guidance built on the same practical, structured thinking behind our work in business development and financial advisory."
        secondaryCta={{
          label: "Talk to Our Team",
          href: buildWhatsAppLink("Hi, I'd like to know more about KIA-Start Up Consult."),
          external: true,
        }}
      />

      <section className="mx-auto max-w-6xl px-5 py-16 sm:px-8 lg:py-20">
        <h2 className="font-display text-2xl text-ink sm:text-3xl">What we do</h2>
        <p className="mt-3 max-w-2xl text-sm text-charcoal-soft">
          We help people move forward on international goals across five areas.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          {services.map((service) => (
            <Link
              key={service.slug}
              href={service.href}
              className="focus-ring rounded-sm border border-line bg-white px-4 py-2 text-sm text-ink transition-colors hover:border-ink"
            >
              {service.title}
            </Link>
          ))}
        </div>
      </section>

      <section id="approach" className="border-y border-line bg-white scroll-mt-20">
        <div className="mx-auto max-w-3xl px-5 py-16 sm:px-8 lg:py-20">
          <h2 className="font-display text-2xl text-ink sm:text-3xl">Our approach</h2>
          <p className="mt-4 text-base leading-relaxed text-charcoal-soft">
            We start with your goal, not a script. Every service begins with a real conversation
            about where you&rsquo;re trying to go, followed by honest guidance on what it actually
            takes to get there — the requirements, the timeline, and the parts that are outside
            our control.
          </p>
        </div>
      </section>

      <section id="values" className="mx-auto max-w-6xl px-5 py-16 sm:px-8 lg:py-20 scroll-mt-20">
        <h2 className="font-display text-2xl text-ink sm:text-3xl">Our values</h2>
        <div className="mt-10 grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2">
          {values.map((value) => (
            <div key={value.title} className="border-l-2 border-gold-deep pl-5">
              <h3 className="font-display text-lg text-ink">{value.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-charcoal-soft">{value.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-ink text-white">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-10 px-5 py-16 sm:grid-cols-2 sm:px-8 lg:py-20">
          <div>
            <h2 className="font-display text-xl text-gold-light">Our vision</h2>
            <p className="mt-3 text-sm leading-relaxed text-white/80">
              To be a trusted partner for people in Ghana pursuing opportunity beyond its borders.
            </p>
          </div>
          <div>
            <h2 className="font-display text-xl text-gold-light">Our mission</h2>
            <p className="mt-3 text-sm leading-relaxed text-white/80">
              To make working, studying and travelling abroad clear, honest and manageable — one
              conversation at a time.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
