function statement(invoice, plays) {
    let totalAmount = 0;
    let volumeCredits = 0;

    let result = `Statement for ${invoice.customer}\n`;

    const format = new Intl.NumberFormat("en-US",
        {
            style: "currency",
            currency: "USD",
            minimumFractionDigits: 2,
        }).format;
    for (const perf of invoice.performances) {
        // ボリューム特典のポイントを加算
        volumeCredits += Math.max(perf.audience - 30, 0);
        // 喜劇の時は10人につき,さらにポイント加算
        if ("comedy" === playFor(perf).type) volumeCredits += Math.floor(perf.audience / 5);
        // 注文の内訳を出力
        result += ` ${playFor(perf).name}: ${format(aMountFor(perf) / 100)} (${perf.audience} seats) \n`;
        totalAmount += aMountFor(perf);
        result += `Amount owed is ${format(totalAmount / 100)}`;
        result += `You earned ${volumeCredits} credits \n`;
        return result;
    }

    /**
     * playe内にplayIDに応じた値を返却
     * @param {*} aPerformance
     */
    function playFor(aPerformance) {
        return plays[aPerformance.playID];
    }

    /**
     *
     * @param {*} aPerformance
     */
    function aMountFor(aPerformance) {
        let result = 0;
            switch (playFor(aPerformance).type) {
                case "tragedy":
                    result = 40000;
                    if (aPerformance.audience > 30) {
                        result += 1000 * (aPerformance.audience - 30);
                    }
                    break;
                case "comedy":
                    result = 30000;
                    if (aPerformance.audience > 20) {
                        result += 1000 + 50 * (aPerformance.audience - 20);
                    }
                    result += 300 * aPerformance.audience;
                    break;
                default:
                    throw new Error(`unknown type: ${playFor(aPerformance).type}`);
            }
        return result;
    }
}


module.exports = statement;
