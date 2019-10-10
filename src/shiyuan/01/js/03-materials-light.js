window.addEventListener('resize', onResize, false)
var scene
var camera
var renderer
function onResize() {
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()
  renderer.setSize(window.innerWidth, window.innerHeight)
}

function init () {
  scene = new THREE.Scene()
  camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000)
  renderer = new THREE.WebGLRenderer()
  renderer.setClearColor(new THREE.Color(0x000000))
  renderer.setSize(window.innerWidth, window.innerHeight)
  renderer.shadowMap.enabled = true

  var cubeGeometry = new THREE.BoxGeometry(4, 4, 4)
  var cubeMaterial = new THREE.MeshLambertMaterial({
    color: 0xFF0000
  })
  var cube = new THREE.Mesh(cubeGeometry, cubeMaterial)
  cube.castShadow = true
  cube.position.set(-5, 6, 3)
  scene.add(cube)

  var sphereGeometry = new THREE.SphereGeometry(4, 20, 20)
  var sphereMaterial = new THREE.MeshLambertMaterial({
    color: 0x7777ff
  })
  var sphere = new THREE.Mesh(sphereGeometry, sphereMaterial)
  sphere.castShadow = true
  sphere.position.set(15, 5, 1)
  scene.add(sphere)

  var planeGeometry = new THREE.PlaneGeometry(60, 30, 1, 1)
  var planeMaterial = new THREE.MeshLambertMaterial({
    color: 0xAAAAAA
  })
  var plane = new THREE.Mesh(planeGeometry, planeMaterial)
  plane.receiveShadow = true
  plane.position.set(15, 0, 0)
  plane.rotation.x = -0.5 * Math.PI
  scene.add(plane)

  var spotLight = new THREE.SpotLight(0xFFFFFF)
  spotLight.position.set(-10, 20, -15)
  spotLight.castShadow = true
  spotLight.shadow.mapSize = new THREE.Vector2(1024, 1024)
  spotLight.shadow.camera.far = 130
  spotLight.shadow.camera.near = 40
  scene.add(spotLight)

  var ambientLight = new THREE.AmbientLight(0x353535)
  scene.add(ambientLight)

  camera.position.set(-30, 40, 30)
  camera.lookAt(scene.position)
  document.getElementById("webgl").appendChild(renderer.domElement)
  var trackballControls = initTrackballControls(camera, renderer)
  var clock = new THREE.Clock()

  var stats = initStats();
  var controls = new function () {
    this.x = 15
    this.y = 0
  }
  var GUI = new dat.GUI()
  GUI.add(controls, 'x', 0, 30)
  GUI.add(controls, 'y', 0, 10)


  renderScene()

  var step = 0
  function renderScene () {
    stats.update()
    trackballControls.update(clock.getDelta)

    step += 0.02
    sphere.position.x = 15 + (10 * Math.cos(step))
    sphere.position.y = 3 + (10 * Math.cos(step))

    sphere.rotation.x += 0.1
    sphere.rotation.y += 0.1
    sphere.rotation.z += 0.3

    cube.rotation.x += 0.02
    cube.rotation.y += 0.02

    plane.position.x = controls.x
    plane.position.y = controls.y

    requestAnimationFrame(renderScene)
    renderer.render(scene, camera)
  }
}