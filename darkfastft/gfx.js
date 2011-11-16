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
GFX.light2 = null;

GFX.initialize = function() {
    

    GFX.camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 10000 );
    GFX.camera.position.z = 1000;

    GFX.scene = new THREE.Scene();
    //GFX.scene.add( new THREE.AmbientLight( 0x888888 ) );
    
    GFX.cube_geometry = new THREE.CubeGeometry( 200, 200, 200, 8, 8 );
    GFX.plane_geometry = new THREE.PlaneGeometry(8000, 4000, 8, 8);
    
    GFX.cube_material = new THREE.MeshPhongMaterial( {ambient: 0x333333, color: 0xffffff, specular: 0xffffff, shininess: 200} );
    GFX.plane_material = new THREE.MeshPhongMaterial( {ambient: 0x333333, color: 0xffffff, specular: 0x000000, shininess: 0} );

    GFX.light1 = new THREE.SpotLight(0xFFFFFF);
    GFX.light2 = new THREE.SpotLight(0xFFFFFF);

    //GFX.light.position.x = -250;
    //GFX.light.position.y = 200;
    //GFX.light.position.z = 450;

    GFX.light1.intensity = 0.5; // modulate this
    GFX.light1.castShadow = true;
    GFX.light1.position.set(-200,450,-60);
    
    GFX.light2.castShadow = true;
    GFX.light2.intensity = 0.5; // modulate this
    GFX.light2.position.set(200,450,-60);

    GFX.cube_mesh = new THREE.Mesh( GFX.cube_geometry, GFX.cube_material );
    GFX.cube_mesh.castShadow = true;
    GFX.plane_mesh = new THREE.Mesh( GFX.plane_geometry, GFX.plane_material);
    GFX.plane_mesh.rotation.x = -1.5;
    GFX.plane_mesh.position.y = -400;
    GFX.plane_mesh.receiveShadow = true;
    GFX.scene.add( GFX.cube_mesh );
    GFX.scene.add(GFX.plane_mesh);
    GFX.scene.add(GFX.light1);
    GFX.scene.add(GFX.light2);
    GFX.scene.fog = new THREE.Fog( 0x000000, 700, 3000 );

    GFX.renderer = new THREE.WebGLRenderer();
    GFX.renderer.shadowMapEnabled = true;
    GFX.renderer.setSize( window.innerWidth, window.innerHeight );

    document.body.appendChild( GFX.renderer.domElement );
}

GFX.render = function() {

    GFX.cube_mesh.rotation.x += 0.01;
    GFX.cube_mesh.rotation.y += 0.02;

    GFX.light1.intensity = (GFX.light1.intensity + 0.01) % 1;
    GFX.light2.intensity = (GFX.light1.intensity + 0.01) % 1;

    GFX.renderer.render( GFX.scene, GFX.camera );

}