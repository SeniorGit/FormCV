import { ACCENTS, DEFAULT_ORDER, OPTIONAL_SECTIONS, PERSONAL, SECTIONS, emptyEntry, emptyObject } from './sections'

export const STORAGE_VERSION = 1

const BLANK_ENABLED = ['summary', 'experience', 'education', 'skills']

function baseResume() {
  const resume = {
    version: STORAGE_VERSION,
    sample: false,
    settings: { accent: ACCENTS[0].id, density: 'standard' },
    layout: {
      order: [...DEFAULT_ORDER],
      enabled: Object.fromEntries(DEFAULT_ORDER.map((id) => [id, BLANK_ENABLED.includes(id)])),
    },
    personal: emptyObject(PERSONAL),
  }
  for (const s of OPTIONAL_SECTIONS) resume[s.id] = s.kind === 'list' ? [] : emptyObject(s)
  return resume
}

export function createBlankResume() {
  return baseResume()
}

const entry = (id, values) => emptyEntry(SECTIONS[id], values)

export function createSampleResume() {
  const r = baseResume()
  r.sample = true
  r.layout.enabled = Object.fromEntries(DEFAULT_ORDER.map((id) => [id, id !== 'custom']))

  r.personal = {
    fullName: 'Jordan Rivers',
    title: 'Backend Software Engineer',
    email: 'jordan.rivers@example.com',
    phone: '+1 555 010 4477',
    location: 'Austin, TX, USA',
    linkedin: 'linkedin.com/in/jordan-rivers',
    github: 'github.com/jordanrivers',
    portfolio: 'jordanrivers.example.com',
  }

  r.summary = {
    text: 'Backend engineer with four years of experience building REST APIs and data pipelines for logistics and fintech products. Comfortable across the stack, with a focus on reliable services, clear documentation and maintainable code. Looking for a role where I can own services end to end.',
  }

  r.experience = [
    entry('experience', {
      title: 'Software Engineer',
      company: 'Northwind Logistics',
      location: 'Austin, TX',
      start: '2023-02',
      current: true,
      description: [
        'Developed REST APIs with ASP.NET Core that serve shipment tracking to 40+ internal and partner clients.',
        'Reduced report generation time from 12 minutes to under 2 by moving aggregation into PostgreSQL views.',
        'Introduced integration tests and CI checks that cut regression bugs found after release.',
      ].join('\n'),
    }),
    entry('experience', {
      title: 'Junior Developer',
      company: 'Brightside Payments',
      location: 'Remote',
      start: '2021-06',
      end: '2023-01',
      description: [
        'Implemented payment reconciliation jobs in C# that replaced a manual spreadsheet process.',
        'Wrote and maintained SQL Server stored procedures and reporting queries used by the finance team.',
        'Documented internal services and onboarded two new team members.',
      ].join('\n'),
    }),
  ]

  r.education = [
    entry('education', {
      degree: 'B.Sc. in Computer Science',
      institution: 'University of Texas at Austin',
      location: 'Austin, TX',
      start: '2017-08',
      end: '2021-05',
      description: 'Relevant coursework: Databases, Distributed Systems, Algorithms.',
    }),
  ]

  r.skills = [
    entry('skills', { category: 'Programming Languages', items: 'C#, TypeScript, JavaScript, SQL, Python' }),
    entry('skills', { category: 'Frameworks', items: 'ASP.NET Core, Entity Framework, React, Express' }),
    entry('skills', { category: 'Databases', items: 'PostgreSQL, SQL Server, Redis' }),
    entry('skills', { category: 'Tools', items: 'Git, Docker, GitHub Actions, Postman, Azure DevOps' }),
    entry('skills', { category: 'Languages', items: 'English (fluent), Spanish (conversational)' }),
  ]

  r.projects = [
    entry('projects', {
      name: 'Inventory Tracker',
      role: 'Solo developer',
      technologies: 'ASP.NET Core, PostgreSQL, React',
      github: 'github.com/jordanrivers/inventory-tracker',
      description: [
        'Built a web app for small shops to track stock levels and low-inventory alerts.',
        'Added role-based access and audit logging for every stock change.',
      ].join('\n'),
    }),
  ]

  r.certifications = [
    entry('certifications', {
      name: 'Microsoft Certified: Azure Developer Associate',
      issuer: 'Microsoft',
      issueDate: '2024-03',
      expiryDate: '2025-03',
      credentialId: 'EXAMPLE-12345',
    }),
  ]

  r.awards = [
    entry('awards', {
      title: 'Engineering Excellence Award',
      issuer: 'Northwind Logistics',
      date: '2024-12',
      description: 'Recognised for leading the tracking API migration with zero downtime.',
    }),
  ]

  r.organizations = [
    entry('organizations', {
      name: 'Austin Open Source Meetup',
      role: 'Volunteer Organizer',
      start: '2022-01',
      current: true,
      description: 'Organise monthly talks for 60+ attendees and coordinate speakers.',
    }),
  ]

  return r
}
