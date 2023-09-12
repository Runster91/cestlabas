export async function fetchAndPopulateTable() {
    try {
        const response = await fetch("https://dummy.restapiexample.com/api/v1/employees");
        const data = await response.json();
        createTable(data.data);
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}

function createTable(data) {
    // Create the HTML table
    const table = document.createElement("table");
    table.border = "1";
    table.style.borderCollapse = "collapse";

    // Create table header
    const thead = document.createElement("thead");
    const headerRow = document.createElement("tr");

    for (const key in data[0]) {
        const th = document.createElement("th");
        th.textContent = key;
        headerRow.appendChild(th);
    }

    thead.appendChild(headerRow);
    table.appendChild(thead);

    // Create table body
    const tbody = document.createElement("tbody");

    data.forEach(employee => {
        const row = document.createElement("tr");
        for (const key in employee) {
            const cell = document.createElement("td");
            cell.textContent = employee[key];
            row.appendChild(cell);
        }
        tbody.appendChild(row);
    });

    table.appendChild(tbody);

    // Append the table to the "tble" div
    const tbleDiv = document.getElementById("tble");
    tbleDiv.innerHTML = ''; // Clear any previous content in the div
    tbleDiv.appendChild(table);
}

// Call the function to fetch and populate the table
fetchAndPopulateTable();