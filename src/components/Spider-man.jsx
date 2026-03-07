import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";


export default function SpiderMan({ wireframeMode = false, mousePos = { x: 0, y: 0 }, ...props }) {
  const { nodes, materials } = useGLTF("/spider-man/spider-man.glb");
  const meshGroupRef = useRef();

  useFrame((state, delta) => {
    if (meshGroupRef.current) {

      const targetRotationY = mousePos.x * 0.01;
      const targetRotationX = -mousePos.y * 0.01;

 
      meshGroupRef.current.rotation.y = THREE.MathUtils.lerp(
        meshGroupRef.current.rotation.y,
        targetRotationY + Math.PI,
        delta * 3
      );
      meshGroupRef.current.rotation.x = THREE.MathUtils.lerp(
        meshGroupRef.current.rotation.x,
        targetRotationX,
        delta * 3
      );
    }
  });

  const renderMaterial = (originalMaterial) => {
    if (wireframeMode) {
      return (
        <meshBasicMaterial
          wireframe
          color="#ffffff"
          transparent
          opacity={0.4}
        />
      );
    }
    return <primitive object={originalMaterial} attach="material" />;
  };

  return (
    <group {...props} dispose={null}>
      <group ref={meshGroupRef} rotation={[0, Math.PI, 0]}>
        <group scale={0.01}>
          <mesh
            geometry={nodes.Retopo_Plane_Material007_0.geometry}
            position={[0.341, 170.362, -5.714]}
            scale={15.399}
          >
            {renderMaterial(materials["Material.007"])}
          </mesh>
          <mesh
            geometry={nodes.Retopo_Plane001_Material008_0.geometry}
            position={[0, 0, 0.022]}
            rotation={[-Math.PI / 2, 0, 0]}
            scale={100}
          >
            {renderMaterial(materials["Material.008"])}
          </mesh>
          <mesh
            geometry={nodes.Retopo_Sphere001_Material013_0.geometry}
            rotation={[-Math.PI / 2, 0, 0]}
            scale={100}
          >
            {renderMaterial(materials["Material.013"])}
          </mesh>
        </group>
      </group>
    </group>
  );
}