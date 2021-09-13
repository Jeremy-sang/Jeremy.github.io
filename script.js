//Create var for the contenair, the webGL 3D scene, uniforms to bind into shader and timer
var container;
var camera, scene, renderer;
var uniforms;
var startTime;

init(); //init scene
animate(); //updateScene

function init() {
	//get contenaire
	container = document.getElementById('container');
	
	//Create THREE.JS scene and timer
	startTime = Date.now();
	camera = new THREE.Camera();
	camera.position.z = 1;
	scene = new THREE.Scene();
	
	//create a simple plance
	var geometry = new THREE.PlaneBufferGeometry(16, 9);
	
	//create uniform table which provide all our GLSL binding
	uniforms = {
		time: { type: "f", value: 1.0 },
		resolution: { type: "v2", value: new THREE.Vector2() },
		mouse: { type: "v2", value: new THREE.Vector2() }
	};
	
	//create THREE.JS material
	var material = new THREE.ShaderMaterial( {
	//set shaders and uniforms into material
		uniforms: uniforms,
		vertexShader: document.getElementById('vertexShader').textContent,
		fragmentShader: document.getElementById('fragmentShader').textContent
	} );

	//create mesh, add it to the scene
	var mesh = new THREE.Mesh(geometry, material);
	scene.add(mesh);
	
	//create renderer and add it to the DOM
	renderer = new THREE.WebGLRenderer();
	container.appendChild(renderer.domElement);
	
	//check window for resize This will give us the proper resolution values to bind
	onWindowResize();
	window.addEventListener('resize', onWindowResize, false);
}

function onWindowResize(event) {
	//send new size value to the shader and resize the window
	uniforms.resolution.value.x = window.innerWidth;
	uniforms.resolution.value.y = window.innerHeight;
	renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate() {
	requestAnimationFrame(animate);
	render();
}

function render() {
	var currentTime = Date.now();
	var elaspedSeconds =  (currentTime - startTime) / 1000.0;
	var maxTime = 4.0;
	var normTime = (elaspedSeconds % maxTime) / maxTime;
	uniforms.time.value =elaspedSeconds;

	renderer.render(scene, camera);
}

window.addEventListener("mousemove",(evt)=>{
	// console.log(evt)
	
	uniforms.mouse.value.x =  evt.x/uniforms.resolution.value.x;
	uniforms.mouse.value.y = 1-evt.y/uniforms.resolution.value.y;
})

window.addEventListener("click", (evt)=>{
	document.getElementById("container").classList.toggle("blur")
	document.querySelector(".menu").classList.toggle("active")
})