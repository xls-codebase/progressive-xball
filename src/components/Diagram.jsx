import Chart from 'chart.js/auto';
// import {Chart, LineController, LineElement, PointElement, CategoryScale, LinearScale} from 'chart.js/auto';
import { useState, useEffect, useRef, useCallback } from 'react';

const Diagram = ({label='unnamed', labels=[], data=[]}) => {
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

    // useEffect(() => {
    //     const canvas = canvasRef.current;
    //     const ctx = canvas.getContext("2d");
    //     const chart = new Chart(ctx, {
    //         data: {
    //             labels: labels,
    //             datasets: [
    //             {
    //                 type: 'line',
    //                 data: data,
    //                 borderWidth: 2,
    //                 order: 2,
    //                 tension: 0,
    //             },
    //             ]
    //         }
    //     });
    //     return () => chart.destroy();
    // }, [canvasRef]);

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
                    tension: 0.5,
                    fill: true,
                    responsive: true
                },
                ]
            },
            options: {
                maintainAspectRatio: false,
                responsive: true,
                legend: {
                    display: false
                }, 
                tooltips: {
                    enabled: false,
                },
                scales: {
                    y: {
                        min: -4
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

export default Diagram