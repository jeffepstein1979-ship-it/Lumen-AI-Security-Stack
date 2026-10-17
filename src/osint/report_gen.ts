
export type Finding = {
    severity: 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW';
    title: string;
    description: string;
    remediation: string;
};

export async function generateIntegrityReport(domain: string, findings: Finding[]) {
    const date = new Date().toISOString().split('T')[0];
    
    let report = `# NETWORK INTEGRITY REPORT\n`;
    report += `**Target Asset:** ${domain}\n`;
    report += `**Date of Audit:** ${date}\n`;
    report += `**Classification:** SOVEREIGN SECRET\n\n`;
    report += `---\n\n`;
    
    report += `## 1. EXECUTIVE SUMMARY\n`;
    report += `The audit of ${domain} has revealed a systemic vulnerability gap. `;
    const criticals = findings.filter(f => f.severity === 'CRITICAL').length;
    report += `We have identified ${criticals} critical failure points that allow for immediate unauthorized access.\n\n`;
    
    report += `## 2. VULNERABILITY MATRIX\n`;
    findings.forEach((f, i) => {
        report += `### [${f.severity}] ${f.title}\n`;
        report += `**Observation:** ${f.description}\n`;
        report += `**Sovereign Remediation:** ${f.remediation}\n\n`;
    });
    
    report += `---\n`;
    report += `**Conclusion:** The current posture is unsustainable. The gap is wide. The predator is already in the room.\n`;
    report += `**Recommendation:** Immediate migration to the 'Architect' tier for full structural remediation.`;
    
    return report;
}
