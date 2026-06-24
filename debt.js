const params = new URLSearchParams(window.location.search);
const plotId = params.get("id");

fetch("./debt.json")
.then(r => r.json())
.then(data => { 

    const plot = data[plotId];
    const reportTitle = data._title || "";

    if (!plot) {
        document.getElementById("content").innerHTML =
            "<h2>РЈС‡Р°СЃС‚РѕРє РЅРµ РЅР°Р№РґРµРЅ</h2>";
        return;
    }

    let html = `
        <div class="report-title">
            ${reportTitle}
        </div>

        <h1 style="margin:0 0 10px 0;">
            РЈС‡Р°СЃС‚РѕРє в„–${plotId}
        </h1>
        <h2 style="margin:0 0 15px 0;">
            ${plot.owner}
        </h2>

        <div class="section-line"></div>

        <h3 style="margin:0 0 8px 0;text-decoration:underline;">
            Р”РѕР»РіРё
        </h3> 
    `;

    if (plot.debts && plot.debts.length > 0) {

        plot.debts.forEach(debt => {
            html += `
                <div style="margin-bottom:3px;">
                    ${debt.title} вЂ” ${debt.debt} в‚Ѕ
                </div>
            `;
        });

    } else {

        html += `
            <div style="margin-bottom:3px;">
                РЈ РІР°СЃ РѕС‚СЃСѓС‚СЃС‚РІСѓРµС‚ Р·Р°РґРѕР»Р¶РµРЅРЅРѕСЃС‚СЊ рџ™‚
            </div>
        `;
    }
    html += `
        <h3 style="margin:12px 0 8px 0;">
            РћР±С‰РёР№ РґРѕР»Рі: ${plot.totalDebt} в‚Ѕ
        </h3>

        <div class="section-line"></div>

        <h3 style="margin:12px 0 8px 0;text-decoration:underline;">
            РЎРїСЂР°РІРєР° РѕР± РѕРїР»Р°С‚Рµ
        </h3>
    `;

    let totalPaid = 0;

    if (Array.isArray(plot.payments) && plot.payments.length > 0) {

        plot.payments.forEach(payment => {

            totalPaid += Number(payment.amount);

            html += `
                <div style="margin-bottom:3px;">
                    ${payment.date} вЂ” ${payment.amount} в‚Ѕ
                </div>
            `;
        });

        html += `
            <h3 style="margin:12px 0 8px 0;">
                РС‚РѕРіРѕ РѕРїР»Р°С‡РµРЅРѕ: ${totalPaid.toFixed(2)} в‚Ѕ
            </h3>
            <div class="section-line"></div>
        `;
    } else {

        html += `
            <div style="margin-bottom:3px;">
                РћРїР»Р°С‚ РЅРµ РЅР°Р№РґРµРЅРѕ
            </div>
        `;
    }

    html += `
        <p style="margin-top:15px;">
            <a href="./payments.html">в†ђ РќР°Р·Р°Рґ</a>
        </p>
    `;

    document.getElementById("content").innerHTML = html;

})
.catch(error => {

    console.error(error);

    document.getElementById("content").innerHTML =
        "РћС€РёР±РєР° Р·Р°РіСЂСѓР·РєРё РґР°РЅРЅС‹С…";

});
