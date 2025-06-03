import { useState, useMemo } from 'react';
import ThreeScene from './ThreeScene';
import "./App.css"

function findOptimalPointOnPlane(A, B) {
    const x1 = A.x, y1 = A.y, z1 = A.z;
    const x2 = B.x, y2 = B.y, z2 = B.z;

    // Вычисление координат точки C
    const x = (2*(x1 + x2) + 3*(z1 + z2)) / 13;
    const y = (y1 + y2) / 2;
    const z = (3/2) * x;

    return { x, y, z };
}

export default function App() {
    const [points, setPoints] = useState({
        A: { x: 1, y: 1, z: 1 },
        B: { x: 2, y: 3, z: 4 },
    });

    const pointC = useMemo(() => findOptimalPointOnPlane(points.A, points.B), [points]);

    const handleChange = (pointKey, axis, value) => {
        setPoints((prev) => ({
            ...prev,
            [pointKey]: {
                ...prev[pointKey],
                [axis]: parseFloat(value),
            },
        }));
    };

    const displayPoints = [
        { name: 'A', ...points.A, color: 0x0000ff },
        { name: 'B', ...points.B, color: 0xff0000 },
        { name: 'P', ...pointC, color: 0xffff00 },
    ];

    return (
        <>
            <ThreeScene points={displayPoints} />
            <div
                style={{
                    position: 'absolute',
                    top: 10,
                    left: 10,
                    background: 'white',
                    padding: 10,
                    borderRadius: 15,
                }}
            >
                {['A', 'B'].map((key) => (
                    <div key={key}>
                        <strong>Точка {key}:</strong>
                        {['x', 'y', 'z'].map((axis) => (
                            <label key={axis} style={{ marginLeft: 5 }}>
                                {axis}:
                                <input
                                    type="number"
                                    value={points[key][axis]}
                                    onChange={(e) => handleChange(key, axis, e.target.value)}
                                    style={{ width: 60, marginLeft: 2 }}
                                />
                            </label>
                        ))}
                    </div>
                ))}
                <div style={{ marginTop: 10 }}>
                    <strong>Вычисленная точка P (на плоскости):</strong><br />
                    x: {pointC.x.toFixed(2)}&nbsp;
                    y: {pointC.y.toFixed(2)}&nbsp;
                    z: {pointC.z.toFixed(2)}
                </div>
            </div>
        </>
    );
}