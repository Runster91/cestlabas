import Chart from 'chart.js/auto';

export const idsalario = async () => {
  try {
    const response = await fetch('https://dummy.restapiexample.com/api/v1/employees');
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    
    const dataResponse = await response.json();
    console.log('data restapiexample', dataResponse);

    const filteredData = dataResponse.data
      .sort((a, b) => b.employee_salary - a.employee_salary)
      .slice(0, 24);

    document.querySelector('#salrate').innerHTML = /* HTML */ `
      <div>
        <canvas id="chartapi"></canvas>
      </div>
    `;

    const myChartAPIArea = document.querySelector('#chartapi');
    console.log('myChartAPIArea', myChartAPIArea);

    new Chart(myChartAPIArea, {
      type: 'bar', // Change to 'bar' for a bar chart, or other chart types
      data: {
        labels: filteredData.map((row) => row.employee_name),
        datasets: [
          {
            label: 'Salary in USD',
            data: filteredData.map((row) => row.employee_salary),
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(255, 159, 64, 0.2)',
              // Add more colors as needed
            ],
          },
          {
            label: 'Age',
            data: filteredData.map((row) => row.employee_age),
            backgroundColor: [
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              // Add more colors as needed
            ],
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false, // Adjust as needed
        // Add more chart options as needed
      },
    });
  } catch (error) {
    console.error('Error fetching or processing data:', error);
  }
};
