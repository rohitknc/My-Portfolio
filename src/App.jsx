import React, { useCallback, useEffect, useRef, useState } from 'react';
import '../styles.css';
import {
  AppBar, Avatar, Box, Button, Chip, Container, CssBaseline, Divider,
  Grid, IconButton, Paper, Stack, Toolbar, Tooltip, Typography,
  ThemeProvider, createTheme
} from '@mui/material';
import ArrowOutwardRounded from '@mui/icons-material/ArrowOutwardRounded';
import AutoAwesomeRounded from '@mui/icons-material/AutoAwesomeRounded';
import BuildRounded from '@mui/icons-material/BuildRounded';
import CloudQueueRounded from '@mui/icons-material/CloudQueueRounded';
import CodeRounded from '@mui/icons-material/CodeRounded';
import DownloadRounded from '@mui/icons-material/DownloadRounded';
import EmailRounded from '@mui/icons-material/EmailRounded';
import GitHub from '@mui/icons-material/GitHub';
import HubRounded from '@mui/icons-material/HubRounded';
import StorageRounded from '@mui/icons-material/StorageRounded';
import TerminalRounded from '@mui/icons-material/TerminalRounded';
import WorkOutlineRounded from '@mui/icons-material/WorkOutlineRounded';
import MenuRounded from '@mui/icons-material/MenuRounded';
import CloseRounded from '@mui/icons-material/CloseRounded';
import { motion, MotionConfig } from 'motion/react';
import profileImage from '../profile.png';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: { main: '#70E1F5', light: '#B7F3FC', dark: '#22B9D2', contrastText: '#07121D' },
    secondary: { main: '#9A8CFF' },
    background: { default: '#07111D', paper: '#0D1B2A' },
    text: { primary: '#F2F7FC', secondary: '#9CAFC1' },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", Arial, sans-serif',
    h1: { fontFamily: '"Plus Jakarta Sans", "Inter", sans-serif', fontWeight: 800, letterSpacing: '-.065em' },
    h2: { fontFamily: '"Plus Jakarta Sans", "Inter", sans-serif', fontWeight: 800, letterSpacing: '-.045em' },
    h3: { fontFamily: '"Plus Jakarta Sans", "Inter", sans-serif', fontWeight: 750, letterSpacing: '-.025em' },
    button: { textTransform: 'none', fontWeight: 750 },
  },
  shape: { borderRadius: 16 },
  components: {
    MuiButton: { defaultProps: { disableElevation: true } },
    MuiPaper: { styleOverrides: { root: { backgroundImage: 'none' } } },
  },
});

const projects = [
  {
    number: '01', label: 'ENTERPRISE AUTOMATION', title: 'US Federal document generation',
    summary: 'Turned complex, related CRM data into a structured document-generation pipeline.',
    contribution: 'Built a C# Custom API that retrieves related Dataverse data, returns a structured payload, and supplies Power Automate Word-template mapping.',
    problem: 'Document preparation depended on accurately gathering information across deeply related Dataverse records and binding it to a consistent output template.',
    solution: 'Built a C# Custom API / Unbound Action that accepts a record ID, traverses deeply related Dataverse data (the resume describes retrieval across 100 tables), returns a structured payload, and feeds Power Automate Word-template mapping.',
    outcome: 'A repeatable document workflow with reliable field-to-template mapping. The resume reports approximately 60% less manual document-preparation effort.',
    tags: ['C# Plugins', 'Custom API', 'Dataverse', 'FetchXML', 'Power Automate', 'Word Templates'], icon: <StorageRounded />,
    visual: 'document'
  },
  {
    number: '02', label: 'BUSINESS APPLICATIONS', title: 'Employee management & reporting',
    summary: 'Connected a responsive Canvas App with identity, reporting and SharePoint-backed workflows.',
    contribution: 'Developed responsive Canvas screens, automated PDF/report generation and SharePoint sync, added pagination, and separated Admin and HR access.',
    problem: 'Employee operations needed structured access, report generation and dependable handling of large SharePoint lists.',
    solution: 'Designed Canvas App screens with Power Fx, automated PDF/report generation and data synchronization, implemented pagination, and separated Admin and HR access with role-based logic.',
    outcome: 'A joined-up employee workflow with clearer access boundaries and automated reporting. The implementation includes pagination for datasets exceeding 5,000 records.',
    tags: ['Canvas Apps', 'Power Fx', 'Power Automate', 'SharePoint', 'Azure AD', 'RBAC'], icon: <WorkOutlineRounded />,
    visual: 'employee'
  },
  {
    number: '03', label: 'CRM MODERNIZATION', title: 'HubSpot → Dynamics 365 migration',
    summary: 'Moved CRM data and business processes into Dynamics 365 while preserving relationships and workflow logic.',
    contribution: 'Configured Dataverse tables, forms and views; built JavaScript validations and subgrids; customized BPF stages; and managed solution movement between environments.',
    problem: 'The migration required more than moving records: forms, process stages, validations, security and related CRM entities had to work together.',
    solution: 'Configured Dataverse tables, forms, views and dashboards; implemented JavaScript validation and custom subgrids; automated Business Process Flow stage transitions; and managed solution movement between environments.',
    outcome: 'Migrated 5,000+ CRM records across Accounts, Contacts, Leads and Opportunities, with relational consistency and controlled access as key considerations.',
    tags: ['Dynamics 365 CE', 'Dataverse', 'JavaScript', 'BPF', 'FetchXML', 'ALM'], icon: <CloudQueueRounded />,
    visual: 'migration'
  },
  {
    number: '04', label: 'AI + INTEGRATION', title: 'Claude AI + Dataverse through MCP',
    summary: 'Connected an AI assistant to CRM data through the Model Context Protocol (MCP), enabling natural-language record retrieval.',
    contribution: 'Exposed Dataverse operations as MCP tools so Claude can retrieve, filter and interpret CRM records in the context of a conversational request.',
    problem: 'Business users can benefit from asking for CRM information in plain language rather than manually assembling every query.',
    solution: 'Connected Claude AI to Dataverse through an MCP server exposing table operations as tools, enabling contextual record retrieval, filtering and interpretation through conversational requests.',
    outcome: 'A conversational integration pattern that connects an AI assistant to governed business data operations.',
    tags: ['Claude AI', 'MCP', 'Dataverse API', 'TypeScript', 'Node.js'], icon: <AutoAwesomeRounded />,
    visual: 'ai'
  },
];

const skillGroups = [
  { title: 'Dynamics 365 CE & Dataverse', icon: <HubRounded />, desc: 'CRM customization, data modeling, server-side business logic and enterprise record operations.', items: ['Dynamics 365 Customer Engagement', 'Dataverse', 'Dataverse Web API / OData', 'C# Plugins (Pre/Post, Sync/Async)', 'Custom APIs / Unbound Actions', 'XRM SDK', 'FetchXML', 'CDS4SQL', 'Plugin Registration Tool', 'Plugin Trace Logs', 'XrmToolBox', 'Business Process Flows', 'Business Rules', 'Forms, Views & Dashboards', 'Web Resources', 'Security Roles', 'Field-Level Security', 'Managed / Unmanaged Solutions'] },
  { title: 'Microsoft Power Platform', icon: <AutoAwesomeRounded />, desc: 'Business applications, process automation, reusable controls and AI-enabled experiences.', items: ['Power Apps Model-Driven Apps', 'Power Apps Canvas Apps', 'Power Automate Cloud Flows', 'Scheduled & Instant Flows', 'Power Fx', 'Patch / Filter / LookUp', 'PCF Controls', 'Copilot Studio', 'AI Builder', 'Word Template Mapping', 'PDF / CSV Report Automation', 'Role-Based Access', 'Business Process Automation'] },
  { title: 'Azure, ALM & Enterprise Integration', icon: <CloudQueueRounded />, desc: 'Environment-aware deployment, configuration management and connected enterprise systems.', items: ['Azure DevOps Repos', 'Azure DevOps Pipelines', 'Azure Functions', 'Azure Logic Apps', 'Microsoft Entra ID / Azure AD', 'SharePoint Online', 'Environment Variables', 'Connection References', 'Configuration Migration Tool', 'Solution Export / Import', 'REST APIs', 'JSON', 'Postman', 'Pagination & Large-List Handling', 'Agile / Scrum'] },
  { title: 'Programming & Web Development', icon: <TerminalRounded />, desc: 'Pro-code development for custom logic, interfaces, integrations and data handling.', items: ['C#', 'JavaScript ES6+', 'TypeScript', 'React.js', 'HTML5', 'CSS3', 'Fluent UI', 'Node.js (working knowledge)', 'Python', 'SQL', 'MySQL', 'PostgreSQL', 'Dataverse SQL', 'Git / GitHub', 'JWT Authentication', 'bcrypt'] },
  { title: 'AI, MCP & Intelligent Integration', icon: <AutoAwesomeRounded />, desc: 'Connecting AI tools to business data through structured, contextual operations.', items: ['Model Context Protocol (MCP)', 'Claude AI + Dataverse', 'MCP Server Tool Design', 'Natural-Language CRM Queries', 'Copilot Studio Virtual Agents', 'AI Builder Document Extraction', 'Contextual Record Retrieval', 'AI-assisted Workflow Patterns'] },
  { title: 'Tools, Testing & Delivery', icon: <BuildRounded />, desc: 'Daily engineering tools used to build, debug, validate and deliver reliable solutions.', items: ['Visual Studio', 'Visual Studio Code', 'Power Apps Studio', 'Power Automate Portal', 'Plugin Registration Tool', 'XrmToolBox', 'Postman', 'Git', 'GitHub', 'LeetCode', 'HackerRank', 'NPTEL Joy of Computing using Python', 'Oracle SQL'] },
];

const reveal = { hidden: { opacity: 1, y: 10 }, visible: { opacity: 1, y: 0, transition: { duration: 0.48, ease: [0.22, 1, 0.36, 1] } } };

function Reveal({ children, delay = 0, ...props }) {
  return <motion.div variants={reveal} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.13 }} transition={{ delay, duration: 0.48, ease: [0.22, 1, 0.36, 1] }} {...props}>{children}</motion.div>;
}

function SectionHeading({ index, eyebrow, title, description }) {
  return <Box sx={{ mb: { xs: 4, md: 6 }, maxWidth: 790 }}>
    <Stack direction="row" alignItems="center" spacing={1.2} sx={{ mb: 1.6 }}>
      <Box sx={{ width: 28, height: 1, bgcolor: 'primary.main' }} />
      <Typography className="eyebrow">{index} / {eyebrow}</Typography>
    </Stack>
    <Typography variant="h2" sx={{ fontSize: { xs: 34, md: 54 }, lineHeight: 1.08 }}>{title}</Typography>
    {description && <Typography color="text.secondary" sx={{ mt: 2, maxWidth: 690, lineHeight: 1.85, fontSize: { xs: 15, md: 17 } }}>{description}</Typography>}
  </Box>;
}

function ProjectVisual({ project }) {
  const type = project.visual;
  const labels = {
    document: 'DOCUMENT ENGINEERING',
    employee: 'BUSINESS APPLICATION',
    migration: 'CRM MODERNIZATION',
    ai: 'AI + DATA INTEGRATION',
  };

  return <Box className={`project-visual project-visual--${type}`} aria-label={`${project.title} project snapshot`}>
    <Box className="visual-topline">
      <span className="mini-dot"/><span className="mini-dot"/><span className="mini-dot"/>
      <Typography className="visual-label">{labels[type]}</Typography>
    </Box>

    {type === 'document' && <Box className="document-scene">
      <Box className="document-metrics">
        <Box className="document-metric">
          <Typography className="visual-kicker">RELATED DATA</Typography>
          <Typography className="visual-metric-value">100</Typography>
          <Typography className="visual-metric-note">tables traversed*</Typography>
        </Box>
        <Box className="document-metric">
          <Typography className="visual-kicker">EXTENSION</Typography>
          <Typography className="visual-metric-value metric-code">C# API</Typography>
          <Typography className="visual-metric-note">structured payload</Typography>
        </Box>
        <Box className="document-metric document-metric--accent">
          <Typography className="visual-kicker">REPORTED IMPACT</Typography>
          <Typography className="visual-metric-value">~60%</Typography>
          <Typography className="visual-metric-note">less manual prep*</Typography>
        </Box>
      </Box>
      <Box className="document-preview">
        <Box className="document-preview-icon"><StorageRounded /></Box>
        <Box className="document-preview-copy">
          <Typography className="document-preview-title">Word template output</Typography>
          <Typography className="document-preview-subtitle">Dataverse data · mapped fields · formatted document</Typography>
        </Box>
        <span className="document-preview-status">READY</span>
      </Box>
      <Typography className="visual-footnote">*Figures reported in the supplied resume.</Typography>
    </Box>}

    {type === 'employee' && <Box className="employee-scene">
      <Box className="employee-scene-heading">
        <Box><Typography className="visual-kicker">EMPLOYEE PORTAL</Typography><Typography className="employee-scene-title">Management dashboard</Typography></Box>
        <span className="role-pill"><span/>Role-aware access</span>
      </Box>
      <Box className="employee-role-grid">
        <Box className="employee-role-tile employee-role-tile--admin">
          <Box className="employee-role-icon"><BuildRounded /></Box>
          <Box><Typography className="employee-role-title">Admin</Typography><Typography className="employee-role-caption">Manage records</Typography></Box>
        </Box>
        <Box className="employee-role-tile employee-role-tile--hr">
          <Box className="employee-role-icon"><WorkOutlineRounded /></Box>
          <Box><Typography className="employee-role-title">HR</Typography><Typography className="employee-role-caption">Reports & people</Typography></Box>
        </Box>
      </Box>
      <Box className="employee-report-tile">
        <Box className="report-document-icon"><DownloadRounded /></Box>
        <Box className="employee-report-copy"><Typography className="visual-kicker">REPORTING CAPABILITY</Typography><Typography className="employee-report-title">PDF export & SharePoint sync</Typography></Box>
        <Box className="record-count"><strong>5,000+</strong><span>records supported*</span></Box>
      </Box>
    </Box>}

    {type === 'migration' && <Box className="migration-scene">
      <Box className="migration-platforms">
        <Box className="migration-platform migration-platform--source"><Typography className="visual-kicker">SOURCE CRM</Typography><Typography className="migration-platform-title">HubSpot</Typography><Typography className="migration-platform-note">Existing records</Typography></Box>
        <Box className="migration-transfer" aria-hidden="true"><ArrowOutwardRounded /></Box>
        <Box className="migration-platform migration-platform--target"><Typography className="visual-kicker">TARGET CRM</Typography><Typography className="migration-platform-title">Dynamics 365</Typography><Typography className="migration-platform-note">Dataverse</Typography></Box>
      </Box>
      <Box className="migration-records">
        <Box className="migration-record-count"><Typography className="migration-record-value">5,000+</Typography><Typography className="migration-record-label">CRM records migrated*</Typography></Box>
        <Box className="migration-entity-list">
          {['Accounts', 'Contacts', 'Leads', 'Opportunities'].map((entity, index) => <Box key={entity} className="migration-entity" style={{ '--entity-index': index }}><span className="entity-mark"/>{entity}</Box>)}
        </Box>
      </Box>
      <Typography className="visual-footnote">*Record count reported in the supplied resume.</Typography>
    </Box>}

    {type === 'ai' && <Box className="ai-scene">
      <Box className="ai-prompt-panel">
        <Box className="ai-prompt-top"><AutoAwesomeRounded /><Typography className="visual-kicker">NATURAL-LANGUAGE CRM QUERY</Typography><span className="ai-prompt-indicator"/></Box>
        <Typography className="ai-prompt-text">“Retrieve the CRM records relevant to my question.”</Typography>
      </Box>
      <Box className="ai-connection-panel">
        <Box className="ai-system-node"><span className="ai-node-symbol">✳</span><span><strong>Claude AI</strong><small>Conversational layer</small></span></Box>
        <Box className="ai-protocol-node"><span className="ai-protocol-line"/><strong>MCP</strong><small>Tool interface</small><span className="ai-protocol-line"/></Box>
        <Box className="ai-system-node ai-system-node--data"><span className="ai-node-symbol"><StorageRounded /></span><span><strong>Dataverse</strong><small>Business records</small></span></Box>
      </Box>
      <Box className="ai-result-panel">
        <span className="ai-result-check">✓</span>
        <Box><Typography className="ai-result-title">Contextual retrieval</Typography><Typography className="ai-result-caption">Structured tools · filtered records · interpreted results</Typography></Box>
        <span className="ai-result-badge">MCP</span>
      </Box>
    </Box>}
  </Box>;
}

function ProjectCard({ project, index, onOpen }) {
  return <Reveal delay={index * 0.06}>
    <Paper component="article" elevation={0} className="project-card">
      <Box className="project-card-head">
        <Box className="project-icon">{project.icon}</Box>
        <Typography className="project-number">{project.number} — CASE STUDY</Typography>
      </Box>
      <ProjectVisual project={project} />
      <Box className="project-card-body" sx={{ px: { xs: 2.4, md: 3.2 }, pb: 3.2, pt: 2.7 }}>
        <Typography className="eyebrow" sx={{ color: 'primary.main !important', mb: 1.1 }}>{project.label}</Typography>
        <Typography className="project-title" variant="h3" sx={{ fontSize: { xs: 22, md: 25 }, lineHeight: 1.25, mb: 1.2 }}>{project.title}</Typography>
        <Typography className="project-summary" color="text.secondary" sx={{ fontSize: 14, lineHeight: 1.8 }}>{project.summary}</Typography>
        <Box className="project-contribution">
          <Typography className="project-detail-label">MY CONTRIBUTION</Typography>
          <Typography className="project-contribution-copy" color="text.secondary" sx={{ fontSize: 12.5, lineHeight: 1.8 }}>{project.contribution}</Typography>
        </Box>
        <Typography className="project-detail-label project-tech-label">TECHNOLOGIES USED</Typography>
        <Stack className="project-tech-stack" direction="row" useFlexGap flexWrap="wrap" gap={0.8} sx={{ mt: 1.1, mb: 2.2 }}>
          {project.tags.map(tag => <Chip key={tag} label={tag} size="small" className="tech-chip" />)}
        </Stack>
        <Button onClick={() => onOpen(project)} endIcon={<ArrowOutwardRounded />} className="text-link" sx={{ p: 0, mt: 'auto' }}>Read project details</Button>
      </Box>
    </Paper>
  </Reveal>;
}

function CaseStudyDialog({ project, onClose }) {
  const dialogRef = useRef(null);

  useEffect(() => {
    if (!project) return undefined;
    const previouslyFocused = document.activeElement;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    dialogRef.current?.focus();

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        onClose();
        return;
      }
      if (event.key !== 'Tab' || !dialogRef.current) return;
      const focusable = dialogRef.current.querySelectorAll(
        'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
      );
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && (document.activeElement === first || document.activeElement === dialogRef.current)) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = previousOverflow;
      if (previouslyFocused && typeof previouslyFocused.focus === 'function') previouslyFocused.focus();
    };
  }, [project, onClose]);

  if (!project) return null;
  return <Box className="modal-backdrop" role="presentation" onMouseDown={e => { if (e.target === e.currentTarget) onClose(); }}>
    <motion.div ref={dialogRef} tabIndex={-1} className="case-modal" role="dialog" aria-modal="true" aria-labelledby="case-title" aria-describedby="case-summary" initial={{ opacity: 0, y: 22, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} onClick={e => e.stopPropagation()}>

      <Stack direction="row" alignItems="flex-start" justifyContent="space-between" gap={2}>
        <Box><Typography className="eyebrow">{project.number} / {project.label}</Typography><Typography id="case-title" variant="h2" sx={{ fontSize: { xs: 28, md: 38 }, mt: 1 }}>{project.title}</Typography><Typography id="case-summary" sx={{ position: 'absolute', width: '1px', height: '1px', p: 0, m: '-1px', overflow: 'hidden', clip: 'rect(0, 0, 0, 0)', whiteSpace: 'nowrap', border: 0 }}>{project.summary}</Typography></Box>
        <IconButton onClick={onClose} aria-label="Close case study"><CloseRounded /></IconButton>
      </Stack>
      {[['The challenge', project.problem], ['Implementation', project.solution], ['Outcome', project.outcome]].map(([title, text]) => <Box key={title} sx={{ mt: 3 }}><Typography sx={{ fontWeight: 800, color: 'primary.main', mb: 0.8 }}>{title}</Typography><Typography color="text.secondary" sx={{ lineHeight: 1.85 }}>{text}</Typography></Box>)}
      <Stack direction="row" useFlexGap flexWrap="wrap" gap={1} sx={{ mt: 3 }}>{project.tags.map(tag => <Chip key={tag} label={tag} size="small" className="tech-chip" />)}</Stack>
    </motion.div>
  </Box>;
}

function AmbientExperience() {
  const waterLayerRef = useRef(null);

  // Keep the water as slow, compositor-friendly CSS layers instead of a full-screen
  // canvas. One pointer handler moves the highlight and creates only short-lived ripples.
  useEffect(() => {
    const layer = waterLayerRef.current;
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!layer || reduceMotion) return undefined;

    const timers = new Set();
    const cursorGlow = layer.querySelector('.water-cursor-glow');
    let pointerFrame = 0;
    let latestPointer = null;
    const moveWaterLight = (event) => {
      if (event.pointerType === 'touch' || !cursorGlow) return;
      latestPointer = { x: event.clientX, y: event.clientY };
      if (pointerFrame) return;
      pointerFrame = window.requestAnimationFrame(() => {
        if (latestPointer) {
          cursorGlow.style.transform = `translate3d(${latestPointer.x - 230}px, ${latestPointer.y - 230}px, 0)`;
          cursorGlow.classList.add('is-visible');
        }
        pointerFrame = 0;
      });
    };
    const hideWaterLight = () => cursorGlow?.classList.remove('is-visible');
    const handlePointerOut = (event) => { if (!event.relatedTarget) hideWaterLight(); };
    const createRipple = (event) => {
      if (event.target?.closest?.('button, a, input, textarea, select, [role="dialog"]')) return;
      const ripple = document.createElement('span');
      ripple.className = 'water-click-ripple';
      ripple.style.left = `${event.clientX}px`;
      ripple.style.top = `${event.clientY}px`;
      layer.appendChild(ripple);
      const timer = window.setTimeout(() => {
        ripple.remove();
        timers.delete(timer);
      }, 2100);
      timers.add(timer);
    };
    document.addEventListener('pointermove', moveWaterLight, { passive: true });
    document.addEventListener('pointerout', handlePointerOut, { passive: true });
    window.addEventListener('blur', hideWaterLight);
    document.addEventListener('pointerdown', createRipple, { passive: true });
    return () => {
      document.removeEventListener('pointermove', moveWaterLight);
      document.removeEventListener('pointerout', handlePointerOut);
      window.removeEventListener('blur', hideWaterLight);
      document.removeEventListener('pointerdown', createRipple);
      if (pointerFrame) window.cancelAnimationFrame(pointerFrame);
      timers.forEach((timer) => window.clearTimeout(timer));
      timers.clear();
    };
  }, []);

  return <div ref={waterLayerRef} className="water-layer" aria-hidden="true">
    <div className="water-cursor-glow" />
    <div className="water-lights" />
    <div className="water-caustics" />
    <div className="water-rays" />
    <div className="water-particles" />
    <div className="water-bubbles" />
  </div>;
}

function SoundControl({ soundEnabled, onToggle }) {
  return <Tooltip title={soundEnabled ? 'Ambient music is on · click to mute' : 'Ambient music is off · click to listen'} arrow placement="bottom">
    <span className="sound-control-wrap">
      <IconButton
        type="button"
        className={`sound-toggle${soundEnabled ? ' is-on' : ''}`}
        onClick={onToggle}
        aria-pressed={soundEnabled}
        aria-label={soundEnabled ? 'Turn ambient music off' : 'Turn ambient music on'}
        disableRipple
      >
        <span className="sound-waveform" aria-hidden="true">
          <i /><i /><i /><i /><i /><i /><i />
        </span>
      </IconButton>
    </span>
  </Tooltip>;
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [soundEnabled, setSoundEnabled] = useState(false);
  const audioRef = useRef(null);
  const soundControlUsed = useRef(false);
  const navItems = [['Work', '#work'], ['Experience', '#experience'], ['Capabilities', '#skills'], ['Contact', '#contact']];
  const closeMenu = () => setMenuOpen(false);
  const closeCaseStudy = useCallback(() => setSelectedProject(null), []);

  const toggleAmbientSound = useCallback(async () => {
    const player = audioRef.current;
    if (!player) return;
    soundControlUsed.current = true;
    if (!player.paused) {
      player.pause();
      return;
    }
    try {
      player.volume = 0.2;
      await player.play();
      setSoundEnabled(true);
    } catch {
      setSoundEnabled(false);
    }
  }, []);

  // Browsers require a user gesture before audio can start. Begin softly on the
  // visitor's first meaningful interaction, but let the header button opt out.
  useEffect(() => {
    const player = audioRef.current;
    if (player) player.volume = 0.2;
    const removeListeners = () => {
      document.removeEventListener('pointerdown', startOnFirstGesture);
      document.removeEventListener('keydown', startOnFirstGesture);
    };
    const startOnFirstGesture = (event) => {
      if (event.type === 'keydown' && !['Enter', ' ', 'Spacebar'].includes(event.key)) return;
      const clickedSoundControl = event.target?.closest?.('.sound-toggle');
      removeListeners();
      if (clickedSoundControl || soundControlUsed.current) return;
      const audio = audioRef.current;
      if (audio?.paused) {
        audio.volume = 0.2;
        audio.play().then(() => setSoundEnabled(true)).catch(() => setSoundEnabled(false));
      }
    };
    document.addEventListener('pointerdown', startOnFirstGesture, { passive: true });
    document.addEventListener('keydown', startOnFirstGesture);
    return () => {
      removeListeners();
      if (player) player.pause();
    };
  }, []);

  return <ThemeProvider theme={theme}>
    <CssBaseline />
    <MotionConfig reducedMotion="user">
      <Box className="site-shell">
        <a href="#main-content" className="skip-link">Skip to main content</a>
        <AmbientExperience />
        <audio
          className="ambient-audio"
          ref={audioRef}
          src="/soft-ambient.mp3"
          loop
          preload="none"
          onPlay={() => setSoundEnabled(true)}
          onPause={() => setSoundEnabled(false)}
        />
        <AppBar position="sticky" elevation={0} className="site-nav">
          <Toolbar className="nav-inner">
            <Stack direction="row" alignItems="center" spacing={1.4} sx={{ flex: 1, minWidth: 0 }}>
              <Box component="a" href="#main-content" className="brand-mark" aria-label="Kanjarla Narasimha Charyulu — home">
                <span className="brand-monogram">KNC</span><span className="brand-mark-accent" aria-hidden="true" />
              </Box>
              <Box className="brand-copy"><Typography sx={{ fontWeight: 850, letterSpacing: '-.03em', lineHeight: 1.25 }}>KANJARLA NARASIMHA</Typography><Typography sx={{ fontSize: 10, color: 'text.secondary', letterSpacing: '.14em', textTransform: 'uppercase' }}>Dynamics 365 · Power Platform</Typography></Box>
            </Stack>
            <Stack direction="row" spacing={2.4} className="desktop-nav">{navItems.map(([label, href]) => <Button key={label} href={href} color="inherit" className="nav-link">{label}</Button>)}</Stack>
            <SoundControl soundEnabled={soundEnabled} onToggle={toggleAmbientSound} />
            <Button href="/Narasimha_Charyulu_K.pdf" download variant="outlined" startIcon={<DownloadRounded />} className="resume-nav">Resume</Button>
            <IconButton aria-label={menuOpen ? 'Close navigation' : 'Open navigation'} aria-expanded={menuOpen} aria-controls="mobile-navigation" onClick={() => setMenuOpen(!menuOpen)} className="mobile-menu">{menuOpen ? <CloseRounded /> : <MenuRounded />}</IconButton>
          </Toolbar>
          {menuOpen && <Stack id="mobile-navigation" component="nav" aria-label="Mobile navigation" className="mobile-nav" spacing={0.5}>{navItems.map(([label, href]) => <Button key={label} href={href} onClick={closeMenu} color="inherit">{label}</Button>)}</Stack>}
        </AppBar>

        <main id="main-content">
          <Box component="section" className="hero-section">
            <Container maxWidth="lg" className="hero-container">
              <Grid container spacing={{ xs: 5, md: 7 }} alignItems="center">
                <Grid size={{ xs: 12, md: 7 }}>
                  <motion.div initial={false} animate={{ opacity: 1, y: 0 }}>
                    <Stack direction="row" alignItems="center" spacing={1.2} sx={{ mb: 3 }}><span className="availability-dot"/><Typography className="hero-kicker">POWER PLATFORM ENGINEER · HYDERABAD, INDIA</Typography></Stack>
                    <Typography variant="h1" className="hero-title">I build business systems that <Box component="span" className="gradient-text">do more.</Box></Typography>
                    <Typography className="hero-copy">I’m a Dynamics 365 and Power Platform Developer who connects CRM data, custom code, automation and AI to solve real business workflow problems—from C# plugins and Dataverse APIs to intelligent integrations.</Typography>
                    <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5} sx={{ mt: 3.5 }}>
                      <Button variant="contained" href="#work" endIcon={<ArrowOutwardRounded />} className="primary-cta">Explore my work</Button>
                      <Button variant="outlined" href="mailto:kanjarlanarasimha@gmail.com" startIcon={<EmailRounded />} className="secondary-cta">Let’s connect</Button>
                    </Stack>
                    <Stack direction="row" useFlexGap flexWrap="wrap" gap={1} sx={{ mt: 4 }}>
                      {['Dynamics 365 CE', 'C# & Custom APIs', 'Power Automate', 'AI + MCP'].map(x => <Chip key={x} label={x} className="hero-chip" />)}
                    </Stack>
                  </motion.div>
                </Grid>
                <Grid size={{ xs: 12, md: 5 }}>
                  <Reveal>
                    <Box className="profile-stage">
                      <div className="profile-ring ring-a"/><div className="profile-ring ring-b"/>
                      <Paper elevation={0} className="profile-card">
                        <Box className="profile-image-wrap"><Box component="img" src={profileImage} alt="Portrait of Kanjarla Narasimha Charyulu" className="profile-image" /></Box>
                        <Box sx={{ p: 2.4 }}>
                          <Stack direction="row" alignItems="center" justifyContent="space-between" gap={2}><Box><Typography sx={{ fontSize: 18, fontWeight: 850 }}>Narasimha Charyulu</Typography><Typography color="text.secondary" sx={{ fontSize: 12, mt: 0.5 }}>Enterprise apps · Integration · Automation</Typography></Box><Box className="profile-spark"><CodeRounded /></Box></Stack>
                          <Divider sx={{ my: 2, borderColor: 'rgba(153,183,207,.15)' }}/>
                          <Stack direction="row" justifyContent="space-between" gap={1}>{[['8+', 'Plugins*'], ['10+', 'Deployments*'], ['8.5', 'CGPA']].map(([n, label]) => <Box key={label}><Typography className="profile-stat">{n}</Typography><Typography className="profile-stat-label">{label}</Typography></Box>)}</Stack>
                          <Typography sx={{ mt: 1.6, fontSize: 10, color: 'text.secondary' }}>*Experience figures reported in my resume.</Typography>
                        </Box>
                      </Paper>
                      <motion.div className="float-tag tag-left" animate={{ y: [0, -7, 0] }} transition={{ duration: 4.2, repeat: Infinity, ease: 'easeInOut' }}><span className="tag-icon"><HubRounded /></span><span><b>Dataverse</b><small>Data & business logic</small></span></motion.div>
                      <motion.div className="float-tag tag-right" animate={{ y: [0, 7, 0] }} transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: .5 }}><span className="tag-icon violet"><AutoAwesomeRounded /></span><span><b>AI + MCP</b><small>Natural-language CRM</small></span></motion.div>
                    </Box>
                  </Reveal>
                </Grid>
              </Grid>
              <Box className="hero-bottomline"><Typography>FROM BUSINESS REQUIREMENTS</Typography><span/><Typography>TO DEPLOYABLE SOLUTIONS</Typography><span/><Typography>WITH ENGINEERING DISCIPLINE</Typography></Box>
            </Container>
          </Box>

          <Box className="signal-strip"><Container maxWidth="lg"><Stack direction="row" useFlexGap flexWrap="wrap" justifyContent="space-between" gap={2}>{['Microsoft Power Platform', 'Dynamics 365 CE', 'C# / TypeScript', 'Azure & ALM', 'AI Integrations'].map(x => <Typography key={x} className="signal-item">{x}</Typography>)}</Stack></Container></Box>

          <Box className="proof-strip" aria-label="Selected project figures">
            <Container maxWidth="lg">
              <Grid container spacing={{ xs: 2, md: 3 }}>
                {[
                  ['~60%', 'less manual document preparation', 'Reported project outcome'],
                  ['100', 'related Dataverse tables', 'Custom API retrieval scope'],
                  ['5,000+', 'CRM records migrated', 'HubSpot → Dynamics 365'],
                  ['10+', 'solution deployments', 'Across Dev, Test and Production'],
                ].map(([value, label, detail]) => <Grid key={label} size={{ xs: 6, md: 3 }}>
                  <Box className="proof-item"><Typography className="proof-value">{value}</Typography><Typography className="proof-label">{label}</Typography><Typography className="proof-detail">{detail}</Typography></Box>
                </Grid>)}
              </Grid>
              <Typography className="proof-note">Figures are reported in the supplied resume versions; see the case studies for context and verify them before publication.</Typography>
            </Container>
          </Box>

          <Container id="work" maxWidth="lg" className="section-container">
            <SectionHeading index="01" eyebrow="Selected work" title="Complex workflows. Thoughtful engineering." description="A closer look at the systems I’ve helped build—combining low-code speed with pro-code extensibility, integration patterns and attention to data quality." />
            <Grid container spacing={2.5}>{projects.map((project, index) => <Grid key={project.number} size={{ xs: 12, md: 6 }}><ProjectCard project={project} index={index} onOpen={setSelectedProject} /></Grid>)}</Grid>
          </Container>

          <Box id="approach" className="approach-section"><Container maxWidth="lg" className="section-container">
            <SectionHeading index="02" eyebrow="Engineering approach" title="Low-code when it fits. Code when it matters." description="I choose the right layer for the problem: maintainable platform configuration for standard workflows, custom code and APIs where the business logic demands more control." />
            <Grid container spacing={2}>{[
              ['01', 'Understand the workflow', 'Start with the business process, actors, data relationships, access rules and what a successful outcome looks like.'],
              ['02', 'Design the right solution layer', 'Use Dataverse and Power Platform capabilities first, then extend with C#, JavaScript, APIs or Azure where needed.'],
              ['03', 'Build for release and support', 'Account for environment configuration, connection references, solution movement, pagination, security and diagnostics.'],
            ].map(([n, title, desc], i) => <Grid key={n} size={{ xs: 12, md: 4 }}><Reveal delay={i * .07}><Paper elevation={0} className="principle-card"><Typography className="principle-number">{n}</Typography><Typography variant="h3" sx={{ fontSize: 22, mt: 3, mb: 1.3 }}>{title}</Typography><Typography color="text.secondary" sx={{ fontSize: 14, lineHeight: 1.85 }}>{desc}</Typography></Paper></Reveal></Grid>)}</Grid>
          </Container></Box>

          <Container id="experience" maxWidth="lg" className="section-container">
            <SectionHeading index="03" eyebrow="Experience" title="Built through hands-on delivery." description="Professional experience at PiSquare Technologies across enterprise CRM customization, business applications and integration work." />
            <Box className="timeline">
              <Reveal><Box className="timeline-item"><Box className="timeline-date">MAR 2025 — PRESENT</Box><Box className="timeline-marker"/><Box className="timeline-content"><Typography className="eyebrow" sx={{ color: 'primary.main !important' }}>PISQUARE TECHNOLOGIES · HYDERABAD</Typography><Typography variant="h3" sx={{ fontSize: { xs: 22, md: 28 }, mt: 1 }}>Dynamics 365 / Power Platform Developer</Typography><Typography color="text.secondary" sx={{ mt: 1.5, lineHeight: 1.9 }}>Design and develop Model-Driven and Canvas Apps on Dataverse; implement C# plugins, Custom APIs and JavaScript/TypeScript web resources; integrate Power Automate with business data; and support solution deployment across environments with Azure DevOps and configuration references.</Typography><Stack direction="row" flexWrap="wrap" useFlexGap gap={.8} sx={{ mt: 2 }}>{['C# Plugins', 'Custom APIs', 'Dataverse', 'Power Automate', 'Azure DevOps'].map(x => <Chip key={x} label={x} size="small" className="tech-chip" />)}</Stack></Box></Box></Reveal>
              <Reveal delay={.08}><Box className="timeline-item"><Box className="timeline-date">OCT 2024 — MAR 2025</Box><Box className="timeline-marker"/><Box className="timeline-content"><Typography className="eyebrow" sx={{ color: 'primary.main !important' }}>PISQUARE TECHNOLOGIES</Typography><Typography variant="h3" sx={{ fontSize: { xs: 22, md: 28 }, mt: 1 }}>Software Developer Intern</Typography><Typography color="text.secondary" sx={{ mt: 1.5, lineHeight: 1.9 }}>Contributed to Dynamics 365 and Power Apps customizations across entities, forms, views and business rules, while developing JavaScript/TypeScript components and PCF-related skills and building responsive UI components with React and Fluent UI.</Typography><Stack direction="row" flexWrap="wrap" useFlexGap gap={.8} sx={{ mt: 2 }}>{['Power Apps', 'JavaScript', 'TypeScript', 'PCF', 'React', 'Fluent UI'].map(x => <Chip key={x} label={x} size="small" className="tech-chip" />)}</Stack></Box></Box></Reveal>
            </Box>
          </Container>

          <Box id="skills" className="skills-section"><Container maxWidth="lg" className="section-container">
            <SectionHeading index="04" eyebrow="Technical capabilities" title="A connected, practical toolkit." description="The technologies I use across application design, backend customization, automation and integration—grouped by how they work together." />
            <Grid container spacing={2}>{skillGroups.map((group, i) => <Grid key={group.title} size={{ xs: 12, sm: 6 }}><Reveal delay={i * .05}><Paper elevation={0} className="skill-card"><Box className="skill-card-heading"><Avatar className="skill-icon">{group.icon}</Avatar><Box><Typography variant="h3" sx={{ fontSize: 20 }}>{group.title}</Typography><Typography color="text.secondary" sx={{ fontSize: 13, mt: .5, lineHeight: 1.65 }}>{group.desc}</Typography></Box></Box><Divider sx={{ my: 2.3, borderColor: 'rgba(153,183,207,.14)' }}/><Stack direction="row" flexWrap="wrap" useFlexGap gap={.8}>{group.items.map(item => <Chip key={item} label={item} className="skill-chip" size="small" />)}</Stack></Paper></Reveal></Grid>)}</Grid>
          </Container></Box>

          <Container maxWidth="lg" className="education-wrap"><Reveal><Paper elevation={0} className="education-card"><Box><Typography className="eyebrow">EDUCATION & CONTINUOUS LEARNING</Typography><Typography variant="h2" sx={{ fontSize: { xs: 28, md: 38 }, mt: 1.2 }}>Computer Science foundation.</Typography><Typography color="text.secondary" sx={{ mt: 1.2, lineHeight: 1.8 }}>B.Tech in Computer Science & Engineering · Narasaraopeta Engineering College · 2020–2024</Typography><Typography color="text.secondary" sx={{ mt: 1, fontSize: 13 }}>Certifications: Oracle SQL · NPTEL Joy of Computing Using Python · HackerRank Python (Basics)</Typography></Box><Box className="cgpa-box"><Typography className="cgpa-value">8.5</Typography><Typography className="cgpa-label">CGPA</Typography></Box></Paper></Reveal></Container>

          <Box id="contact" className="contact-section"><Container maxWidth="lg" className="section-container"><Grid container spacing={4} alignItems="center"><Grid size={{ xs: 12, md: 7 }}><Typography className="eyebrow">05 / CONTACT</Typography><Typography variant="h2" className="contact-title">Let’s build something that makes work simpler.</Typography><Typography color="text.secondary" sx={{ mt: 2, maxWidth: 590, lineHeight: 1.9, fontSize: 16 }}>If you’re building with Dynamics 365, Power Platform, enterprise integrations or AI-enabled business applications, I’d be glad to talk about the problem and how I can contribute.</Typography></Grid><Grid size={{ xs: 12, md: 5 }}><Paper elevation={0} className="contact-card"><Typography className="eyebrow">START A CONVERSATION</Typography><Typography sx={{ fontSize: { xs: 16, md: 18 }, fontWeight: 800, mt: 1.5, overflowWrap: 'anywhere' }}>kanjarlanarasimha@gmail.com</Typography><Button fullWidth href="mailto:kanjarlanarasimha@gmail.com" variant="contained" endIcon={<ArrowOutwardRounded />} className="primary-cta" sx={{ mt: 2.5 }}>Email Narasimha</Button><Stack direction="row" useFlexGap flexWrap="wrap" spacing={1} sx={{ mt: 1.5 }}><Tooltip title="GitHub"><IconButton aria-label="GitHub profile" component="a" href="https://github.com/rohitknc" target="_blank" rel="noreferrer" className="social-button"><GitHub /></IconButton></Tooltip><Button component="a" href="https://leetcode.com/u/Knckanjarla" target="_blank" rel="noreferrer" className="resume-link">LeetCode</Button><Button href="/Kanjarla-Narasimha-Charyulu-Resume.pdf" download startIcon={<DownloadRounded />} className="resume-link">Download resume</Button></Stack></Paper></Grid></Grid></Container></Box>
        </main>
        <Box component="footer" className="site-footer"><Container maxWidth="lg"><Stack direction={{ xs: 'column', sm: 'row' }} justifyContent="space-between" gap={1}><Typography sx={{ fontSize: 12, color: 'text.secondary' }}>© {new Date().getFullYear()} Kanjarla Narasimha Charyulu</Typography><Typography sx={{ fontSize: 12, color: 'text.secondary' }}>Thoughtful systems. Useful automation. Reliable delivery.</Typography></Stack></Container></Box>
        {selectedProject && <CaseStudyDialog project={selectedProject} onClose={closeCaseStudy} />}
      </Box>
    </MotionConfig>
  </ThemeProvider>;
}

export default App;
