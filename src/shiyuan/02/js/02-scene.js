var scene, camera, renderer

// 窗口变化，改变相机视角及画面大小
window.addEventListener('resize', onResize, false)
function onResize () {
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()
  renderer.setSize(window.innerWidth, window.innerHeight)
}

function init () {
  // 初始化 scene、camera、renderer
  scene = new THREE.Scene()
  camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000)
  camera.position.set(-30, 80, 30)
  camera.lookAt(scene.position)
  scene.add(camera)

  renderer = new THREE.WebGLRenderer()
  renderer.setClearColor(new THREE.Color(0x000000))
  renderer.setSize(window.innerWidth, window.innerHeight)
  renderer.shadowMap.enabled = true // 开启阴影
  document.getElementById('webgl').appendChild(renderer.domElement)

  // 创建地面对象
  var planeGeometry = new THREE.PlaneGeometry(80, 90)
  var planeMaterial = new THREE.MeshLambertMaterial({
    color: 0xAAAAAA
  })
  var plane = new THREE.Mesh(planeGeometry, planeMaterial)
  plane.rotation.x = -0.5 * Math.PI
  plane.position.set(15, 0, 0)
  plane.receiveShadow = true // 接收阴影
  scene.add(plane)

  // 环境光
  var ambientLight = new THREE.AmbientLight(0x353535)
  scene.add(ambientLight)
  // 点光源
  var spotLight = new THREE.SpotLight(0xFFFFFF)
  spotLight.position.set(-10, 20, -15)
  spotLight.castShadow = true // 产生阴影
  scene.add(spotLight)

  // GUI
  var controls = new function () {
    this.count = scene.children.length
    var that = this
    this.addCube = function () {
      var size = Math.ceil(1 + Math.random() * 5)
      var cubeGeometry = new THREE.CubeGeometry(size, size, size)
      var cubeMaterial = new THREE.MeshLambertMaterial({
        color: Math.random() * 0xFFFFFF
      })
      var cube = new THREE.Mesh(cubeGeometry, cubeMaterial)
      cube.position.set(-40 + Math.round(Math.random() * 60), Math.round(Math.random() * 5), -40 + Math.round(Math.random() * 70))
      cube.castShadow = true
      scene.add(cube)
      that.count = scene.children.length
      console.info(that.count)
    }
    this.removeCube = function () {
      var children = scene.children
      var obj = children[children.length - 1]
      if (obj instanceof THREE.Mesh) {
        scene.remove(obj)
        that.count = scene.children.length
      }
    }
  }
  var GUI = new dat.GUI()
  GUI.add(controls, 'count').listen() // 监听变量
  GUI.add(controls, 'addCube')
  GUI.add(controls, 'removeCube')

  // 相应鼠标事件，拖拽、缩放、旋转
  var trackballControls = initTrackballControls(camera, renderer)
  var clock = new THREE.Clock()

  renderScene()

  function renderScene () {
    trackballControls.update(clock.getDelta())
    renderer.render(scene, camera)
    scene.traverse(item => {
      if (item instanceof THREE.Mesh && item != plane) {
        item.rotation.x += 0.02
        item.rotation.y += 0.02
      }
    })

    requestAnimationFrame(renderScene)
  }
}