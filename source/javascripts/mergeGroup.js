window.addEventListener("DOMContentLoaded", function(){


    var viewAngle = 45;
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
    camera.position.x = 0.99;
    camera.position.y = 3.24;
    camera.position.z = 18.94;
    scene.add( camera );

    // set a directional light
    var directionalLight = new THREE.DirectionalLight( 0xffffff, 5 );
    directionalLight.position.z = 3;
    scene.add( directionalLight );

    //controls
    var controls;
    controls = new THREE.TrackballControls(camera);
    controls.addEventListener('change', render);


    var group = new THREE.Group();
    var circleGeo = new THREE.CircleGeometry(1.75, 32);
    var material = new THREE.MeshPhongMaterial({color: 0X89B1});
    var circle = new THREE.Mesh(circleGeo, material);
    circle.position.y = 1.45;

    var planeGeo = new THREE.PlaneGeometry(3.50, 3.50, 0, 0);

    var plane = new THREE.Mesh(planeGeo, material);

    THREE.GeometryUtils.merge(planeGeo, circleGeo);

    //circle.updateMatrix();
    //planeGeo.merge(circle.geometry, circle.matrix);

    //delete group.geometry;

    //group.add(circle, plane);

    //delete circle.material;
    //delete circle.geometry;
    //scene.add(circle);



    //plane.remove(circle);
    //scene.add(plane);


    /*var sphere = new THREE.Mesh( new THREE.SphereGeometry(100,16,12),new THREE.MeshLambertMaterial( { color: 0x2D303D, wireframe: true, shading: THREE.FlatShading } ));
    var cylinder = new THREE.Mesh(new THREE.CylinderGeometry(100, 100, 200, 16, 4, false ),new THREE.MeshLambertMaterial( { color: 0x2D303D, wireframe: true, shading: THREE.FlatShading } ));
    cylinder.position.y = -100;
    scene.add(sphere);
    scene.add(cylinder);*/


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