import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import gsap from 'gsap';
import './ParticleCube.css';

interface CubeFace {
  title: string;
  description: string;
  color: string;
}

const cubeFaces: CubeFace[] = [
  {
    title: 'Welcome',
    description: 'Hello! I\'m Sarah Mathew, a software developer and computer science student. Welcome to my portfolio where creativity meets code.',
    color: '#8b5cf6'
  },
  {
    title: 'Projects',
    description: 'Explore my work - from full-stack web applications to AI-powered solutions. Each project tells a story of problem-solving and innovation.',
    color: '#3b82f6'
  },
  {
    title: 'Skills',
    description: 'Proficient in modern technologies including React, Node.js, Python, and more. Always learning and adapting to new tools and frameworks.',
    color: '#ec4899'
  },
  {
    title: 'Education',
    description: 'Currently studying Computer Science at Ontario Tech University. Previously completed Computer Programming at Seneca Polytechnic.',
    color: '#06b6d4'
  },
  {
    title: 'Journey',
    description: 'My path in tech has been filled with hackathons, collaborative projects, and continuous learning. Every experience shapes who I am today.',
    color: '#10b981'
  },
  {
    title: 'Future',
    description: 'Looking forward to contributing to innovative projects, working with amazing teams, and making a positive impact through technology.',
    color: '#f59e0b'
  }
];

const ParticleCube: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const particlesRef = useRef<THREE.InstancedMesh | null>(null);
  const animationIdRef = useRef<number | null>(null);
  const currentFaceRef = useRef<number>(0);
  const [currentFace, setCurrentFace] = useState(0);
  const [expandAmount, setExpandAmount] = useState(0);
  const particleDataRef = useRef<Array<{ 
    x: number; 
    y: number; 
    z: number; 
    baseX: number; 
    baseY: number; 
    baseZ: number;
    scatterSeedX: number;
    scatterSeedY: number;
    scatterSeedZ: number;
  }>>([]);
  const scrollLockRef = useRef<boolean>(false);
  const lastScrollYRef = useRef<number>(0);

  useEffect(() => {
    if (!mountRef.current) return;

    // scene setup
    const scene = new THREE.Scene();
    scene.background = null; // transparent background
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    // position camera to view cube on the left side, but allow particles to expand right
    // offset camera left so cube appears on left side of viewport
    camera.position.set(1.5, 0, 5);
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({ 
      antialias: true, 
      alpha: true,
      powerPreference: "high-performance"
    });
    renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0); // transparent background
    renderer.domElement.style.display = 'block';
    renderer.domElement.style.width = '100%';
    renderer.domElement.style.height = '100%';
    renderer.domElement.style.pointerEvents = 'none';
    mountRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // create particle cube - larger initial size
    const particleCount = 25; // 25x25x25 for bigger cube
    const spacing = 0.15; // larger spacing for bigger cube
    // use spheres for circular particles
    const geometry = new THREE.SphereGeometry(0.04, 16, 16);
    const material = new THREE.MeshStandardMaterial({
      color: 0x8b5cf6,
      emissive: 0x8b5cf6,
      emissiveIntensity: 1.5,
      metalness: 0.3,
      roughness: 0.4
    });

    // calculate total surface particles
    let surfaceParticleCount = 0;
    const offset = (particleCount - 1) * spacing * 0.5;
    
    for (let x = 0; x < particleCount; x++) {
      for (let y = 0; y < particleCount; y++) {
        for (let z = 0; z < particleCount; z++) {
          const isOnSurface = 
            x === 0 || x === particleCount - 1 ||
            y === 0 || y === particleCount - 1 ||
            z === 0 || z === particleCount - 1;
          if (isOnSurface) surfaceParticleCount++;
        }
      }
    }

    const instancedMesh = new THREE.InstancedMesh(geometry, material, surfaceParticleCount);
    particlesRef.current = instancedMesh;

    const matrix = new THREE.Matrix4();
    let index = 0;

    // create cube structure and store base positions
    for (let x = 0; x < particleCount; x++) {
      for (let y = 0; y < particleCount; y++) {
        for (let z = 0; z < particleCount; z++) {
          const isOnSurface = 
            x === 0 || x === particleCount - 1 ||
            y === 0 || y === particleCount - 1 ||
            z === 0 || z === particleCount - 1;

          if (isOnSurface) {
            const posX = x * spacing - offset;
            const posY = y * spacing - offset;
            const posZ = z * spacing - offset;

            // seeded random for consistent scatter
            const seed = index * 0.001;
            particleDataRef.current.push({
              x: posX,
              y: posY,
              z: posZ,
              baseX: posX,
              baseY: posY,
              baseZ: posZ,
              scatterSeedX: Math.sin(seed) * 0.5,
              scatterSeedY: Math.cos(seed * 1.3) * 0.5,
              scatterSeedZ: Math.sin(seed * 0.7) * 0.5
            });

            matrix.setPosition(posX, posY, posZ);
            instancedMesh.setMatrixAt(index, matrix);
            index++;
          }
        }
      }
    }

    instancedMesh.instanceMatrix.needsUpdate = true;
    scene.add(instancedMesh);

    // lighting - brighter lights for visibility
    const ambientLight = new THREE.AmbientLight(0xffffff, 1);
    scene.add(ambientLight);

    const directionalLight1 = new THREE.DirectionalLight(0x8b5cf6, 2);
    directionalLight1.position.set(5, 5, 5);
    scene.add(directionalLight1);

    const directionalLight2 = new THREE.DirectionalLight(0x3b82f6, 1.5);
    directionalLight2.position.set(-5, -5, -5);
    scene.add(directionalLight2);

    const pointLight = new THREE.PointLight(0x8b5cf6, 2, 100);
    pointLight.position.set(0, 0, 5);
    scene.add(pointLight);

    // animation
    let targetRotation = { x: 0, y: 0 };
    let currentRotation = { x: 0, y: 0 };
    let localExpandAmount = 0; // 0 = collapsed, 1 = fully expanded
    let targetExpandAmount = 0;
    const startTime = Date.now();
    let lastStateUpdate = 0;

    const animate = () => {
      animationIdRef.current = requestAnimationFrame(animate);

      // smooth rotation interpolation
      currentRotation.x += (targetRotation.x - currentRotation.x) * 0.05;
      currentRotation.y += (targetRotation.y - currentRotation.y) * 0.05;
      
      // smooth expand/collapse interpolation
      localExpandAmount += (targetExpandAmount - localExpandAmount) * 0.08;
      
      // update state for text visibility (throttled)
      const now = Date.now();
      if (now - lastStateUpdate > 50) { // update every 50ms
        setExpandAmount(localExpandAmount);
        lastStateUpdate = now;
      }

      if (instancedMesh) {
        instancedMesh.rotation.x = currentRotation.x;
        instancedMesh.rotation.y = currentRotation.y;

        // particle animation - expand/collapse + wave movement
        const time = (Date.now() - startTime) * 0.001;
        const matrix = new THREE.Matrix4();
        
        particleDataRef.current.forEach((particle, i) => {
          // cube center position (on the left side)
          const centerX = 1.5;
          const centerY = 0;
          const centerZ = 0;
          const dirX = particle.baseX - centerX;
          const dirY = particle.baseY - centerY;
          const dirZ = particle.baseZ - centerZ;
          
          // expand outward from center - particles expand towards right (towards text box)
          // bias expansion towards positive X (right direction)
          const expandDirectionX = dirX > 0 ? dirX * 1.5 : dirX * 0.8; // expand more to the right
          
          // calculate max expansion to stay within viewport width
          // convert viewport width to 3D space units (approximate)
          const maxExpandDistance = 4; // limit expansion to prevent going off screen
          
          const baseExpandX = expandDirectionX * localExpandAmount * 4;
          const baseExpandY = dirY * localExpandAmount * 4;
          const baseExpandZ = dirZ * localExpandAmount * 3;
          
          // clamp expansion to max distance
          const expandDistance = Math.sqrt(baseExpandX * baseExpandX + baseExpandY * baseExpandY + baseExpandZ * baseExpandZ);
          const expandFactor = expandDistance > maxExpandDistance ? maxExpandDistance / expandDistance : 1;
          
          const expandX = baseExpandX * expandFactor;
          const expandY = baseExpandY * expandFactor;
          const expandZ = baseExpandZ * expandFactor;
          
          // wave movement - stronger when expanded
          const waveIntensity = 0.02 + localExpandAmount * 0.05;
          const waveX = Math.sin(time * 0.5 + particle.baseX * 5) * waveIntensity;
          const waveY = Math.cos(time * 0.7 + particle.baseY * 5) * waveIntensity;
          const waveZ = Math.sin(time * 0.6 + particle.baseZ * 5) * waveIntensity;
          
          // seeded scatter when expanded - bias towards right to cover text box, but constrained
          const scatterAmount = localExpandAmount * 1.5;
          const scatterX = (particle.scatterSeedX + 0.3) * scatterAmount;
          const scatterY = particle.scatterSeedY * scatterAmount;
          const scatterZ = particle.scatterSeedZ * scatterAmount;

          const newX = particle.baseX + expandX + waveX + scatterX;
          const newY = particle.baseY + expandY + waveY + scatterY;
          const newZ = particle.baseZ + expandZ + waveZ + scatterZ;

          matrix.setPosition(newX, newY, newZ);
          instancedMesh.setMatrixAt(i, matrix);
        });

        instancedMesh.instanceMatrix.needsUpdate = true;
      }

      renderer.render(scene, camera);
    };

    animate();

    // scroll-based rotation and expand/collapse with scroll locking
    const handleScroll = () => {
      if (!sectionRef.current) return;

      const sectionTop = sectionRef.current.offsetTop;
      const sectionHeight = sectionRef.current.offsetHeight;
      const windowHeight = window.innerHeight;
      const scrollY = window.scrollY;

      // calculate progress within this section
      const sectionStart = sectionTop;
      const sectionEnd = sectionTop + sectionHeight - windowHeight;
      let scrollProgress = (scrollY - sectionStart) / (sectionEnd - sectionStart);
      scrollProgress = Math.max(0, Math.min(1, scrollProgress));

      // scroll locking - prevent scrolling past section
      const maxScroll = sectionTop + sectionHeight - windowHeight;
      if (scrollY > maxScroll) {
        window.scrollTo({ top: maxScroll, behavior: 'auto' });
        scrollProgress = 1;
      }

      // determine which face to show (6 faces)
      const faceIndex = Math.min(Math.floor(scrollProgress * 6), 5);
      if (faceIndex !== currentFaceRef.current) {
        currentFaceRef.current = faceIndex;
        setCurrentFace(faceIndex);
      }

      // calculate rotation based on scroll - each face gets a specific rotation
      const faceRotations = [
        { x: 0, y: 0 },           // front
        { x: 0, y: Math.PI / 2 }, // right
        { x: 0, y: Math.PI },      // back
        { x: 0, y: -Math.PI / 2 }, // left
        { x: -Math.PI / 2, y: 0 }, // top
        { x: Math.PI / 2, y: 0 }  // bottom
      ];

      const currentFaceRotation = faceRotations[faceIndex];
      const nextFaceRotation = faceRotations[Math.min(faceIndex + 1, 5)];
      
      const faceProgress = (scrollProgress * 6) % 1;
      targetRotation.x = currentFaceRotation.x + (nextFaceRotation.x - currentFaceRotation.x) * faceProgress;
      targetRotation.y = currentFaceRotation.y + (nextFaceRotation.y - currentFaceRotation.y) * faceProgress;

      // expand/collapse cycle - expand at start, collapse at end of each face
      const expandCycle = faceProgress;
      if (expandCycle < 0.15) {
        // expanding phase (0-15% of face)
        targetExpandAmount = expandCycle / 0.15;
      } else if (expandCycle < 0.45) {
        // fully expanded phase (15-45% of face) - particles spread out
        targetExpandAmount = 1;
      } else if (expandCycle < 0.65) {
        // collapsing phase (45-65% of face)
        targetExpandAmount = 1 - (expandCycle - 0.45) / 0.2;
      } else {
        // collapsed phase (65-100% of face) - regrouped into cube
        targetExpandAmount = 0;
      }

      // update colors based on face - smooth transition
      if (instancedMesh && cubeFaces[faceIndex]) {
        const nextColor = cubeFaces[Math.min(faceIndex + 1, 5)]?.color || cubeFaces[faceIndex].color;
        const currentColor = new THREE.Color(cubeFaces[faceIndex].color);
        const nextColorObj = new THREE.Color(nextColor);
        currentColor.lerp(nextColorObj, faceProgress);
        
        instancedMesh.material.color = currentColor;
        instancedMesh.material.emissive = currentColor.clone().multiplyScalar(0.5);
      }
    };

    // scroll event
    window.addEventListener('scroll', handleScroll);
    
    // wheel event for scroll locking - lock to section
    const handleWheel = (e: WheelEvent) => {
      if (!sectionRef.current) return;
      const sectionTop = sectionRef.current.offsetTop;
      const sectionHeight = sectionRef.current.offsetHeight;
      const windowHeight = window.innerHeight;
      const scrollY = window.scrollY;
      const sectionEnd = sectionTop + sectionHeight - windowHeight;
      
      // prevent scrolling past section when scrolling down
      if (scrollY >= sectionEnd && e.deltaY > 0) {
        e.preventDefault();
        e.stopPropagation();
        return false;
      }
      
      // prevent scrolling before section when scrolling up
      if (scrollY <= sectionTop && e.deltaY < 0) {
        e.preventDefault();
        e.stopPropagation();
        return false;
      }
    };
    
    window.addEventListener('wheel', handleWheel, { passive: false });
    
    handleScroll(); // initial call

    // handle resize
    const handleResize = () => {
      if (!mountRef.current || !camera || !renderer) return;
      camera.aspect = mountRef.current.clientWidth / mountRef.current.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    };

    window.addEventListener('resize', handleResize);

    // cleanup
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('resize', handleResize);
      
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current);
      }

      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }

      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <section ref={sectionRef} className="particle-cube-section">
      <div className="particle-cube-container">
        <div ref={mountRef} className="particle-cube-canvas" />
        <div 
          className="particle-cube-content"
          style={{ 
            opacity: expandAmount > 0.7 ? 0.4 : 1,
            transition: 'opacity 0.3s ease'
          }}
        >
          <div className="cube-face-info">
            <h2 className="cube-face-title">{cubeFaces[currentFace]?.title}</h2>
            <p className="cube-face-description">{cubeFaces[currentFace]?.description}</p>
            <div 
              className="cube-face-indicator"
              style={{ backgroundColor: cubeFaces[currentFace]?.color }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ParticleCube;
