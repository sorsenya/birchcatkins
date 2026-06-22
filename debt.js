const params = new URLSearchParams(window.location.search);
const plotId = params.get("id");

fetch("./debt.json")
.then(r => r.json())
.then(data => {

    const plot = data[plotId];

    let html = `
        <h1>Участок №${plotId}</h1>
        <h2>${plot.owner}</h2>
        <ul>
    `;

    plot.debts.forEach(debt => {
        html += `
            <li>${debt.title} — ${debt.debt} ₽</li>
        `;
    });

    html += `
        </ul>

        <h3>Общий долг: ${plot.totalDebt} ₽</h3>

        <p>
            <a href="./index.html">← Назад</a>
        </p>
    `;

    document.getElementById("content").innerHTML = html;
});
