import logo from './logo.svg';
import './App.css';
import * as THREE from "three"
import { useEffect } from 'react';

import {OrbitControls} from "three/examples/jsm/controls/OrbitControls"
import Stats from "three/examples/jsm/libs/stats.module"

function App() {
  useEffect(() => {
    const scene = new THREE.Scene()

    // create our sphere
    const geometry = new THREE.SphereGeometry(3, 64, 64)
    const material = new THREE.MeshStandardMaterial({
      color: "#00ff83"
    })
    const sphere = new THREE.Mesh(geometry, material)
    scene.add(sphere)

    // light
    const light = new THREE.PointLight(0xffffff, 1, 100)
    light.position.set(0, 10, 10)
    scene.add(light)

    // camera
    const camera = new THREE.PerspectiveCamera(
      45, window.innerWidth / window.innerHeight, 0.1, 100
    )
    camera.position.z = 15

    // renderer
    const canvas = document.getElementById('MyThreeJsCanvas')
    const renderer = new THREE.WebGLRenderer({
      canvas
    })
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setPixelRatio(2)
    document.body.appendChild(renderer.domElement)


    // Add orbit controls
    const controls = new OrbitControls(camera, renderer.domElement)
    controls.enableDamping = true
    controls.enablePan = false
    controls.enableZoom = false
    controls.autoRotate = true
    controls.autoRotateSpeed = 5
    // Add FPS Stats
    const stats = Stats()
    //document.body.appendChild(stats.dom)


    const animate = () => {
      //sphere.rotation.x += 0.01 // manual
      //sphere.rotation.y += 0.01 // manual
      stats.update()
      controls.update()
      renderer.render(scene, camera)
      window.requestAnimationFrame(animate)
    }
    animate()

  },[])

  return (
    <div>
      <canvas id="MyThreeJsCanvas" />
    </div>
  );
}

export default App;
