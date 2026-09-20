import { uid } from '../utils/id'

export const ACCENTS = [
  { id: 'navy', label: 'Navy', value: '#1f3b5c' },
  { id: 'teal', label: 'Teal', value: '#1d5555' },
  { id: 'burgundy', label: 'Burgundy', value: '#6e2233' },
  { id: 'graphite', label: 'Graphite', value: '#2b2f36' },
]

export const DENSITIES = [
  { id: 'compact', label: 'Compact' },
  { id: 'standard', label: 'Standard' },
  { id: 'relaxed', label: 'Relaxed' },
]

export const SKILL_CATEGORY_SUGGESTIONS = [
  'Programming Languages',
  'Frameworks',
  'Databases',
  'Tools',
  'Languages',
  'Other Skills',
]

const BULLET_HINT =
  'One achievement per line. Start with an action verb and end with the result, e.g. “Built a REST API with ASP.NET Core that reduced manual data processing by 30%.” Only include numbers that are true.'

export const PERSONAL = {
  id: 'personal',
  kind: 'object',
  title: 'Personal Information',
  required: true,
  fields: [
    { key: 'fullName', label: 'Full name', type: 'text', required: true, span: 2, autoComplete: 'name' },
    {
      key: 'title',
      label: 'Professional title / target role',
      type: 'text',
      span: 2,
      placeholder: 'e.g. Backend Developer',
    },
    { key: 'email', label: 'Email', type: 'email', required: true, autoComplete: 'email' },
    { key: 'phone', label: 'Phone', type: 'tel', autoComplete: 'tel' },
    {
      key: 'location',
      label: 'Location',
      type: 'text',
      span: 2,
      placeholder: 'City, Country',
      hint: 'City and country are enough. A full home address is not needed.',
      autoComplete: 'address-level2',
    },
    { key: 'linkedin', label: 'LinkedIn', type: 'url', placeholder: 'linkedin.com/in/your-name' },
    { key: 'github', label: 'GitHub', type: 'url', placeholder: 'github.com/your-name' },
    { key: 'portfolio', label: 'Portfolio / website', type: 'url', span: 2, placeholder: 'yourname.dev' },
  ],
}

const LIST_NOTE = 'Fields marked * are needed for an entry to appear. Completely blank entries are ignored.'

export const OPTIONAL_SECTIONS = [
  {
    id: 'summary',
    kind: 'object',
    title: 'Professional Summary',
    description: 'A short introduction at the top of your CV.',
    fields: [
      {
        key: 'text',
        label: 'Summary',
        type: 'textarea',
        rows: 5,
        span: 2,
        counter: { min: 150, max: 600 },
        hint: 'About 2–4 sentences: your experience, strengths, specialisation and career direction. Write it in your own words.',
        placeholder: 'e.g. Backend developer with three years of experience building internal tools…',
      },
    ],
  },
  {
    id: 'experience',
    kind: 'list',
    title: 'Work Experience',
    itemLabel: 'Experience',
    plural: 'work experience',
    primary: 'title',
    dateRange: { start: 'start', end: 'end', current: 'current' },
    note: LIST_NOTE,
    fields: [
      { key: 'title', label: 'Job title', type: 'text', required: true, autoComplete: 'organization-title' },
      { key: 'company', label: 'Company', type: 'text', autoComplete: 'organization' },
      { key: 'location', label: 'Location', type: 'text', span: 2, placeholder: 'City, Country or Remote' },
      { key: 'start', label: 'Start date', type: 'month' },
      { key: 'end', label: 'End date', type: 'month', disabledWhen: 'current' },
      { key: 'current', label: 'I currently work here', type: 'checkbox', span: 2 },
      {
        key: 'description',
        label: 'Responsibilities & achievements',
        type: 'textarea',
        rows: 6,
        span: 2,
        bullets: true,
        hint: BULLET_HINT,
        placeholder: 'Developed …\nImproved …\nReduced …',
      },
    ],
  },
  {
    id: 'education',
    kind: 'list',
    title: 'Education',
    itemLabel: 'Education',
    plural: 'education',
    primary: 'degree',
    dateRange: { start: 'start', end: 'end' },
    note: LIST_NOTE,
    fields: [
      { key: 'degree', label: 'Degree / program', type: 'text', required: true, span: 2, placeholder: 'e.g. B.Sc. in Computer Science' },
      { key: 'institution', label: 'Institution', type: 'text' },
      { key: 'location', label: 'Location', type: 'text' },
      { key: 'start', label: 'Start date', type: 'month' },
      {
        key: 'end',
        label: 'End date',
        type: 'month',
        hint: 'Use the expected date if you have not graduated yet.',
      },
      {
        key: 'description',
        label: 'Description (optional)',
        type: 'textarea',
        rows: 3,
        span: 2,
        hint: 'Thesis, GPA, honours or relevant coursework. Start a line with “- ” to make it a bullet.',
      },
    ],
  },
  {
    id: 'skills',
    kind: 'list',
    title: 'Skills',
    itemLabel: 'Category',
    plural: 'skill categories',
    primary: 'items',
    previewKey: 'category',
    note: 'List skills as plain text, separated by commas. Skill bars and ratings are deliberately not offered because ATS software cannot read them.',
    fields: [
      {
        key: 'category',
        label: 'Category (optional)',
        type: 'text',
        span: 2,
        list: 'skill-categories',
        placeholder: 'e.g. Programming Languages',
      },
      {
        key: 'items',
        label: 'Skills',
        type: 'text',
        required: true,
        span: 2,
        placeholder: 'C#, ASP.NET Core, TypeScript, PostgreSQL, Git',
      },
    ],
  },
  {
    id: 'projects',
    kind: 'list',
    title: 'Projects',
    itemLabel: 'Project',
    plural: 'projects',
    primary: 'name',
    note: LIST_NOTE,
    fields: [
      { key: 'name', label: 'Project name', type: 'text', required: true },
      { key: 'role', label: 'Your role', type: 'text' },
      { key: 'technologies', label: 'Technologies', type: 'text', span: 2, placeholder: 'React, Node.js, PostgreSQL' },
      { key: 'url', label: 'Project URL', type: 'url', placeholder: 'example.com/project' },
      { key: 'github', label: 'GitHub URL', type: 'url', placeholder: 'github.com/you/project' },
      {
        key: 'description',
        label: 'Description',
        type: 'textarea',
        rows: 4,
        span: 2,
        bullets: true,
        hint: 'One point per line: what you built, how, and what came of it.',
        placeholder: 'Built …\nImplemented …',
      },
    ],
  },
  {
    id: 'certifications',
    kind: 'list',
    title: 'Certifications',
    itemLabel: 'Certification',
    plural: 'certifications',
    primary: 'name',
    dateRange: { start: 'issueDate', end: 'expiryDate', startLabel: 'Issue date', endLabel: 'Expiration date' },
    note: LIST_NOTE,
    fields: [
      { key: 'name', label: 'Certification name', type: 'text', required: true, span: 2 },
      { key: 'issuer', label: 'Issuing organization', type: 'text', span: 2 },
      { key: 'issueDate', label: 'Issue date', type: 'month' },
      { key: 'expiryDate', label: 'Expiration date', type: 'month' },
      { key: 'credentialId', label: 'Credential ID', type: 'text' },
      { key: 'credentialUrl', label: 'Credential URL', type: 'url' },
    ],
  },
  {
    id: 'awards',
    kind: 'list',
    title: 'Awards',
    itemLabel: 'Award',
    plural: 'awards',
    primary: 'title',
    note: LIST_NOTE,
    fields: [
      { key: 'title', label: 'Title', type: 'text', required: true },
      { key: 'issuer', label: 'Organization', type: 'text' },
      { key: 'date', label: 'Date', type: 'month', span: 2 },
      { key: 'description', label: 'Description (optional)', type: 'textarea', rows: 3, span: 2 },
    ],
  },
  {
    id: 'organizations',
    kind: 'list',
    title: 'Organizations',
    itemLabel: 'Organization',
    plural: 'organizations',
    primary: 'name',
    dateRange: { start: 'start', end: 'end', current: 'current' },
    note: LIST_NOTE,
    fields: [
      { key: 'name', label: 'Organization', type: 'text', required: true },
      { key: 'role', label: 'Role', type: 'text' },
      { key: 'start', label: 'Start date', type: 'month' },
      { key: 'end', label: 'End date', type: 'month', disabledWhen: 'current' },
      { key: 'current', label: 'I am still involved', type: 'checkbox', span: 2 },
      {
        key: 'description',
        label: 'Description (optional)',
        type: 'textarea',
        rows: 3,
        span: 2,
        bullets: true,
        hint: 'One point per line.',
      },
    ],
  },
  {
    id: 'custom',
    kind: 'object',
    title: 'Custom Section',
    description: 'Publications, volunteer work, conferences, relevant coursework, leadership, research…',
    fields: [
      { key: 'title', label: 'Section title', type: 'text', span: 2, placeholder: 'e.g. Publications' },
      {
        key: 'content',
        label: 'Content',
        type: 'textarea',
        rows: 5,
        span: 2,
        hint: 'Start a line with “- ” to make it a bullet; other lines become paragraphs.',
      },
    ],
  },
]

export const SECTIONS = Object.fromEntries([PERSONAL, ...OPTIONAL_SECTIONS].map((s) => [s.id, s]))

export const DEFAULT_ORDER = OPTIONAL_SECTIONS.map((s) => s.id)

export function emptyEntry(schema, values = {}) {
  const entry = { id: uid() }
  for (const f of schema.fields) entry[f.key] = f.type === 'checkbox' ? false : ''
  return { ...entry, ...values }
}

export function emptyObject(schema) {
  const obj = {}
  for (const f of schema.fields) obj[f.key] = f.type === 'checkbox' ? false : ''
  return obj
}
