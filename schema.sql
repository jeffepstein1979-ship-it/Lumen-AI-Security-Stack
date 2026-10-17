
-- Leads Table: Tracking the funnel
CREATE TABLE IF NOT EXISTS leads (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT NOT NULL,
    domain TEXT NOT NULL,
    lead_status TEXT DEFAULT 'TEASER_TRIGGERED',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Audits Table: The evidence locker
CREATE TABLE IF NOT EXISTS audits (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    lead_id INTEGER,
    domain TEXT NOT NULL,
    findings TEXT,
    report_path TEXT,
    severity_score INTEGER,
    audit_date DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(lead_id) REFERENCES leads(id)
);

-- Subscriptions Table: The revenue tracker
CREATE TABLE IF NOT EXISTS subscriptions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    lead_id INTEGER,
    tier TEXT CHECK(tier IN ('Sentinel', 'Architect', 'Sovereign')),
    payment_status TEXT DEFAULT 'PENDING',
    start_date DATETIME DEFAULT CURRENT_TIMESTAMP,
    expiry_date DATETIME,
    FOREIGN KEY(lead_id) REFERENCES leads(id)
);

-- Intelligence Logs: Agent Memory
CREATE TABLE IF NOT EXISTS intel_logs (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    lead_id INTEGER,
    event_type TEXT,
    detail TEXT,
    timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(lead_id) REFERENCES leads(id)
);
