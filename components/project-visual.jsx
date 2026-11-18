export function ProjectVisual({ project, large = false }) {
  const kind = project.visual;
  return (
    <div
      className={`project-art art-${kind} ${large ? "art-large" : ""}`}
      aria-label={`Illustrative architecture diagram for ${project.title}`}
      role="img"
    >
      <div className="art-label">
        <span className="tiny-dot" /> SYSTEM STUDY / {project.number}
        <span>↗</span>
      </div>
      {kind === "document" && (
        <div className="document-art">
          <div className="data-stack">
            <span>DATAVERSE</span>
            {["Accounts", "Contacts", "Related records"].map((x) => (
              <div key={x}>
                <span className="data-icon">▦</span>
                {x}
                <i />
              </div>
            ))}
          </div>
          <div className="flow-arrow">
            →<small>C# API</small>
          </div>
          <div className="paper-output">
            <span className="paper-fold" />
            <small>GENERATED DOCUMENT</small>
            <strong>
              A workflow.
              <br />
              Without the
              <br />
              <em>paperwork.</em>
            </strong>
            <div className="paper-lines">
              <i />
              <i />
              <i />
            </div>
            <span className="paper-stamp">✓ MAPPED</span>
          </div>
        </div>
      )}
      {kind === "employee" && (
        <div className="employee-art">
          <div className="app-window">
            <div className="window-bar">
              <span>people / workspace</span>
              <span>•••</span>
            </div>
            <div className="app-window-body">
              <aside>
                ▦<span>⌂</span>
                <span>☷</span>
              </aside>
              <div className="employee-content">
                <small>GOOD WORK STARTS WITH</small>
                <strong>Your people.</strong>
                <div className="employee-metrics">
                  <div>
                    <b>HR</b>
                    <span>Reports & people</span>
                  </div>
                  <div>
                    <b>Admin</b>
                    <span>Role-aware access</span>
                  </div>
                </div>
                <div className="employee-row">
                  <span>↗ Report generation</span>
                  <b>PDF</b>
                </div>
                <div className="employee-row">
                  <span>⇄ SharePoint sync</span>
                  <b>FLOW</b>
                </div>
              </div>
            </div>
          </div>
          <span className="floating-note">Less admin. More human.</span>
        </div>
      )}
      {kind === "migration" && (
        <div className="migration-art">
          <div className="platform source">
            <span className="platform-symbol">✳</span>
            <strong>HubSpot</strong>
            <small>SOURCE</small>
          </div>
          <div className="migration-line">
            <span />
            <b>→</b>
            <span />
            <small>5,000+ records*</small>
          </div>
          <div className="platform target">
            <span className="platform-symbol">◈</span>
            <strong>Dynamics 365</strong>
            <small>DESTINATION</small>
          </div>
          <div className="migration-tags">
            Accounts <span>·</span> Contacts <span>·</span> Leads <span>·</span>{" "}
            Opportunities
          </div>
        </div>
      )}
      {kind === "ai" && (
        <div className="ai-art">
          <div className="chat-prompt">
            <span>✳</span>“Find the CRM records I need.”
            <i />
          </div>
          <div className="ai-path">
            <div>
              <span>✳</span>
              <strong>Claude</strong>
              <small>CONVERSATION</small>
            </div>
            <b>↔</b>
            <div className="mcp-node">MCP</div>
            <b>↔</b>
            <div>
              <span>▦</span>
              <strong>Dataverse</strong>
              <small>BUSINESS DATA</small>
            </div>
          </div>
          <div className="tool-result">
            <span>✓</span> Structured tools. Contextual answers.
          </div>
        </div>
      )}
      <div className="art-caption">
        <span>{project.label}</span>
        <span>CONCEPTUAL VIEW</span>
      </div>
    </div>
  );
}
