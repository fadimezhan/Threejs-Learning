// This is where it all goes :)
//= require Three_r49
//= require three.min
//= require TrackballControls
//= require three .


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

    //plane
    var size = 30, step = 3;
    var geometry = new THREE.Geometry();
    var material = new THREE.LineBasicMaterial({color: 'green'});

    for (var i = -size; i <= size; i += step) {
        geometry.vertices.push(new THREE.Vector3(-size, 0, i));
        geometry.vertices.push(new THREE.Vector3(size, 0, i));
        geometry.vertices.push(new THREE.Vector3(i, 0, -size));
        geometry.vertices.push(new THREE.Vector3(i, 0, size));
    }

    var line = new THREE.Line(geometry, material, THREE.LinePieces);
    scene.add(line);

    animate();

    function animate() {
        requestAnimationFrame(animate);
        controls.update();
    }

    function render() {
        renderer.render(scene, camera);
    }

}, false);
