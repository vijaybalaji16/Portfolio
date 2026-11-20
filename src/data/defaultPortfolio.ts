import type { PortfolioData } from '../types/portfolio';

export const PRESET_IMAGES = {
  portrait: '',
  creedomPrd: '/src/assets/images/creedom_retention_cover_1794920270122.jpg',
  fintech: '/src/assets/images/project_fintech_platform_1794890960595.jpg',
  workflow: '/src/assets/images/project_workflow_engine_1794890960863.jpg',
  consumer: '/src/assets/images/project_consumer_growth_1794890960938.jpg',
};

export const RESUME_PDF_URL = '/assets/aistudio/Vijay_Balaji_APC__1__e09736cc.pdf';

export const DEFAULT_PORTFOLIO: PortfolioData = {
  profile: {
    name: 'Vijay Balaji T',
    role: 'Associate Product Manager',
    location: 'Tamil Nadu, India',
    availability: 'Enterprise & Consumer Products · Product Analytics',
    headline: 'Associate Product Manager',
    subheadline:
      'Shipping 0-to-1 and growth initiatives across enterprise and consumer products. Partnering with design and engineering to turn user insights into measurable product outcomes.',
    portraitUrl: PRESET_IMAGES.portrait,
    email: 'vijay16balaji@gmail.com',
    phone: '+91-9445900726',
    linkedinUrl: '',
    githubUrl: '',
    websiteUrl: '',
    philosophyTitle: 'Data-backed product clarity.',
    philosophyBody:
      'Every product decision starts with grounded user interviews, behavioral telemetry in SQL and Mixpanel, and clear functional specifications that align engineering, design, and business stakeholders.',
  },
  metrics: [
    {
      id: 'm1',
      value: '98%',
      label: 'SLA Track Record',
      context: 'L1 support & major incident resolution at Accenture',
    },
    {
      id: 'm2',
      value: '3+ Yrs',
      label: 'Product & Operations',
      context: 'Enterprise PM, Consumer PM & Service Management',
    },
    {
      id: 'm3',
      value: '0-to-1',
      label: 'Feature Lifecycle',
      context: 'PRDs, FRDs, sprint planning & post-release KPIs',
    },
    {
      id: 'm4',
      value: 'SQL + AI',
      label: 'Analytics & Research',
      context: 'MySQL, Mixpanel, PowerBI, Tableau & AI synthesis',
    },
  ],
  experiences: [
    {
      id: 'exp-1',
      company: 'Xerago',
      role: 'Associate Product Manager (Enterprise Product)',
      period: 'May 2026 — Present',
      location: 'India',
      summary:
        'Lead functional product specifications, sprint facilitation, and cross-functional coordination across enterprise product delivery.',
      highlights: [
        'Created PRDs and FRDs translating business requirements into functional product specifications.',
        'Coordinated with engineering, design, and business teams throughout product development.',
        'Facilitated sprint planning by providing user stories, technical requirements, and acceptance criteria.',
        'Created, organized, and maintained accurate product documentation and feature specifications.',
      ],
    },
    {
      id: 'exp-2',
      company: 'Creedom',
      role: 'Associate Product Manager (Consumer Product)',
      period: 'Oct 2025 — Feb 2026',
      location: 'India',
      summary:
        'Managed end-to-end consumer feature lifecycles combining qualitative user interviews, AI-assisted pattern discovery, and quantitative A/B experimentation.',
      highlights: [
        'Conducted user interviews and generated actionable insights that drove decisions to solve user problems.',
        'Created structured PRDs defining user stories, pain points, technical requirements, edge cases, and success metrics.',
        'Managed end-to-end feature lifecycle, including planning, release, and post-release performance tracking.',
        'Utilized MySQL and Mixpanel to monitor KPIs, analyze metrics, and conduct A/B testing.',
        'Leveraged AI tools to analyze user interviews and behavioral data, identifying key patterns that informed PRDs and improved feature decisions.',
      ],
    },
    {
      id: 'exp-3',
      company: 'Accenture',
      role: 'Service Management Associate',
      period: 'May 2022 — Jan 2024',
      location: 'India',
      summary:
        'Owned incident classification, L1 resolution, major incident bridge leadership, and Standard Operating Procedure (SOP) development under strict SLA targets.',
      highlights: [
        'Assisted in developing SOPs by analyzing requirements to improve operational efficiency and performance.',
        'Classified incidents by analyzing problem severity so that critical issues received immediate attention.',
        'Provided L1 support to resolve tickets with a track record of 98% Service Level Agreement (SLA) adherence.',
        'Led major incident bridge calls ensuring end-to-end resolutions with minimum Average Handling Time.',
        'Collaborated with cross-functional teams to identify and resolve root causes of major incidents while ensuring timely stakeholder communication and adherence to process standards.',
      ],
    },
  ],
  projects: [
    {
      id: 'proj-creedom-suggestion',
      title: 'Post-Series Recommendation & Retention Screen',
      subtitle: 'Personalized post-certificate next-series and expert feedback engine for Creedom learners',
      category: 'Growth',
      year: 'Oct 2025',
      role: 'Associate Product Manager',
      company: 'Creedom',
      headlineMetric: '5-Card Rule Logic · L0–L2 Telemetry',
      projectType: 'PRD',
      benefit: 'Increasing User Engagement',
      imageUrl: PRESET_IMAGES.creedomPrd,
      documentUrl: 'https://docs.google.com/document/d/1TLo7ueN3ANfM1GEUsWT1_MenTDZrRcQYtoN_WXT0bt8/edit',
      documentName: 'Creedom — Post-Series Completion Suggestion Screen (PRD)',
      documentFormat: 'Google Doc',
      featured: true,
      summary:
        'Authored the PRD for Creedom’s post-certificate suggestion screen—combining personalized next-series recommendations and expert feedback cards to deepen user engagement and retention.',
      problem:
        'Learners completing a learning series and earning a certificate lacked a guided transition when navigating back—creating an avoidable drop-off between course completion, follow-on series discovery, and expert feedback submission.',
      strategy:
        'Designed a 5-card personalized suggestion screen (3 series cards + 2 expert feedback cards) governed by deterministic recommendation rules across sub-category priority, unstarted watch status, highest-watched series, newly launched courses, and expert availability with deduplication fallbacks.',
      execution:
        'Defined component specs including auto-playing episode/expert previews with sound controls, proficiency and rating chips, primary Watch Now / Get Feedback / Go Back CTAs, Figma UI references, and structured analytics events (suggestion_screen_load_success, watch_now_clicked, get_feedback_clicked).',
      outcomes: [
        'L0 North Star Metrics: Weekly Average Time Spent per User & User Lifetime Value (LTV)',
        'L1 Engagement Metrics: Next Series Start Rate, Feedback Submission Rate & Session Time',
        'L2 Conversion Telemetry: Watch Now CTR & Get Feedback CTR tracked per ranked card slot',
        'End-to-end 5-card ranking & fallback logic documented across Singing, Acting & Social Media',
      ],
      artifacts: [
        'Product Requirement Document (PRD)',
        '5-Card Recommendation Logic Matrix',
        'L0–L2 Metrics & Event Telemetry Spec',
        'Figma UI Flow Handoff',
      ],
    },
    {
      id: 'proj-creedom-learn-homepage',
      title: 'Learn Homepage Redesign & Creedo AI Search',
      subtitle: 'Streamlining Learn Homepage hierarchy, unified filters, and Creedo AI search to elevate series discovery',
      category: '0-to-1 Launch',
      year: 'Oct 2025',
      role: 'Associate Product Manager',
      company: 'Creedom',
      headlineMetric: '7 UX Enhancements · AI Search & Performance Tracking',
      projectType: 'PRD',
      benefit: 'Revamping New Homepage for A/B Testing',
      imageUrl: PRESET_IMAGES.workflow,
      documentUrl: 'https://docs.google.com/document/d/1JfygnOhmvIacek1cjiUbZQoQDmzT2BnG97S2aLt_CrE/edit',
      documentName: 'Creedom — Learn Homepage UI Enhancements (PRD)',
      documentFormat: 'Google Doc',
      featured: false,
      summary:
        'Authored the PRD to streamline Creedom’s Learn Homepage—integrating Creedo AI search, a unified filter sheet, adaptive PRO/referral CTAs, and multi-format hero banners.',
      problem:
        'The existing Learn Homepage crowded screen space with separate Skill and Category filters, static headers, and competing CTAs—making it harder for learners to focus on and discover core video learning series.',
      strategy:
        'Consolidated navigation around 7 high-leverage enhancements: Creedo AI Search with category-specific rotating prompts, a unified Skill + Category bottom sheet, configurable auto-sliding Hero Banners, consistent "See All" category links, adaptive Upgrade to PRO / Refer & Earn CTAs, rotating header copy, and a scrollable secondary action bar.',
      execution:
        'Authored functional requirements, backend configurability rules, Figma wireframe handoffs, client-side page-load time tracking, and 7 analytics events (learn_search_clicked, learn_search_chip_clicked, learn_search_query_submitted, learn_homepage_badge_clicked, learn_homepage_success, full_banner_clicked, learn_action_button_clicked).',
      outcomes: [
        'Integrated Creedo AI Search with rotating category prompts and backend-managed topic chips',
        'Consolidated separate Skill and Category buttons into a single bottom-sheet filter',
        'Specified adaptive top-bar CTAs switching between Upgrade to PRO and Refer & Earn by tier',
        'Added client-side homepage load latency monitoring and 7 funnel telemetry events',
      ],
      artifacts: [
        'Product Requirement Document (PRD)',
        'Creedo AI Search & Filter Flows',
        'Analytics & Page-Load Telemetry Spec',
        'Figma UI Wireframe Handoff',
      ],
    },
    {
      id: 'proj-creedom-filter-prd',
      title: 'Learn Space Filter & Sort System',
      subtitle: 'Skill-level and category filtering architecture reducing content overload across Creedom Learn',
      category: 'Platform & Scale',
      year: 'Aug 2025',
      role: 'Associate Product Manager',
      company: 'Creedom',
      headlineMetric: '25–35% Discovery Target · 3 Levels & 5 Categories',
      projectType: 'PRD',
      benefit: 'Enhancing User Experience',
      imageUrl: PRESET_IMAGES.fintech,
      documentUrl: 'https://docs.google.com/document/d/153-ekmj3WkGPcxoeeyqPqWwslWom_shxhyBg9frSXDw/edit',
      documentName: 'Creedom — Learn Space Filter & Sort System (PRD)',
      documentFormat: 'Google Doc',
      featured: false,
      summary:
        'Authored the Filter & Sort PRD for Creedom’s Learn space—enabling learners to browse series by Skill Level, Content Category, and Sort order via intuitive bottom-sheet navigation.',
      problem:
        'Creedom’s Learn space lacked a structured filter and sort system, making it hard for learners to locate series matching their proficiency (Beginner, Intermediate, Advanced) or specific categories—leading to content overload and drop-offs.',
      strategy:
        'Structured a dual-axis discovery taxonomy covering 3 Skill Levels (Beginner, Intermediate, Advanced), 5 content categories (Foundations of Singing, Vocal Techniques, Performance & Expression, Industry & Opportunities, Career & Personal Branding), persistent filter state, and sort modes (Newest, Most Popular, Recommended).',
      execution:
        'Mapped the complete course catalog across proficiency and category matrices, designed bottom-sheet filter wireframes with sticky in-page filter switching, and defined event tracking (filter_opened, filter_applied, filtered_content_completed) alongside pre/post-filter drop-off monitoring.',
      outcomes: [
        'Target 25–35% increase in relevant content discovery through structured filtering',
        'Target 40–60% session adoption of Skill Level and Category filter controls',
        'Target 20–30% conversion rate from filtered searches into deeper learning actions',
        'Target 4.0–4.5 / 5 learner satisfaction with persistent bottom-sheet filter UX',
      ],
      artifacts: [
        'Product Requirement Document (PRD)',
        'Skill-Level & Category Catalog Taxonomy',
        'Bottom-Sheet Filter User Flows & Wireframes',
        'Filter Funnel Analytics & Event Spec',
      ],
    },
    {
      id: 'proj-creedom-referral-prd',
      title: 'Coin-Based Referral & Rewards Program',
      subtitle: 'Double-sided coin incentives, WhatsApp deep links, and UPI rewards wallet driving organic growth',
      category: 'Growth',
      year: 'Aug 2025',
      role: 'Associate Product Manager',
      company: 'Creedom',
      headlineMetric: '30–40% Organic Install Target · 250-Coin Rewards',
      projectType: 'PRD',
      benefit: 'Driving Organic User Acquisition',
      imageUrl: PRESET_IMAGES.consumer,
      documentUrl: 'https://docs.google.com/document/d/1NZtiE-RIeFZB4wttRd398Gd5y2k9yHrPkutPH8XsQYY/edit',
      documentName: 'Creedom — Referral Incentives System (PRD)',
      documentFormat: 'Google Doc',
      featured: false,
      summary:
        'Authored the Referral Incentives PRD for Creedom—introducing 250-coin double-sided rewards, 5th-referral milestone bonuses, UPI wallet redemptions, and staged WhatsApp reminder flows.',
      problem:
        'Creedom lacked a structured, reward-backed referral system with clear incentives for both referrer and referee—limiting organic acquisition and viral growth.',
      strategy:
        'Designed a coin-based referral loop awarding 250 coins per qualified referral (install → deep link/code → PRO subscription → content start within 30 days) plus a 250-coin bonus on every 5th successful referral, redeemable via UPI inside a dedicated Rewards Wallet.',
      execution:
        'Specified Home & Profile entry nudges, deep-linked WhatsApp/SMS/Instagram invite and follow-up templates, real-time pending referral tracking dashboards, push + in-app reward claim flows, and 5 funnel telemetry events (Referral_Page_Opened, Referral_Link_Clicked, Referral_Install_Completed, Referral_Subscription_Purchased, Track_refer).',
      outcomes: [
        'Target 30–40% increase in organic app installs powered by viral referral sharing',
        'Target 25–35% conversion rate from referred installs into Creedom PRO subscribers',
        'Target 20–25% referral-attributed revenue contribution while reducing CAC',
        'Target 4–6 monthly successful referrals per active referrer via 5th-referral bonus milestones',
      ],
      artifacts: [
        'Product Requirement Document (PRD)',
        'Referral Funnel & WhatsApp Nudge Flows',
        'Rewards Wallet & UPI Redemption Spec',
        'Referral Funnel Telemetry & Metrics Plan',
      ],
    },
    {
      id: 'proj-creedom-deferred-deeplink',
      title: 'Deferred Deep Linking for Meta Campaigns',
      subtitle: 'Zero-friction Meta ad-to-app onboarding with auto-applied referral codes and attribution',
      category: 'Platform & Scale',
      year: 'Aug 2025',
      role: 'Associate Product Manager',
      company: 'Creedom',
      headlineMetric: '>20% MoM Install Target · ≥70% Sign-up Completion',
      projectType: 'PRD',
      benefit: 'Streamlining Paid Onboarding & Attribution',
      imageUrl: PRESET_IMAGES.workflow,
      documentUrl: 'https://docs.google.com/document/d/11B8npKYWGVK4ormT5KwXlVAwxLy3A0PXkpRT8fUlq-0/edit',
      documentName: 'Creedom — Deferred Deep Link Onboarding (PRD)',
      documentFormat: 'Google Doc',
      featured: false,
      summary:
        'Authored the Deferred Deep Link PRD for Creedom—routing Meta ad clicks seamlessly through app installation with auto-applied referral codes, fraud prevention, and full funnel attribution.',
      problem:
        'Meta ad campaigns lacked deferred deep-link routing into Creedom’s referral onboarding flow—causing multi-step drop-offs, manual code entry friction, low paid conversion rates, and inaccurate campaign attribution.',
      strategy:
        'Specified one-click install deferred deep linking that resumes the exact target screen post-install, auto-applies referral codes, blocks duplicate-device and self-referral fraud, and attributes Meta conversions into the referral dashboard and Rewards Wallet.',
      execution:
        'Mapped post-install user flows and wireframes (Start Learning → Paywall vs. Skip → Learn Homepage) alongside 5 deep-link funnel events (DeepLink_Clicked, DeepLink_Install_Completed, DeepLink_Page_Opened, DeepLink_Action_Completed, DeepLink_Subscription_Purchased) to track campaign ROI.',
      outcomes: [
        'Target >20% month-on-month growth in app installs driven by deferred deep links',
        'Target ≥70% onboarding sign-up completion rate for deep-linked Meta ad users',
        'Target 10–15% conversion rate from deep-linked installs to paid PRO subscribers',
        'Target ≥40% Day-30 retention with accurate campaign attribution and fraud safeguards',
      ],
      artifacts: [
        'Product Requirement Document (PRD)',
        'Deferred Deep-Link Routing & Install Flow',
        'Anti-Fraud & Attribution Rules Spec',
        'Deep-Link Funnel Event Telemetry Plan',
      ],
    },
    {
      id: 'proj-lingopanda-trial-teardown',
      title: 'Free Trial Conversion & Feature Teardown',
      subtitle: 'Product teardown, conversion proposals, and Android UX audit for Lingopanda’s AI English learning app',
      category: 'Growth',
      year: '2025',
      role: 'Product Case Study',
      company: 'Lingopanda',
      headlineMetric: '5 Conversion Proposals · Free-to-Trial Funnel Redesign',
      projectType: 'Case Study',
      benefit: 'Increasing Free Trial Conversions',
      imageUrl: PRESET_IMAGES.consumer,
      documentUrl: 'https://docs.google.com/document/d/1Pn7sho95Jw5hShmS7KFGKPsVXmSfjPqD67KsvSzXPMo/edit',
      documentName: 'Lingopanda — Free Trial Conversion & Feature Teardown',
      documentFormat: 'Google Doc',
      featured: false,
      summary:
        'Conducted an end-to-end product teardown and growth proposal for Lingopanda (formerly PingoLearn)—analyzing Daily Courses, Daily Tests, and AI Voice Calls to identify high-leverage opportunities for boosting free-to-trial conversion.',
      problem:
        'Free users lacked urgency to start a trial, encountered restricted content too early to validate product quality, had no sample access to AI Pro Feedback, faced a text-heavy pricing screen, and on Android had no visible in-app tab surfacing trial or premium plans.',
      strategy:
        'Proposed five targeted conversion levers: a 24-hour Free Trial Countdown Timer with push/in-app reminders, Day-2/Day-3 Free Limit Extension, 2–3 free AI Pro Feedback attempts, premium Situation-Based Learning scenarios, and a visual Pricing & Benefits screen with side-by-side comparisons and a 20% limited-time offer.',
      execution:
        'Evaluated core learning loops (video pronunciation, AI speech feedback, AI chat practice, daily tests, and chatbot voice calls), mapped the Free Trial Countdown UX wireframe flow, and documented Android plan-discoverability gaps.',
      outcomes: [
        'Structured 5 prioritized conversion proposals targeting free-to-trial activation and trial-to-paid upgrades',
        'Designed urgency-driven Free Trial Countdown UX flow paired with push and in-app expiration nudges',
        'Proposed 2–3 free AI Pro Feedback samples and Day-2/Day-3 unlocks to build product conviction before paywall',
        'Identified critical Android discoverability gap where no in-app tab surfaced free trial or premium plans',
      ],
      artifacts: [
        'Feature Exploration & Funnel Audit',
        '5-Initiative Conversion Proposal Doc',
        'Free Trial Countdown UX Flow Design',
        'Android Pricing & Plan Discoverability Audit',
      ],
    },
    {
      id: 'proj-zepto-basket-prd',
      title: 'Zepto Basket Subscription',
      subtitle: 'Recurring daily-essentials subscription with 6–7 AM street-batched delivery and wallet auto-debit',
      category: '0-to-1 Launch',
      year: '2025',
      role: 'Product Requirement Document',
      company: 'Zepto',
      headlineMetric: '15–20% AOV Growth Target · 15% Basket Conversion',
      projectType: 'PRD',
      benefit: 'Driving Recurring Orders & AOV Growth',
      imageUrl: PRESET_IMAGES.consumer,
      documentUrl: 'https://www.canva.com/design/DAGjJjdwwfk/Kr95wPfUGysMxdKLOG8eFg/view',
      documentName: 'Zepto — “Zepto Basket” Subscription (PRD Deck)',
      documentFormat: 'Canva',
      featured: false,
      summary:
        'Authored a comprehensive 0-to-1 PRD presentation for “Zepto Basket”—a recurring subscription feature enabling Tier-1 urban shoppers to automate daily/alternate/weekly deliveries of milk and kitchen essentials without repeat checkout friction or daily delivery fees.',
      problem:
        'Frequent Zepto users purchasing daily essentials (milk, curd, paneer, groceries) had to repeat the same ordering and payment flow every day while paying steep per-order delivery charges—with no recurring order schedule or PayLater option.',
      strategy:
        'Designed a subscription model backed by Wallet/PayLater auto-debit, daily/alternate/weekly cadence controls, calendar delivery tracking, and a 6 AM–7 AM fixed morning slot (10 PM prior-day cutoff) batched by street/area to lower per-order delivery cost.',
      execution:
        'Defined user personas and event maps, Home/Subscription/Payment wireframes, functional & non-functional requirements, edge-case handling (missing deliveries, low wallet balance alerts, out-of-station day pause), RACI stakeholders, KPI framework, and a 5-phase rollout from Internal Pilot to Nationwide launch.',
      outcomes: [
        'Goal metric: 15–20% growth in Average Order Value (AOV) and subscription-driven revenue lift',
        'Target converting 15% of existing Zepto users into active Zepto Basket subscribers',
        '5-phase launch milestones scaling from 2–5% Open Beta subscription rate to >40% nationwide and >75% engagement',
        'Operational cost optimization via 6–7 AM street-level delivery batching and 10 PM prior-day order cutoff',
      ],
      artifacts: [
        '0-to-1 Product Requirement Document (Canva Deck)',
        'User Personas, JTBD & Event Mapping',
        'Home, Subscription & Payment Wireframes',
        '5-Phase Rollout, Risk Mitigation & KPI Plan',
      ],
    },
  ],
  education: [
    {
      id: 'edu-1',
      institution: 'Periyar University',
      degree: 'M.Sc. Physics',
      period: '2025',
      location: 'Tamil Nadu, India',
      details:
        'Postgraduate degree building rigorous analytical modeling, quantitative problem-solving, and structured research foundations.',
    },
    {
      id: 'edu-2',
      institution: 'Bishop Heber College',
      degree: 'B.Sc. Physics',
      period: '2020',
      location: 'Tamil Nadu, India',
      details:
        'Undergraduate degree focused on foundational physics, mathematical analysis, and experimental methodology.',
    },
  ],
  competencies: [
    {
      id: 'comp-1',
      title: 'Product Management',
      description:
        'End-to-end feature ownership from user discovery and structured PRDs/FRDs to sprint execution and post-release tracking.',
      methods: ['User Research', 'A/B Testing', 'PRDs & FRDs', 'Product Lifecycle Management'],
    },
    {
      id: 'comp-2',
      title: 'Data & Analytics',
      description:
        'Querying behavioral data, instrumenting KPI frameworks, and building executive dashboards for data-backed decisions.',
      methods: ['SQL & MySQL', 'Python', 'Mixpanel', 'PowerBI & Tableau', 'Advanced Excel'],
    },
    {
      id: 'comp-3',
      title: 'AI & Platforms',
      description:
        'Applying modern AI tooling and workflow automation to accelerate research synthesis, prototyping, and delivery.',
      methods: ['Claude & ChatGPT', 'Cursor & Antigravity', 'Prompt Engineering', 'JIRA & n8n', 'ServiceNow & Azure Data Studio'],
    },
    {
      id: 'comp-4',
      title: 'Methodologies & Leadership',
      description:
        'Driving cross-functional alignment, operational rigor, and structured problem solving across Agile and ITIL environments.',
      methods: ['Agile Delivery', 'ITIL & Incident Management', 'Stakeholder Management', 'Analytical Thinking'],
    },
  ],
};
