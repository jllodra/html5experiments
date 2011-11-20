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

GFX.particleCount = 832;
GFX.particles = null;
GFX.particlesMaterial = null;
GFX.particleSystem = null;

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
        color: 0x668666,
        wireframe: true
    });
    GFX.plane_mesh = new THREE.Mesh(GFX.plane_geometry, GFX.plane_material);
    GFX.plane_mesh.rotation.x = -Math.PI/2;
    GFX.plane_mesh.position.y = -200;

    GFX.createParticles();

    GFX.scene = new THREE.Scene();

    GFX.scene.add(GFX.particleSystem);
    GFX.scene.add(GFX.plane_mesh);
    
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
}

GFX.createParticles = function() {
    var particles = new THREE.Geometry();
    var particlesMaterial = new THREE.ParticleBasicMaterial({
        color: 0xFF6666,
        size: 300,
        map: THREE.ImageUtils.loadTexture(
            "particle.png"
            ),
        blending: THREE.AdditiveBlending,
        transparent: true
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


GFX.render = function() {
   
    GFX.particleSystem.rotation.y += 0.007;

    GFX.renderer.render( GFX.scene, GFX.activeCamera );

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