const params = new URLSearchParams(window.location.search);
const plotId = params.get("id");

fetch("./debt.json")
.then(r => r.json())
.then(data => { 

    const plot = data[plotId];
    const reportTitle = data._title || "";

    if (!plot) {
        document.getElementById("content").innerHTML =
            "<h2>Участок не найден</h2>";
        return;
    }

    let html = `
        <div class="report-title">
            ${reportTitle}
        </div>

        <h1 style="margin:0 0 10px 0;">
            Участок №${plotId}
        </h1>
        <h2 style="margin:0 0 15px 0;">
            ${plot.owner}
        </h2>

        <div class="section-line"></div>
    `;

        html += `
        <h3 style="margin:12px 0 8px 0;text-decoration:underline;">
            Начисления
        </h3>
    `;

    if (Array.isArray(plot.charges) && plot.charges.length > 0) {

        plot.charges.forEach(charge => {

            html += `
                <div style="margin-bottom:3px;">
                    ${charge.title} — ${charge.amount} ₽
                </div>
            `;

        });

    } else {

        html += `
            <div style="margin-bottom:3px;">
                Начислений нет
            </div>
        `;

    }

    html += `
        <div class="section-line"></div>

        <h3 style="margin:0 0 8px 0;text-decoration:underline;">
            Долги
        </h3>
    `;

    if (plot.debts && plot.debts.length > 0) {

        plot.debts.forEach(debt => {
            html += `
                <div style="margin-bottom:3px;">
                    ${debt.title} — ${debt.debt} ₽
                </div>
            `;
        });

    } else {

        html += `
            <div style="margin-bottom:3px;">
                У вас отсутствует задолженность 🙂
            </div>
        `;
    }
    html += `
        <h3 style="margin:12px 0 8px 0;">
            Общий долг: ${plot.totalDebt} ₽
        </h3>

        <div class="section-line"></div>

        <h3 style="margin:12px 0 8px 0;text-decoration:underline;">
            Справка об оплате
        </h3>
    `;

    let totalPaid = 0;

    if (Array.isArray(plot.payments) && plot.payments.length > 0) {

        plot.payments.forEach(payment => {

            totalPaid += Number(payment.amount);

            html += `
                <div style="margin-bottom:3px;">
                    ${payment.date} — ${payment.amount} ₽
                </div>
            `;
        });

        html += `
            <h3 style="margin:12px 0 8px 0;">
                Итого оплачено: ${totalPaid.toFixed(2)} ₽
            </h3>
            <div class="section-line"></div>
        `;
    } else {

        html += `
            <div style="margin-bottom:3px;">
                Оплат не найдено
            </div>
        `;
    }

    html += `
        <p style="margin-top:15px;">
            <a href="./payments.html">← Назад</a>
        </p>
    `;

    document.getElementById("content").innerHTML = html;

})
.catch(error => {

    console.error(error);

    document.getElementById("content").innerHTML =
        "Ошибка загрузки данных";

});
