// References.ts
export const generateTeamReference = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let reference = '';
    for (let i = 0; i < 6; i++) {
        reference += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return reference;
};
