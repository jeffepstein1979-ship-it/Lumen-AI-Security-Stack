
export type Tier = 'Sentinel' | 'Architect' | 'Sovereign' | 'None';

export const TIER_CONFIG = {
    'Sentinel': {
        price: 2500,
        features: ['OSINT Monitoring', 'Surface Attack Map', 'Monthly Leak Reports'],
        limit: 'Basic'
    },
    'Architect': {
        price: 7500,
        features: ['Quarterly Deep-Dives', 'AI Red Teaming', 'Remediation Blueprints'],
        limit: 'Advanced'
    },
    'Sovereign': {
        price: 20000,
        features: ['24/7 Offensive Retainer', 'Executive Protection', 'Custom AI Defense'],
        limit: 'Unlimited'
    },
    'None': {
        price: 0,
        features: ['Initial Teaser Only'],
        limit: 'None'
    }
};

export async function checkAccess(clientId: string, requiredTier: Tier): Promise<boolean> {
    const userTier = await LUMEN_KV.get(`tier_${clientId}`) || 'None';
    
    const weights = { 'None': 0, 'Sentinel': 1, 'Architect': 2, 'Sovereign': 3 };
    return weights[userTier as Tier] >= weights[requiredTier];
}
