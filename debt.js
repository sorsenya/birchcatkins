const API_URL =
"https://script.google.com/macros/s/AKfycbzyI_LIRHkevzMHYhI26zc3Ep2KzkX4xYG132H-w6n5M1SrnHoOlb2KWt2ykejDtZeOfA/exec";

const params =
    new URLSearchParams(
        window.location.search
    );

const plotId =
    params.get("id");

fetch(API_URL)
.then(response => response.json())
.then(data => {

    const plot =
        data[plotId];

    const content =
        document.getElementById("content");

    if (!plot) {

        content.innerHTML =
            "<h2>Участок не найден</h2>";

        return;
    }

    let html = "";

    html += `<h1>Участок №${plotId}</h1>`;

    html += `<h2>${plot.owner}</h2>`;

    html += "<ul>";

    plot.debts.forEach(debt => {

        html += `
        <li>
            ${debt.title}
            —
            ${debt.debt} ₽
        </li>
        `;

    });

    html += "</ul>";

    html += `
    <h3>
        Общий долг:
        ${plot.totalDebt} ₽
    </h3>
    `;

    html += `
    <p>
        <a href="index.html">
            ← Назад
        </a>
    </p>
    `;

    content.innerHTML = html;

})
.catch(error => {

    console.error(error);

    document.getElementById("content")
        .innerHTML =
        "Ошибка загрузки";

});