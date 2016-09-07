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
    var geometry = new THREE.SphereGeometry(10, 10, 10);
    var material = new THREE.MeshLambertMaterial( { color: 0x660000 } );
    //var cubeMesh = new THREE.Mesh( geometry, material);


    var group = new THREE.Group();

    for ( var i = 0; i < 1000; i ++ ) {

        var mesh = new THREE.Mesh( geometry, material );
        mesh.position.x = Math.random() * 2000 - 1000;
        mesh.position.y = Math.random() * 2000 - 1000;
        mesh.position.z = Math.random() * 2000 - 1000;

        mesh.rotation.x = Math.random() * 360 * ( Math.PI / 180 );
        mesh.rotation.y = Math.random() * 360 * ( Math.PI / 180 );

        group.add( mesh );

    }

    scene.add( group );

    renderer.render( scene, camera );

    window.addEventListener('mousemove', function (e) {
        var mouseX = ( e.clientX - width / 2 );
        var mouseY = ( e.clientY - height / 2 );
        cubeMesh.rotation.x = mouseY * 0.005;
        cubeMesh.rotation.y = mouseX * 0.005;

        renderer.render( scene, camera );
    }, false);
}, false);