var GFX = GFX || {};

GFX.camera = null;
GFX.scene = null;
GFX.renderer = null;
GFX.cube_geometry = null;
GFX.cube_material = null;
GFX.cube_mesh = null;
GFX.plane_geometry = null;
GFX.plane_material = null;
GFX.plane_mesh = null;
GFX.light1 = null;

GFX.particleCount = 1024;
GFX.particles = null;
GFX.particlesMaterial = null;
GFX.particleSystem = null;

GFX.initialize = function() {   
    
    GFX.camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 10000 );
    GFX.camera.position.z = 1000;
    
    GFX.scene = new THREE.Scene();
    GFX.scene.add( new THREE.AmbientLight( 0x888888 ) );
    
    GFX.cube_geometry = new THREE.CubeGeometry( 200, 200, 200, 8, 8 );
    GFX.plane_geometry = new THREE.PlaneGeometry(8000, 4000, 8, 8);
    
    GFX.cube_material = new THREE.MeshPhongMaterial( {
        ambient: 0x000000, 
        color: 0xffffaa, 
        specular: 0xa0a010, 
        shininess: 300
    } );
    GFX.plane_material = new THREE.MeshPhongMaterial( {
        ambient: 0x000000, 
        color: 0x808040, 
        specular: 0x000000, 
        shininess: 100
    } );

    GFX.light1 = new THREE.SpotLight(0xFFFFFF);

    GFX.light1.intensity = 0; // modulate this
    GFX.light1.castShadow = true;
    GFX.light1.position.set(0,600,800);
    
    GFX.cube_mesh = new THREE.Mesh( GFX.cube_geometry, GFX.cube_material );
    GFX.cube_mesh.castShadow = true;
    GFX.cube_mesh.position.z = 250;
    GFX.cube_mesh.position.y = -50;
    GFX.plane_mesh = new THREE.Mesh( GFX.plane_geometry, GFX.plane_material);
    GFX.plane_mesh.rotation.x = -1.5;
    GFX.plane_mesh.position.y = -400;
    GFX.plane_mesh.receiveShadow = true;
    GFX.scene.add( GFX.cube_mesh );
    GFX.scene.add(GFX.plane_mesh);
    GFX.scene.add(GFX.light1);
    //GFX.scene.add(GFX.light2);
    GFX.scene.fog = new THREE.Fog( 0x000000, 700, 3000 );

    GFX.createParticles();
    GFX.scene.add(GFX.particleSystem);

    GFX.renderer = new THREE.WebGLRenderer();
    GFX.renderer.shadowMapEnabled = true;
    GFX.renderer.setSize( window.innerWidth, window.innerHeight );

    document.body.appendChild( GFX.renderer.domElement );
}

GFX.createParticles = function() {
    GFX.particles = new THREE.Geometry();
    GFX.particlesMaterial = new THREE.ParticleBasicMaterial({
        color: 0x666666,
        size: 130,
        map: THREE.ImageUtils.loadTexture(
            "particle.png"
            ),
        blending: THREE.AdditiveBlending,
        transparent: true
    });
    var pX, pY, pZ, particle;
    //var theta;
    //var length;
    for(var p = 0; p < GFX.particleCount; p++) {
        pY = Math.random() * 4000 - 2000;
        pX = Math.random() * 4000 - 2000;
        pZ = 0;
        /*theta = Math.random() * Math.PI * 2;
        length = 1;//Math.random();
        pX = Math.cos(theta) * 400 * length;
        pZ = Math.sin(theta) * 400 * length;
        pY = 0;*/
        particle = new THREE.Vertex(new THREE.Vector3(pX, pY, pZ));
        GFX.particles.vertices.push(particle);
    }
    GFX.particleSystem = new THREE.ParticleSystem(GFX.particles, GFX.particlesMaterial);
    GFX.particleSystem.rotation.x = -1.5;
    GFX.particleSystem.position.y = 380;
    GFX.particleSystem.sortParticles = true;
    GFX.particleSystem.castShadow = false;
    GFX.particleSystem.receiveShadow = false;
}


GFX.render = function() {
    
    GFX.cube_mesh.rotation.x += 0.0025;
    GFX.cube_mesh.rotation.y += 0.005;
   
    GFX.particleSystem.rotation.z += 0.001;

    GFX.renderer.render( GFX.scene, GFX.camera );

}