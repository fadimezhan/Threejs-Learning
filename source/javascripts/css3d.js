var camera;
var controls;
var scene;
var torus;
var light;
var renderer;
var scene2;
var renderer2;
var div;

init();
animate();

function init() {
    //camera
    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 10000);
    camera.position.set(0, 0, -1000);

    //controls
    controls = new THREE.OrbitControls(camera);
    controls.rotateSpeed = 1.0;
    controls.zoomSpeed = 1.2;
    controls.panSpeed = 0.8;

    //Scene
    scene = new THREE.Scene();

    //TorusGeometry
    torus = new THREE.Mesh(new THREE.TorusGeometry(120, 60, 40, 40),
        new THREE.MeshNormalMaterial());
    torus.position.set(0, 0, 0);
    scene.add(torus);

    //HemisphereLight
    light = new THREE.HemisphereLight(0xffbf67, 0x15c6ff);
    scene.add(light);

    //WebGL Renderer
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setClearColor(0xffffff, 1);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.domElement.style.zIndex = 5;
    document.body.appendChild(renderer.domElement);

    //CSS3D Scene
    scene2 = new THREE.Scene();

    //HTML
    element = document.createElement('div');
    element.innerHTML = 'Plain text inside a div.';
    element.className = 'three-div';

    //CSS Object
    div = new THREE.CSS3DObject(element);
    div.position.x = 0;
    div.position.y = 0;
    div.position.z = -185;
    div.rotation.y = Math.PI;
    scene2.add(div);

    //CSS3D Renderer
    renderer2 = new THREE.CSS3DRenderer();
    renderer2.setSize(window.innerWidth, window.innerHeight);
    renderer2.domElement.style.position = 'absolute';
    renderer2.domElement.style.top = 0;
    document.body.appendChild(renderer2.domElement);
}

function animate() {
    requestAnimationFrame(animate);
    renderer2.render(scene2, camera);
    renderer.render(scene, camera);
    controls.update();
}