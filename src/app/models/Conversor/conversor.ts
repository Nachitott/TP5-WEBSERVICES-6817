export interface divisas {
    currencies: Record<string, string>;
    success: boolean;
}

export interface conversion {
    success: boolean;
    query: { from: string, to: string, amount: number }
    info: { timestamp: number, rate: number }
    result: number
}