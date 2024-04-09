export function moneyRound(n: number): string {
    const multipli = Math.pow(10, 2)
    n = parseFloat((n * multipli).toFixed(11))
    return (+(Math.round(n) / multipli).toFixed(2)).toString()
}
