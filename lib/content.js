export const projects = [
  {
    slug: "document-generation",
    category: "Automation",
    number: "01",
    label: "ENTERPRISE AUTOMATION",
    title: "US Federal document generation",
    summary:
      "Turned complex, related CRM data into a structured document-generation pipeline.",
    contribution:
      "Built a C# Custom API that retrieves related Dataverse data, returns a structured payload, and supplies Power Automate Word-template mapping.",
    problem:
      "Document preparation depended on accurately gathering information across deeply related Dataverse records and binding it to a consistent output template.",
    solution:
      "Built a C# Custom API / Unbound Action that accepts a record ID, traverses deeply related Dataverse data (the resume describes retrieval across 100 tables), returns a structured payload, and feeds Power Automate Word-template mapping.",
    outcome:
      "A repeatable document workflow with reliable field-to-template mapping. The resume reports approximately 60% less manual document-preparation effort.",
    tags: [
      "C# Plugins",
      "Custom API",
      "Dataverse",
      "FetchXML",
      "Power Automate",
      "Word Templates",
    ],
    visual: "document",
  },
  {
    slug: "employee-management",
    category: "Applications",
    number: "02",
    label: "BUSINESS APPLICATIONS",
    title: "Employee management & reporting",
    summary:
      "Connected a responsive Canvas App with identity, reporting and SharePoint-backed workflows.",
    contribution:
      "Developed responsive Canvas screens, automated PDF/report generation and SharePoint sync, added pagination, and separated Admin and HR access.",
    problem:
      "Employee operations needed structured access, report generation and dependable handling of large SharePoint lists.",
    solution:
      "Designed Canvas App screens with Power Fx, automated PDF/report generation and data synchronization, implemented pagination, and separated Admin and HR access with role-based logic.",
    outcome:
      "A joined-up employee workflow with clearer access boundaries and automated reporting. The implementation includes pagination for datasets exceeding 5,000 records.",
    tags: [
      "Canvas Apps",
      "Power Fx",
      "Power Automate",
      "SharePoint",
      "Azure AD",
      "RBAC",
    ],
    visual: "employee",
  },
  {
    slug: "crm-migration",
    category: "Integration",
    number: "03",
    label: "CRM MODERNIZATION",
    title: "HubSpot → Dynamics 365 migration",
    summary:
      "Moved CRM data and business processes into Dynamics 365 while preserving relationships and workflow logic.",
    contribution:
      "Configured Dataverse tables, forms and views; built JavaScript validations and subgrids; customized BPF stages; and managed solution movement between environments.",
    problem:
      "The migration required more than moving records: forms, process stages, validations, security and related CRM entities had to work together.",
    solution:
      "Configured Dataverse tables, forms, views and dashboards; implemented JavaScript validation and custom subgrids; automated Business Process Flow stage transitions; and managed solution movement between environments.",
    outcome:
      "Migrated 5,000+ CRM records across Accounts, Contacts, Leads and Opportunities, with relational consistency and controlled access as key considerations.",
    tags: [
      "Dynamics 365 CE",
      "Dataverse",
      "JavaScript",
      "BPF",
      "FetchXML",
      "ALM",
    ],
    visual: "migration",
  },
  {
    slug: "ai-dataverse",
    category: "AI & MCP",
    number: "04",
    label: "AI + INTEGRATION",
    title: "Claude AI + Dataverse through MCP",
    summary:
      "Connected an AI assistant to CRM data through the Model Context Protocol (MCP), enabling natural-language record retrieval.",
    contribution:
      "Exposed Dataverse operations as MCP tools so Claude can retrieve, filter and interpret CRM records in the context of a conversational request.",
    problem:
      "Business users can benefit from asking for CRM information in plain language rather than manually assembling every query.",
    solution:
      "Connected Claude AI to Dataverse through an MCP server exposing table operations as tools, enabling contextual record retrieval, filtering and interpretation through conversational requests.",
    outcome:
      "A conversational integration pattern that connects an AI assistant to governed business data operations.",
    tags: ["Claude AI", "MCP", "Dataverse API", "TypeScript", "Node.js"],
    visual: "ai",
  },
];

export const skillGroups = [
  {
    title: "Dynamics 365 CE & Dataverse",
    desc: "CRM customization, data modeling, server-side business logic and enterprise record operations.",
    items: [
      "Dynamics 365 Customer Engagement",
      "Dataverse",
      "Dataverse Web API / OData",
      "C# Plugins (Pre/Post, Sync/Async)",
      "Custom APIs / Unbound Actions",
      "XRM SDK",
      "FetchXML",
      "CDS4SQL",
      "Plugin Registration Tool",
      "Plugin Trace Logs",
      "XrmToolBox",
      "Business Process Flows",
      "Business Rules",
      "Forms, Views & Dashboards",
      "Web Resources",
      "Security Roles",
      "Field-Level Security",
      "Managed / Unmanaged Solutions",
    ],
  },
  {
    title: "Microsoft Power Platform",
    desc: "Business applications, process automation, reusable controls and AI-enabled experiences.",
    items: [
      "Power Apps Model-Driven Apps",
      "Power Apps Canvas Apps",
      "Power Automate Cloud Flows",
      "Scheduled & Instant Flows",
      "Power Fx",
      "Patch / Filter / LookUp",
      "PCF Controls",
      "Copilot Studio",
      "AI Builder",
      "Word Template Mapping",
      "PDF / CSV Report Automation",
      "Role-Based Access",
      "Business Process Automation",
    ],
  },
  {
    title: "Azure, ALM & Enterprise Integration",
    desc: "Environment-aware deployment, configuration management and connected enterprise systems.",
    items: [
      "Azure DevOps Repos",
      "Azure DevOps Pipelines",
      "Azure Functions",
      "Azure Logic Apps",
      "Microsoft Entra ID / Azure AD",
      "SharePoint Online",
      "Environment Variables",
      "Connection References",
      "Configuration Migration Tool",
      "Solution Export / Import",
      "REST APIs",
      "JSON",
      "Postman",
      "Pagination & Large-List Handling",
      "Agile / Scrum",
    ],
  },
  {
    title: "Programming & Web Development",
    desc: "Pro-code development for custom logic, interfaces, integrations and data handling.",
    items: [
      "C#",
      "JavaScript ES6+",
      "TypeScript",
      "React.js",
      "HTML5",
      "CSS3",
      "Fluent UI",
      "Node.js (working knowledge)",
      "Python",
      "SQL",
      "MySQL",
      "PostgreSQL",
      "Dataverse SQL",
      "Git / GitHub",
      "JWT Authentication",
      "bcrypt",
    ],
  },
  {
    title: "AI, MCP & Intelligent Integration",
    desc: "Connecting AI tools to business data through structured, contextual operations.",
    items: [
      "Model Context Protocol (MCP)",
      "Claude AI + Dataverse",
      "MCP Server Tool Design",
      "Natural-Language CRM Queries",
      "Copilot Studio Virtual Agents",
      "AI Builder Document Extraction",
      "Contextual Record Retrieval",
      "AI-assisted Workflow Patterns",
    ],
  },
  {
    title: "Tools, Testing & Delivery",
    desc: "Daily engineering tools used to build, debug, validate and deliver reliable solutions.",
    items: [
      "Visual Studio",
      "Visual Studio Code",
      "Power Apps Studio",
      "Power Automate Portal",
      "Plugin Registration Tool",
      "XrmToolBox",
      "Postman",
      "Git",
      "GitHub",
      "LeetCode",
      "HackerRank",
      "NPTEL Joy of Computing using Python",
      "Oracle SQL",
    ],
  },
];

export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "https://kanjarlanarasimha.vercel.app";
export const email = "kanjarlanarasimha@gmail.com";
export const resume = "/Kanjarla-Narasimha-Charyulu-Resume.pdf";

// Display-only edition. Keep resume above as the existing downloadable document.
export const resumePreview = "/resume-preview/narasimha-preview.pdf";
