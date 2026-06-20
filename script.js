const API_URL =
"https://script.google.com/macros/s/AKfycbzyI_LIRHkevzMHYhI26zc3Ep2KzkX4xYG132H-w6n5M1SrnHoOlb2KWt2ykejDtZeOfA/exec";

fetch(API_URL)
.then(response => response.json())
.then(data => {

    document.getElementById("title").textContent =
        data._title || "Задолженности СНТ";

    const plots =
        document.getElementById("plots");

    plots.innerHTML = "";

    Object.keys(data)
    .filter(key => key !== "_title")
    .sort((a,b) => Number(a) - Number(b))
    .forEach(plot => {

        const button =
            document.createElement("button");

        button.className = "plot-btn";

        button.textContent =
             plot;

        button.onclick = () => {

            location.href =
                "debt.html?id=" + plot;

        };

        plots.appendChild(button);

    });

})
.catch(error => {

    console.error(error);

    document.getElementById("plots")
        .innerHTML =
        "Ошибка загрузки данных";

});