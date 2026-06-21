import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

function CSSOrb({ size }: { size: number }) {
  return (
    <div style={{ width: size, height: size, position: 'relative', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      {[1, 0.72, 0.45].map((scale, i) => (
        <div key={i} style={{
          position: 'absolute',
          width: size * scale, height: size * scale,
          borderRadius: '50%',
          border: `1px solid ${i % 2 === 0 ? 'rgba(156,246,246,0.3)' : 'rgba(248,101,179,0.35)'}`,
          animation: `orbSpin${i} ${10 + i * 4}s linear infinite`,
        }} />
      ))}
      <div style={{
        width: size * 0.18, height: size * 0.18,
        borderRadius: '50%',
        backgroundColor: '#9CF6F6',
        opacity: 0.6,
        animation: 'orbPulse 2.5s ease-in-out infinite',
        boxShadow: '0 0 24px rgba(156,246,246,0.5)',
      }} />
      <style>{`
        @keyframes orbSpin0 { from{transform:rotate(0deg) rotateX(60deg)} to{transform:rotate(360deg) rotateX(60deg)} }
        @keyframes orbSpin1 { from{transform:rotate(0deg) rotateY(45deg)} to{transform:rotate(-360deg) rotateY(45deg)} }
        @keyframes orbSpin2 { from{transform:rotate(0deg) rotateZ(30deg)} to{transform:rotate(360deg) rotateZ(30deg)} }
        @keyframes orbPulse { 0%,100%{transform:scale(1);opacity:0.5} 50%{transform:scale(1.25);opacity:0.9} }
      `}</style>
    </div>
  );
}

export default function NeuralOrb({ size = 340 }: { size?: number }) {
  const mountRef = useRef<HTMLDivElement>(null);
  const [webglFailed, setWebglFailed] = useState(false);

  useEffect(() => {
    const testCanvas = document.createElement('canvas');
    const gl = testCanvas.getContext('webgl') || testCanvas.getContext('experimental-webgl');
    if (!gl) { setWebglFailed(true); return; }

    const mount = mountRef.current;
    if (!mount) return;

    let scene: THREE.Scene, camera: THREE.PerspectiveCamera, renderer: THREE.WebGLRenderer;
    try {
      scene = new THREE.Scene();
      camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
      camera.position.z = 6;
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      renderer.setSize(size, size);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setClearColor(0x000000, 0);
      mount.appendChild(renderer.domElement);
    } catch {
      setWebglFailed(true);
      return;
    }

    const group = new THREE.Group();
    scene.add(group);

    const outerGeo = new THREE.IcosahedronGeometry(2.2, 2);
    const outerMat = new THREE.MeshBasicMaterial({ color: 0x9CF6F6, wireframe: true, transparent: true, opacity: 0.2 });
    const outerMesh = new THREE.Mesh(outerGeo, outerMat);
    group.add(outerMesh);

    const midGeo = new THREE.IcosahedronGeometry(1.7, 1);
    const midMat = new THREE.MeshBasicMaterial({ color: 0xF865B3, wireframe: true, transparent: true, opacity: 0.28 });
    const midMesh = new THREE.Mesh(midGeo, midMat);
    group.add(midMesh);

    const innerGeo = new THREE.IcosahedronGeometry(1.1, 1);
    const innerMat = new THREE.MeshBasicMaterial({ color: 0x9CF6F6, wireframe: true, transparent: true, opacity: 0.4 });
    const innerMesh = new THREE.Mesh(innerGeo, innerMat);
    group.add(innerMesh);

    const coreGeo = new THREE.SphereGeometry(0.38, 24, 24);
    const coreMat = new THREE.MeshBasicMaterial({ color: 0x9CF6F6, transparent: true, opacity: 0.55 });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    group.add(coreMesh);

    const ringGeo = new THREE.TorusGeometry(2.6, 0.012, 8, 80);
    const ringMat = new THREE.MeshBasicMaterial({ color: 0xF865B3, transparent: true, opacity: 0.35 });
    const ringMesh = new THREE.Mesh(ringGeo, ringMat);
    ringMesh.rotation.x = Math.PI / 4;
    group.add(ringMesh);

    const ring2Geo = new THREE.TorusGeometry(2.0, 0.01, 8, 80);
    const ring2Mat = new THREE.MeshBasicMaterial({ color: 0x9CF6F6, transparent: true, opacity: 0.2 });
    const ring2Mesh = new THREE.Mesh(ring2Geo, ring2Mat);
    ring2Mesh.rotation.y = Math.PI / 3;
    group.add(ring2Mesh);

    const nodeGeo = new THREE.SphereGeometry(0.055, 8, 8);
    const nodeMat = new THREE.MeshBasicMaterial({ color: 0xF865B3 });
    const verts = outerGeo.attributes.position;
    const seenKey = new Set<string>();
    for (let i = 0; i < verts.count; i++) {
      const x = Math.round(verts.getX(i) * 100) / 100;
      const y = Math.round(verts.getY(i) * 100) / 100;
      const z = Math.round(verts.getZ(i) * 100) / 100;
      const k = `${x}|${y}|${z}`;
      if (!seenKey.has(k)) {
        seenKey.add(k);
        const n = new THREE.Mesh(nodeGeo, nodeMat);
        n.position.set(x, y, z);
        group.add(n);
      }
    }

    let animId: number;
    let t = 0;
    const animate = () => {
      animId = requestAnimationFrame(animate);
      t += 0.006;
      outerMesh.rotation.y = t * 0.4; outerMesh.rotation.x = t * 0.15;
      midMesh.rotation.y  = -t * 0.65; midMesh.rotation.z  =  t * 0.25;
      innerMesh.rotation.x = t * 0.5;  innerMesh.rotation.z = -t * 0.3;
      ringMesh.rotation.z  = t * 0.3;  ring2Mesh.rotation.x = t * 0.2;
      const pulse = 1 + Math.sin(t * 2.5) * 0.12;
      coreMesh.scale.setScalar(pulse);
      coreMat.opacity = 0.4 + Math.sin(t * 2.5) * 0.2;
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(animId);
      if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement);
      [outerGeo, outerMat, midGeo, midMat, innerGeo, innerMat, coreGeo, coreMat,
       ringGeo, ringMat, ring2Geo, ring2Mat, nodeGeo, nodeMat].forEach(o => o.dispose());
      renderer.dispose();
    };
  }, [size]);

  if (webglFailed) return <CSSOrb size={size} />;

  return <div ref={mountRef} style={{ width: size, height: size, flexShrink: 0 }} />;
}
