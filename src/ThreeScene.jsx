import { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import {Sphere} from "./components/Sphere.jsx";
import {Plane} from "./components/Plane.jsx";
import {CameraController} from "./components/CameraController.jsx";


export default function ThreeScene({ points }) {
    const [tooltip, setTooltip] = useState(null);

    const handleHover = (name, position, x, y) => {
        if (name) {
            setTooltip({ name, position, x, y });
        } else {
            setTooltip(null);
        }
    };

    return (
        <div style={{ position: 'relative', width: '100%', height: '100vh', backgroundColor: 'black' }}>
            <Canvas>
                <CameraController points={points} />
                <axesHelper args={[40]} />
                <OrbitControls makeDefault />

                {/*Освещение*/}
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} intensity={1} />
                <pointLight position={[-10, -10, -10]} intensity={0.5} />

                <Plane />
                {points.map((p, i) => (
                    <Sphere
                        key={i}
                        name={p.name}
                        position={[p.x, p.y, p.z]}
                        color={p.color}
                        onHover={handleHover}
                    />
                ))}
            </Canvas>
            {tooltip && (
                <div
                    style={{
                        position: 'absolute',
                        top: tooltip.y + 10,
                        left: tooltip.x + 10,
                        backgroundColor: 'white',
                        padding: '4px',
                        border: '1px solid black',
                        whiteSpace: 'pre'
                    }}
                >
                    {`Точка ${tooltip.name}\n(${tooltip.position[0].toFixed(2)}, ${tooltip.position[1].toFixed(2)}, ${tooltip.position[2].toFixed(2)})`}
                </div>
            )}
        </div>
    );
}