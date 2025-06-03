import * as THREE from "three";

export function Plane() {
    const normal = new THREE.Vector3(3, 0, -2).normalize();
    const defaultNormal = new THREE.Vector3(0, 0, 1);
    const quaternion = new THREE.Quaternion().setFromUnitVectors(defaultNormal, normal);

    return (
        <mesh rotation={new THREE.Euler().setFromQuaternion(quaternion)} position={[0, 0, 0]}>
            <planeGeometry args={[100, 100]} />
            <meshBasicMaterial color={0x00ff00} side={THREE.DoubleSide} transparent opacity={0.3} />
        </mesh>
    );
}