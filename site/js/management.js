function setUserLogFormLang(lang) {
    generateChart();
    generateBestBuyersTable(lang);
}

const btnItaPhone = document.getElementById("btnIta1");
const btnItaPC = document.getElementById("btnIta2");
const btnEngPhone = document.getElementById("btnEng1");
const btnEngPC = document.getElementById("btnEng2");

btnItaPhone.addEventListener('click', (event) => {
    location.reload();
    setUserLogFormLang("it");
});

btnItaPC.addEventListener('click', (event) => {
    location.reload();
    setUserLogFormLang("it");
});

btnEngPhone.addEventListener('click', (event) => {
    location.reload();
    setUserLogFormLang("en");
});

btnEngPC.addEventListener('click', (event) => {
    location.reload();
    setUserLogFormLang("en");
});

async function fetchChartData(lang) {
    const url = "utils/getChartData.php";
    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }

        const text = await response.text(); 
        if (!text.trim()) {
            throw new Error("La risposta è vuota o non valida.");
        }

        const data = text.split('<br>');

        return data.map(item => {
            const parts = item.split(',');

            if (parts.length === 3) {
                return {
                    group: parts[0].trim(),  
                    groupIta: parts[1].trim(), 
                    revenue: parseFloat(parts[2].trim())
                };
            }
            return null;
        }).filter(item => item !== null);

    } catch (error) {
        console.log("Errore:", error.message);
        return [];
    }
}

async function generateChart(lang) {
    const chartContainer = document.getElementById('chart-container');

    const data = await fetchChartData(lang);

    if (!data || data.length === 0) {
        console.error("Nessun dato disponibile per il grafico.");
        return;
    }

    const maxRevenue = Math.max(...data.map(item => item.revenue));

    const yAxis = document.createElement('article');
    yAxis.className = 'y-axis';

    const yValues = [maxRevenue]; 
    yValues.forEach(value => {
        const div = document.createElement('span');
        div.textContent = value.toFixed(0);
        yAxis.appendChild(div);
    });
    chartContainer.appendChild(yAxis);

    const chart = document.createElement('span');
    chart.className = 'chart';

    data.forEach(item => {
        const bar = document.createElement('span');
        bar.className = 'bar';
        const height = (item.revenue / maxRevenue) * 100;
        bar.style.height = `${height}%`;
        bar.setAttribute('data-value', item.revenue);

        const label = document.createElement('span');
        label.className = 'label';
        label.textContent = lang === 'en' ? item.group : item.groupIta;
        bar.appendChild(label);

        chart.appendChild(bar);
    });

    chartContainer.appendChild(chart);
}

// Funzione per recuperare i migliori acquirenti
async function fetchBestBuyers() {
    const url = "utils/getBestBuyers.php"; // URL del file PHP
    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }

        const buyers = await response.json(); // La risposta in formato JSON

        return buyers.map(buyer => ({
            name: buyer.name,  // Nome del compratore
            surname: buyer.surname,  // Cognome del compratore
            numOrders: buyer.numOrders,  // Numero di ordini
            totalSpent: buyer.totalSpent,  // Totale speso
            frequencyValue: buyer.frequencyValue  // Valore frequenza
        }));

    } catch (error) {
        console.error("Errore durante il recupero dei dati:", error.message);
        return [];
    }
}

// Funzione per generare la tabella dei migliori acquirenti
async function generateBestBuyersTable(lang) {
    const buyers = await fetchBestBuyers();

    if (buyers.length === 0) {
        console.error("Nessun dato disponibile per la tabella.");
        return;
    }

    const section = document.querySelector("section:last-of-type"); // Seleziona la sezione in cui aggiungere la tabella

    // Crea un contenitore per la tabella e il caption
    const tableContainer = document.createElement("div");

    // Aggiungi la scritta "Best Buyers" sopra la tabella
    const caption = document.createElement("h3");
    caption.textContent = lang === 'en' ? "Best Buyers:" : "Migliori Compratori:";
    tableContainer.appendChild(caption);

    const table = document.createElement("table");

    if (lang == 'en'){
        table.innerHTML = `
        <thead>
            <tr>
                <th>Name</th>
                <th>Surname</th>
                <th>Num. Ord.</th>
                <th>Total Spent</th>
                <th>Frequency Value*</th>
            </tr>
        </thead>
        <tbody></tbody>
        <tfoot>
            <tr>
                <td colspan="5">*The Frequency Value is the result from the division of the Total Spent by the Number of Orders</td>
            </tr>
        </tfoot>
    `;
    } else {
        table.innerHTML = `
        <thead>
            <tr>
                <th>Nome</th>
                <th>Cognome</th>
                <th>Num. Ord.</th>
                <th>Totale Speso</th>
                <th>Valore di Frequenza*</th>
            </tr>
        </thead>
        <tbody></tbody>
        <tfoot>
            <tr>
                <td colspan="5">*Il Valore di Frequenza è il risultato della divisione del Totale Speso per il Numero di Ordini</td>
            </tr>
        </tfoot>
    `;
    }
    

    const tbody = table.querySelector("tbody");

    buyers.forEach(buyer => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${buyer.name}</td>
            <td>${buyer.surname}</td>
            <td>${buyer.numOrders}</td>
            <td>${buyer.totalSpent}</td>
            <td>${buyer.frequencyValue.toFixed(2)}</td>
        `;
        tbody.appendChild(row);
    });

    // Aggiungi la tabella al contenitore
    tableContainer.appendChild(table);

    // Aggiungi il contenitore alla sezione
    section.appendChild(tableContainer);
}