function init () {
  var scene = new THREE.Scene();
  var camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
  var render = new THREE.WebGLRenderer();
  render.setClearColor(new THREE.Color(0x000000));
  render.setSize(window.innerWidth, window.innerHeight);
  var axes = new THREE.AxesHelper(20);
  scene.add(axes);

  var planeGeometry = new THREE.PlaneGeometry(60, 20);
  var planeMaterial = new THREE.MeshBasicMaterial({
    color: 0xAAAAAA
  });
  var plane = new THREE.Mesh(planeGeometry, planeMaterial);
  plane.rotation.x = -0.5 * Math.PI;
  plane.position.set(15, -1, 0);
  scene.add(plane);

  var cubeGeometry = new THREE.BoxGeometry(3, 3, 3);
  var cubeMaterial = new THREE.MeshBasicMaterial({
    color: 0xFF0000,
    wireframe: true
  })
  var cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
  cube.position.set(-10, 4, 2);
  scene.add(cube);

  var sphereGeometry = new THREE.SphereGeometry(3, 20, 20);
  var sphereMaterial = new THREE.MeshBasicMaterial({
    color: 0X77777FF,
    wireframe: true
  })
  var sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
  sphere.position.set(15, 5, 5);
  scene.add(sphere);


  camera.position.set(-30, 30, 30);
  camera.lookAt(scene.position);
  document.getElementById('webgl').appendChild(render.domElement);
  render.render(scene, camera);
}
