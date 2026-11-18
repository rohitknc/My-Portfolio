"use client";
import { useEffect, useRef, useState } from "react";
const flows = [
  {
    name: "Document engine",
    short: "Documents",
    code: "DOC",
    subtitle: "From connected CRM records to a finished document.",
    steps: [
      [
        "Record request",
        "A record ID starts the workflow. The request establishes which business record the document belongs to.",
        "Dataverse",
      ],
      [
        "Related data",
        "A C# Custom API retrieves the related Dataverse records and shapes a consistent response.",
        "C# · Custom API",
      ],
      [
        "Template mapping",
        "Power Automate maps the structured payload into the appropriate Word-template fields.",
        "Power Automate",
      ],
      [
        "Document output",
        "The mapped template becomes a repeatable document-generation workflow.",
        "Word templates",
      ],
    ],
    payload: {
      recordId: "example-record",
      relatedData: "structured payload",
      templateMapping: "Power Automate",
      output: "Word document",
    },
  },
  {
    name: "People workspace",
    short: "People",
    code: "APP",
    subtitle:
      "An employee workflow that connects access, records, and reporting.",
    steps: [
      [
        "Canvas action",
        "A person starts a task in a responsive Canvas App.",
        "Canvas Apps",
      ],
      [
        "Access context",
        "Role-aware application logic separates Admin and HR workflows.",
        "Power Fx · Roles",
      ],
      [
        "Connected records",
        "SharePoint-backed records and pagination support large-list handling.",
        "SharePoint",
      ],
      [
        "Report delivery",
        "Power Automate supports PDF/report generation and data synchronization.",
        "Power Automate",
      ],
    ],
    payload: {
      app: "Employee management",
      accessContext: "Admin / HR",
      dataSource: "SharePoint",
      output: "PDF report",
    },
  },
  {
    name: "CRM migration",
    short: "Migration",
    code: "CRM",
    subtitle: "Keeping business relationships connected as platforms change.",
    steps: [
      [
        "Source records",
        "Accounts, Contacts, Leads and Opportunities begin in HubSpot.",
        "HubSpot",
      ],
      [
        "Target model",
        "Dataverse tables, forms and views provide the target CRM structure.",
        "Dataverse",
      ],
      [
        "Business processes",
        "JavaScript validations and Business Process Flows support the new workflow.",
        "JavaScript · BPF",
      ],
      [
        "Release journey",
        "Solutions move between environments with relational consistency and controlled access in mind.",
        "Dynamics 365 · ALM",
      ],
    ],
    payload: {
      source: "HubSpot",
      destination: "Dynamics 365",
      entities: ["Account", "Contact", "Lead", "Opportunity"],
      reportedRecords: "5,000+",
    },
  },
  {
    name: "AI + business data",
    short: "AI + MCP",
    code: "MCP",
    subtitle: "A conversation connected to structured CRM operations.",
    steps: [
      [
        "A question",
        "A person asks an AI assistant for relevant CRM information in natural language.",
        "Claude AI",
      ],
      [
        "Tool interface",
        "An MCP server exposes structured Dataverse operations as callable tools.",
        "MCP",
      ],
      [
        "Record retrieval",
        "The tool retrieves and filters relevant records through the Dataverse API.",
        "Dataverse API",
      ],
      [
        "Contextual response",
        "The retrieved records give the assistant context for its conversational response.",
        "AI integration",
      ],
    ],
    payload: {
      request: "Find relevant CRM records",
      interface: "MCP tools",
      dataSource: "Dataverse",
      result: "Contextual response",
    },
  },
];
export function SystemExplorer() {
  const [flowIndex, setFlow] = useState(0);
  const [step, setStep] = useState(0);
  const [view, setView] = useState("flow");
  const [running, setRunning] = useState(false);
  const [completed, setCompleted] = useState(false);
  const timers = useRef([]);
  const flow = flows[flowIndex];
  const cancel = () => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
  };
  useEffect(() => () => timers.current.forEach(clearTimeout), []);
  function choose(i) {
    cancel();
    setFlow(i);
    setStep(0);
    setRunning(false);
    setCompleted(false);
  }
  function run() {
    cancel();
    setStep(0);
    setCompleted(false);
    if (matchMedia("(prefers-reduced-motion:reduce)").matches) {
      setStep(3);
      setCompleted(true);
      return;
    }
    setRunning(true);
    for (let i = 1; i < 4; i++)
      timers.current.push(setTimeout(() => setStep(i), i * 700));
    timers.current.push(
      setTimeout(() => {
        setRunning(false);
        setCompleted(true);
      }, 2900),
    );
  }
  return (
    <div className="system-explorer">
      <div className="explorer-toolbar">
        <div className="window-dots" aria-hidden="true">
          <i />
          <i />
          <i />
        </div>
        <span>narasimha / system-notes</span>
        <span className="explorer-local">
          <i /> INTERACTIVE WALKTHROUGH
        </span>
      </div>
      <div className="explorer-layout">
        <div className="explorer-sidebar">
          <span className="micro-label">EXPLORE A SYSTEM</span>
          {flows.map((f, i) => (
            <button
              aria-pressed={i === flowIndex}
              onClick={() => choose(i)}
              key={f.code}
            >
              <span className="flow-code">{f.code}</span>
              <span>{f.name}</span>
              <b>↗</b>
            </button>
          ))}
          <div className="explorer-sidebar-note">
            <span>↳</span>
            <p>
              Different challenges.
              <br />
              Connected thinking.
            </p>
          </div>
        </div>
        <div className="explorer-main">
          <div className="explorer-title">
            <div>
              <p className="micro-label">SYSTEM 0{flowIndex + 1} / 04</p>
              <h3>{flow.name}</h3>
              <p>{flow.subtitle}</p>
            </div>
            <div
              className="view-switch"
              role="group"
              aria-label="Walkthrough view"
            >
              {["flow", "payload"].map((v) => (
                <button
                  aria-pressed={v === view}
                  onClick={() => setView(v)}
                  key={v}
                >
                  {v === "flow" ? "Flow" : "Payload"}
                </button>
              ))}
            </div>
          </div>
          {view === "flow" ? (
            <div className={`flow-canvas ${running ? "is-running" : ""}`}>
              <div className="flow-path" aria-label="Select a workflow stage">
                {flow.steps.map(([title, , tool], i) => (
                  <button
                    key={title}
                    aria-pressed={step === i}
                    className={i < step || completed ? "stage-done" : ""}
                    onClick={() => {
                      cancel();
                      setRunning(false);
                      setCompleted(false);
                      setStep(i);
                    }}
                  >
                    <span className="stage-port">
                      {i < step || completed ? "✓" : `0${i + 1}`}
                    </span>
                    <strong>{title}</strong>
                    <small>{tool}</small>
                    {i < 3 && (
                      <span className="stage-connector" aria-hidden="true">
                        →
                      </span>
                    )}
                  </button>
                ))}
              </div>
              <div className="stage-detail">
                <span className="detail-index">
                  0{step + 1}
                  <small>/04</small>
                </span>
                <div>
                  <h4>{flow.steps[step][0]}</h4>
                  <p>{flow.steps[step][1]}</p>
                </div>
              </div>
            </div>
          ) : (
            <div className="payload-view">
              <div>
                <span>example.payload.json</span>
                <span>ILLUSTRATIVE DATA</span>
              </div>
              <pre>{JSON.stringify(flow.payload, null, 2)}</pre>
            </div>
          )}
          <div className="explorer-bottom">
            <span role="status">
              <i className={running ? "running-dot" : ""} />
              {running
                ? `Walking through stage ${step + 1} of 4`
                : completed
                  ? "Walkthrough complete"
                  : "Select a stage to explore the thinking"}
            </span>
            <button className="run-flow" onClick={run} disabled={running}>
              {running
                ? "Walking through…"
                : completed
                  ? "Replay walkthrough ↻"
                  : "Play walkthrough ▷"}
            </button>
          </div>
        </div>
      </div>
      <div className="explorer-disclaimer">
        <span>⌘ A little look under the hood.</span>
        <p>
          Conceptual walkthroughs of portfolio projects. Runs locally with
          illustrative data.
        </p>
      </div>
    </div>
  );
}
