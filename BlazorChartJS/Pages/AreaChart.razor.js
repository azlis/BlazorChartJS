export function areaChart(chartdata) {
    const ctx = document.getElementById('AreaChart');
    const labels = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August'
    ];

    const data = {
        labels: labels,
        datasets: [
            {
                label: 'Dataset',
                data: chartdata,
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                fill: false
            }
        ]
    };
    const config = {
        type: 'line',
        data: data,
        options: {
            plugins: {
                filler: {
                    propagate: false,
                },
                title: {
                    display: true,
                    text: (ctx) => 'Fill: ' + ctx.chart.data.datasets[0].fill
                }
            },
            interaction: {
                intersect: false,
            }
        },
    };
    new Chart(ctx, config);
}