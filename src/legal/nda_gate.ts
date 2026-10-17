
export async function verifyNDASignature(clientId: string): Promise<boolean> {
    // Check KV for signed hash of the NDA
    const signed = await LUMEN_KV.get(`nda_${clientId}`);
    return signed === 'true';
}
