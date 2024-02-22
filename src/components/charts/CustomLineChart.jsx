import Chart from 'chart.js/auto';
// import {Chart, LineController, LineElement, PointElement, CategoryScale, LinearScale} from 'chart.js/auto';
import { useState, useEffect, useRef, useCallback } from 'react';

const LineChart = ({label='unnamed', labels=[], data=[], config={}}) => {

    // Chart.register(
    //     LineController,
    //     LineElement,
    //     PointElement,
    //     CategoryScale,
    //     LinearScale,
    // );

    const canvasRef = useRef(null);
    
    const rerender = useCallback(() => {
    }, [data])

    useEffect(() => {
        rerender();
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        const chart = new Chart(ctx, {
            data: {
                // labels: labels,
                labels: new Array(labels.length).fill(''),
                datasets: [
                {
                    label: label,
                    type: 'line',
                    data: data,
                    borderWidth: 2,
                    order: 2,
                    tension: 0.2,
                    fill: config.fill ? true : false,
                    borderColor: config.borderColor ? config.borderColor : '',
                    responsive: true,
                    pointStyle: false
                },
                ]
            },
            options: {
                maintainAspectRatio: false,
                responsive: true,
                stepped: config.stepped ? true : false,
                tooltips: {
                    enabled: false,
                },
                scales: {
                    x: {
                        grid: {
                            display: false,
                        }
                    },
                    y: {
                        min: Math.min(...data),
                        grid: {
                            display: true,
                        }
                    }
                }
            },
        });
        return () => chart.destroy();
    }, [canvasRef, rerender]);

    return (
        <>
            <canvas ref={canvasRef}></canvas>
        </>
    )
}

export default LineChart