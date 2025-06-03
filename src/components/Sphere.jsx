import {useRef} from "react";
import {useThree} from "@react-three/fiber";

export function Sphere({ position, color, name, onHover }) {
    const ref = useRef();
    const { scene } = useThree();
    const size = scene.userData.sphereSize || 0.3;

    return (
        <mesh
            position={position}
            ref={ref}
            onPointerOver={(e) => onHover(name, position, e.clientX, e.clientY)}
            onPointerOut={() => onHover(null)}
            scale={[size, size, size]}
        >
            <sphereGeometry args={[1, 32, 32]} />
            <meshStandardMaterial
                color={color}
                emissive={color}
                emissiveIntensity={0.5}
            />
        </mesh>
    );
}