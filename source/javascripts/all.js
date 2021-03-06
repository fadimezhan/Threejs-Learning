// This is where it all goes :)


window.addEventListener("DOMContentLoaded", function() {

    var scene, renderer, camera,controls;
    //renderer
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    // create a scene
    scene = new THREE.Scene();

    // set a camera
    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 1000);
    camera.position.set(20, 40, 50);
    camera.lookAt(scene.position);

    //controls
    controls = new THREE.TrackballControls(camera);
    controls.addEventListener('change', render);

    animate();

    function animate() {
        requestAnimationFrame(animate);
        controls.update();
    }

    function render() {
        renderer.render(scene, camera);
    }

}, false);
