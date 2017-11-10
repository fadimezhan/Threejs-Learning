
//plane
window.addEventListener("DOMContentLoaded", function() {

    var scene, renderer, camera,controls;
    // create a scene
    scene = new THREE.Scene();


    //CSG Objects
    var box = new THREE.Mesh( new THREE.BoxGeometry( 10, 10, 10 ) );
    box.position.y = 5;
    var cube_bsp = new ThreeBSP( box );

    var sphere = new THREE.Mesh( new THREE.SphereGeometry(7));
    sphere.position.y = 10.46;
    var sphere_bsp  = new ThreeBSP( sphere );
    var obj  = cube_bsp.subtract( sphere_bsp );

    var result = obj.toMesh();


    //html codes
    /*var choose = document.createElement("div");
    choose.setAttribute("id","weird");
    choose.setAttribute("class", "elements");
    choose.style.marginLeft = "34rem";
    choose.style.marginTop = "10rem";
    choose.style.width = ((box.scale.x)*11.5 + "rem");
    choose.style.height = ((result.scale.y)*12 + "rem");
    $('body').append(choose);
    var cssObject = new THREE.CSS3DObject( choose );
    scene.add(cssObject);*/



    /*var element = document.createElement('div');
    //element.innerHTML = 'Plain text inside a div.';
    element.className = 'elements';
    element.id= 'weird';
    //var element2 = document.getElementsById('weird');

    //CSS Object
    var div = new THREE.CSS3DObject(element);
    div.scale = result.scale;
    scene.add(div);*/

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

    $(document).ready(function(){

        $("#grid").mousedown(function (e) {

            $("#big-ghost").remove();
            $(".ghost-select").addClass("ghost-active");
            $(".ghost-select").css({
                'left': e.pageX,
                'top': e.pageY
            });

            initialW = e.pageX;
            initialH = e.pageY;

            $(document).bind("mouseup", selectElements);
            $(document).bind("mousemove", openSelector);

        });


    });

    function selectElements(e) {
        $("#score>span").text('0');
        $(document).unbind("mousemove", openSelector);
        $(document).unbind("mouseup", selectElements);
        var maxX = 0;
        var minX = 5000;
        var maxY = 0;
        var minY = 5000;
        var totalElements = 0;
        var elementArr = new Array();
        $(".elements").each(function () {
            var aElem = $(".ghost-select");
            var bElem = $(this);
            var result = doObjectsCollide(aElem, bElem);

            console.log(result);
            if (result == true) {
                $("#score>span").text( Number($("#score>span").text())+1 );
                var aElemPos = bElem.offset();
                var bElemPos = bElem.offset();
                var aW = bElem.width();
                var aH = bElem.height();
                var bW = bElem.width();
                var bH = bElem.height();

                var coords = checkMaxMinPos(aElemPos, bElemPos, aW, aH, bW, bH, maxX, minX, maxY, minY);
                maxX = coords.maxX;
                minX = coords.minX;
                maxY = coords.maxY;
                minY = coords.minY;
                var parent = bElem.parent();

                //console.log(aElem, bElem,maxX, minX, maxY,minY);
                if (bElem.css("left") === "auto" && bElem.css("top") === "auto") {
                    bElem.css({
                        'left': parent.css('left'),
                        'top': parent.css('top')
                    });
                }
                $("body").append("<div id='big-ghost' class='big-ghost' x='" + Number(minX - 20) + "' y='" + Number(minY - 10) + "'></div>");

                $("#big-ghost").css({
                    'width': maxX + 40 - minX,
                    'height': maxY + 20 - minY,
                    'top': minY - 10,
                    'left': minX - 20
                });


            }
        });

        $(".ghost-select").removeClass("ghost-active");
        $(".ghost-select").width(0).height(0);

        ////////////////////////////////////////////////

    }

    function openSelector(e) {
        var w = Math.abs(initialW - e.pageX);
        var h = Math.abs(initialH - e.pageY);

        $(".ghost-select").css({
            'width': w,
            'height': h
        });
        if (e.pageX <= initialW && e.pageY >= initialH) {
            $(".ghost-select").css({
                'left': e.pageX
            });
        } else if (e.pageY <= initialH && e.pageX >= initialW) {
            $(".ghost-select").css({
                'top': e.pageY
            });
        } else if (e.pageY < initialH && e.pageX < initialW) {
            $(".ghost-select").css({
                'left': e.pageX,
                "top": e.pageY
            });
        }
    }


    function doObjectsCollide(a, b) { // a and b are your objects
        //console.log(a.offset().top,a.position().top, b.position().top, a.width(),a.height(), b.width(),b.height());
        var aTop = a.offset().top;
        var aLeft = a.offset().left;
        var bTop = b.offset().top;
        var bLeft = b.offset().left;

        return !(
            ((aTop + a.height()) < (bTop)) ||
            (aTop > (bTop + b.height())) ||
            ((aLeft + a.width()) < bLeft) ||
            (aLeft > (bLeft + b.width()))
        );
    }

    function checkMaxMinPos(a, b, aW, aH, bW, bH, maxX, minX, maxY, minY) {
        'use strict';

        if (a.left < b.left) {
            if (a.left < minX) {
                minX = a.left;
            }
        } else {
            if (b.left < minX) {
                minX = b.left;
            }
        }

        if (a.left + aW > b.left + bW) {
            if (a.left > maxX) {
                maxX = a.left + aW;
            }
        } else {
            if (b.left + bW > maxX) {
                maxX = b.left + bW;
            }
        }
        ////////////////////////////////
        if (a.top < b.top) {
            if (a.top < minY) {
                minY = a.top;
            }
        } else {
            if (b.top < minY) {
                minY = b.top;
            }
        }

        if (a.top + aH > b.top + bH) {
            if (a.top > maxY) {
                maxY = a.top + aH;
            }
        } else {
            if (b.top + bH > maxY) {
                maxY = b.top + bH;
            }
        }

        return {
            'maxX': maxX,
            'minX': minX,
            'maxY': maxY,
            'minY': minY
        };
    }



}, false);

