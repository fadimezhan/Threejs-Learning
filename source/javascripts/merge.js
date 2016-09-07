// This is where it all goes :)

window.addEventListener("DOMContentLoaded", function(){

    var viewAngle = 80;
    var width  = window.innerWidth;
    var height = window.innerHeight;
    var near   = 1;
    var far    = 1000;

    // renderer (canvas)
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize( width, height );
    document.body.appendChild( renderer.domElement );

    // create a scene
    var scene = new THREE.Scene();

    // set a camera
    var aspect = width / height;
    var camera = new THREE.PerspectiveCamera( viewAngle, aspect, near, far );
    camera.position.z = 300;
    scene.add( camera );

    // set a directional light
    var directionalLight = new THREE.DirectionalLight( 0xffffff, 5 );
    directionalLight.position.z = 3;
    scene.add( directionalLight );
    // cube geometry (200 x 200 x 200);
    //var geometry = new THREE.CubeGeometry(200, 200, 200);
    //var material = new THREE.MeshLambertMaterial( { color: 0x660000 } );
    //var cubeMesh = new THREE.Mesh( geometry, material);


    var ballGeo = new THREE.SphereGeometry(50,35,35);
    var material = new THREE.MeshPhongMaterial({color: 0xF7FE2E});
    var ball = new THREE.Mesh(ballGeo, material);

    var pendulumGeo = new THREE.CylinderGeometry(10, 10, 145, 86);
    ball.updateMatrix();
    pendulumGeo.merge(ball.geometry, ball.matrix);

    var pendulum = new THREE.Mesh(pendulumGeo, material);
    scene.add(pendulum);

    renderer.render( scene, camera );

    window.addEventListener('mousemove', function (e) {
        var mouseX = ( e.clientX - width / 2 );
        var mouseY = ( e.clientY - height / 2 );
        cubeMesh.rotation.x = mouseY * 0.005;
        cubeMesh.rotation.y = mouseX * 0.005;

        renderer.render( scene, camera );
    }, false);
}, false);