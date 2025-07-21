"use client"

import { Button } from "@/components/ui/button"
import { ArrowLeft, Download } from "lucide-react"
import { useRouter, useParams } from "next/navigation"
import Image from "next/image"

// Define types for thesisData
interface ExecutiveSummary {
  title: string;
  content: string;
}

interface Narrative {
  title: string;
  content: string;
}

interface StructuralObservation {
  title: string;
  observations: {
    title: string;
    content: string;
  }[];
}

interface FundingSignals {
  title: string;
  intro: string;
  wins: string[];
  failures: string[];
  conclusion: string;
}

interface WorkflowFit {
  title: string;
  intro: string;
  table: {
    workflow: string;
    segmentFit: string;
    productFit: string;
    reason: string;
  }[];
  conclusion: string;
}

interface ProductStrategy {
  title: string;
  intro: string;
  table: {
    startingPoint: string;
    expansionPath: string;
    conditions: string;
  }[];
  whatNotToDo: string[];
}

interface SegmentStrategy {
  title: string;
  intro: string;
  segments: {
    name: string;
    description: string;
  }[];
}

interface SalesRealities {
  title: string;
  intro: string;
  keyPoints: string[];
  timelines: {
    segment: string;
    timeline: string;
    note: string;
  }[];
  buyerPersonas: {
    title: string;
    description: string;
  }[];
  conclusion: string;
}

interface Conclusion {
  title: string;
  content: string;
}

interface Contact {
  name: string;
  title: string;
  company: string;
  email: string;
}

interface Sources {
  [index: number]: string;
}

interface ThesisContent {
  executiveSummary?: ExecutiveSummary;
  narrative?: Narrative;
  structuralObservations?: StructuralObservation;
  fundingSignals?: FundingSignals;
  workflowFit?: WorkflowFit;
  productStrategy?: ProductStrategy;
  segmentStrategy?: SegmentStrategy;
  salesRealities?: SalesRealities;
  conclusion?: Conclusion;
  contact?: Contact;
  sources?: Sources;
}

interface ThesisData {
  [key: string]: {
    title: string;
    industry: string;
    publishDate?: string;
    readTime?: string;
    tags?: string[];
    content?: ThesisContent;
  };
}

const thesisData: ThesisData = {
  curenta: {
    title: "InVitro Capital | Industry Thesis: Long-Term Care",
    industry: "Long-Term Care",
    publishDate: "2025-01-01",
    readTime: "25 min read",
    tags: ["Long-Term Care", "Healthcare", "Industry Analysis"],
    content: {
      executiveSummary: {
        title: "I. Executive Summary",
        content: `Long-Term Care (LTC) sits at the intersection of a massive demographic shift and deep operational dysfunction. The aging U.S. population is the obvious macro driver—by 2030, over 20% of Americans will be 65 or older [1], and demand for facility- and home-based care will outpace the system's capacity. But the more compelling opportunity lies beneath the surface: LTC providers still operate with manual workflows, fragmented tooling, and brittle labor models. Staff shortages, regulatory complexity, and increasing acuity have exposed the limitations of legacy systems designed decades ago.

While parts of the industry—especially in SNFs—have seen software adoption, much of the day-to-day operational core remains underserved. Most tooling focuses on documentation or billing. Few products are built for workflows that break down every day: staff coverage, audit readiness, family communication, onboarding, and in-facility coordination.`,
      },
      narrative: {
        title: "II. Narrative: How Operators Actually Buy",
        content: `Carol runs a 90-bed assisted living facility. She manages people, families, regulators, and logistics—all in real time. She's competent, skeptical, and busy.

When software vendors pitch her, they lead with dashboards, analytics, or platforms. Carol nods politely. Then she goes back to her notebook and group text thread—because those still work.

If you want her attention, solve one problem. Today. Help her cover a shift without six texts. Show her what's missing before the inspector does. Let her update a family without logging into something new.

She doesn't want features. She wants fewer fires. And if your product solves one this week, she'll trust you next week. That's how decisions get made in this market: through quiet utility.

Carol isn't unique. Her day reflects the operational reality across most LTC segments. But the challenges—and opportunities—differ by setting.

What follows is a structural breakdown of the major subsegments, their workflow maturity, and where software fits—and doesn't.`,
      },
      structuralObservations: {
        title: "III. Structural Observations in Long Term Care",
        observations: [
          {
            title: "1. SNFs Are the Most Tooled, But Not Fully Solved",
            content: `Skilled Nursing Facilities have high software penetration—EHRs like PointClickCare dominate, and layers like Quick MAR, OnShift, and SmartLinx exist. But many workflows are still partially manual (e.g., training tracking, shift call-offs, incident response). SNFs also have compliance-heavy needs and budget, but they are not greenfield.`,
          },
          {
            title: "2. Assisted Living Facilities (ALFs) Are Mixed",
            content: `Larger ALFs (50+ beds) behave more like SNFs—they have budget, multi-site ownership, and regulatory exposure. But ALFs also span down into fragmented, operator-owned sites with little tooling. Family communication, staff onboarding, and activity scheduling are rarely digitized, even in well-resourced ALFs.`,
          },
          {
            title: "3. Board & Care and Home Health Have High Friction",
            content: `These segments are deeply underserved, often still using binders, texting, and spreadsheets. But they are hard to monetize buyers are price-sensitive, tech-skeptical, and fragmented. This makes them unattractive for standalone software—unless GTM is highly optimized.`,
          },
          {
            title: "4. Hospice Is Separate, but Closely Related to Home Health",
            content: `Hospice care is palliative, often end-of-life, and usually Medicare-funded. It is operationally distinct from home health, which is outcome-driven and rehabilitative. Yet both segments rely heavily on nurse routing, visit tracking, medication coordination, and interdisciplinary documentation. While software adoption is low, trust and emotional stakes are high.`,
          },
          {
            title: "5. Workflow Ownership Is Critical",
            content: `Across segments, the same few personas control key workflows: Executive Directors, DONs, Regional Ops, Admins, and Compliance Officers. The most viable wedges target workflows owned by these buyers—especially ones with urgency and compliance or labor implications.`,
          },
        ],
      },
      fundingSignals: {
        title: "IV. Funding Signals: What's Worked, What Hasn't",
        intro: `LTC software is clearly fundable — capital has flowed across clinical, operational, and engagement categories. But adoption has lagged behind investment. The problem hasn't been demand — it's been fit. The companies that gained real traction focused on urgent, regulated workflows. The ones that stalled misunderstood how fragmented, time-starved, and structurally limited most operators actually are.`,
        wins: [
          "PointClickCare anchored to billing, audits, and compliance. It became essential infrastructure in SNFs and received a minority investment from Hellman & Friedman valuing PCC at ~$4B. [2]",
          "Relias scaled through mandatory training with minimal onboarding friction. It sold for ~$500M. [3]",
          "AlayaCare focused on visit tracking and care routing in home health. It raised $294M and generated an estimated $100M in 2024 revenue. [4]",
          "Axxess, a bootstrapped home health platform, reached ~$525M in revenue without outside capital through a lightweight, self-serve approach. [4]",
          "SmartLinx, ($6M raised, ~$19M revenue) [5] was a success by private equity standards, completing a full PE cycle with Marlin Equity and exiting to Lone View Capital, followed by continued growth through strategic acquisitions.",
        ],
        failures: [
          "Caremerge ($25M raised): Built around family communication and engagement, but failed to tie value to operational outcomes. Quietly acquired by VoiceFriend. [5]",
          "Silversheet ($10M raised): Automated credentialing, but never embedded in daily workflows. Acquired by AMN Healthcare with limited post-acquisition traction. [5]",
          "OnShift ($34M raised) [5]: Scheduling tool that couldn't scale beyond large enterprise SNFs. Sustained operations, but has shown limited evidence of scale, exit, or significant investor returns.",
          'Several bundled "platform" plays ($5–15M raised): Attempted to combine EHR, CRM, and billing but lacked a clear wedge and struggled to implement.',
          "In ALFs and Board & Care, basic scheduling still lives on whiteboards and group texts—despite funding in the category.",
        ],
        conclusion: `The signal is clear: capital has entered, but usage only follows where tools solve something painful, habitual, and owned by someone with decision power. This isn't an underfunded category—it's an under-fit one. The opportunity is wide open for products that start narrow, embed deeply, and grow only after they've earned trust. EHRs may capture documentation, but they leave much of the operational core—shift coverage, audit prep, medication coordination—untouched.`,
      },
      workflowFit: {
        title: "V. Workflow–Segment Fit: Where Software Can Win",
        intro: `Not all workflows are equally urgent, and not all segments are equally ready. The table below maps which day-to-day problems offer strong entry points—and where the segment conditions support adoption.`,
        table: [
          {
            workflow: "Staff Scheduling",
            segmentFit: "ALFs (50+ beds), SNFs",
            productFit: "High",
            reason: "Urgent, daily, and owned by ops; many still use texting or printouts",
          },
          {
            workflow: "Credential Tracking",
            segmentFit: "SNFs, Home Health",
            productFit: "Moderate",
            reason: "Regulated need; tracked manually; valuable for audit prep",
          },
          {
            workflow: "Family Communication",
            segmentFit: "ALFs, Board & Care",
            productFit: "Mixed",
            reason: "High emotional value; ignored unless deeply embedded in workflows",
          },
          {
            workflow: "Survey Readiness",
            segmentFit: "SNFs, ALFs",
            productFit: "High",
            reason: "Compliance-driven; prep is manual, fragmented, and high-risk",
          },
          {
            workflow: "Medication Coordination",
            segmentFit: "Home Health, Hospice",
            productFit: "High",
            reason: "Fragmented across fax, phone, and EMR; errors are costly and workflows are fragile",
          },
          {
            workflow: "Activity Management",
            segmentFit: "ALFs",
            productFit: "Low",
            reason: "Nice-to-have; lacks urgency or budget",
          },
          {
            workflow: "Billing / EHR",
            segmentFit: "SNFs, ALFs",
            productFit: "Moderate",
            reason: "Dominated by incumbents; difficult to replace, but extensions are viable",
          },
        ],
        conclusion: `In some cases, the best entry point isn't pure software — it's operational execution wrapped in tech. Tools that layer into daily routines without adding load—and help operators act, not just record—are the ones that earn usage. Think shift coverage tools that actually fill the gap, not just display it. These models earn trust by directly solving high-friction workflows. Over time, they create credibility that supports horizontal expansion into adjacent areas like credentialing, scheduling, or compliance. It's a harder business to run, but a much stickier one.`,
      },
      productStrategy: {
        title: "VI. Product Strategy: From Entry Point to Expansion",
        intro: `Once a product earns daily use in a critical workflow, it creates surface area for expansion. But not all wedges lead naturally to depth—and not all buyers welcome complexity. Expansion must feel like an extension of what already works, not a shift in posture.`,
        table: [
          {
            startingPoint: "Scheduling",
            expansionPath: "HRIS, agency management, payroll",
            conditions: "Must be SMS-native, low-friction, and require zero training",
          },
          {
            startingPoint: "Compliance",
            expansionPath: "PolicyOps, credentialing, audit tools",
            conditions: "Must align with survey timelines and staff routines",
          },
          {
            startingPoint: "Family Communication",
            expansionPath: "Intake, satisfaction analytics",
            conditions: "Must integrate with incident logs or staffing visibility",
          },
          {
            startingPoint: "Medication Coordination",
            expansionPath: "Fulfillment, inventory, staff training",
            conditions: "Must slot cleanly into existing clinical documentation and routing",
          },
        ],
        whatNotToDo: [
          'Don&apos;t oversell platform ambition. Operators pay to fix urgent problems—not to adopt &quot;solutions.&quot;',
          "Don&apos;t treat ops teams like software admins. They want fewer calls, fewer citations, and fewer surprises.",
          "Don&apos;t assume integration is a selling point. Many prefer standalone tools that work from day one.",
          "Don&apos;t confuse emotional value with ROI. Products must save time, reduce errors, or ensure compliance—or they won&apos;t get used.",
        ],
      },
      segmentStrategy: {
        title: "VII. Segment Strategy and Targeting Framework",
        intro: `Even great products stall when pointed at the wrong market. Here's how the segments differ—and what that means for strategy:`,
        segments: [
          {
            name: "Enterprise (SNFs, larger ALFs)",
            description:
              "Real budget and structure. Tooling must layer well with legacy systems and deliver ops ROI. Prioritize once you have references and a working wedge. Expect long cycles.",
          },
          {
            name: "Mid-Market (50–100 bed ALFs, regional home health/hospice groups)",
            description:
              "Underserved but with identifiable pain. Likely best fit for wedge products that scale. Best launchpad: balance of pain, budget, and responsiveness.",
          },
          {
            name: "Long Tail (Board & Care, single-site ALFs)",
            description:
              "Deepest whitespace but lowest monetization. Useful for testing, less viable for scaling. Avoid unless GTM is automated.",
          },
          {
            name: "Home Health & Hospice",
            description:
              "High workflow complexity, reimbursement constraints. Require integrated, lightweight solutions for meds, compliance, and staff. Requires deep domain empathy and trust-building.",
          },
        ],
      },
      salesRealities: {
        title: "VIII. Sales Realities and GTM Implications",
        intro: `LTC operators—particularly mid-market and enterprise—often have slow and relationship-driven sales cycles. Purchase decisions are commonly made by a small group of operational leaders, not centralized IT teams. This means:`,
        keyPoints: [
          "Buyers need to see impact quickly, often within 30–60 days of use.",
          "Referenceability and word-of-mouth matter more than scaled outbound.",
          "Pilots should demonstrate real-world workflow improvements, not just feature sets.",
        ],
        timelines: [
          {
            segment: "Board & Care and small ALFs",
            timeline: "1–3 weeks",
            note: "but often lack budget or formal processes.",
          },
          {
            segment: "Mid-size ALFs and regional home health groups",
            timeline: "1–2 months",
            note: "if the ROI case is clear and champions are engaged.",
          },
          {
            segment: "Enterprise SNFs or multi-site ALF chains",
            timeline: "3–6 months or more",
            note: "with layered approvals, procurement, and legal review.",
          },
        ],
        buyerPersonas: [
          {
            title: "Executive Director (ED)",
            description:
              "Often the final decision-maker in ALFs and SNFs; highly motivated by audit success, staffing stability, and family satisfaction.",
          },
          {
            title: "Director of Nursing (DON)",
            description:
              "Workflow owner for staff scheduling, compliance, training. Pain is acute, but authority varies by org.",
          },
          {
            title: "Regional Operations Lead",
            description:
              "Especially influential in chains; cares about repeatability, visibility, and roll-out simplicity across facilities.",
          },
          {
            title: "Administrator / Office Manager",
            description:
              "Manages day-to-day coordination, staffing gaps, family touchpoints—often a key internal advocate for wedge tools.",
          },
          {
            title: "IT / Compliance Lead (if any)",
            description:
              "Usually passive in purchase but active in approvals for enterprise deals. Wants low-risk, minimal integration solutions.",
          },
        ],
        conclusion: `This landscape favors vendors who start narrow and operational, then expand horizontally. Speed to trust—not breadth of functionality—is what moves deals forward.`,
      },
      conclusion: {
        title: "X. Conclusion: LTC as an Infrastructure Opportunity",
        content: `This market is not just large — it is unprotected. The need is not for another EHR, but for infrastructure: the quiet, operational layer that keeps staff on shift, families informed, meds delivered, and regulators satisfied.

That infrastructure will not look like traditional software. It will be workflow-native, mobile-aligned, built to disappear into operations. And it will win not by selling dashboards, but by earning trust through daily use.

We aren't betting on digitizing LTC. We're betting on operators who desperately want to run smoother—and the tools that will let them.`,
      },
      contact: {
        name: "Jonathan Schroeder",
        title: "Director of Investments",
        company: "InVitro Capital",
        email: "jonathan.schroeder@invitrocapital.com",
      },
      sources: [
        "U.S. Census Bureau. National Population Projections Tables. U.S. Census Bureau Data, 2023",
        "Betakit. PointClickCare reportedly valued at $4 billion USD following new minority investment. Betakit, 2021.",
        "PitchBook. LLR Partners to Sell Relias Learning to Bertelsmann. PitchBook Newsletter, Inc., 2014.",
        "Pitchbook. Companies Profiles. Pitchbook, 2025.",
        "Crunchbase. Organizations Financial Details. Crunchbase, 2025.",
      ],
    },
  },
  "long-term-care": {
    title: "Industry Thesis: Long Term Care",
    industry: "Long Term Care",
    publishDate: "2025-01-01",
    readTime: "25 min read",
    tags: ["Long Term Care", "Healthcare", "Industry Analysis"],
    content: {
      executiveSummary: {
        title: "I. Executive Summary",
        content: `Long-Term Care (LTC) sits at the intersection of a massive demographic shift and deep operational dysfunction. The aging U.S. population is the obvious macro driver—by 2030, over 20% of Americans will be 65 or older [1], and demand for facility- and home-based care will outpace the system's capacity. But the more compelling opportunity lies beneath the surface: LTC providers still operate with manual workflows, fragmented tooling, and brittle labor models. Staff shortages, regulatory complexity, and increasing acuity have exposed the limitations of legacy systems designed decades ago.

While parts of the industry—especially in SNFs—have seen software adoption, much of the day-to-day operational core remains underserved. Most tooling focuses on documentation or billing. Few products are built for workflows that break down every day: staff coverage, audit readiness, family communication, onboarding, and in-facility coordination.`,
      },
      narrative: {
        title: "II. Narrative: How Operators Actually Buy",
        content: `Carol runs a 90-bed assisted living facility. She manages people, families, regulators, and logistics—all in real time. She's competent, skeptical, and busy.

When software vendors pitch her, they lead with dashboards, analytics, or platforms. Carol nods politely. Then she goes back to her notebook and group text thread—because those still work.

If you want her attention, solve one problem. Today. Help her cover a shift without six texts. Show her what's missing before the inspector does. Let her update a family without logging into something new.

She doesn't want features. She wants fewer fires. And if your product solves one this week, she'll trust you next week. That's how decisions get made in this market: through quiet utility.

Carol isn't unique. Her day reflects the operational reality across most LTC segments. But the challenges—and opportunities—differ by setting.

What follows is a structural breakdown of the major subsegments, their workflow maturity, and where software fits—and doesn't.`,
      },
      structuralObservations: {
        title: "III. Structural Observations in Long Term Care",
        observations: [
          {
            title: "1. SNFs Are the Most Tooled, But Not Fully Solved",
            content: `Skilled Nursing Facilities have high software penetration—EHRs like PointClickCare dominate, and layers like Quick MAR, OnShift, and SmartLinx exist. But many workflows are still partially manual (e.g., training tracking, shift call-offs, incident response). SNFs also have compliance-heavy needs and budget, but they are not greenfield.`,
          },
          {
            title: "2. Assisted Living Facilities (ALFs) Are Mixed",
            content: `Larger ALFs (50+ beds) behave more like SNFs—they have budget, multi-site ownership, and regulatory exposure. But ALFs also span down into fragmented, operator-owned sites with little tooling. Family communication, staff onboarding, and activity scheduling are rarely digitized, even in well-resourced ALFs.`,
          },
          {
            title: "3. Board & Care and Home Health Have High Friction",
            content: `These segments are deeply underserved, often still using binders, texting, and spreadsheets. But they are hard to monetize buyers are price-sensitive, tech-skeptical, and fragmented. This makes them unattractive for standalone software—unless GTM is highly optimized.`,
          },
          {
            title: "4. Hospice Is Separate, but Closely Related to Home Health",
            content: `Hospice care is palliative, often end-of-life, and usually Medicare-funded. It is operationally distinct from home health, which is outcome-driven and rehabilitative. Yet both segments rely heavily on nurse routing, visit tracking, medication coordination, and interdisciplinary documentation. While software adoption is low, trust and emotional stakes are high.`,
          },
          {
            title: "5. Workflow Ownership Is Critical",
            content: `Across segments, the same few personas control key workflows: Executive Directors, DONs, Regional Ops, Admins, and Compliance Officers. The most viable wedges target workflows owned by these buyers—especially ones with urgency and compliance or labor implications.`,
          },
        ],
      },
      fundingSignals: {
        title: "IV. Funding Signals: What's Worked, What Hasn't",
        intro: `LTC software is clearly fundable — capital has flowed across clinical, operational, and engagement categories. But adoption has lagged behind investment. The problem hasn't been demand — it's been fit. The companies that gained real traction focused on urgent, regulated workflows. The ones that stalled misunderstood how fragmented, time-starved, and structurally limited most operators actually are.`,
        wins: [
          "PointClickCare anchored to billing, audits, and compliance. It became essential infrastructure in SNFs and received a minority investment from Hellman & Friedman valuing PCC at ~$4B. [2]",
          "Relias scaled through mandatory training with minimal onboarding friction. It sold for ~$500M. [3]",
          "AlayaCare focused on visit tracking and care routing in home health. It raised $294M and generated an estimated $100M in 2024 revenue. [4]",
          "Axxess, a bootstrapped home health platform, reached ~$525M in revenue without outside capital through a lightweight, self-serve approach. [4]",
          "SmartLinx, ($6M raised, ~$19M revenue) [5] was a success by private equity standards, completing a full PE cycle with Marlin Equity and exiting to Lone View Capital, followed by continued growth through strategic acquisitions.",
        ],
        failures: [
          "Caremerge ($25M raised): Built around family communication and engagement, but failed to tie value to operational outcomes. Quietly acquired by VoiceFriend. [5]",
          "Silversheet ($10M raised): Automated credentialing, but never embedded in daily workflows. Acquired by AMN Healthcare with limited post-acquisition traction. [5]",
          "OnShift ($34M raised) [5]: Scheduling tool that couldn't scale beyond large enterprise SNFs. Sustained operations, but has shown limited evidence of scale, exit, or significant investor returns.",
          'Several bundled "platform" plays ($5–15M raised): Attempted to combine EHR, CRM, and billing but lacked a clear wedge and struggled to implement.',
          "In ALFs and Board & Care, basic scheduling still lives on whiteboards and group texts—despite funding in the category.",
        ],
        conclusion: `The signal is clear: capital has entered, but usage only follows where tools solve something painful, habitual, and owned by someone with decision power. This isn't an underfunded category—it's an under-fit one. The opportunity is wide open for products that start narrow, embed deeply, and grow only after they've earned trust. EHRs may capture documentation, but they leave much of the operational core—shift coverage, audit prep, medication coordination—untouched.`,
      },
      workflowFit: {
        title: "V. Workflow–Segment Fit: Where Software Can Win",
        intro: `Not all workflows are equally urgent, and not all segments are equally ready. The table below maps which day-to-day problems offer strong entry points—and where the segment conditions support adoption.`,
        table: [
          {
            workflow: "Staff Scheduling",
            segmentFit: "ALFs (50+ beds), SNFs",
            productFit: "High",
            reason: "Urgent, daily, and owned by ops; many still use texting or printouts",
          },
          {
            workflow: "Credential Tracking",
            segmentFit: "SNFs, Home Health",
            productFit: "Moderate",
            reason: "Regulated need; tracked manually; valuable for audit prep",
          },
          {
            workflow: "Family Communication",
            segmentFit: "ALFs, Board & Care",
            productFit: "Mixed",
            reason: "High emotional value; ignored unless deeply embedded in workflows",
          },
          {
            workflow: "Survey Readiness",
            segmentFit: "SNFs, ALFs",
            productFit: "High",
            reason: "Compliance-driven; prep is manual, fragmented, and high-risk",
          },
          {
            workflow: "Medication Coordination",
            segmentFit: "Home Health, Hospice",
            productFit: "High",
            reason: "Fragmented across fax, phone, and EMR; errors are costly and workflows are fragile",
          },
          {
            workflow: "Activity Management",
            segmentFit: "ALFs",
            productFit: "Low",
            reason: "Nice-to-have; lacks urgency or budget",
          },
          {
            workflow: "Billing / EHR",
            segmentFit: "SNFs, ALFs",
            productFit: "Moderate",
            reason: "Dominated by incumbents; difficult to replace, but extensions are viable",
          },
        ],
        conclusion: `In some cases, the best entry point isn't pure software — it's operational execution wrapped in tech. Tools that layer into daily routines without adding load—and help operators act, not just record—are the ones that earn usage. Think shift coverage tools that actually fill the gap, not just display it. These models earn trust by directly solving high-friction workflows. Over time, they create credibility that supports horizontal expansion into adjacent areas like credentialing, scheduling, or compliance. It's a harder business to run, but a much stickier one.`,
      },
      productStrategy: {
        title: "VI. Product Strategy: From Entry Point to Expansion",
        intro: `Once a product earns daily use in a critical workflow, it creates surface area for expansion. But not all wedges lead naturally to depth—and not all buyers welcome complexity. Expansion must feel like an extension of what already works, not a shift in posture.`,
        table: [
          {
            startingPoint: "Scheduling",
            expansionPath: "HRIS, agency management, payroll",
            conditions: "Must be SMS-native, low-friction, and require zero training",
          },
          {
            startingPoint: "Compliance",
            expansionPath: "PolicyOps, credentialing, audit tools",
            conditions: "Must align with survey timelines and staff routines",
          },
          {
            startingPoint: "Family Communication",
            expansionPath: "Intake, satisfaction analytics",
            conditions: "Must integrate with incident logs or staffing visibility",
          },
          {
            startingPoint: "Medication Coordination",
            expansionPath: "Fulfillment, inventory, staff training",
            conditions: "Must slot cleanly into existing clinical documentation and routing",
          },
        ],
        whatNotToDo: [
          'Don&apos;t oversell platform ambition. Operators pay to fix urgent problems—not to adopt &quot;solutions.&quot;',
          "Don&apos;t treat ops teams like software admins. They want fewer calls, fewer citations, and fewer surprises.",
          "Don&apos;t assume integration is a selling point. Many prefer standalone tools that work from day one.",
          "Don&apos;t confuse emotional value with ROI. Products must save time, reduce errors, or ensure compliance—or they won&apos;t get used.",
        ],
      },
      segmentStrategy: {
        title: "VII. Segment Strategy and Targeting Framework",
        intro: `Even great products stall when pointed at the wrong market. Here's how the segments differ—and what that means for strategy:`,
        segments: [
          {
            name: "Enterprise (SNFs, larger ALFs)",
            description:
              "Real budget and structure. Tooling must layer well with legacy systems and deliver ops ROI. Prioritize once you have references and a working wedge. Expect long cycles.",
          },
          {
            name: "Mid-Market (50–100 bed ALFs, regional home health/hospice groups)",
            description:
              "Underserved but with identifiable pain. Likely best fit for wedge products that scale. Best launchpad: balance of pain, budget, and responsiveness.",
          },
          {
            name: "Long Tail (Board & Care, single-site ALFs)",
            description:
              "Deepest whitespace but lowest monetization. Useful for testing, less viable for scaling. Avoid unless GTM is automated.",
          },
          {
            name: "Home Health & Hospice",
            description:
              "High workflow complexity, reimbursement constraints. Require integrated, lightweight solutions for meds, compliance, and staff. Requires deep domain empathy and trust-building.",
          },
        ],
      },
      salesRealities: {
        title: "VIII. Sales Realities and GTM Implications",
        intro: `LTC operators—particularly mid-market and enterprise—often have slow and relationship-driven sales cycles. Purchase decisions are commonly made by a small group of operational leaders, not centralized IT teams. This means:`,
        keyPoints: [
          "Buyers need to see impact quickly, often within 30–60 days of use.",
          "Referenceability and word-of-mouth matter more than scaled outbound.",
          "Pilots should demonstrate real-world workflow improvements, not just feature sets.",
        ],
        timelines: [
          {
            segment: "Board & Care and small ALFs",
            timeline: "1–3 weeks",
            note: "but often lack budget or formal processes.",
          },
          {
            segment: "Mid-size ALFs and regional home health groups",
            timeline: "1–2 months",
            note: "if the ROI case is clear and champions are engaged.",
          },
          {
            segment: "Enterprise SNFs or multi-site ALF chains",
            timeline: "3–6 months or more",
            note: "with layered approvals, procurement, and legal review.",
          },
        ],
        buyerPersonas: [
          {
            title: "Executive Director (ED)",
            description:
              "Often the final decision-maker in ALFs and SNFs; highly motivated by audit success, staffing stability, and family satisfaction.",
          },
          {
            title: "Director of Nursing (DON)",
            description:
              "Workflow owner for staff scheduling, compliance, training. Pain is acute, but authority varies by org.",
          },
          {
            title: "Regional Operations Lead",
            description:
              "Especially influential in chains; cares about repeatability, visibility, and roll-out simplicity across facilities.",
          },
          {
            title: "Administrator / Office Manager",
            description:
              "Manages day-to-day coordination, staffing gaps, family touchpoints—often a key internal advocate for wedge tools.",
          },
          {
            title: "IT / Compliance Lead (if any)",
            description:
              "Usually passive in purchase but active in approvals for enterprise deals. Wants low-risk, minimal integration solutions.",
          },
        ],
        conclusion: `This landscape favors vendors who start narrow and operational, then expand horizontally. Speed to trust—not breadth of functionality—is what moves deals forward.`,
      },
      conclusion: {
        title: "X. Conclusion: LTC as an Infrastructure Opportunity",
        content: `This market is not just large — it is unprotected. The need is not for another EHR, but for infrastructure: the quiet, operational layer that keeps staff on shift, families informed, meds delivered, and regulators satisfied.

That infrastructure will not look like traditional software. It will be workflow-native, mobile-aligned, built to disappear into operations. And it will win not by selling dashboards, but by earning trust through daily use.

We aren't betting on digitizing LTC. We're betting on operators who desperately want to run smoother—and the tools that will let them.`,
      },
      contact: {
        name: "Jonathan Schroeder",
        title: "Director of Investments",
        company: "InVitro Capital",
        email: "jonathan.schroeder@invitrocapital.com",
      },
      sources: [
        "U.S. Census Bureau. National Population Projections Tables. U.S. Census Bureau Data, 2023",
        "Betakit. PointClickCare reportedly valued at $4 billion USD following new minority investment. Betakit, 2021.",
        "PitchBook. LLR Partners to Sell Relias Learning to Bertelsmann. PitchBook Newsletter, Inc., 2014.",
        "Pitchbook. Companies Profiles. Pitchbook, 2025.",
        "Crunchbase. Organizations Financial Details. Crunchbase, 2025.",
      ],
    },
  },
  // Keep existing allrx data as fallback
  allrx: {
    title: "Digital Health Industry Thesis",
    industry: "Pharmacy Operations",
  },
}

export default function IndustryThesis() {
  const router = useRouter()
  const params = useParams()
  const dealId = params.dealId as string
  const thesis = thesisData[dealId] || thesisData.allrx

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="max-w-5xl mx-auto px-8 py-12">
        <div className="flex items-center justify-between mb-8">
          <Button
            variant="outline"
            onClick={() => router.back()}
            className="border-[hsl(212,74%,15%)] text-[hsl(212,74%,15%)] rounded-full px-5 py-2 text-sm font-medium hover:bg-[hsl(212,74%,97%)] hover:text-[hsl(212,74%,20%)] transition"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Deals
          </Button>
          <div className="flex-1 flex justify-center">
            <Image src="/logo.png" alt="InVitro Capital Logo" width={180} height={48} priority />
          </div>
          <Button className="bg-white text-[hsl(212,74%,15%)] border border-[hsl(212,74%,15%)] hover:bg-[hsl(212,74%,97%)] hover:text-[hsl(212,74%,20%)] ml-4">
            <Download className="w-4 h-4 mr-2" />
            Download PDF
          </Button>
        </div>
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">{thesis.title}</h1>
        </div>

        {thesis.content ? (
          <div className="space-y-12">
            {/* Executive Summary */}
            <section>
              <h2 className="text-2xl font-bold text-muted-foreground mb-6 border-b-2 border-accent pb-2">
                {thesis.content.executiveSummary?.title}
              </h2>
              <p className="text-muted-foreground leading-relaxed text-base">{thesis.content.executiveSummary?.content}</p>
            </section>

            {/* Narrative */}
            <section>
              <h2 className="text-2xl font-bold text-muted-foreground mb-6 border-b-2 border-accent pb-2">
                {thesis.content.narrative?.title}
              </h2>
              <div className="text-muted-foreground leading-relaxed text-base whitespace-pre-line">
                {thesis.content.narrative?.content}
              </div>
            </section>

            {/* Structural Observations */}
            <section>
              <h2 className="text-2xl font-bold text-muted-foreground mb-6 border-b-2 border-accent pb-2">
                {thesis.content.structuralObservations?.title}
              </h2>
              <div className="space-y-4">
                {thesis.content.structuralObservations?.observations?.map((obs: { title: string; content: string }, index: number) => (
                  <div
                    key={index}
                    className={`p-6 rounded-lg border-l-4 ${
                      index % 2 === 0
                        ? 'bg-gray-50 border-accent/80'
                        : 'bg-gray-100 border-accent'
                    }`}
                  >
                    <h3 className="text-lg font-semibold text-foreground mb-3">{obs.title}</h3>
                    <p className="text-muted-foreground leading-relaxed text-base">{obs.content}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Funding Signals */}
            <section>
              <h2 className="text-2xl font-bold text-muted-foreground mb-6 border-b-2 border-accent pb-2">
                {thesis.content.fundingSignals?.title}
              </h2>
              <p className="text-muted-foreground leading-relaxed text-base mb-8">{thesis.content.fundingSignals?.intro}</p>

              <div className="mb-8">
                <h3 className="text-lg font-semibold text-green-700 mb-4">The wins are clear:</h3>
                <ul className="space-y-3">
                  {thesis.content.fundingSignals?.wins?.map((win: string, index: number) => (
                    <li key={index} className="flex items-start">
                      <div className="w-2 h-2 bg-green-600 rounded-full mt-2 mr-4 flex-shrink-0"></div>
                      <span className="text-muted-foreground text-base">{win}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mb-8">
                <h3 className="text-lg font-semibold text-red-700 mb-4">Others didn&apos;t convert:</h3>
                <ul className="space-y-3">
                  {thesis.content.fundingSignals?.failures?.map((failure: string, index: number) => (
                    <li key={index} className="flex items-start">
                      <div className="w-2 h-2 bg-red-600 rounded-full mt-2 mr-4 flex-shrink-0"></div>
                      <span className="text-muted-foreground text-base">{failure}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-gray-100 p-6 rounded-lg">
                <p className="text-accent-foreground leading-relaxed text-base">{thesis.content.fundingSignals?.conclusion}</p>
              </div>
            </section>

            {/* Workflow-Segment Fit */}
            <section>
              <h2 className="text-2xl font-bold text-muted-foreground mb-6 border-b-2 border-accent pb-2">
                {thesis.content.workflowFit?.title}
              </h2>
              <p className="text-muted-foreground leading-relaxed text-base mb-8">{thesis.content.workflowFit?.intro}</p>

              <div className="overflow-x-auto mb-8">
                <table className="w-full border-collapse border border-border">
                  <thead>
                    <tr className="bg-muted">
                      <th className="border border-border px-4 py-3 text-left font-semibold text-foreground text-base">
                        Workflow
                      </th>
                      <th className="border border-border px-4 py-3 text-left font-semibold text-foreground text-base">
                        Segment Fit
                      </th>
                      <th className="border border-border px-4 py-3 text-left font-semibold text-foreground text-base">
                        Product Fit
                      </th>
                      <th className="border border-border px-4 py-3 text-left font-semibold text-foreground text-base">
                        Why It Works / Doesn&apos;t
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {thesis.content.workflowFit?.table?.map((row: { workflow: string; segmentFit: string; productFit: string; reason: string }, index: number) => (
                      <tr key={index} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                        <td className="border border-border px-4 py-3 font-medium text-foreground text-base">{row.workflow}</td>
                        <td className="border border-border px-4 py-3 text-muted-foreground text-base">{row.segmentFit}</td>
                        <td className="border border-border px-4 py-3">
                          <span
                            className={`px-2 py-1 rounded text-sm font-medium ${
                              row.productFit === "High"
                                ? "bg-green-100 text-green-800"
                                : row.productFit === "Moderate"
                                  ? "bg-yellow-100 text-yellow-800"
                                  : row.productFit === "Mixed"
                                    ? "bg-orange-100 text-orange-800"
                                    : "bg-red-100 text-red-800"
                            }`}
                          >
                            {row.productFit}
                          </span>
                        </td>
                        <td className="border border-border px-4 py-3 text-muted-foreground text-base">{row.reason}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="bg-gray-100 p-6 rounded-lg">
                <p className="text-accent-foreground leading-relaxed text-base">{thesis.content.workflowFit?.conclusion}</p>
              </div>
            </section>

            {/* Product Strategy */}
            <section>
              <h2 className="text-2xl font-bold text-muted-foreground mb-6 border-b-2 border-accent pb-2">
                {thesis.content.productStrategy?.title}
              </h2>
              <p className="text-muted-foreground leading-relaxed text-base mb-8">{thesis.content.productStrategy?.intro}</p>

              <div className="overflow-x-auto mb-8">
                <table className="w-full border-collapse border border-border">
                  <thead>
                    <tr className="bg-muted">
                      <th className="border border-border px-4 py-3 text-left font-semibold text-foreground text-base">
                        Starting Point
                      </th>
                      <th className="border border-border px-4 py-3 text-left font-semibold text-foreground text-base">
                        Expansion Path
                      </th>
                      <th className="border border-border px-4 py-3 text-left font-semibold text-foreground text-base">
                        Conditions for Success
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {thesis.content.productStrategy?.table?.map((row: { startingPoint: string; expansionPath: string; conditions: string }, index: number) => (
                      <tr key={index} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                        <td className="border border-border px-4 py-3 font-medium text-foreground text-base">
                          {row.startingPoint}
                        </td>
                        <td className="border border-border px-4 py-3 text-muted-foreground text-base">{row.expansionPath}</td>
                        <td className="border border-border px-4 py-3 text-muted-foreground text-base">{row.conditions}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-red-700 mb-4">What Not to Do:</h3>
                <ul className="space-y-3">
                  {thesis.content.productStrategy?.whatNotToDo?.map((item: string, index: number) => (
                    <li key={index} className="flex items-start">
                      <div className="w-2 h-2 bg-red-600 rounded-full mt-2 mr-4 flex-shrink-0"></div>
                      <span className="text-muted-foreground text-base">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </section>

            {/* Segment Strategy */}
            <section>
              <h2 className="text-2xl font-bold text-muted-foreground mb-6 border-b-2 border-accent pb-2">
                {thesis.content.segmentStrategy?.title}
              </h2>
              <p className="text-muted-foreground leading-relaxed text-base mb-6">{thesis.content.segmentStrategy?.intro}</p>

              <div className="space-y-2">
                {thesis.content.segmentStrategy?.segments?.map((segment: { name: string; description: string }, index: number) => (
                  <div key={index} className="bg-gray-50 border border-accent/20 rounded-lg px-4 py-2">
                    <h3 className="text-base font-semibold text-foreground mb-1">{segment.name}</h3>
                    <p className="text-muted-foreground text-base leading-relaxed mb-0">{segment.description}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Sales Realities */}
            <section>
              <h2 className="text-2xl font-bold text-muted-foreground mb-6 border-b-2 border-accent pb-2">
                {thesis.content.salesRealities?.title}
              </h2>
              <p className="text-muted-foreground leading-relaxed text-base mb-6">{thesis.content.salesRealities?.intro}</p>

              <ul className="list-disc pl-6 space-y-2 mb-8">
                {thesis.content.salesRealities?.keyPoints?.map((point: string, index: number) => (
                  <li key={index} className="text-muted-foreground text-base leading-relaxed">
                    {point}
                  </li>
                ))}
              </ul>

              <div className="mb-8">
                <h3 className="text-lg font-semibold text-foreground mb-4">Sales timelines vary by segment:</h3>
                <div className="space-y-2">
                  {thesis.content.salesRealities?.timelines?.map((timeline: { segment: string; timeline: string; note: string }, index: number) => (
                    <div key={index} className="flex items-start bg-gray-50 border border-accent/20 rounded-lg px-4 py-2">
                      <div className="flex-1 font-medium text-foreground text-base">
                        {timeline.segment}
                        <div className="text-sm text-muted-foreground mt-1">{timeline.note}</div>
                      </div>
                      <div className="ml-4 font-bold text-accent text-base whitespace-nowrap flex items-center">{timeline.timeline}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mb-8">
                <h3 className="text-lg font-semibold text-foreground mb-4">Key buyer personas across segments:</h3>
                <div className="space-y-2">
                  {thesis.content.salesRealities?.buyerPersonas?.map((persona: { title: string; description: string }, index: number) => (
                    <div key={index} className="bg-gray-50 border border-accent/20 rounded-lg px-4 py-2">
                      <div className="font-semibold text-foreground text-base">{persona.title}</div>
                      <div className="text-sm text-muted-foreground mb-1">{persona.description}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-gray-100 p-6 rounded-lg">
                <p className="text-accent-foreground leading-relaxed text-base">{thesis.content.salesRealities?.conclusion}</p>
              </div>
            </section>

            {/* Conclusion */}
            <section>
              <h2 className="text-2xl font-bold text-muted-foreground mb-6 border-b-2 border-accent pb-2">
                {thesis.content.conclusion?.title}
              </h2>
              <div className="bg-yellow-50 p-8 rounded-lg">
                <div className="text-muted-foreground leading-relaxed text-base whitespace-pre-line">
                  {thesis.content.conclusion?.content}
                </div>
              </div>
            </section>

            {/* Contact */}
            <section className="bg-gray-100 p-8 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                For inquiries, detailed materials, or follow-up discussions, please contact:
              </h3>
              <div className="text-gray-700">
                <p className="font-medium">{thesis.content.contact?.name}</p>
                <p>{thesis.content.contact?.title}</p>
                <p>{thesis.content.contact?.company}</p>
                <p className="text-blue-600">{thesis.content.contact?.email}</p>
              </div>
            </section>

            {/* Sources */}
            <section>
              <h2 className="text-2xl font-bold text-muted-foreground mb-6 border-b-2 border-accent pb-2">Sources</h2>
              <div className="space-y-2">
                {Array.isArray(thesis.content.sources) ? thesis.content.sources.map((source: string, index: number) => (
                  <p key={index} className="text-sm text-muted-foreground">
                    [{index + 1}] {source}
                  </p>
                )) : null}
              </div>
            </section>
          </div>
        ) : (
          <div className="text-center">
            <h1 className="text-2xl font-bold text-foreground mb-4">Thesis Not Found</h1>
            <p className="text-muted-foreground">The requested thesis could not be found.</p>
          </div>
        )}
      </div>
    </div>
  )
} 