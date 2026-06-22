export interface SiteConfig {
  language: string
  siteTitle: string
  siteDescription: string
}

export interface NavigationLink {
  label: string
  target: string
}

export interface NavigationConfig {
  brandName: string
  links: NavigationLink[]
}

export interface HeroConfig {
  videoPath: string
  eyebrow: string
  titleLine: string
  titleEmphasis: string
  subtitleLine1: string
  subtitleLine2: string
  ctaText: string
  ctaTargetId: string
  secondaryCtaText: string
  secondaryCtaTargetId: string
}

export interface StatItem {
  value: string
  label: string
  suffix?: string
}

export interface StatsConfig {
  items: StatItem[]
}

export interface ManifestoConfig {
  sectionLabel: string
  text: string
  subtext?: string
}

export interface AnatomyPillar {
  label: string
  title: string
  body: string
  highlights?: string[]
}

export interface AnatomyConfig {
  sectionLabel: string
  title: string
  subtitle?: string
  pillars: AnatomyPillar[]
}

export interface ProcessStep {
  number: string
  title: string
  body: string
}

export interface ProcessConfig {
  sectionLabel: string
  title: string
  subtitle: string
  steps: ProcessStep[]
}

export interface TierFeatureRow {
  feature: string
  basic: string
  standard: string
  premium: string
}

export interface TierConfig {
  name: string
  badge?: string
  price: string
  frequency: string
  journeys: string
  image: string
  description: string
  amenities: string[]
  ctaText: string
  ctaHref: string
}

export interface TiersConfig {
  sectionLabel: string
  title: string
  subtitle: string
  tiers: TierConfig[]
  comparisonRows: TierFeatureRow[]
}

export interface AIPackage {
  name: string
  price: string
  frequency: string
  ideal: string
  description: string
  features: string[]
  ctaText: string
  ctaHref: string
  highlighted?: boolean
}

export interface AIPackagesConfig {
  sectionLabel: string
  title: string
  subtitle: string
  packages: AIPackage[]
}

export interface ServiceItem {
  service: string
  price: string
  notes: string
}

export interface ServiceCategory {
  title: string
  icon: string
  items: ServiceItem[]
}

export interface IndividualServicesConfig {
  sectionLabel: string
  title: string
  subtitle: string
  categories: ServiceCategory[]
}

export interface FooterLink {
  label: string
  href: string
}

export interface FooterColumn {
  heading: string
  links: FooterLink[]
}

export interface FooterConfig {
  ageGateText: string
  brandName: string
  brandTaglineLines: string[]
  columns: FooterColumn[]
  copyright: string
  termsHighlights: string[]
}

export const siteConfig: SiteConfig = {
  language: "en",
  siteTitle: "OMEGAELZ Group | Next-Generation Digital Solutions",
  siteDescription: "OMEGAELZ Group is a next-generation digital solutions agency specialising in web development, AI automation, CRM implementation, graphic design, data analytics, and business consultation. We help brands grow, scale, and stand out.",
}

export const navigationConfig: NavigationConfig = {
  brandName: "OMEGAELZ",
  links: [
    { label: "Services", target: "#anatomy" },
    { label: "Packages", target: "#tiers" },
    { label: "AI Solutions", target: "#ai-packages" },
    { label: "Pricing", target: "#individual-services" },
    { label: "Contact", target: "#contact" },
  ],
}

export const heroConfig: HeroConfig = {
  videoPath: "videos/hero.mp4",
  eyebrow: "South Africa's Next-Generation Digital Agency",
  titleLine: "OMEGAELZ",
  titleEmphasis: "GROUP",
  subtitleLine1: "We build websites, AI systems, and digital experiences",
  subtitleLine2: "that make businesses impossible to ignore.",
  ctaText: "View Packages",
  ctaTargetId: "#tiers",
  secondaryCtaText: "Explore Services",
  secondaryCtaTargetId: "#anatomy",
}

export const statsConfig: StatsConfig = {
  items: [
    { value: "7", label: "Core Service Pillars", suffix: "" },
    { value: "50", label: "Projects Delivered", suffix: "+" },
    { value: "24", label: "Hour Response SLA", suffix: "hr" },
    { value: "100", label: "Client Satisfaction", suffix: "%" },
  ],
}

export const manifestoConfig: ManifestoConfig = {
  sectionLabel: "OUR MANIFESTO",
  text: "We are OMEGAELZ — a next-generation digital agency launched in 2026 to help brands grow, scale, and stand out. We combine creativity, technology, and strategic thinking to deliver impactful digital experiences that drive visibility, efficiency, and growth.",
  subtext: "From building strong online identities to streamlining operations with AI, we turn ideas into lasting results. Based in South Africa, serving businesses worldwide.",
}

export const anatomyConfig: AnatomyConfig = {
  sectionLabel: "OUR CAPABILITIES",
  title: "Seven Pillars of Digital Excellence",
  subtitle: "End-to-end solutions across every dimension of your digital presence.",
  pillars: [
    {
      label: "01 / 07",
      title: "Web Development",
      body: "We build modern, high-performance websites that look exceptional and function flawlessly. From sleek 4-page starter sites to complex 10+ page enterprise platforms with advanced SEO, e-commerce, and custom integrations.",
      highlights: ["4–10+ Page Responsive Sites", "E-commerce Development", "Advanced SEO Integration", "Custom CMS & Integrations"],
    },
    {
      label: "02 / 07",
      title: "AI & Automation",
      body: "We deploy intelligent chatbots, workflow automation, AI sales systems, robotic process automation, and custom AI agents that work 24/7 — from basic chatbots to full enterprise AI transformation.",
      highlights: ["AI Chatbot Development", "Workflow Automation (n8n/Zapier)", "RPA Deployment", "Custom AI Agent Systems"],
    },
    {
      label: "03 / 07",
      title: "Graphic Design",
      body: "From logos and brand identity packages to marketing materials, social media content, and video production — we create visually engaging content that helps brands stand out and connect with their audience.",
      highlights: ["Logo & Brand Identity", "Social Media Graphics", "Video Production & Editing", "Marketing Collateral"],
    },
    {
      label: "04 / 07",
      title: "CRM & Systems",
      body: "We implement and optimise CRM platforms including HubSpot, Salesforce, Zoho, Pipedrive, and Microsoft Dynamics 365. From setup and data migration to integration, training, and ongoing optimisation.",
      highlights: ["HubSpot / Salesforce / Zoho", "CRM Data Migration", "Pipeline Automation", "CRM Training & Support"],
    },
    {
      label: "05 / 07",
      title: "Data Analytics",
      body: "We build business intelligence dashboards, implement predictive analytics models, set up Google Analytics 4, create customer data platforms, and automate KPI reporting for smarter business decisions.",
      highlights: ["Power BI / Tableau Dashboards", "Predictive Analytics (ML)", "GA4 & CDP Setup", "KPI Automation & Alerts"],
    },
    {
      label: "06 / 07",
      title: "Business Services",
      body: "We provide business consultation, strategic planning, company registration, contract drafting, vendor management, and comprehensive training workshops — guiding businesses at every stage of growth.",
      highlights: ["Company Registration", "Business Plan Development", "Contract Drafting & Review", "Training & Workshops"],
    },
    {
      label: "07 / 07",
      title: "Social Media & Marketing",
      body: "We manage your social media presence end-to-end — strategy, content creation, scheduling, paid advertising (Meta, Google & TikTok Ads), community engagement, and monthly performance reporting. Growth-driven marketing that converts.",
      highlights: ["Social Media Management (Multi-Platform)", "Paid Advertising — Meta, Google & TikTok Ads", "Content Creation & Scheduling", "Monthly Analytics & Performance Reports"],
    },
  ],
}

export const processConfig: ProcessConfig = {
  sectionLabel: "HOW WE WORK",
  title: "From Discovery to Delivery",
  subtitle: "A refined process built to maximise results and minimise friction — every time.",
  steps: [
    {
      number: "01",
      title: "Discovery & Consultation",
      body: "We start by understanding your business, goals, and challenges through a structured consultation. We map your objectives and define a clear scope of work.",
    },
    {
      number: "02",
      title: "Strategy & Proposal",
      body: "Our team develops a tailored strategy and detailed proposal — outlining deliverables, timelines, and investment. A 50% deposit secures your project.",
    },
    {
      number: "03",
      title: "Design & Development",
      body: "We execute with precision. You receive regular updates and review checkpoints throughout the build phase to ensure alignment at every stage.",
    },
    {
      number: "04",
      title: "Review & Refinement",
      body: "Your feedback shapes the final product. We include reasonable revisions within scope to ensure the result meets and exceeds expectations.",
    },
    {
      number: "05",
      title: "Launch & Handover",
      body: "We deploy, test, and hand over all assets with documentation. Post-launch support is included in all packages according to your tier.",
    },
  ],
}

export const tiersConfig: TiersConfig = {
  sectionLabel: "WEBSITE PACKAGES",
  title: "Choose Your Growth Path",
  subtitle: "Three comprehensive website packages designed for businesses at every stage.",
  tiers: [
    {
      name: "Basic",
      price: "4,749",
      frequency: "once-off",
      journeys: "FOR STARTING BUSINESSES",
      image: "images/tier-01.jpg",
      description: "4-page responsive website, basic SEO, .co.za domain (1 year), 3 months hosting, contact form, 2-month digital marketing on 1 social platform with 4 posts/month, Google Business setup, and 2 weeks technical support.",
      amenities: [
        "4 Pages — Mobile-Friendly Design",
        "Contact Form Included",
        "Basic SEO Setup",
        ".co.za Domain (1 Year) + 3 Months Hosting",
        "1 Social Media Platform — 4 Posts/Month",
        "2 Months Digital Marketing",
        "Google Business Profile Setup",
        "2 Weeks Technical Support",
      ],
      ctaText: "Get Started",
      ctaHref: "mailto:omegaelz@outlook.com?subject=Basic%20Package%20Inquiry",
    },
    {
      name: "Standard",
      badge: "POPULAR",
      price: "6,499",
      frequency: "once-off",
      journeys: "FOR GROWING BUSINESSES",
      image: "images/tier-02.jpg",
      description: "8-page responsive website with WhatsApp chat and optimised SEO, .co.za domain (1 year), 6 months hosting, business email, 4-month digital marketing across 2 social platforms with 6 posts/month, Google Business optimisation, and 3 months technical support.",
      amenities: [
        "8 Pages + WhatsApp Chat Integration",
        "Contact Form + Business Email",
        "Optimised SEO Setup",
        ".co.za Domain (1 Year) + 6 Months Hosting",
        "2 Social Media Platforms — 6 Posts/Month",
        "4 Months Digital Marketing",
        "Google Business Profile Optimisation",
        "3 Months Technical Support",
      ],
      ctaText: "Get Started",
      ctaHref: "mailto:omegaelz@outlook.com?subject=Standard%20Package%20Inquiry",
    },
    {
      name: "Premium",
      price: "7,799",
      frequency: "once-off",
      journeys: "FOR ESTABLISHED ENTERPRISES",
      image: "images/tier-03.jpg",
      description: "10+ page responsive website with advanced SEO, WhatsApp chat, .co.za domain (1 year), 12 months hosting, business email, full website analytics, 6-month digital marketing across 3 social platforms with 8 posts/month, Google Business optimisation, monthly marketing reports, and 12 months technical support.",
      amenities: [
        "10+ Pages + WhatsApp Chat + Advanced SEO",
        "Business Email + Full Website Analytics",
        ".co.za Domain (1 Year) + 12 Months Hosting",
        "3 Social Media Platforms — 8 Posts/Month",
        "6 Months Digital Marketing",
        "Monthly Marketing Performance Reports",
        "Google Business Profile Optimisation",
        "12 Months Technical Support",
      ],
      ctaText: "Get Started",
      ctaHref: "mailto:omegaelz@outlook.com?subject=Premium%20Package%20Inquiry",
    },
  ],
  comparisonRows: [
    { feature: "Website Pages", basic: "4 Pages", standard: "8 Pages", premium: "10+ Pages" },
    { feature: "Mobile Friendly", basic: "✓", standard: "✓", premium: "✓" },
    { feature: "WhatsApp Chat", basic: "—", standard: "✓", premium: "✓" },
    { feature: "SEO", basic: "Basic", standard: "Optimised", premium: "Advanced" },
    { feature: "Free Domain", basic: ".co.za 1yr", standard: ".co.za 1yr", premium: ".co.za 1yr" },
    { feature: "Hosting", basic: "3 Months", standard: "6 Months", premium: "12 Months" },
    { feature: "Business Email", basic: "—", standard: "✓", premium: "✓" },
    { feature: "Website Analytics", basic: "—", standard: "—", premium: "✓" },
    { feature: "Marketing Duration", basic: "2 Months", standard: "4 Months", premium: "6 Months" },
    { feature: "Social Platforms", basic: "1", standard: "2", premium: "3" },
    { feature: "Posts Per Month", basic: "4", standard: "6", premium: "8" },
    { feature: "Marketing Report", basic: "—", standard: "—", premium: "Monthly" },
    { feature: "Technical Support", basic: "2 Weeks", standard: "3 Months", premium: "12 Months" },
  ],
}

export const aiPackagesConfig: AIPackagesConfig = {
  sectionLabel: "AI SOLUTIONS",
  title: "Enterprise AI, SMME Pricing",
  subtitle: "Cutting-edge automation and artificial intelligence — without the enterprise price tag.",
  packages: [
    {
      name: "AI Starter",
      price: "8,499",
      frequency: "/ month",
      ideal: "Small businesses starting their AI journey.",
      description: "The essential AI toolkit for businesses ready to automate repetitive tasks and unlock smarter customer engagement.",
      features: [
        "AI Chatbot (Basic NLP)",
        "Workflow Automation — 2 Flows",
        "AI Email Management",
        "Basic CRM Setup",
        "Monthly Analytics Report",
        "24hr Response SLA",
      ],
      ctaText: "Start AI Journey",
      ctaHref: "mailto:omegaelz@outlook.com?subject=AI%20Starter%20Package%20Inquiry",
    },
    {
      name: "AI Growth",
      price: "18,499",
      frequency: "/ month",
      ideal: "Growing businesses ready to scale operations.",
      description: "A comprehensive AI suite designed to automate sales, content, and operations — giving your team an unfair advantage.",
      features: [
        "Advanced AI Chatbot + CRM Integration",
        "Full Workflow Suite — 5 Flows",
        "AI Sales Automation",
        "CRM Optimisation",
        "AI Content Generation (10 pieces/month)",
        "Business Intelligence Dashboard",
        "Priority Support",
      ],
      ctaText: "Scale with AI",
      ctaHref: "mailto:omegaelz@outlook.com?subject=AI%20Growth%20Package%20Inquiry",
      highlighted: true,
    },
    {
      name: "AI Enterprise",
      price: "44,999",
      frequency: "/ month",
      ideal: "Established businesses requiring full AI transformation.",
      description: "End-to-end AI transformation — custom agents, enterprise CRM, full RPA, predictive analytics, and a dedicated AI consultant.",
      features: [
        "Custom AI Agent Implementation",
        "Enterprise CRM Integration",
        "Full RPA Deployment",
        "Predictive Analytics (ML Models)",
        "AI Customer Support Agent (24/7)",
        "Marketing Automation Orchestra",
        "Dedicated AI Consultant",
        "24/7 Monitoring & Support",
      ],
      ctaText: "Transform Enterprise",
      ctaHref: "mailto:omegaelz@outlook.com?subject=AI%20Enterprise%20Package%20Inquiry",
    },
  ],
}

export const individualServicesConfig: IndividualServicesConfig = {
  sectionLabel: "INDIVIDUAL SERVICES",
  title: "Pick Exactly What You Need",
  subtitle: "All prices in South African Rand (ZAR). Custom quotes available — contact us for a tailored proposal.",
  categories: [
    {
      title: "Technology Services",
      icon: "WEB",
      items: [
        { service: "Website Design (Basic)", price: "R1,500 – R3,500", notes: "3–5 pages" },
        { service: "Website Design (Advanced)", price: "R3,500 – R7,000", notes: "5–10 pages" },
        { service: "E-commerce Development", price: "R6,000 – R15,000", notes: "Platform dependent" },
        { service: "IT Support", price: "R120 – R250/hr", notes: "Ongoing support" },
        { service: "Network Setup", price: "R2,500 – R8,000", notes: "Based on infrastructure" },
        { service: "Cloud Migration", price: "R8,000 – R18,000", notes: "Data volume dependent" },
      ],
    },
    {
      title: "AI & Automation",
      icon: "AI",
      items: [
        { service: "AI Chatbot Development", price: "R7,500 – R75,000", notes: "Basic to enterprise NLP" },
        { service: "AI Agent Implementation", price: "R15,000 – R120,000", notes: "Multi-agent systems" },
        { service: "Workflow Automation (Zapier/Make/n8n)", price: "R3,500 – R15,000", notes: "Per workflow complexity" },
        { service: "AI Sales Automation", price: "R5,500 – R25,000/month", notes: "Includes tool subscription" },
        { service: "Business Process Automation (RPA)", price: "R8,000 – R35,000", notes: "Bot development + deployment" },
        { service: "n8n Self-Hosted Setup", price: "R5,000 – R12,000", notes: "Server + configuration" },
        { service: "Automation Consulting", price: "R1,500 – R4,500/hr", notes: "Includes ROI analysis" },
      ],
    },
    {
      title: "CRM Systems",
      icon: "CRM",
      items: [
        { service: "HubSpot CRM Setup", price: "R8,500 – R25,000", notes: "Includes training" },
        { service: "Salesforce Implementation", price: "R25,000 – R120,000", notes: "Custom development" },
        { service: "Zoho CRM Setup", price: "R5,500 – R18,000", notes: "Migration included" },
        { service: "Pipedrive Configuration", price: "R4,500 – R12,000", notes: "Workflow automation" },
        { service: "Microsoft Dynamics 365", price: "R20,000 – R90,000", notes: "Full suite setup" },
        { service: "CRM Data Migration", price: "R5,000 – R20,000", notes: "Data cleaning included" },
        { service: "CRM Training & Support", price: "R2,500 – R8,000", notes: "Per session" },
      ],
    },
    {
      title: "Data Analytics",
      icon: "DATA",
      items: [
        { service: "Business Intelligence Setup", price: "R10,000 – R45,000", notes: "Power BI / Tableau" },
        { service: "Data Visualisation", price: "R5,000 – R20,000", notes: "Per dashboard" },
        { service: "Predictive Analytics", price: "R15,000 – R60,000", notes: "ML models" },
        { service: "Google Analytics 4 Setup", price: "R3,500 – R8,000", notes: "E-commerce focus" },
        { service: "Customer Data Platform", price: "R12,000 – R50,000", notes: "CDP implementation" },
        { service: "KPI Automation", price: "R4,000 – R12,000", notes: "Real-time alerts" },
      ],
    },
    {
      title: "Social Media & Marketing",
      icon: "SMM",
      items: [
        { service: "Social Media Management (1 Platform)", price: "R2,500 – R5,000/mo", notes: "Content + scheduling" },
        { service: "Social Media Management (2–3 Platforms)", price: "R5,000 – R10,000/mo", notes: "Multi-platform strategy" },
        { service: "Content Creation & Scheduling", price: "R1,800 – R4,500/mo", notes: "8–20 posts/month" },
        { service: "Meta (Facebook & Instagram) Ads", price: "R3,500 – R12,000/mo", notes: "Excl. ad spend" },
        { service: "Google Ads (Search & Display)", price: "R4,000 – R14,000/mo", notes: "Excl. ad spend" },
        { service: "TikTok Ads Management", price: "R3,000 – R9,000/mo", notes: "Excl. ad spend" },
        { service: "Email Marketing Campaigns", price: "R2,000 – R6,000/mo", notes: "Design + deployment" },
        { service: "Influencer Marketing Campaigns", price: "R5,000 – R25,000", notes: "Per campaign" },
        { service: "Community Management", price: "R1,500 – R4,000/mo", notes: "Engagement + DMs" },
        { service: "Social Media Audit & Strategy", price: "R3,500 – R8,000", notes: "One-time report" },
        { service: "Monthly Marketing Report", price: "R1,500 – R3,500/mo", notes: "Analytics + insights" },
        { service: "SEO Content Marketing", price: "R4,000 – R12,000/mo", notes: "Blog + on-page SEO" },
      ],
    },
    {
      title: "Creative Services",
      icon: "BRAND",
      items: [
        { service: "Logo Design", price: "R500 – R1,200", notes: "3–5 concepts" },
        { service: "Brand Identity Package", price: "R6,000 – R18,000", notes: "Complete branding" },
        { service: "Graphic Design", price: "R250 – R600/hr", notes: "Minimum 2 hours" },
        { service: "Video Editing", price: "R300 – R800/hr", notes: "Raw footage provided" },
        { service: "Video Production", price: "R3,000 – R15,000", notes: "Full service" },
        { service: "Social Media Graphics", price: "R150 – R600", notes: "Per design" },
      ],
    },
    {
      title: "Business Documentation",
      icon: "BIZ",
      items: [
        { service: "Company Registration", price: "R1,750 – R3,500", notes: "PTY, NGO, etc." },
        { service: "Business Plan Development", price: "R800 – R2,500", notes: "Research + financials" },
        { service: "Contract Drafting", price: "R700 – R1,800", notes: "Based on complexity" },
        { service: "Legal Document Review", price: "R500 – R900/hr", notes: "Minimum 2 hours" },
        { service: "Compliance Documentation", price: "R2,500 – R6,000", notes: "Package pricing available" },
        { service: "License Application", price: "R500 – R1,200", notes: "Per application" },
      ],
    },
    {
      title: "Technical Support",
      icon: "TECH",
      items: [
        { service: "Hardware Diagnostics & Repair", price: "R350 – R950", notes: "PC, laptop, peripherals" },
        { service: "Software Installation & Setup", price: "R200 – R600", notes: "Per device" },
        { service: "Operating System Installation", price: "R400 – R800", notes: "Windows / Linux / macOS" },
        { service: "Virus & Malware Removal", price: "R350 – R700", notes: "Full system clean" },
        { service: "Data Recovery", price: "R800 – R4,500", notes: "Depends on drive condition" },
        { service: "Hardware Upgrades (RAM / SSD)", price: "R250 – R600", notes: "Labour only, excl. parts" },
        { service: "Printer & Peripheral Setup", price: "R200 – R500", notes: "Network or local" },
        { service: "Remote IT Support", price: "R150 – R300/hr", notes: "Min. 1 hour" },
        { service: "On-site IT Support", price: "R300 – R600/hr", notes: "Travel fee may apply" },
        { service: "IT Support Retainer (Monthly)", price: "R1,500 – R5,000/mo", notes: "Priority response SLA" },
        { service: "Network & Wi-Fi Setup", price: "R1,200 – R6,000", notes: "SOHO to small office" },
        { service: "Server Setup & Configuration", price: "R5,000 – R20,000", notes: "Physical or cloud-based" },
      ],
    },
  ],
}

export const footerConfig: FooterConfig = {
  ageGateText: "Ready to transform your business? Let's build something extraordinary together.",
  brandName: "OMEGAELZ",
  brandTaglineLines: [
    "GROUP",
    "Next-generation digital solutions.",
    "Based in South Africa. Serving globally.",
    "+27 63 559 0106",
  ],
  columns: [
    {
      heading: "Services",
      links: [
        { label: "Web Development", href: "#anatomy" },
        { label: "AI & Automation", href: "#anatomy" },
        { label: "Social Media & Marketing", href: "#anatomy" },
        { label: "Graphic Design", href: "#anatomy" },
        { label: "CRM Systems", href: "#anatomy" },
        { label: "Data Analytics", href: "#anatomy" },
        { label: "Business Consultation", href: "#anatomy" },
      ],
    },
    {
      heading: "Packages",
      links: [
        { label: "Basic Website — R4,750", href: "#tiers" },
        { label: "Standard Website — R5,000", href: "#tiers" },
        { label: "Premium Website — R7,800", href: "#tiers" },
        { label: "AI Starter — R8,500/mo", href: "#ai-packages" },
        { label: "AI Growth — R18,500/mo", href: "#ai-packages" },
        { label: "AI Enterprise — R45,000/mo", href: "#ai-packages" },
      ],
    },
    {
      heading: "Company",
      links: [
        { label: "About Us", href: "#manifesto" },
        { label: "How We Work", href: "#process" },
        { label: "Contact Us", href: "mailto:omegaelz@outlook.com" },
        { label: "Get a Quote", href: "mailto:omegaelz@outlook.com?subject=Custom%20Quote%20Request" },
        { label: "Terms & Conditions", href: "#terms" },
      ],
    },
    {
      heading: "Connect",
      links: [
        { label: "LinkedIn", href: "https://www.linkedin.com/in/omegaelz-group-21b18a323/" },
        { label: "Twitter / X", href: "https://x.com/omegaelz" },
        { label: "Instagram", href: "https://www.instagram.com/omegaelz/" },
        { label: "WhatsApp", href: "https://wa.me/27635590106" },
      ],
    },
  ],
  copyright: "\u00A9 2026 OMEGAELZ Group. All rights reserved. Crafted with precision in South Africa.",
  termsHighlights: [
    "50% deposit required to begin any project.",
    "Package subscriptions billed monthly in advance.",
    "Cancellation with 30 days notice. No partial-month refunds.",
    "24-hour business hour response SLA on all inquiries.",
    "NDAs signed on request. All client information strictly confidential.",
    "Additional revisions beyond agreed scope may incur extra charges.",
  ],
}
