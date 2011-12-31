var GFX = GFX || {};

GFX.camera1 = null;
GFX.camera2 = null;
GFX.camera3 = null;
GFX.activeCamera = null;
GFX.scene = null;
GFX.renderer = null;
GFX.plane_geometry = null;
GFX.plane_material = null;
GFX.plane_mesh = null;
GFX.light1 = null;

GFX.particleCount = 529;
GFX.particles = null;
GFX.particlesMaterial = null;
GFX.particleSystem = null;

GFX.morphVel = 3;
GFX.destinationPositions = [];

GFX.nextMorph = 0;

GFX.initialize = function() {   
    
    GFX.camera1 = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 10000 );
    GFX.camera1.position.z = 550;
    GFX.camera1.position.x = -550;
    GFX.camera1.position.y = 400;
    GFX.camera1.lookAt(new THREE.Vector3(0,0,0)); // useless if you use controls

    GFX.camera2 = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 10000 );
    GFX.camera2.position.z = 0;
    GFX.camera2.position.x = -550;
    GFX.camera2.position.y = 400;
    GFX.camera2.lookAt(new THREE.Vector3(0,0,0)); // useless if you use controls

    GFX.camera3 = new THREE.PerspectiveCamera( 80, window.innerWidth / window.innerHeight, 1, 10000 );
    GFX.camera3.position.z = 0;
    GFX.camera3.position.x = 0;
    GFX.camera3.position.y = 900;
    GFX.camera3.lookAt(new THREE.Vector3(0,0,0)); // useless if you use controls

    GFX.activeCamera = GFX.camera1;

    GFX.plane_geometry = new THREE.PlaneGeometry(8000, 8000, 100, 100);
    GFX.plane_material = new THREE.MeshBasicMaterial({
        color: 0x666666,
        wireframe: true
    });
    GFX.plane_mesh = new THREE.Mesh(GFX.plane_geometry, GFX.plane_material);
    GFX.plane_mesh.rotation.x = -Math.PI/2;
    GFX.plane_mesh.position.y = -200;

    GFX.createParticles();

    GFX.scene = new THREE.Scene();

    GFX.scene.add(GFX.particleSystem);
    GFX.scene.add(GFX.plane_mesh);
    
    GFX.scene.add(GFX.camera1);
    GFX.scene.add(GFX.camera2);
    GFX.scene.add(GFX.camera3);
    GFX.scene.add(GFX.activeCamera);
    
    GFX.scene.fog = new THREE.Fog( 0x000000, 700, 2000 );

    //debugaxes();

    GFX.renderer = new THREE.WebGLRenderer();
    GFX.renderer.setSize( window.innerWidth, window.innerHeight );

    document.body.appendChild( GFX.renderer.domElement );
    
    document.body.addEventListener('keydown', function(ev) {
        switch (ev.keyCode) {
            case 49:
                GFX.activeCamera = GFX.camera1;
                break;
            case 50:
                GFX.activeCamera = GFX.camera2;
                break;
            case 51:
                GFX.activeCamera = GFX.camera3;
                break;
        }
    }, true);
    
    GFX.morphs[(GFX.nextMorph++)%6]();
    setInterval(function() {
        GFX.morphs[(GFX.nextMorph++)%6]();
    }, 10000);

}

GFX.createParticles = function() {
    var particles = new THREE.Geometry();
    var particlesMaterial = new THREE.ParticleBasicMaterial({
        color: 0x2266FF,
        size: 300,
        map: THREE.ImageUtils.loadTexture(
            "particle.png"
            ),
        blending: THREE.AdditiveBlending,
        depthTest: false,
        transparent: true,
        vertexColors: false //allows 1 color per particle
    });

    var pX, pY, pZ, particle;
    var theta = 0;
    var theta_steps = 2*Math.PI / GFX.particleCount;
    pX = 32;
    for(var p = 0; p < GFX.particleCount; p++) {
        pX = 400*Math.cos(theta);
        pY = 0;
        pZ = -400*Math.sin(theta);
        
        theta += theta_steps;

        particle = new THREE.Vertex(new THREE.Vector3(pX, pY, pZ));
        particles.vertices.push(particle);
    }
    
    GFX.particleSystem = new THREE.ParticleSystem(particles, particlesMaterial);
    GFX.particleSystem.sortParticles = true;
       
}

GFX.particlesMorph = function() {

    for(var p = 0; p < GFX.particleCount; p++) {
        // I know I could do this better but I don't have the time
        particle = GFX.particleSystem.geometry.vertices[p];
        if(particle.position.x > (GFX.destinationPositions[p][0] + GFX.morphVel)) {
            particle.position.x -= GFX.morphVel;
        } else if(particle.position.x <= (GFX.destinationPositions[p][0] - GFX.morphVel)){
            particle.position.x += GFX.morphVel;
        }
        if(Math.abs(particle.position.x - GFX.destinationPositions[p][0]) <= GFX.morphVel) {
            particle.position.x = GFX.destinationPositions[p][0];
        }

        if(particle.position.y > (GFX.destinationPositions[p][1] + GFX.morphVel)) {
            particle.position.y -= GFX.morphVel;
        } else if(particle.position.y <= (GFX.destinationPositions[p][1] - GFX.morphVel)){
            particle.position.y += GFX.morphVel;
        }
        if(Math.abs(particle.position.y - GFX.destinationPositions[p][1]) <= GFX.morphVel) {
            particle.position.y = GFX.destinationPositions[p][1];
        }        

        if(particle.position.z > (GFX.destinationPositions[p][2] + GFX.morphVel)) {
            particle.position.z -= GFX.morphVel;
        } else if(particle.position.z <= (GFX.destinationPositions[p][2] - GFX.morphVel)){
            particle.position.z += GFX.morphVel;
        }
        if(Math.abs(particle.position.z - GFX.destinationPositions[p][2]) <= GFX.morphVel) {
            particle.position.z = GFX.destinationPositions[p][2];
        }        
    }

}

GFX.toSphere = function() {
    var radius = 500;
    var m = GFX.particleCount;
    for(var i = 0; i < m; i++) {
        var x = radius * Math.cos(i/m*Math.PI) * Math.cos((i/m - 0.5)*Math.PI*16);
        var z = radius * Math.sin(i/m*Math.PI) * Math.cos((i/m - 0.5)*Math.PI*16);
        var y = radius * Math.sin((i/m - 0.5)*Math.PI*16);
        GFX.destinationPositions[i] = [x, y, z]; // x y z
    }
}

GFX.toConicalHelix = function() {
    var m = GFX.particleCount;
    for(var i = 0; i < m; i++) {
        var x = i/m*Math.PI*200 * Math.cos(i/m*Math.PI * 16);
        var z = i/m*Math.PI*200 * Math.sin(i/m*Math.PI * 16);
        var y = (i/m*700) - 350;
        GFX.destinationPositions[i] = [x, y, z]; // x y z
    }
}

GFX.toPlane = function() {
    var sizex = 1200;
    var sizey = 1200;
    var m = GFX.particleCount;
    var n = Math.sqrt(m);

    var p = 0;

    for(var i = 0; i < n; i++) {
        var x = i * sizex/n;
        x = x-(sizex/2);
        var y = 0;
        for(var j = 0; j < n; j++) {
            var z = j * sizey/n;
            z = z-(sizey/2);
            GFX.destinationPositions[p] = [x, y, z]; // x y z
            p++;
        }

    }
}

GFX.toCube = function() {
    var size = 700;
    var m = GFX.particleCount;
    //var n = Math.round(Math.pow(m, 1/3));
    var n = 8;
    
    var p = 0;
   
    for(var i = 0; i < n; i++) {
        var x = i * size/n;
        x = x-(size/2.25);
        for(var j = 0; j < n; j++) {
            var z = j * size/n;
            z = z-(size/2.25);
            for (var k = 0; k < n; k++) {
                var y = k * size/n;
                y = y-(size/3);
                GFX.destinationPositions[p] = [x, y, z]; // x y z
                p++;        
            }
        }
    }
    
    // dunno what to do with these points
    while(p < m) {
       GFX.destinationPositions[p++] = [size/2.25 - (size/2.25), size/2.25 - (size/3), size/2.25 - (size/2.25)]; // x y z
    }
    
}

GFX.toSin = function() {
    var size = 1000;
    var m = GFX.particleCount;

    var n = Math.sqrt(m);
        
    var p = 0;
   
    for(var i = 0; i < n; i++) {
        var x = i * size/n;
        for(var j = 0; j < n; j++) {
            var z = j * size/n;
            var y = Math.cos( ((Math.abs(x-size/2) + Math.abs(z-size/2)) / size) * Math.PI) * 300;
            GFX.destinationPositions[p] = [x-(size/2), y, z-(size/2)]; // x y z
            p++;
        }
    }
        
}

GFX.toTorus = function() {
    var r = 200;
    var R = 400;
    var m = GFX.particleCount;
    
    var n = Math.sqrt(m);
       
    var p = 0;
    
    for(var i = 0; i < n; i++) {
        for(var j = 0; j < n; j++) {           
            var x = Math.cos((j/n)*Math.PI*2) * (R + r*Math.cos((i/n)*Math.PI*2));
            var y = Math.sin((j/n)*Math.PI*2) * (R + r*Math.cos((i/n)*Math.PI*2));
            var z = r * Math.sin((i/n)*Math.PI*2);
            GFX.destinationPositions[p] = [x, y, z]; // x y z
            p++;             
        }
    }
}


GFX.render = function() {

    GFX.particlesMorph();

    GFX.particleSystem.rotation.y += 0.01;

    GFX.renderer.render( GFX.scene, GFX.activeCamera );

    window.requestAnimationFrame(GFX.render);

}


function debugaxes(){           
    //Axes array[x,y,z]
    var axisLength = 800;
    
    var info = [[-axisLength,0,0,axisLength,0,0,0xff0000],[0,-axisLength,0,0,axisLength,0,0x00ff00],[0,0,-axisLength,0,0,axisLength,0x0000ff]];
    
    //Draw some helpful axes
    for(i=0;i<3;i++){
        material = new THREE.MeshBasicMaterial({
            color: 0xffffff
        });
        geometry = new THREE.Geometry();
        
        //Define the start point
        particle = new THREE.Particle(material);
        particle.position.x = info[i][0];
        particle.position.y = info[i][1];
        particle.position.z = info[i][2];
        
        //Add the new particle to the scene
        GFX.scene.add(particle);
        
        //Add the particle position into the geometry object
        geometry.vertices.push(new THREE.Vertex(particle.position));
        
        //Create the second point
        particle = new THREE.Particle(material);
        particle.position.x = info[i][3];
        particle.position.y = info[i][4];
        particle.position.z = info[i][5];
        
        //Add the new particle to the scene
        GFX.scene.add(particle);
        
        //Add the particle position into the geometry object
        geometry.vertices.push(new THREE.Vertex(particle.position));
        
        //Create the line between points
        var line = new THREE.Line(geometry, new THREE.LineBasicMaterial({
            color: info[i][6], 
            opacity: 0.8, 
            linewidth: 1
        }));
        GFX.scene.add(line);
    }
}

GFX.morphs = [GFX.toTorus, GFX.toSphere, GFX.toConicalHelix, GFX.toPlane, GFX.toSin, GFX.toCube];