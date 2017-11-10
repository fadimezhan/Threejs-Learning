window.addEventListener("DOMContentLoaded", function() {

    var scene, renderer, camera,controls;

    // create a scene
    scene = new THREE.Scene();

    //renderer
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    // set a camera
    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 1000);
    camera.position.set(200, 400, 500);
    //camera.lookAt(scene.position);

    //controls
    controls = new THREE.TrackballControls(camera);
    controls.addEventListener('change', render);

    //box
    geometry = new THREE.BoxGeometry(200, 200, 200);

    var material = new THREE.MeshNormalMaterial();

    mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    animate();
    render();

    function animate() {
        requestAnimationFrame(animate);
        controls.update();
    }



    function render() {
        renderer.render(scene, camera);
    }

}, false);

