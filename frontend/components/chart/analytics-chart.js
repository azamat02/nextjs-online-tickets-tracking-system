import React from 'react'
import {Line} from "react-chartjs-2";

export default function AnalyticsChart({analyticData, daysCount}) {
    const visitCounters = []
    const month = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
    const days = []
    for (let i = daysCount; i>=0; i--){
        let date = new Date();
        date.setDate(date.getDate() - i);
        let randomTicketsCount = Math.floor(Math.random() * 1000);
        visitCounters.push(randomTicketsCount)

        let stringDate = `${date.getUTCDate()}/${date.getMonth()}/${date.getFullYear()}`
        console.log(stringDate)
        days.push(stringDate)
    }

    // month.forEach((elem,index)=>{
    //     analyticData.forEach(item=>{
    //         let date = item.Date
    //         if (date.includes(elem)) {
    //             visitCounters[index]++
    //         }
    //     })
    // })

    const data = {
        labels: days,
        datasets: [
            {
                label: 'Кол. Билетов',
                data: visitCounters,
                // backgroundColor: '#2196f3',
                borderColor: '#3f729b',
                fill: true,
                cubicInterpolationMode: 'monotone',
                tension: 0.4
            }
        ]
    }

    return (
        <>
            <div className="">
                <Line height={600} data={data} options={{
                    maintainAspectRatio: false,
                    responsive: true,
                    plugins: {
                        legend: {
                            position: 'top',
                        },
                    },
                    interaction: {
                        intersect: false,
                    },
                    scales: {
                        x: {
                            display: true,
                            title: {
                                display: true
                            }
                        },
                        y: {
                            display: true,
                            title: {
                                display: true,
                                text: 'Value'
                            },
                            suggestedMin: 0,
                            suggestedMax: 1000
                        }
                    }
                }}/>
            </div>
        </>
    )
}