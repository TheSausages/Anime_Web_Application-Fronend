export interface Achievement {
    achievementId: number;
    name: string;
    description: string;
    achievementIcon: Uint8Array;
    achievementPoints: number;
    numberOfUsersThatPosses: number;
}