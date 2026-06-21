import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

function CSSFallback() {
  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
      {[...Array(18)].map((_, i) => (
        <div key={i} style={{
          position: 'absolute',
          width: `${4 + Math.sin(i * 1.7) * 3}px`,
          height: `${4 + Math.sin(i * 1.7) * 3}px`,
          borderRadius: '50%',
          backgroundColor: i % 3 === 0 ? '#F865B3' : '#9CF6F6',
          left: `${(i * 5.7 + 5) % 90}%`,
          top: `${(i * 7.3 + 8) % 88}%`,
          opacity: 0.3 + (i % 4) * 0.1,
          animation: `float${i % 4} ${6 + (i % 5) * 2}s ease-in-out infinite`,
          animationDelay: `${i * 0.4}s`,
        }} />
      ))}
      <style>{`
        @keyframes float0 { 0%,100%{transform:translate(0,0)} 50%{transform:translate(12px,-18px)} }
        @keyframes float1 { 0%,100%{transform:translate(0,0)} 50%{transform:translate(-16px,12px)} }
        @keyframes float2 { 0%,100%{transform:translate(0,0)} 50%{transform:translate(10px,20px)} }
        @keyframes float3 { 0%,100%{transform:translate(0,0)} 50%{transform:translate(-8px,-14px)} }
      `}</style>
    </div>
  );
}

export default function ParticleField() {
  const mountRef = useRef<HTMLDivElement>(null);
  const [webglFailed, setWebglFailed] = useState(false);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    if (!gl) { setWebglFailed(true); return; }

    const W = mount.offsetWidth || window.innerWidth;
    const H = mount.offsetHeight || window.innerHeight;

    let scene: THREE.Scene, camera: THREE.PerspectiveCamera, renderer: THREE.WebGLRenderer;
    try {
      scene = new THREE.Scene();
      camera = new THREE.PerspectiveCamera(60, W / H, 0.1, 1000);
      camera.position.z = 28;
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, canvas: document.createElement('canvas') });
      renderer.setSize(W, H);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
      renderer.setClearColor(0x000000, 0);
      mount.appendChild(renderer.domElement);
    } catch {
      setWebglFailed(true);
      return;
    }

    const PARTICLE_COUNT = 100;
    const CONNECT_DIST = 9;
    const positions = new Float32Array(PARTICLE_COUNT * 3);
    const velocities = new Float32Array(PARTICLE_COUNT * 3);
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      positions[i * 3]     = (Math.random() - 0.5) * 48;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 26;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 16;
      velocities[i * 3]     = (Math.random() - 0.5) * 0.016;
      velocities[i * 3 + 1] = (Math.random() - 0.5) * 0.010;
      velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.007;
    }

    const ptGeo = new THREE.BufferGeometry();
    ptGeo.setAttribute('position', new THREE.BufferAttribute(positions.slice(), 3));
    const ptMat = new THREE.PointsMaterial({ color: 0x9CF6F6, size: 0.16, transparent: true, opacity: 0.7, sizeAttenuation: true });
    const points = new THREE.Points(ptGeo, ptMat);
    scene.add(points);

    const accentCount = 14;
    const accentPos = new Float32Array(accentCount * 3);
    for (let i = 0; i < accentCount; i++) {
      const src = (i * 7) % PARTICLE_COUNT;
      accentPos[i * 3]     = positions[src * 3];
      accentPos[i * 3 + 1] = positions[src * 3 + 1];
      accentPos[i * 3 + 2] = positions[src * 3 + 2];
    }
    const accentGeo = new THREE.BufferGeometry();
    accentGeo.setAttribute('position', new THREE.BufferAttribute(accentPos, 3));
    const accentMat = new THREE.PointsMaterial({ color: 0xF865B3, size: 0.26, transparent: true, opacity: 0.85, sizeAttenuation: true });
    const accentPoints = new THREE.Points(accentGeo, accentMat);
    scene.add(accentPoints);

    const MAX_LINES = (PARTICLE_COUNT * (PARTICLE_COUNT - 1)) / 2;
    const linePos = new Float32Array(MAX_LINES * 6);
    const lineGeo = new THREE.BufferGeometry();
    lineGeo.setAttribute('position', new THREE.BufferAttribute(linePos, 3));
    const lineMat = new THREE.LineBasicMaterial({ color: 0x9CF6F6, transparent: true, opacity: 0.12 });
    const lineSegs = new THREE.LineSegments(lineGeo, lineMat);
    scene.add(lineSegs);

    let animId: number;
    const workPos = positions.slice();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        workPos[i * 3]     += velocities[i * 3];
        workPos[i * 3 + 1] += velocities[i * 3 + 1];
        workPos[i * 3 + 2] += velocities[i * 3 + 2];
        if (Math.abs(workPos[i * 3])     > 25) velocities[i * 3]     *= -1;
        if (Math.abs(workPos[i * 3 + 1]) > 14) velocities[i * 3 + 1] *= -1;
        if (Math.abs(workPos[i * 3 + 2]) > 9)  velocities[i * 3 + 2] *= -1;
      }
      const ptAttr = ptGeo.attributes.position as THREE.BufferAttribute;
      for (let i = 0; i < PARTICLE_COUNT * 3; i++) (ptAttr.array as Float32Array)[i] = workPos[i];
      ptAttr.needsUpdate = true;

      const acAttr = accentGeo.attributes.position as THREE.BufferAttribute;
      for (let i = 0; i < accentCount; i++) {
        const src = (i * 7) % PARTICLE_COUNT;
        (acAttr.array as Float32Array)[i * 3]     = workPos[src * 3];
        (acAttr.array as Float32Array)[i * 3 + 1] = workPos[src * 3 + 1];
        (acAttr.array as Float32Array)[i * 3 + 2] = workPos[src * 3 + 2];
      }
      acAttr.needsUpdate = true;

      let lIdx = 0;
      const lArr = (lineGeo.attributes.position as THREE.BufferAttribute).array as Float32Array;
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        for (let j = i + 1; j < PARTICLE_COUNT; j++) {
          const dx = workPos[i*3]-workPos[j*3], dy = workPos[i*3+1]-workPos[j*3+1], dz = workPos[i*3+2]-workPos[j*3+2];
          if (dx*dx+dy*dy+dz*dz < CONNECT_DIST*CONNECT_DIST) {
            lArr[lIdx*6]=workPos[i*3]; lArr[lIdx*6+1]=workPos[i*3+1]; lArr[lIdx*6+2]=workPos[i*3+2];
            lArr[lIdx*6+3]=workPos[j*3]; lArr[lIdx*6+4]=workPos[j*3+1]; lArr[lIdx*6+5]=workPos[j*3+2];
            lIdx++;
          }
        }
      }
      lineGeo.setDrawRange(0, lIdx * 2);
      (lineGeo.attributes.position as THREE.BufferAttribute).needsUpdate = true;
      renderer.render(scene, camera);
    };
    animate();

    const onResize = () => {
      const w = mount.offsetWidth, h = mount.offsetHeight;
      if (!w || !h) return;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', onResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', onResize);
      if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement);
      ptGeo.dispose(); ptMat.dispose();
      accentGeo.dispose(); accentMat.dispose();
      lineGeo.dispose(); lineMat.dispose();
      renderer.dispose();
    };
  }, []);

  if (webglFailed) return <CSSFallback />;

  return (
    <div ref={mountRef} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 0 }} />
  );
}
