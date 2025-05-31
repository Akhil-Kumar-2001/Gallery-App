export interface IToken {
    generatingTokens(userId: string, email: string): {
        accessToken: string;
        refreshToken: string;
    };
}


export interface ImageOrderItem {
    _id: string;
    order: number;
}

export interface ImageOrderPayload {
    imageOrder: ImageOrderItem[];
}
