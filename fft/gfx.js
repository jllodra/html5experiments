var GFX = GFX || {};

GFX.camera = null;
GFX.scene = null;
GFX.renderer = null;
GFX.geometry = null;
GFX.material = null;
GFX.mesh = null;
GFX.light = null;

GFX.initialize = function() {
    

    GFX.camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 10000 );
    GFX.camera.position.z = 1000;

    GFX.scene = new THREE.Scene();
    GFX.scene.add( new THREE.AmbientLight( 0x888888 ) );
    
    GFX.geometry = new THREE.CubeGeometry( 200, 200, 200, 8, 8 );
    
    GFX.material = new THREE.MeshPhongMaterial( { ambient: 0x333333, color: 0xffffff, specular: 0x555555, shininess: 30 } )
    
    GFX.light = new THREE.PointLight( 0xFFFFFF);

    GFX.light.position.x = -250;
    GFX.light.position.y = 200;
    GFX.light.position.z = 450;

    GFX.mesh = new THREE.Mesh( GFX.geometry, GFX.material );
    GFX.scene.add( GFX.mesh );
    GFX.scene.add(GFX.light);

    GFX.renderer = new THREE.WebGLRenderer();
    GFX.renderer.setSize( window.innerWidth, window.innerHeight );

    document.body.appendChild( GFX.renderer.domElement );
}

GFX.animate = function() {

}

GFX.render = function() {

    GFX.mesh.rotation.x += 0.01;
    GFX.mesh.rotation.y += 0.02;

    GFX.renderer.render( GFX.scene, GFX.camera );

}