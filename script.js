const API_URL = "./debts.json";

fetch(API_URL)
.then(response => response.json())
.then(data => {

    const title = document.getElementById("title");
    const plots = document.getElementById("plots");

    plots.innerHTML = "";

    // Заголовок
    title.textContent = data._title || "Список участков";

    // Кнопки участков
    Object.keys(data)
        .filter(key => /^\d+$/.test(key))
        .sort((a, b) => Number(a) - Number(b))
        .forEach(plot => {

            const button = document.createElement("button");

            button.className = "plot-btn";
            button.textContent = plot;

            button.onclick = () => {
                location.href = "./debt.html?id=" + plot;
            };

            plots.appendChild(button);

        });

})
.catch(error => {

    console.error(error);

    document.getElementById("plots").innerHTML =
        "Ошибка загрузки данных";

});
