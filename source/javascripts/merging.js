
//plane
window.addEventListener("DOMContentLoaded", function() {

    var scene, renderer, camera,controls;
    // create a scene
    scene = new THREE.Scene();

    //CSG Object
    var box = new THREE.Mesh( new THREE.BoxGeometry( 10, 1, 10 ) );
    var cube_bsp = new ThreeBSP( box );

    var cutgeo = new THREE.SphereGeometry( 3, 10, 6 );
    var sub =  new THREE.Mesh( cutgeo );
    var substract_bsp  = new ThreeBSP( sub );
    var subtract_bsp  = cube_bsp.subtract( substract_bsp );

    var result = subtract_bsp.toMesh();
    scene.add(result);

    //renderer
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

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
    render();

    function animate() {
        requestAnimationFrame(animate);
        controls.update();
    }



    function render() {
        renderer.render(scene, camera);
    }

}, false);

