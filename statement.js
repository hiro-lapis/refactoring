function statement(invoice, plays) {
    let totalAmount = 0;
    let volumeCredits = 0;
    let result = `Statement for ${invoice.customer}\n`;
    for (let perf of invoice.performances) {

        volumeCredits += volumeCreditsFor(perf);
        // 注文の内訳を出力
        result += ` ${playFor(perf).name}: ${format(aMountFor(perf) / 100)} (${perf.audience} seats) \n`;
        totalAmount += aMountFor(perf);
        result += `Amount owed is ${format(totalAmount / 100)}`;
        result += `You earned ${volumeCredits} credits \n`;
        return result;
    }

    /**
     * 数値をUSD(小数点2位まで)にフォーマット
     * @param {*} aNumber
     */
    function format(aNumber) {
    return new Intl.NumberFormat("en-US",
    {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: 2,
    }).format(aNumber);
    }

    /**
     * 演劇のポイントを計算
     * @param {*} aPerformance
     */
    function volumeCreditsFor(aPerformance) {
        let result = 0;
        result += Math.max(aPerformance.audience - 30, 0);
        if ("comedy" === playFor(aPerformance).type) result += Math.floor(aPerformance.audience / 5);
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
