import { publicStorageUrl } from "@/lib/supabase/storage"
import { storageAssets } from "@/data/storage-assets"

export const siteConfig = {
  name: "Faith on Fire",
  tagline:
    "Helping Men Return To God, Restore Relationships & Reignite Their Purpose",
  supportingLine: "A Brotherhood For Men Who Refuse To Drift",
  url: "https://www.faithonfire.world",
  email: "support@faithonfire.world",
  ogImage: "/assets/brand/faith-on-fire-full-white.png",
}

export const navLinks = [
  { label: "Home", href: "/" },
  { label: "Ebook", href: "/ebook" },
  { label: "Course", href: "/course" },
  { label: "Mastermind", href: "/mastermind" },
  { label: "Books", href: "/books" },
  { label: "Testimonials", href: "/testimonials" },
  { label: "Founder", href: "/about-marc" },
]

// SamCart checkout link for the e-book. Empty when unset so the buy button can
// render a disabled state instead of linking buyers to a dead/placeholder URL.
export const ebookPurchaseUrl = import.meta.env.VITE_SAMCART_EBOOK_URL ?? ""

export const ebookCoverUrl = publicStorageUrl(storageAssets.ebookCover)

export const courseCoverUrl = publicStorageUrl(storageAssets.courseCover)

export const mastermindZoomUrl = publicStorageUrl(storageAssets.mastermindZoom)

export const introVideoUrl = publicStorageUrl(storageAssets.introVideo)

// The three things Faith on Fire sells. Single source of truth for the
// homepage offer cards and any cross-sell grids. `image` is null for offers
// that don't have real artwork yet — the UI falls back to a styled icon
// placeholder so every card keeps the same aspect ratio.
export const offers = [
  {
    key: "ebook",
    icon: "Book01Icon",
    eyebrow: "The E-book",
    title: "Get the E-book",
    description: "Start the Faith on Fire Blueprint today.",
    ctaLabel: "Get the E-book",
    href: "/ebook",
    image: ebookCoverUrl,
    imagePosition: "center",
  },
  {
    key: "course",
    icon: "Compass01Icon",
    eyebrow: "The Course",
    title: "The Blueprint",
    description: "The 11-module roadmap to return, restore, reignite.",
    ctaLabel: "Get the Course",
    href: "/course",
    image: courseCoverUrl,
    // The source photo is a wide landscape with Marc positioned right of
    // center — shift the crop focal point so his face stays in frame on the
    // narrower portrait card instead of centering on the background.
    imagePosition: "97% center",
  },
  {
    key: "mastermind",
    icon: "UserGroup03Icon",
    eyebrow: "The Brotherhood",
    title: "Weekly Mastermind",
    description: "The Brotherhood — real accountability. Brothers for life.",
    ctaLabel: "Join the Mastermind",
    href: "/mastermind",
    image: mastermindZoomUrl as string | null,
    imagePosition: "center 70%",
  },
] as const

export const pillarImageUrl = publicStorageUrl(storageAssets.pillarShared)

// Manually maintained to match the live Stripe/SamCart prices — shown next to
// every buy CTA so a man knows the cost and the guarantee before he clicks.
export const pricing = {
  ebook: { priceDisplay: "$7", guarantee: "One-time payment" },
  course: { priceDisplay: "$97", guarantee: "One-time payment" },
  mastermind: { priceDisplay: "$397/month", guarantee: "Cancel any time" },
} as const

export const books = [
  {
    title: "The Wisdom Journal",
    subtitle: "31 Proverbs. 31 Days. Wisdom for life.",
    description:
      "A daily Proverbs journal for turning reflection into practical wisdom, faith, and life application.",
    image: "/assets/marc/book-wisdom-journal-cover.jpg",
    url: "https://www.amazon.com/Wisdom-Journal-Proverbs-Days-Life/dp/B08KM829RJ",
  },
  {
    title: "The Wisdom Journal For Parents",
    subtitle: "31 Proverbs. 31 Days. Wisdom for parents.",
    description:
      "A parent-focused Proverbs journal for building wisdom, clarity, and faith-centered leadership at home.",
    image: "/assets/marc/book-wisdom-journal-parents.jpg",
    url: "https://www.amazon.com/Wisdom-Journal-Parents-Days-31-Proverbs-Wisdom/dp/B0DQJ7QJVS",
  },
  {
    title: "The Wisdom Journal For Teens",
    subtitle: "31 Proverbs. 31 Days. Wisdom for teens.",
    description:
      "A teen-focused Proverbs journal for growing in wisdom, confidence, character, and daily direction.",
    image: "/assets/marc/book-wisdom-journal-teens.jpg",
    url: "https://www.amazon.com/Wisdom-Journal-Teens-Proverbs-31-Days-Wisdom/dp/B0DQ4K9DBK",
  },
  {
    title: "The Dream Teen",
    subtitle: "3 life-changing steps for parents to empower teens.",
    description:
      "A parent-focused framework for helping teens become connected, confident, committed, and resilient.",
    image: "/assets/marc/book-full-power.jpg",
    url: "https://www.amazon.com/Dream-Teen-CONNECTED-CONFIDENT-Extraordinary/dp/B0DNW5T35H",
  },
  {
    title: "Debt Settlement's Dirty Little Secrets",
    subtitle: "Exposing the truth. Protecting your wallet.",
    description:
      "A consumer protection guide that reveals costly debt settlement traps and points toward better options.",
    image: "/assets/marc/book-wisdom-journal.png",
    url: "https://www.amazon.com/Debt-Settlements-Dirty-Little-Secrets/dp/B0FLXSV3XD",
  },
  {
    title: "Full Power",
    subtitle: "Healing trauma. Restoring purpose. Living free.",
    description:
      "A story-driven guide for transforming pain, resentment, betrayal, and loss into purpose and freedom.",
    image: "/assets/marc/book-dream-teen.jpg",
    url: "https://www.amazon.com/Full-Power-Unforgiveness-Steals-Simple/dp/1978215282",
  },
]

export const pillars = [
  {
    key: "return",
    title: "Return",
    subtitle: "Repentance, Honesty, Coming Back to God",
    description:
      "Return begins not with right behavior, but with an open heart. One honest prayer can undo years of distance. It's the courageous moment you stop running and let God catch up with you.",
    verse: "“If we confess our sins, he is faithful and just and will forgive us our sins.” — 1 John 1:9",
  },
  {
    key: "restore",
    title: "Restore",
    subtitle: "Healing the Man in the Mirror & Rebuilding Relationships",
    description:
      "You cannot build a new life on an unhealed foundation. Restoration means making peace with the man in the mirror, releasing old shame, and rebuilding what drift has broken.",
    verse: "“We are God’s workmanship, created in Christ Jesus to do good works.” — Ephesians 2:10",
  },
  {
    key: "reignite",
    title: "Reignite",
    subtitle: "Aligning With Your God-given Assignment",
    description:
      "Your calling didn't expire while you were away. Purpose isn't something you find — it's something you align with. It's time to walk in the assignment God placed in you before you were born.",
    verse: "“Live a life worthy of the calling you have received.” — Ephesians 4:1",
  },
]

export const problemCards = [
  {
    key: "isolation",
    title: "Isolation",
    stat: "34%",
    image: publicStorageUrl(storageAssets.problemIsolation),
    description:
      "A lone sheep is easy prey. Isolation is one of the enemy's oldest weapons — the man who fell hard almost always fell alone.",
  },
  {
    key: "guilt-shame",
    title: "Guilt & Shame",
    stat: "28%",
    image: publicStorageUrl(storageAssets.problemGuiltShame),
    description:
      "Old failures and regrets linger in the mirror, whispering that you'll always be defined by your lowest moment. That whisper is a lie.",
  },
  {
    key: "lack-of-direction",
    title: "Lack of Direction",
    stat: "17%",
    image: publicStorageUrl(storageAssets.problemLackOfDirection),
    description:
      "The noise of life, the weight of sin, and the distraction of survival have buried your assignment. It hasn't disappeared. It's waiting.",
  },
  {
    key: "forgiveness",
    title: "Forgiveness Struggles",
    stat: "12%",
    image: publicStorageUrl(storageAssets.problemForgiveness),
    description:
      "Unforgiveness is a prison you built and locked yourself — the person you haven't forgiven is living free while you stay in chains.",
  },
  {
    key: "other",
    title: "Other",
    stat: "9%",
    image: publicStorageUrl(storageAssets.problemOther),
    description:
      "Other struggles often trace back to the same ache: the God-shaped void that nothing else can truly fill.",
  },
]

export const problemStatSource =
  "Based on a survey of 250 men in faith recovery (2025) — Faith on Fire survey results."

export const costOfStayingAway = [
  {
    title: "Emptiness That Won't Leave",
    description:
      "When a man is far from God, success, work, relationships, and distraction still leave a God-shaped void.",
  },
  {
    title: "The Cycle of Guilt and Regret",
    description:
      "Distance from God quietly launches the repeated cycle of striving, regret, and trying to outrun consequences.",
  },
  {
    title: "Longing for Home",
    description:
      "The ache for peace and purpose is not a dead end. It is often the signal that the way home is still open.",
  },
]

export const brotherhoodLies = [
  {
    title: "Too Far Gone",
    description:
      "No matter where you've been or what you've done, God's grace is greater than your past pain and mistakes.",
  },
  {
    title: "Too Late",
    description:
      "Restoration is available today. You are not too old, and it is never too late to return.",
  },
  {
    title: "God Has Moved On",
    description:
      "God's love has not failed, and He has not left. Turn around. He is still right there.",
  },
  {
    title: "I Can Do It Alone",
    description:
      "Isolation is spiritual danger. Men are designed for connection, community, and accountability.",
  },
]

export const experienceItems = [
  {
    title: "Weekly Connection With Other Men",
    description:
      "A standing weekly mastermind where men show up, tell the truth, and get sharpened by other men who are also on fire.",
    icon: "UserGroup03Icon",
  },
  {
    title: "Prayer, Scripture & Praise Rhythms",
    description:
      "Daily habits that keep the fire burning — prayer, the Word, and praise are the three weapons that keep a man spiritually sharp.",
    icon: "Book01Icon",
  },
  {
    title: "Accountability & Real Conversations",
    description:
      "Brothers who have permission to ask the hard questions — and the safety to answer them honestly.",
    icon: "Chat01Icon",
  },
  {
    title: "Guided Reflection & Action Steps",
    description:
      "Every teaching ends in a decision. Reflection without action is just information — we push you toward obedience in motion.",
    icon: "Idea01Icon",
  },
  {
    title: "Commitment Letters & Growth Exercises",
    description:
      "Written, signed commitments witnessed by a brother — because a decision you've spoken out loud is harder to walk away from.",
    icon: "CheckmarkCircle02Icon",
  },
  {
    title: "A Clear Roadmap for Spiritual Momentum",
    description:
      "Return. Restore. Reignite. A simple three-pillar roadmap that has changed countless lives — including the founder's own.",
    icon: "Compass01Icon",
  },
]

export const blueprintModules = [
  {
    number: 1,
    slug: "welcome",
    title: "Welcome to Faith on Fire",
    subtitle: "An Orientation to the Three-Pillar Journey",
    keyTeaching:
      "Spiritual drift doesn't happen overnight. It happens slowly — one compromise, one distraction, one silent morning at a time. Before we can move forward, we have to get honest about what staying away from God has actually cost us. Not to produce shame, but to produce hunger. This Blueprint is your roadmap: Return to God, Restore your Relationships, and Reignite your Purpose.",
    reflectionPreview:
      "When did you first notice the distance between you and God? What has spiritual drift cost you in your relationships, your peace, your sense of purpose?",
    declaration:
      "A one-paragraph statement about why you are committed to this process and what you are believing God for by the end of it.",
    actionStep:
      "Find a quiet place and spend 10 minutes in complete silence. No phone, no music. Ask God one question: “Lord, where have I been?” Then listen.",
    tool: "Cost of Drift Inventory",
    toolDescription:
      "Name the specific costs of drift, replace vague guilt with concrete repentance targets, and calendar three silent mornings.",
  },
  {
    number: 2,
    slug: "the-drift",
    title: "Pillar #1: Return to God | Module 1: The Drift",
    subtitle: "Understanding How Spiritual Distance Happens and What It Costs",
    keyTeaching:
      "Most men don't drift from God in one dramatic moment. They drift slowly — one compromise, one distraction, one silent morning at a time. Before you can return, you have to get honest about where you've been and what the distance has truly cost you. Not to produce shame, but to produce hunger for something better.",
    reflectionPreview:
      "When did the drift begin for you? What has the distance from God cost you — in your peace, your relationships, your sense of purpose?",
    declaration:
      "A one-paragraph statement naming the cost of your drift and declaring why you are ready to turn back to God.",
    actionStep:
      "Spend 10 minutes in silence. No phone, no music. Ask God one question: “Lord, where have I been?” Then write down what surfaces.",
    tool: "Cost of Drift Inventory",
    toolDescription:
      "Name the specific costs of drift across your faith, family, finances, and purpose — and replace vague guilt with concrete repentance targets.",
  },
  {
    number: 3,
    slug: "three-steps-back-to-god",
    title: "Pillar #1: Return to God | Module 2: The Three Steps Back to God",
    subtitle: "The Powerful Path of Confession, Repentance, and Recommitment",
    keyTeaching:
      "Most men don't come back to God because they believe they've gone too far. That's the enemy's greatest lie. Repentance isn't a feeling — it's a decision. The moment you turn your face toward the Father and take one step in His direction, He runs to meet you. Confession. Repentance. Recommitment. Three steps, and the door is open.",
    reflectionPreview:
      "What has shame told you about your ability to return to God? Is that true? What would it feel like to be fully forgiven and fully restored?",
    declaration: "Your personal prayer of repentance, written in your own words. Make it real. Make it yours.",
    actionStep:
      "Pray your repentance prayer out loud — not in your head. Then write today's date as a memorial marker of the day you turned back.",
    tool: "Personal Inventory",
    toolDescription:
      "Walk through pride, sexual sin, anger, dishonesty, neglected relationships, addiction, and idolatry with a clear yes-or-no inventory.",
  },
  {
    number: 4,
    slug: "new-daily-disciplines",
    title: "Pillar #1: Return to God | Module 3: New Daily Disciplines",
    subtitle: "Prayer, the Word, and Praise as the Weapons That Keep You Connected",
    keyTeaching:
      "Returning to God is a decision. Staying close to God is a discipline. Prayer, the Word, and Praise aren't religious rituals — they're the daily weapons God gave you to stay spiritually strong. The men who stay on fire aren't the ones with the biggest mountaintop experience. They're the ones who show up every single morning.",
    reflectionPreview:
      "What does your current daily time with God actually look like? What would a realistic daily rhythm look like for your real life and schedule?",
    declaration: "The Pillar #1 Return to God Commitment Letter — read aloud and signed before a witness.",
    actionStep:
      "Start a 7-day prayer journal. Each morning, write one thing you're asking God for and one thing you're thanking Him for.",
    tool: "Build Your Daily Rhythm",
    toolDescription:
      "Set a prayer time, Scripture plan, praise practice, and non-negotiable quiet-time location for your real schedule.",
  },
  {
    number: 5,
    slug: "assess-the-damage",
    title: "Pillar #2: Restore your Relationships | Module 1: Assess the Damage",
    subtitle: "Getting Honest About What Drift Has Cost the People Closest to You",
    keyTeaching:
      "You cannot build a new life on an unhealed foundation. Before your relationships can be restored, you have to get honest about the damage that has been done — not to produce guilt, but to produce a clear repair plan. The man who refuses to look at the wreckage is the man who never rebuilds.",
    reflectionPreview:
      "Which relationships have suffered the most during your drift? What has your absence, anger, or avoidance cost the people who needed you most?",
    declaration: "A covenant with yourself — a promise, with God's help, to face the damage honestly and begin the work of restoration.",
    actionStep:
      "Write a letter to the man you have been. Not to shame him, but to release him. Thank him for surviving, then tell him it's time to step aside.",
    tool: "Restoration Inventory",
    toolDescription:
      "Score key relationships from 1-10, circle the lowest score, and use that as the starting point for restoration work.",
  },
  {
    number: 6,
    slug: "repair-the-damage",
    title: "Pillar #2: Restore your Relationships | Module 2: Repair the Damage",
    subtitle: "Forgiveness, Restitution, and the Work of Rebuilding Trust",
    keyTeaching:
      "Unforgiveness is not a moral failure. It's a prison — and the cruel irony is that you built it, you locked it, and you're the only one sitting inside it. Forgiveness isn't saying what happened was okay. It's saying you refuse to let what happened keep owning you. Repair begins with release.",
    reflectionPreview:
      "Who do you need to forgive that you haven't? What has unforgiveness cost you emotionally, physically, spiritually, relationally?",
    declaration: "The Pillar #2 Restore your Relationships Commitment Letter — read aloud and signed before a witness.",
    actionStep:
      "Choose one person from your forgiveness list. Pray specifically for them every day this week, and watch what God does in your own heart.",
    tool: "Forgiveness List",
    toolDescription:
      "Write every name you need to release, identify the hardest one, and pair prayer with the daily practice of release.",
  },
  {
    number: 7,
    slug: "return-to-power",
    title: "Pillar #2: Restore your Relationships | Module 3: Return to Power",
    subtitle: "Stepping Into the Man God Created You to Be — Healed, Whole, and Present",
    keyTeaching:
      "A restored man is a powerful man — not powerful in the world's sense, but in the spiritual sense. Healed, whole, present, and accountable. The enemy fears the man who has done the inner work, repaired the outer damage, and is now standing in his God-given identity. That man is you. Now stand in it.",
    reflectionPreview:
      "What does the fully restored version of you look like as a man, a father, a husband, a friend? Who are the men currently in your life who will hold you to that version?",
    declaration: "Your New Man Declaration — a bold, specific statement of who you are and how you will live from this day forward.",
    actionStep:
      "Read your New Man Declaration out loud every morning for the next 30 days. Put it on your mirror, your phone, or your Bible.",
    tool: "New Man Declaration",
    toolDescription:
      "Write a bold, specific statement of who you are, what you believe, and how you will live as a restored man from this day forward.",
  },
  {
    number: 8,
    slug: "profits-passion-and-purpose",
    title: "Pillar #3: Reignite your Purpose | Module 1: Profits, Passion, and Purpose",
    subtitle: "Discovering How Your Gifts, Income, and Calling Can Align",
    keyTeaching:
      "Purpose is not something you find. It's something you align with. God didn't hide your assignment — the noise of life, the weight of sin, and the distraction of survival buried it. When your passion, your gifts, and your financial stewardship align with your God-given calling, you're not just working — you're on mission.",
    reflectionPreview:
      "What do people consistently come to you for, without you advertising it? If money were not a factor, what would you spend your days doing for God and others?",
    declaration: "Your God-given assignment, written in one sentence — then spoken out loud to a brother.",
    actionStep:
      "Share your one-sentence assignment with one person in your brotherhood this week. Saying it out loud makes it real.",
    tool: "Assignment Discovery Exercise",
    toolDescription:
      "Clarify when you feel most alive, whom you are called to serve, and the problem you were put here to help solve.",
  },
  {
    number: 9,
    slug: "fan-the-flame",
    title: "Pillar #3: Reignite your Purpose | Module 2: Fan the Flame",
    subtitle: "The Habits, Rhythms, and Decisions That Keep Your Fire Burning",
    keyTeaching:
      "The hardest part of transformation isn't the breakthrough. It's the Tuesday after. The men who stay on fire aren't the ones who never struggle — they're the ones who have a system that brings them back quickly when they do. Fan the flame daily, or the fire goes cold.",
    reflectionPreview:
      "What are your three biggest personal triggers for spiritual drift? What is your plan for getting back on track within 24 hours when you have a hard day?",
    declaration: "Your daily fire plan — a practical commitment to keep walking with God and trusted brothers no matter what.",
    actionStep:
      "Build your personal fire plan — daily non-negotiables, weekly anchors, early warning signs, and your 24-Hour Recovery Plan.",
    tool: "Daily Fire Plan",
    toolDescription:
      "Define daily non-negotiables, weekly anchors, early warning signs, and your 24-Hour Recovery Plan.",
  },
  {
    number: 10,
    slug: "the-mission-minded-man",
    title: "Pillar #3: Reignite your Purpose | Module 3: The Mission-Minded Man",
    subtitle: "Walking in Your God-given Assignment and Multiplying What You've Received",
    keyTeaching:
      "You made it. Let that sink in. You started this as one man, and you're finishing it as another. The Mission-Minded Man doesn't just live for himself — he leads others. He multiplies what he has received. Your story isn't meant to end here. It's meant to fuel someone else's beginning.",
    reflectionPreview:
      "What is the single most powerful thing God showed you through this process? Who in your life needs to go through it next?",
    declaration: "The Pillar #3 Reignite your Purpose Commitment Letter — read aloud and signed before a witness.",
    actionStep:
      "Go to faithonfire.world and join the Weekly Mastermind / Brotherhood. Your breakthrough is in the work — and the work continues in brotherhood.",
    tool: "Letter to the Man You Were",
    toolDescription:
      "Write the man you were when you started, tell him what you found, and name how you will serve other men next.",
  },
  {
    number: 11,
    slug: "remain-connected",
    title: "Remain Connected",
    subtitle: "Staying Locked Into Brotherhood and Accountability for Life",
    keyTeaching:
      "The journey doesn't end with a completed workbook. The men who stay transformed are the men who stay connected — to God, to brothers, and to their mission. Isolation is where drift begins again. Brotherhood is where fire is kept alive. Remain connected, and you remain on fire.",
    reflectionPreview:
      "What does staying connected look like in your real, everyday life? What rhythms, people, and communities will you commit to for the long haul?",
    declaration: "A final commitment to remain connected to God, to brotherhood, and to your God-given mission — for life.",
    actionStep:
      "Identify one concrete step to deepen your brotherhood connection this week — a call, a coffee, a commitment to the weekly mastermind.",
    tool: "Stay Connected Plan",
    toolDescription:
      "Define your ongoing spiritual community, weekly check-in rhythms, and the one or two men who will hold you accountable for life.",
  },
]

export const moduleTools = blueprintModules.map((module) => ({
  module: `Module ${module.number}`,
  title: module.tool,
  description: module.toolDescription,
  source: "Included in the workbook",
}))

export const commitmentLetters = [
  {
    pillar: "Pillar #1: Return to God",
    title: "Return to God Commitment Letter",
    description:
      "A signed decision to stop running, turn away from what created distance, and return to God with prayer, Word, praise, and brotherhood.",
  },
  {
    pillar: "Pillar #2: Restore your Relationships",
    title: "Restore your Relationships Commitment Letter",
    description:
      "A signed choice to face the damage honestly, forgive what needs to be forgiven, and rebuild trust one courageous step at a time.",
  },
  {
    pillar: "Pillar #3: Reignite your Purpose",
    title: "Reignite your Purpose Commitment Letter",
    description:
      "A signed commitment to align your time, energy, decisions, and relationships with the God-given mission still burning inside you.",
  },
]

export const scriptureAnchors = [
  { reference: "1 John 1:9", theme: "Return", note: "Confession, forgiveness, and cleansing." },
  { reference: "Romans 12:2", theme: "Reconnect", note: "Renewing the mind through God's Word." },
  { reference: "Proverbs 27:17", theme: "Brotherhood", note: "Iron sharpening iron." },
  { reference: "Ephesians 2:10", theme: "Restore", note: "Identity rooted in God's workmanship." },
  { reference: "Matthew 6:14-15", theme: "Forgiveness", note: "Freedom through release." },
  { reference: "Ephesians 4:1", theme: "Reignite", note: "Living worthy of the calling received." },
  { reference: "Hebrews 10:24-25", theme: "Brotherhood", note: "Keep meeting, encouraging, and spurring one another on." },
]

export const resources = [
  {
    title: "Men's Accountability Groups",
    description:
      "Weekly connection with a group of men offers lasting support, accountability, and a safe place to be vulnerable.",
    icon: "UserGroup03Icon",
  },
  {
    title: "Faith Study Workbooks",
    description:
      "Practical guides for daily devotional rhythms, reflection, and deeper scripture engagement.",
    icon: "BookOpen01Icon",
  },
  {
    title: "Journaling Discipline",
    description:
      "Journaling helps you track growth, process struggles, and celebrate spiritual wins. Start with 5 minutes each morning and/or evening.",
    icon: "Edit02Icon",
  },
  {
    title: "Prayer Rhythm",
    description:
      "Build a daily rhythm — minutes in prayer, chapters of Scripture, a way to incorporate praise, and a non-negotiable quiet-time location.",
    icon: "HandPrayerIcon",
  },
  {
    title: "Scripture Anchors",
    description:
      "Keep a pocket reference of key scriptures for the moments doubt, fear, or temptation try to pull you off course.",
    icon: "Book02Icon",
  },
  {
    title: "24-Hour Recovery Plan",
    description:
      "When you drift — and there will be days you drift — your commitment is to return within 24 hours. No shame spiral. No extended absence.",
    icon: "Target01Icon",
  },
  {
    title: "Forgiveness Prayer",
    description:
      "A short forgiveness prayer you can repeat daily, paired with a breath prayer: on inhale, “Lord have mercy.” On exhale, “I release them.”",
    icon: "HeartHandshakeIcon",
  },
  {
    title: "New Man Declaration",
    description:
      "A bold, specific, personal statement of who you are and how you will live — read aloud every morning until it becomes who you are.",
    icon: "CheckmarkCircle02Icon",
  },
]

export const founder = {
  name: "Marc Feinberg",
  role: "Founder, Faith on Fire",
  quote:
    "After 31 years, I found myself on my knees, broken yet finally ready. If He can receive me, He is longing to welcome you too.",
  bio:
    "Marc started Faith on Fire after walking his own road back to God — the slow drift, the silent ache of spiritual distance, and the moment he finally came home. He built the Return, Restore, Reignite roadmap not as theory, but as the path that changed his own life first. Today, he's a guide for men ready to stop drifting and start walking with God again.",
}

export const testimonials = [
  {
    quote: "Coach Marc is the real deal.",
    name: "Evander Holyfield, 5X Heavyweight Champion",
    videoUrl: "https://www.youtube.com/watch?v=Jw3kQg8Q3sg&t=6s",
    videoId: "Jw3kQg8Q3sg",
    videoStart: 6,
  },
  {
    quote: "This is the man to meet, Coach Marc.",
    name: "Shannon Briggs, 2X Heavyweight Champion",
    videoUrl: "https://www.youtube.com/watch?v=z8yDajqhrBU&t=32s",
    videoId: "z8yDajqhrBU",
    videoStart: 32,
  },
  {
    quote: "He opened my mind.",
    name: "Henry Tillman, Olympic Heavyweight Gold Medalist",
    videoUrl: "https://www.youtube.com/watch?v=N39saWdaBr0",
    videoId: "N39saWdaBr0",
  },
  {
    quote: "You need somebody to help you, and that would be Marc.",
    name: "Pastor Kevin Jackson, Best Selling Author",
    videoUrl: "https://www.youtube.com/watch?v=_Lp_VW6zr88",
    videoId: "_Lp_VW6zr88",
  },
]

export const faithOnFireTestimonials = [
  {
    headline: "He Grew Up Christian, But Faith on Fire Made His Faith Real",
    quote:
      "He grew up in church and surrounded by Christianity, but for a long time it never felt personal. Through Faith on Fire's brotherhood, teaching, and deeper walk with God, his faith became real, meaningful, and valuable in his life.",
    name: "Faith on Fire Testimony",
    videoUrl: "https://youtu.be/qnsFs6p2ESQ",
    videoId: "qnsFs6p2ESQ",
  },
  {
    headline: "27-Year-Old Man Shares How Faith on Fire Changed His Life",
    quote:
      "A 27-year-old man shares his journey of transformation, faith, and renewed purpose. Through the Faith on Fire brotherhood, he discovered what it means to return to God, restore what matters most, and reignite his purpose.",
    name: "Faith on Fire Testimony",
    videoUrl: "https://youtu.be/lbaGzk0Uahw",
    videoId: "lbaGzk0Uahw",
  },
]

export const communityForWho = [
  "Men ready to return, rebuild, and run their race.",
  "Men who want accountability, not performance.",
  "Men who want honesty, not hiding.",
  "Men who want discipline, not drift.",
  "Men willing to show up even when it's uncomfortable.",
]

export const communityNotForWho = [
  "Men looking for a passive content feed with no action steps.",
  "Men unwilling to be honest about where they actually are.",
  "Men who want a quick fix instead of a daily discipline.",
  "Men not ready to be known by other men.",
]

export const memberJourney = [
  {
    step: "1",
    title: "Wake Up",
    description: "Get honest about what spiritual drift has actually cost you.",
  },
  {
    step: "2",
    title: "Return & Reconnect",
    description: "One honest prayer, then daily rhythms of prayer, Word, and praise.",
  },
  {
    step: "3",
    title: "Find Your People",
    description: "Step into the weekly mastermind and stop doing this alone.",
  },
  {
    step: "4",
    title: "Restore & Forgive",
    description: "Make peace with the man in the mirror and release what's been holding you captive.",
  },
  {
    step: "5",
    title: "Reignite",
    description: "Get clear on your God-given assignment and take the first bold step.",
  },
  {
    step: "6",
    title: "Stay Connected",
    description: "Build daily rhythms and stay connected to the brotherhood for life.",
  },
]

export const courseFaqs = [
  {
    question: "Is this just videos, or is it actually interactive?",
    answer:
      "Every module follows the same structure: Key Teaching, Reflection Questions, a Declaration, and an Action Step you complete that week — including three signed commitment letters. It's built to be worked through, not watched passively.",
  },
  {
    question: "How much time does it take each week?",
    answer:
      "Most men move through one module per week, with 30-60 minutes for the teaching, reflection, and action step combined. You can move at your own pace.",
  },
  {
    question: "Do I need to already be 'where I should be' spiritually to start?",
    answer:
      "No — the course starts with the Wake-Up Call module specifically for men who feel they've drifted. Wherever you're starting from is the right place to start.",
  },
  {
    question: "What if it's not for me?",
    answer:
      "Go through it in good faith. If it isn't for you, email support@faithonfire.world and we'll make it right.",
  },
  {
    question: "Do I need the Mastermind to do the Course?",
    answer:
      "No, the Course stands on its own. Many men go through it on their own first, then join the Weekly Mastermind to walk it out with brothers.",
  },
] as const

export const mastermindFaqs = [
  {
    question: "What actually happens in a weekly session?",
    answer:
      "A standing weekly call built on Key Teaching, reflection, a declaration, and an action step — plus honest, real conversation with men who will ask the hard questions.",
  },
  {
    question: "Can I cancel any time?",
    answer:
      "Yes. The Mastermind is a recurring monthly membership and you can cancel any time — there's no contract or lock-in period.",
  },
  {
    question: "Do I need to take the Course first?",
    answer:
      "No. The Course and the Mastermind reinforce each other, but you can join the Mastermind on its own and start with weekly brotherhood right away.",
  },
  {
    question: "Is this group therapy or counseling?",
    answer:
      "No. The Mastermind is brotherhood and accountability, not clinical therapy. If you're working through a clinical mental-health issue, we'd encourage a licensed counselor alongside the brotherhood.",
  },
  {
    question: "What if I miss a week?",
    answer:
      "Life happens. There's no penalty for missing a session — just show up the following week and reconnect with your brothers.",
  },
] as const

// ── Member areas (authenticated) ────────────────────────────────────────────

// Placeholder run-times so each module reads like a real video lesson. The
const lessonDurations: Record<number, string> = {
  1: "11 min",
  2: "11 min",
  3: "12 min",
  4: "18 min",
  5: "14 min",
  6: "13 min",
  7: "12 min",
  8: "10 min",
  9: "13 min",
  10: "10 min",
  11: "8 min",
}

export const courseLessons = blueprintModules.map((module) => ({
  number: module.number,
  slug: module.slug,
  title: module.title,
  subtitle: module.subtitle,
  duration: lessonDurations[module.number] ?? "15 min",
}))

// The 15-minute consultation offer, reused on both member pages.
export const consultation = {
  eyebrow: "Members-Only Perk",
  title: "Book a free 15-min call with Marc",
  description:
    "Get personal direction on where you are in the journey. Bring one question, one struggle, or one decision — and walk away with a clear next step.",
  ctaLabel: "Grab Your Free 15 Minutes",
} as const

// The weekly Brotherhood mastermind cadence. Same Zoom link every week.
export const mastermindSchedule = {
  recurring: "Every Saturday · 10:00 AM EST",
  duration: "90 minutes",
  note: "Same Zoom link every week — bookmark it. No session is ever recorded over, so you can always catch the replay.",
  agenda: [
    { time: "10:00", label: "Welcome & Check-in", description: "Open the room, settle in, and name where you really are this week." },
    { time: "10:15", label: "Key Teaching", description: "Marc walks the week's teaching — straight from the Blueprint." },
    { time: "10:40", label: "Brotherhood Breakouts", description: "Smaller groups for honest conversation and real accountability." },
    { time: "11:10", label: "Declaration & Action Step", description: "Commit out loud to your one action for the week ahead." },
  ],
} as const

// Value reinforcement for the $397/mo membership — what's actually included.
export const mastermindPerks = [
  {
    icon: "UserGroup03Icon",
    title: "Live Weekly Mastermind",
    description: "90 minutes every Saturday with Marc and the brotherhood — accountability you can't get alone.",
  },
  {
    icon: "PlayIcon",
    title: "Full Session Replay Library",
    description: "Miss a week? Every session is saved so you never fall behind.",
  },
  {
    icon: "Calendar03Icon",
    title: "Monthly 1:1 With Marc",
    description: "Personal direction on your walk, your assignment, and your next move.",
  },
  {
    icon: "Download04Icon",
    title: "Member Resource Vault",
    description: "Workbook tools, commitment letters, and downloads — all in one place.",
  },
  {
    icon: "Fire03Icon",
    title: "Direct Brotherhood Access",
    description: "Brothers in your corner between sessions, not just on Saturdays.",
  },
  {
    icon: "Award01Icon",
    title: "Cancel Any Time",
    description: "No contract, no lock-in. Stay because it's worth it — month after month.",
  },
] as const
