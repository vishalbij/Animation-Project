var mySceneTLX; 
var mySceneTLY; 
var mySceneBRX; 
var mySceneBRY; 

var batteryGeom;
var batteryTipGeom;
var battery;
var batteryTip;

var connector;
var mount;
var swtch;
var swtchGeom;
var w1,w2;

var bottomGeo;
var bulbBottom;
var bulbGeo;
var bulb;
var gval;

var cell;
var liquid;
var containercell;
var electrolyte;
var copperParticle;
var controls;

var elecGeom;
var cathode;
var anode;
var processcomplete = 0;
var helpContent;
var a=0;
var b=0;
 
function initialiseHelp() {
    helpContent = "";
    helpContent = helpContent + "<h2>Electroplating with different metal rods help</h2>";
    helpContent = helpContent + "<h3><u>About the experiment</u></h3>";
    helpContent = helpContent + "<p>The experiment shows basic electroplating with different metal rods.</p>";
    helpContent = helpContent + "<h3><u>Animation control</u></h3>";
    helpContent = helpContent + "<p>The top line has animation controls.</p>";
    helpContent = helpContent + "<p>Initially the experiment is STOP. In this stage, you can see a control window at the right.</p>";
    helpContent = helpContent + "<p>You can control the following:</p>";
	helpContent = helpContent + "<ul>";
	helpContent = helpContent + "<li> Reset button - To reset the experiment.</li>";
    helpContent = helpContent + "<li> Change Cathode - Select rod as Cathode</li>";
    helpContent = helpContent + "<li> Change Anode - Select rod as Anode</li>";
    helpContent = helpContent + "</ul>";
    helpContent = helpContent + "<p>First,You should select Anode rod.</p>";
	helpContent = helpContent + "<p>then, Select different metal rods for Cathode</p>";
	helpContent = helpContent + "<p><b>when you change any rod then the experiment will be reset automatically.</b><p>";
    helpContent = helpContent + "<p>Once you refer the info at control window, press start.</p>";
	helpContent = helpContent + "<p><b>Drag anywhere to view 360 degree view.</b></p>";
    helpContent = helpContent + "<h3><u>The animation stage</u></h3>";
    helpContent = helpContent + "<p>Press start button to start the experiment.</b></p>";
    helpContent = helpContent + "<p>When experiment starts, the switch drops, bulbs turns white to yellow (glow) and wires become yellow.</p>";
    helpContent = helpContent + "<p>Cu, Zn, Fe are decomposed in solution.But Au is not decomposed in solution(Cuso4).</p>";
    helpContent = helpContent + "<p><b>Colors obtained during experiment-<b></p>";
	helpContent = helpContent + "<ul>";
	helpContent = helpContent + "<p>(red layering) - Cu(Copper) </p>";
	helpContent = helpContent + "<p>(Blue electrolyte) - CuS04</p>";
	helpContent = helpContent + "<p>(Green Solution) - FeSo4</p>";
	helpContent = helpContent + "<p>(White Vitriol Solution) - ZnSO4</p>";
    helpContent = helpContent + "<p>(White Solution) - when all Cu+2 ions finished.</p>";
	helpContent = helpContent + "</ul>";
	helpContent = helpContent + "<p>O2 gas will produced at Anode during electroplating.</b></p>";
    helpContent = helpContent + "<p>You can pause and resume the animation by using the pause/play nutton on the top line.</p>";
    helpContent = helpContent + "<h2><b>Happy Experimenting<b></h2>";
    PIEupdateHelp(helpContent);
}

var infoContent;

function initialiseInfo() {
    infoContent = "";
    infoContent = infoContent + "<h2><u>Electroplating with different metal rods.</u></h2>";
    infoContent = infoContent + "<h3>About the experiment</h3>";
    infoContent = infoContent + "<p>The experiment shows basic electroplating with different metal rods.</p>";
    infoContent = infoContent + "<h3>Electroplating</h3>";
	infoContent = infoContent + "<p>Electroplating can be defined as the deposit of a very thin layer of metal(Anode) to a base metal(Cathode) to enhance or change its appearance.</p>";
    infoContent = infoContent + "<p>Electroplating is done in a liquid solution called an electrolyte (here Cuso4 used).</p>";
    infoContent = infoContent + "<p>Initially both rods are Copper.Select Anode then change Cathode.</p>";
    infoContent = infoContent + "<p><b>Cu(copper) get deposited on Cathode as red layering.<b></p>";
    infoContent = infoContent + "<p><b>CuSo4 electrolyte = (blue).<b></p>";
	infoContent = infoContent + "<p><b>By Default, Cathode = Cu(Copper).<b></p>";
	infoContent = infoContent + "<p><b>By Default, Anode = Cu(Copper).<b></p>";
    PIEupdateInfo(infoContent);
}



 function initialiseScene() {
     
    mySceneTLX = -50.0;
    mySceneTLY = 20.0;
    mySceneBRX = 50.0;
    mySceneBRY = -20.0;
	mySceneW   = (mySceneBRX - mySceneTLX);
    mySceneH   = (mySceneTLY - mySceneBRY);
    myCenterX  = (mySceneTLX + mySceneBRX) / 2.0;
    myCenterY  = (mySceneTLY + mySceneBRY) / 2.0;

    PIEscene.background = new THREE.Color("#827b60");//0xFCEDB2
    //PIEcamera.position.set(0, 0, 40);

     var lights = [];
    lights[ 0 ] = new THREE.PointLight( 0xffffff, 1, 0 ); 
    lights[ 1 ] = new THREE.PointLight( 0xffffff, 1, 0 );
    lights[ 2 ] = new THREE.PointLight( 0xffffff, 1, 0 );

    lights[ 0 ].position.set( 0, 200, 0 );
    lights[ 1 ].position.set( 100, 200, 100 );
    lights[ 2 ].position.set( - 100, - 200, - 100 );

    PIEaddElement( lights[ 0 ] );
    PIEaddElement( lights[ 1 ] );
    PIEaddElement( lights[ 2 ] );
    /*var dirLight = new THREE.DirectionalLight( 0xffffff, 1);
    dirLight.position.set(1,1,1);
    PIEaddElement(dirLight);*/
}

									
/* ----------------------------- cell-------------------*/

function addBall(x, y, z) {
    var ballGeom = new THREE.SphereGeometry(0.4, 32, 24);
    var ball = new THREE.Mesh(ballGeom, new THREE.MeshPhongMaterial({
        color: "black"
    })); //switch spheres
    ball.position.set(x, y, z);
    PIEaddElement(ball);
    return ball;
} 
// add word O2 on screen
var oxygen;
function Oxygen(){

	var Geom = new THREE.SphereGeometry(1.5, 32, 24);
    oxygen = new THREE.Mesh(Geom, new THREE.MeshPhongMaterial({color: "white", transparent: true , opacity: 0.08}));
    oxygen.position.set(-4,-7,0);

	var one =  new THREE.Mesh( new THREE.RingGeometry(0.4,0.7,32),new THREE.MeshPhongMaterial({color: "white",side:THREE.DoubleSide}));
	one.position.set(-0.4,-0.1,0);
	one.rotation.z = Math.PI*0.15;
	oxygen.add(one);

	var two =  new THREE.Mesh( new THREE.RingGeometry(0.2,0.4,32,8,0,1.6*Math.PI),new THREE.MeshPhongMaterial({color: "white",side:THREE.DoubleSide}));
	two.position.set(0.7,-0.5,0.05);
	two.rotation.z = Math.PI*1.2;
	oxygen.add(two);

	var fou =  new THREE.Mesh( new THREE.CubeGeometry(1.25,0.3,0.01,4,4,4),new THREE.MeshPhongMaterial({color: "white",side:THREE.DoubleSide}));
	fou.position.set(-1.4,1,0);
	fou.rotation.z = -Math.PI/4;
	oxygen.add(fou);

	var fou =  new THREE.Mesh( new THREE.CubeGeometry(1.25,0.3,0.01,4,4,4),new THREE.MeshPhongMaterial({color: "white",side:THREE.DoubleSide}));
	fou.position.set(-2.2,1,0);
	fou.rotation.z = Math.PI/4;
	oxygen.add(fou);


	var fou =  new THREE.Mesh( new THREE.CubeGeometry(2.5,0.4,0.01,4,4,4),new THREE.MeshPhongMaterial({color: "white",side:THREE.DoubleSide}));
	fou.position.set(-1.8,0.2,0);
	fou.rotation.z = Math.PI/2;
	oxygen.add(fou);



	var fiv =  new THREE.Mesh( new THREE.CubeGeometry(0.4,0.2,0.01,4,4,4),new THREE.MeshPhongMaterial({color: "white",side:THREE.DoubleSide}));
	fiv.position.set(0.5,-0.9,0);
	fiv.rotation.z = Math.PI/2;
	oxygen.add(fiv);


	var five =  new THREE.Mesh( new THREE.CubeGeometry(0.7,0.2,0.01,4,4,4),new THREE.MeshPhongMaterial({color: "white",side:THREE.DoubleSide}));
	five.position.set(0.8,-1.2,0);
	oxygen.add(five);

    PIEaddElement(oxygen);
	
   
}
function test(){}
function initialise(){
	 oxygen.visible = false;
     //PIEaddInputCommand("Reset", resetexp);
	 PIEaddInputText("Metal Rods","");
	 //PIEaddDisplayText("Metal Rods","");
     initial();
	 initialiseCathode();
	 initialiseAnode();
	 PIEaddInputText("By Default -","");
	 //PIEaddDisplayText("By Default -","");
	
	 PIEaddInputCommand("Cathode(-)=Cu",test);
	 PIEaddInputCommand("Anode(+)=Cu",test);
	 PIEaddInputText("Electrolyte", " CuSO4.5H2O ");
	 PIEaddDisplayText("Electrolyte", " CuSO4.5H2O ");
} 

function initial(){
	PIEaddInputCommand("Copper(Cu)", handleCopperA);
	PIEaddInputCommand("Iron(Fe)", handleIronA);
	PIEaddInputCommand("Carbon(C)", handleCarbonA);
	PIEaddInputCommand("Gold(Au)", handleGoldA);
    PIEaddInputCommand("Zinc(Zn)", handleZincA);
}
function initialiseAnode() {
	PIEaddInputCheckbox("change Anode",true,checkAnode);
	PIEchangeInputCheckbox("change Cathode",false);
	}
 function initialiseCathode() {
    /* Cathode Element Selector */
	PIEchangeInputCheckbox("change Anode",false);
	PIEaddInputCheckbox("change Cathode",true,checkCathode);
	}
	
var x=0;	
function checkCathode()
{  
    PIEsetAreaOfInterest(mySceneTLX,mySceneTLY,mySceneBRX,mySceneBRY);
	PIEchangeInputCheckbox("change Cathode",true);
	PIEchangeDisplayCheckbox("Change Cathode",true);
	PIEchangeInputCheckbox("change Anode",false);
	PIEchangeDisplayCheckbox("change Anode",false);
	if(x == 0){ handleCopperA(); }
	else if(x == 1){ handleIronA(); }
	else if(x == 2){ handleGoldA(); }
	else if(x == 3){ handleZincA(); }
    else if(x == 4){ handleCarbonA(); }
	
	PIEchangeInputCommand("Copper(Cu)","Copper(Cu)", handleCopperC);
	PIEchangeInputCommand("Iron(Fe)","Iron(Fe)", handleIronC);
	PIEchangeInputCommand("Carbon(C)","Carbon(C)", handleCarbonC);
	PIEchangeInputCommand("Gold(Au)","Gold(Au)", handleGoldC);
    PIEchangeInputCommand("Zinc(Zn)","Zinc(Zn)", handleZincC);
	
	PIErender();
}
function checkAnode()
{   
	PIEsetAreaOfInterest(mySceneTLX,mySceneTLY,mySceneBRX,mySceneBRY);
	PIEchangeInputCheckbox("change Anode",true);
	PIEchangeDisplayCheckbox("Change Anode",true);
	
	PIEchangeInputCheckbox("change Cathode",false);
	PIEchangeDisplayCheckbox("change Cathode",false);
	handleCopperC();
	
	PIEchangeInputCommand("Copper(Cu)","Copper(Cu)", handleCopperA);
	PIEchangeInputCommand("Iron(Fe)","Iron(Fe)", handleIronA);
	PIEchangeInputCommand("Carbon(C)","Carbon(C)", handleCarbonA);
    PIEchangeInputCommand("Gold(Au)","Gold(Au)", handleGoldA);
    PIEchangeInputCommand("Zinc(Zn)","Zinc(Zn)", handleZincA);
	
	PIErender();	
}
/* change cathode elements */
function handleCopperC() {
	     //resetexp();
		 resetrod();
         cathode.material.color.setStyle("red");PIErender();
		 a=0;
		 b=null;
		 //PIEresetExperiment();
         processcomplete=0;
  
       }
function handleIronC() {
	    //resetexp();
		resetrod();
        cathode.material.color.setStyle("#2E0000"); PIErender();
		a=1;
		b=null;
		//PIEresetExperiment();
        processcomplete=0;
  
		}
function handleGoldC() {
	    //resetexp();
		resetrod();
        cathode.material.color.setStyle("yellow"); PIErender();
		a=2;
		b=null;
		//PIEresetExperiment();
        processcomplete=0;
  
		}
function handleZincC() {
	     //resetexp();
		 resetrod();
        cathode.material.color.setStyle("white"); PIErender();
        a=3;
		b=null;
		//PIEresetExperiment();
        processcomplete=0;
  
		}
function handleCarbonC(){
	resetrod();
	 cathode.material.color.setStyle("black"); PIErender();
        a=4;
		b=null;
		//PIEresetExperiment();
        processcomplete=0;
  
}		

/* Change Anode Elements */
function handleCopperA() {
	    x=0;
		resetrod();
        anode.material.color.setStyle("red"); PIErender();
		b=0;
		//PIEresetExperiment();
        processcomplete=0;
		}
function handleIronA() {
		resetrod();
        anode.material.color.setStyle("#2E0000"); PIErender();
		x=1;
		b=1;
		//PIEresetExperiment();
        processcomplete=0;
		}
function handleGoldA() {
	    x=2;
		resetrod();
        anode.material.color.setStyle("yellow"); PIErender();
		b=2;
		//PIEresetExperiment();
        processcomplete=0;
		}
function handleZincA() {
	    x=3;
		resetrod();
        anode.material.color.setStyle("white"); PIErender();
        b=3;
		//PIEresetExperiment();
        processcomplete=0;
		}
function handleCarbonA() {
	    x=4;
		resetrod();
        anode.material.color.setStyle("black"); PIErender();
        b=4;
		//PIEresetExperiment();
        processcomplete=0;
		
}		
function resetrod(){
	PIEsetAreaOfInterest(mySceneTLX,mySceneTLY,mySceneBRX,mySceneBRY);
	PIEremoveElement(cathode);
	PIEremoveElement(anode);
	elecGeom = new THREE.CylinderGeometry(0.5, 0.5, 7, 32); //cathode anode geometry
    if(a == 1) {material = new THREE.MeshPhongMaterial({color: "#2E0000",transparent: false});}
    else if(a == 2){ material = new THREE.MeshPhongMaterial({color: "yellow",transparent: false});}
    else if(a == 3){ material = new THREE.MeshPhongMaterial({color: "white",transparent: false});}
    else if(a == 0){material = new THREE.MeshPhongMaterial({color: "red",transparent: false});}
    else if(a == 4){material = new THREE.MeshPhongMaterial({color: "black",transparent: false});}
  
	cathode = new THREE.Mesh(elecGeom, material);
	cathode.position.set(7, -10, 0);
	PIEaddElement(cathode);// cathode
	if(x == 1){ m2 = new THREE.MeshPhongMaterial({color: "#2E0000",transparent: false}); }
	else if(x == 2){m2 = new THREE.MeshPhongMaterial({color: "yellow",transparent: false});}
	else if(x == 3){m2 = new THREE.MeshPhongMaterial({color: "white",transparent: false});}
    else if(x == 0){ m2 = new THREE.MeshPhongMaterial({color: "red",transparent: false});}
	else if(x == 4){m2 = new THREE.MeshPhongMaterial({color: "black",transparent: false});}
  
    anode = new THREE.Mesh(elecGeom,m2); //anode
    anode.position.set(-7, -10, 0);
    PIEaddElement(anode);
	cathode1.material.opacity = 0;
	electrolyte.material.color.setStyle("darkblue");
	PIErender();
	w=0;
    processcomplete=0;	
}

var controls;
var earth, loader;

// imp. function 1

function loadExperimentElements() {
    PIEsetExperimentTitle("Basic Electroplating with different metal rods");
    PIEsetDeveloperName("Vishal Kumar Choudhary");
   // PIEhideControlElement();
    /* initialise help and info content */
    initialiseHelp();
    initialiseInfo();
    
    initialiseScene();
	Oxygen();
    initialise();
   /*copper particles in electrolytes  */ 
    copperParticle = new Array(1000);
    copperParticleCount = 0;
	
 // controls = new THREE.OrbitControls(PIEcamera, PIErenderer.domElement);// not inspect ;)

	//fantyo
   var g = new THREE.BoxGeometry(30,3,0);
   var m = new THREE.MeshPhongMaterial({color: "#b46311"});
   var back = new THREE.Mesh(g,m);
   back.position.set(0,9.8,0);
   PIEaddElement(back);   

     /* Battery and Positive Terminal Tip */
    batteryGeom = new THREE.CylinderGeometry(1, 1, 5, 32);
    battery = new THREE.Mesh(batteryGeom, new THREE.MeshPhongMaterial({
        color: "black"
    }));
	
    batteryTipGeom = new THREE.CylinderGeometry(0.5, 0.5, 0.5, 32); //terminal on top battery
    batteryTipGeom.translate(0, 2.555, 0);
    batteryTip = new THREE.Mesh(batteryTipGeom, new THREE.MeshPhongMaterial({
        color: "red"
    }));
    battery.add(batteryTip); //positive terminal tip to battery body
    battery.rotation.z = Math.PI / 2;
    battery.position.set(10, 10, 0);
    PIEaddElement(battery);
    // + & - ;)
	var Geom = new THREE.CylinderGeometry(0.07,0.07,0.7,32 );
    w1 = new THREE.Mesh(Geom, new THREE.MeshPhongMaterial({color:"darkred"}));//#FF4500
    w1.position.set(8.1,9.8,1);
    PIEaddElement(w1);
	w2 = new THREE.Mesh(Geom, new THREE.MeshPhongMaterial({color:"darkred"}));//#FF4500
    w2.position.set(8.1,9.8,1);
    w2.rotation.z = Math.PI/2;
    PIEaddElement(w2);
	w3 = new THREE.Mesh(Geom, new THREE.MeshPhongMaterial({color:"darkred"}));//#FF4500
    w3.position.set(12,9.8,1);
    w3.rotation.z = Math.PI/2;
    PIEaddElement(w3);
	
    /* Switch and Dots */
    connector = addBall(-7, 10, 0); //right black connector switch
    mount = addBall(-13, 10, 0); //left black connector switch
    swtchGeom = new THREE.BoxGeometry(6, .4, .4); //switch handle
    swtchGeom.translate(3, 0, 0);
    swtch = new THREE.Mesh(swtchGeom, new THREE.MeshPhongMaterial({
        color: "white"
    }));
    swtch.rotation.z = Math.PI / 4; //Makes a angle 22.5 Deg
    swtch.position.set(-13, 10, 0);
    PIEaddElement(swtch);

    /* Bulb and Bottom Cylinder */
     bottomGeo = new THREE.CylinderGeometry(1, 1, 1, 32);
     bulbBottom = new THREE.Mesh(bottomGeo, new  THREE.MeshPhongMaterial({
        color: "black",
        transparent: false
    }));
    bulbBottom.position.set(0, 10, 0);
    bulbGeo = new THREE.SphereGeometry(2, 50, 24);
    bulb = new THREE.Mesh(bulbGeo, new THREE.MeshPhongMaterial({
        color: "white",
        transparent: true, opacity : 0.8, shininess: 300 }));
		
    bulb.position.set(0, 12, 0);
    PIEaddElement(bulbBottom);
    PIEaddElement(bulb);

    /* Electrolytic Cell */
    cell = new THREE.CylinderGeometry(9, 9, 8, 40); //Container cell
    containercell = new THREE.Mesh(cell, new THREE.MeshPhongMaterial({
        color: "white",
        transparent: true,
        opacity: 0.3}));
	
    containercell.position.set(0, -9, 0); //position of the main container
	
    /* Electrodes Anode and Cathode */
	elecGeom = new THREE.CylinderGeometry(0.5, 0.5, 7, 32); //cathode anode geometry
    material = new THREE.MeshPhongMaterial({color: "red",transparent: false});
	cathode = new THREE.Mesh(elecGeom, material);
	cathode.position.set(7, -10, 0);
	PIEaddElement(cathode);// cathode

    anode = new THREE.Mesh(elecGeom, new THREE.MeshPhongMaterial({
        color: "red",
        transparent: false })); 
    anode.position.set(-7, -10, 0);
    PIEaddElement(anode); //anode
	// hollow cylinder red layer
	var c = { amount : 7, steps : 1, bevelEnabled : false,curveSegments : 20};
	var sh = new THREE.Shape();
	sh.absarc(0,0,0.8,Math.PI*2,0,false);
	var h = new THREE.Path();
	h.absarc(0,0,0.5,Math.PI*2,20,true);
	sh.holes.push(h);
	var geometry = new THREE.ExtrudeGeometry(sh,c);
	var material = new THREE.MeshPhongMaterial({color: "red",transparent: true, opacity: 0});
	cathode1 = new THREE.Mesh(geometry, material);
	PIEaddElement(cathode1);
	    cathode1.rotation.x = Math.PI/2
	  cathode1.position.set(7, -6.5, 0);
	

	liquid = new THREE.CylinderGeometry(9, 9, 7.2, 40); 
    electrolyte = new THREE.Mesh(liquid, new THREE.MeshPhongMaterial({
		color:"darkblue",
	   transparent: true,
	   opacity: 0.4}));
    electrolyte.position.set(0, -0.7, 0);
    containercell.add(electrolyte);
    PIEaddElement(containercell);

	var Geom = new THREE.CylinderGeometry(0.08,0.08,3,32 );
    w1 = new THREE.Mesh(Geom, new THREE.MeshPhongMaterial({color:"darkblue"}));//#FF4500
    w1.position.set(7,-5.4,0);
    PIEaddElement(w1);
	
	w2 = new THREE.Mesh(Geom, new THREE.MeshPhongMaterial({color:"darkblue"}));//#FF4500
    w2.position.set(-7,-5.4,0);
    PIEaddElement(w2);
// Cu+2
	loader = new THREE.FontLoader();
     loader.load("optimer.json", function(response){
     var font = response;
     geometry = new THREE.TextGeometry("Cu+2", {
            font : font,
            size : 0.70,
            height : 0.20,
        });
 
     gval=new THREE.Mesh(geometry, new THREE.MeshBasicMaterial({color:0xffffff}));
        gval.translation = geometry.center();
        gval.position.set(3.5, -9, 3);
     	PIEaddElement(gval);
        //gval.scale.y=1.25; 
		});
		//cathode and anode
   var loader = new THREE.FontLoader();
     loader.load("optimer.json", function(font){
    // var font = response;
    var geometry1 = new THREE.TextGeometry("Cathode", {
            font : font,
            size : 0.70,
            height : 0.20,
        });
 
      var ca =new THREE.Mesh(geometry1, new THREE.MeshBasicMaterial({color:0xffffff}));
        ca.translation = geometry.center();
        ca.position.set(4, -15, 2);
     	PIEaddElement(ca);
        //gval.scale.y=1.25; 
		});
		loader = new THREE.FontLoader();
     loader.load("optimer.json", function(response){
     var font = response;
    var geometry1 = new THREE.TextGeometry("Anode", {
            font : font,
            size : 0.70,
            height : 0.20,
        });
 
      var ca =new THREE.Mesh(geometry1, new THREE.MeshBasicMaterial({color:0xffffff}));
        ca.translation = geometry.center();
        ca.position.set(-7.5, -15, 2);
     	PIEaddElement(ca);
        //gval.scale.y=1.25; 
		});
	var bubbleGeo = new THREE.SphereGeometry(0.25,2,1);
	
	copperParticle[0] = new THREE.Mesh(bubbleGeo, new THREE.MeshPhongMaterial({color: "red"}));
    copperParticle[0].position.set(-4,-7.5,0);
    PIEaddElement(copperParticle[0]);
    
	copperParticle[1] = new THREE.Mesh(bubbleGeo, new THREE.MeshPhongMaterial({color: "red"}));
    copperParticle[1].position.set(-4,-9,0);
    PIEaddElement(copperParticle[1]);
    
    copperParticle[2] = new THREE.Mesh(bubbleGeo, new THREE.MeshPhongMaterial({color: "red"}));
    copperParticle[2].position.set(-7,-11,0);
    PIEaddElement(copperParticle[2]);
    
    copperParticle[3] = new THREE.Mesh(bubbleGeo, new THREE.MeshPhongMaterial({color: "red"}));
    copperParticle[3].position.set(-3,-11.3,0);
    PIEaddElement(copperParticle[3]);

    copperParticle[4] = new THREE.Mesh(bubbleGeo, new THREE.MeshPhongMaterial({color: "red"}));
    copperParticle[4].position.set(-4,-13.3,0);
    PIEaddElement(copperParticle[4]);

    PIErenderer.sortObjects = false;
	oxygen.visible = false;
	
	//wireing
    
								var ch4= new THREE.QuadraticBezierCurve3(
										new THREE.Vector3(-12.5,10,0),
										new THREE.Vector3(-20.7, 12.0,0),
										new THREE.Vector3(-19,0,0)
										);
										 /*var curve = new THREE.CubicBezierCurve3(
                                                   new THREE.Vector3( -12.5, 10, 0 ),
                                                   new THREE.Vector3( -15, 11, 0 ),
                                                   new THREE.Vector3( -20.7, 12, 0 ),
                                                   new THREE.Vector3( -19, 0, 0 )
                                                 );
                                           var ge5 = new THREE.TubeGeometry(curve, 1000, 0.1, 200, false);*/
										   var ge5 = new THREE.Geometry();
											ge5.vertices = ch4.getPoints( 50 );

  
										var ma5= new THREE.LineBasicMaterial( { color : 'blue'});
										 
											 cO27 = new THREE.Line( ge5, ma5);
			
											PIEaddElement(cO27);	
											
								var ch4= new THREE.QuadraticBezierCurve3(
										new THREE.Vector3(-19,0,0),
										new THREE.Vector3(-15,-5.5,10),
										new THREE.Vector3(-7,-4.3,2)
										);
			                        /*  var curve = new THREE.CubicBezierCurve3(
                                                   new THREE.Vector3( -19, 0, 0 ),
                                                   new THREE.Vector3( -16, -7.5, 0 ),
                                                   new THREE.Vector3( -15, -5, 0 ),
                                                   new THREE.Vector3( -7, -4.3, 2 )
                                                 );
                                          
			
									var ge5 = new THREE.TubeGeometry(curve, 1000, 0.1, 200, false);*/
									var ge5 = new THREE.Geometry();
									ge5.vertices = ch4.getPoints( 50 );

										var ma5= new THREE.LineBasicMaterial( { color : 'blue'} );

										 cO28 = new THREE.Line( ge5, ma5);
			
											PIEaddElement(cO28);	
											var ch4= new THREE.QuadraticBezierCurve3(
										new THREE.Vector3(-7.6,-5,0),
										new THREE.Vector3(-7.8,-5.2,0),
										new THREE.Vector3(-6,-5.3,0)
										);
			
			
											var ge5 = new THREE.Geometry();
											ge5.vertices = ch4.getPoints( 100 );

										var ma5= new THREE.LineBasicMaterial( { color : 'blue'} );

										cO33= new THREE.Line( ge5, ma5);
			
											PIEaddElement(cO33);	
											
										var ch4= new THREE.QuadraticBezierCurve3(
										new THREE.Vector3(-7,-4.4,2 ),
										new THREE.Vector3(-6, -4.8, 0),
										new THREE.Vector3(-7.6,-5,0)
										);
			
			
											var ge5 = new THREE.Geometry();
											ge5.vertices = ch4.getPoints( 50 );

										var ma5= new THREE.LineBasicMaterial( { color : 'blue'} );

									 cO34 = new THREE.Line( ge5, ma5);
			
											PIEaddElement(cO34);	
											
								var ch4= new THREE.QuadraticBezierCurve3(
										new THREE.Vector3(12, 9.8, 0),
										new THREE.Vector3(20.4,9, 2),
										new THREE.Vector3(15,1,2)
										);
			                       /*var curve = new THREE.CubicBezierCurve3(
                                                   new THREE.Vector3( 12, 9.8, 0 ),
                                                   new THREE.Vector3( 17, 11, 2 ),
                                                   new THREE.Vector3( 19, 9, 2 ),
                                                   new THREE.Vector3( 16, 0, 2 )
                                                 );
                                         */
			
											//var ge5 = new THREE.TubeGeometry(curve, 1000, 0.1, 200, false);
											var ge5 = new THREE.Geometry();
											ge5.vertices = ch4.getPoints( 50 );

											var ma5= new THREE.LineBasicMaterial( { color : 'blue'} );

											 cO29= new THREE.Line( ge5, ma5);
		                                     PIEaddElement(cO29);	
								var ch4= new THREE.QuadraticBezierCurve3(
										new THREE.Vector3(15,1,2),
										new THREE.Vector3(3.5,-4.3,2),
										new THREE.Vector3(7.3,-4.3,2 )
										);
			                        /* var curve = new THREE.CubicBezierCurve3(
                                                   new THREE.Vector3( 16, 0, 2 ),
                                                   new THREE.Vector3( 15, -4, 2 ),
                                                   new THREE.Vector3( 13, -7, 2 ),
                                                   new THREE.Vector3( 7, -4.5, 2 )
                                                 );
                                       
			
											var ge5 = new THREE.TubeGeometry(curve, 1000, 0.1, 200, false);*/
											var ge5 = new THREE.Geometry();
											ge5.vertices = ch4.getPoints( 50 );

											var ma5= new THREE.LineBasicMaterial( { color : 'blue'} );

											 cO30 = new THREE.Line( ge5, ma5);
			
											PIEaddElement(cO30);	
									var ch4= new THREE.QuadraticBezierCurve3(
										new THREE.Vector3(7.3,-4.3,2 ),
										new THREE.Vector3(7.8, -4.5, 0),
										new THREE.Vector3(6.6, -4.8, 0 )
										);
			
			
											var ge5 = new THREE.Geometry();
											ge5.vertices = ch4.getPoints( 50 );

										var ma5= new THREE.LineBasicMaterial( { color : 'blue'} );

										 cO31 = new THREE.Line( ge5, ma5);
			
											PIEaddElement(cO31);	
											
									var ch4= new THREE.QuadraticBezierCurve3(
										new THREE.Vector3(6.6, -4.8, 0 ),
										new THREE.Vector3(6.9, -5.3, 0),
										new THREE.Vector3(7.2,-5.3,0)
										);
			
			
											var ge5 = new THREE.Geometry();
											ge5.vertices = ch4.getPoints( 50 );

										var ma5= new THREE.LineBasicMaterial( { color : 'blue'} );

										cO32= new THREE.Line( ge5, ma5);
			
											PIEaddElement(cO32);	
											
										
											
											var ch4= new THREE.QuadraticBezierCurve3(
										new THREE.Vector3(-7,10,0),
										new THREE.Vector3(-3,7,0),
										new THREE.Vector3(0,10,0)
										);  
 			                             /*var curve = new THREE.CubicBezierCurve3(
                                                   new THREE.Vector3( -7, 10, 0 ),
                                                   new THREE.Vector3( -3, 7,  0),
                                                   new THREE.Vector3( -3, 7, 0 ),
                                                   new THREE.Vector3( 0, 10, 0 )
                                                 );
                                       */
			
											//var ge5 = new THREE.TubeGeometry(curve, 1000, 0.1, 200, false);
										    var ge5 = new THREE.Geometry();
											ge5.vertices = ch4.getPoints( 50 );

											var ma5= new THREE.LineBasicMaterial( { color : 'blue'} );

										 cO35= new THREE.Line( ge5, ma5);
			
											PIEaddElement(cO35);	
											
											
									var ch4= new THREE.QuadraticBezierCurve3(
										new THREE.Vector3(0.5,10,0),
										new THREE.Vector3(2,7,2),
										new THREE.Vector3(3,9,0)
										);
			                              /* var curve = new THREE.CubicBezierCurve3(
                                                   new THREE.Vector3( 0.5, 10, 0 ),
                                                   new THREE.Vector3( 2, 7, 2),
                                                   new THREE.Vector3( 2, 7, 2),
                                                   new THREE.Vector3( 3, 9, 0)
                                                 );
                                       */
			
											var ge5 = new THREE.Geometry();
											ge5.vertices = ch4.getPoints( 50 );

										var ma5= new THREE.LineBasicMaterial( { color : 'blue'} );

										 cO36 = new THREE.Line( ge5, ma5);
			
											PIEaddElement(cO36);	
											
									var ch4= new THREE.QuadraticBezierCurve3(
										new THREE.Vector3(3,9,0),
										new THREE.Vector3(5,11,0),
										new THREE.Vector3(7.4,9.8,0)
										);
			                             /*var curve = new THREE.CubicBezierCurve3(
                                                   new THREE.Vector3( 3, 9, 0 ),
                                                   new THREE.Vector3( 5, 11, 0),
                                                   new THREE.Vector3( 5, 11, 0),
                                                   new THREE.Vector3( 7.4, 9.8, 0)
                                                 );
                                       */
			
											var ge5 = new THREE.Geometry();
											ge5.vertices = ch4.getPoints( 50 );

										var ma5= new THREE.LineBasicMaterial( { color : 'blue'} );

										 cO37 = new THREE.Line( ge5, ma5);
			
									PIEaddElement(cO37);
     		
  Observalue();  
  resetExperiment();
  //resetexp();
  document.getElementById("stop").addEventListener("click",setoff);
  document.getElementById("start").addEventListener("click",first);
  document.getElementById("reset").addEventListener("click",resetexp);
  
  document.getElementById(">>").addEventListener("click",speedUp);
  document.getElementById("<<").addEventListener("click",speedDown);
   PIEsetAreaOfInterest(mySceneTLX, mySceneTLY, mySceneBRX, mySceneBRY);
   PIErender();
	//Observalue();
}

function Observalue() {
	PIEcreateTable("Observation-Table", 5, 5, true);
    var headerRow=["  ","Anode","Cathode","ion(Deposit.)","rod(Dissolv.)"];
    PIEupdateTableRow(0, headerRow);
    PIEupdateTableCell(1, 0, "1");
    PIEupdateTableCell(2, 0, "2");
    PIEupdateTableCell(3, 0, "3");
    PIEupdateTableCell(4, 0, "4");
   	
    PIEsetCellInput(1, 1, "10", "");
    PIEsetCellInput(2, 1, "10", "");
    PIEsetCellInput(3, 1, "10", "");
    PIEsetCellInput(4, 1, "10", "");
    PIEsetCellInput(1, 2, "10", "");
    PIEsetCellInput(2, 2, "10", "");
    PIEsetCellInput(3, 2, "10", "");
    PIEsetCellInput(4, 2, "10", "");
	PIEsetCellInput(1,3, "10", "");
    PIEsetCellInput(2, 3, "10", "");
    PIEsetCellInput(3, 3, "10", "");
    PIEsetCellInput(4, 3, "10", "");
    PIEsetCellInput(1, 4, "10", "");
    PIEsetCellInput(2, 4, "10", "");
    PIEsetCellInput(3, 4, "10", "");
    PIEsetCellInput(4, 4, "10", "");
	
}
function resetexp(){
	PIEsetAreaOfInterest(mySceneTLX,mySceneTLY,mySceneBRX,mySceneBRY);
	PIEremoveElement(cathode);
	PIEremoveElement(anode);
	
	     a=0;  // handle cathode
	     b=0; //handle anode
	     x=0; //handle anode
	     w=0;  // handle electrolyte
		 processcomplete = 0;
		 electrolyte.material.color.setStyle("darkblue"); 
         bulb.material.color.setStyle("white");
	     cathode1.material.opacity = 0;
	     swtch.rotation.z = Math.PI / 4; 
	     oxygen.visible = false;
   		PIEremoveElement(gval);
    	
	
	    copperParticle[0].visible = false;
    	copperParticle[1].visible = false;
    	copperParticle[2].visible = false;
    	copperParticle[3].visible = false;
    	copperParticle[4].visible = false;
	    
    cO27.material.color.setStyle("blue");
    cO28.material.color.setStyle("blue");
	cO29.material.color.setStyle("blue");
	cO30.material.color.setStyle("blue");
	cO31.material.color.setStyle("blue");
	cO32.material.color.setStyle("blue");
	cO33.material.color.setStyle("blue");
	cO34.material.color.setStyle("blue");
	cO35.material.color.setStyle("blue");
	cO36.material.color.setStyle("blue");
	cO37.material.color.setStyle("blue");
	w1.material.color.setStyle("blue");
	w2.material.color.setStyle("blue");
	
	elecGeom = new THREE.CylinderGeometry(0.5, 0.5, 7, 32); //cathode anode geometry
    material = new THREE.MeshPhongMaterial({color: "red",transparent: false});
   
	cathode = new THREE.Mesh(elecGeom, material);
	cathode.position.set(7, -10, 0);
	PIEaddElement(cathode);// cathode
    m2 = new THREE.MeshPhongMaterial({color: "red",transparent: false});
    anode = new THREE.Mesh(elecGeom,m2); //anode
    anode.position.set(-7, -10, 0);
    PIEaddElement(anode);
	
	PIErender();

}
var scalar = 1.0;
function speedUp(){
	if (scalar < 4){
		scalar = scalar*2;
	}
}
function speedDown(){
	if (scalar>0.25){
		scalar = scalar/2;
	}
}			
var r = 0; 
function first(){ r=1; 
         oxygen.visible = true;
		 PIEstartAnimation();
		}
function setoff()
   { r=0; 
     //swtch.rotation.z = Math.PI/4;
     PIEresetExperiment();
  //resetexp();
	} 
	
function PIEmouseDown( event )
{
	var intersects;     // to hold return array of ray intersects   
    event.defaultPrevented = true;
    PIEselectedDrag = null;
	
	PIEmouseP.x = ( event.clientX / PIEcanvasW ) * 2 - 1;
    PIEmouseP.y = - ( event.clientY / PIEcanvasH ) * 2 + 1;

    PIEraycaster.setFromCamera(PIEmouseP, PIEcamera);
    intersects = PIEraycaster.intersectObjects(PIEdragElements);
    if (intersects.length > 0) {
        PIEselectedDrag = intersects[0].object;
        if (PIEraycaster.ray.intersectPlane(PIEdragPlane, PIEdragIntersect))
		{
            PIEdragOffset.copy(PIEdragIntersect).sub(PIEselectedDrag.position);
        }
        PIEscreenElem.style.cursor = 'move';
		PIEdefaultDragStart(PIEselectedDrag);
    }
    intersects = PIEraycaster.intersectObject(swtch);
    if (intersects.length > 0) {
    	if(r == 0){
    		document.getElementById("start").click();
    	   if(true){first();}
		          }
           else{ set();
		   document.getElementById("stop").click();
		    }
	}
    
    PIErender();
    }
	
function set(){
		r=0;
		swtch.rotation.z = Math.PI / 4;
	   }
	
function PIEmouseMove( event ){
	var intersects;     // to hold return array of ray intersects
	event.defaultPrevented = true;

    PIEmouseP.x = ( event.clientX / PIEcanvasW ) * 2 - 1;
    PIEmouseP.y = - ( event.clientY / PIEcanvasH ) * 2 + 1;

    /* Cast the ray to find intersecting objects */
    PIEraycaster.setFromCamera(PIEmouseP, PIEcamera);

    if (PIEselectedDrag != null)
    {   /* Drag the element */
       PIEraycaster.ray.intersectPlane(PIEdragPlane, PIEdragIntersect);
		PIEdefaultDrag(PIEselectedDrag, PIEdragIntersect.sub(PIEdragOffset)); 
    }
    else
    {   
    	intersects = PIEraycaster.intersectObjects(PIEdragElements);
        if (intersects.length > 0)
        {
            PIEdragPlane.setFromNormalAndCoplanarPoint(PIEcamera.getWorldDirection(PIEdragPlane.normal), intersects[0].object.position);
            if (PIEselectedHover != intersects[0].object)
            {
                PIEdefaultHoverOFF(PIEselectedHover);
                PIEselectedHover = intersects[0].object;
                PIEdefaultHoverON(PIEselectedHover);
            }
            PIEscreenElem.style.cursor = 'pointer';
        }
		else if (PIEselectedHover != null)
        {
            PIEdefaultHoverOFF(PIEselectedHover);
            PIEselectedHover = null;
            PIEscreenElem.style.cursor = 'auto';
        }
        else{

    		intersects = PIEraycaster.intersectObjects([swtch]);
    		if (intersects.length > 0) 
    		{
    	    	PIEscreenElem.style.cursor = 'pointer';
    		}
    		else{
    	    	PIEscreenElem.style.cursor = 'auto';
   		    }  	
         }
     }
  }
//reset

function resetExperiment() {
	
		copperParticle[0].visible = false;
    	copperParticle[1].visible = false;
    	copperParticle[2].visible = false;
    	copperParticle[3].visible = false;
    	copperParticle[4].visible = false;
	    oxygen.visible = false;
   		PIEremoveElement(gval);
	 if(r==0) { swtch.rotation.z = Math.PI/4;}
	 else {
	      swtch.rotation.z = 0; }
    	
    cO27.material.color.setStyle("blue");
    cO28.material.color.setStyle("blue");
	cO29.material.color.setStyle("blue");
	cO30.material.color.setStyle("blue");
	cO31.material.color.setStyle("blue");
	cO32.material.color.setStyle("blue");
	cO33.material.color.setStyle("blue");
	cO34.material.color.setStyle("blue");
	cO35.material.color.setStyle("blue");
	cO36.material.color.setStyle("blue");
	cO37.material.color.setStyle("blue");
	w1.material.color.setStyle("blue");
	w2.material.color.setStyle("blue");
	
	bulb.material.color.setStyle("white");
	
	 if(a == 0){cathode.material.color.setStyle("red");}
	else if(a == 1){cathode.material.color.setStyle("#2E0000");}
	else if(a == 2){cathode.material.color.setStyle("yellow");}
	else if(a == 3){cathode.material.color.setStyle("white");}
	else if(a == 4){cathode.material.color.setStyle("black");}
	//cathode.material.color.setStyle("red");
	
	if(b == 0){anode.material.color.setStyle("red");}
    else if(b == 1){anode.material.color.setStyle("#2E0000");}
	else if(b == 2){anode.material.color.setStyle("yellow");}
	else if(b == 3){anode.material.color.setStyle("white");}
	else if(b == 4){anode.material.color.setStyle("black");}
    
	 if(w == 1){
	   electrolyte.material.color.setStyle("white");
	  // w = 0;
       }
   else if(w == 2){
	electrolyte.material.color.setStyle("green");
       } 
   else if(w == 3){
	electrolyte.material.color.setStyle("light blue");
     }  
   else{
   electrolyte.material.color.setStyle("darkblue"); }

}

//Anode Copper && Cathode variable
var z;
function ACCV()
{ if(a == 0 && !processcomplete)
		{
	        z=0;
		    if(anode.scale.x>0 && anode.scale.z>0)
		    {  anode.scale.x -= 0.001;
		       anode.scale.z -= 0.001;  
			   cathode1.material.opacity += 0.005; }
		    /*if(cathode.scale.x<1.5 && cathode.scale.z<1.5)
			{  cathode.scale.x += 0.0005;
			   cathode.scale.z += 0.0005;  
			}*/
		    else
		    { w=3; 
		    processcomplete = 1; }
	        } 
   else if(a == 1 && !processcomplete)
	   {
	       z=0;
		   if(anode.scale.x>0 && anode.scale.z>0)
		   {  anode.scale.x -= 0.001;
		      anode.scale.z -= 0.001; 
			  cathode1.material.opacity += 0.005;}
		   /*if(cathode.scale.x<1.5 && cathode.scale.z<1.5)
			{  cathode.scale.x += 0.0005;
			   cathode.scale.z += 0.0005;  
			     
			  }*/
		  else
		   {  w=3;
			  processcomplete = 1;}
	    }
      else if(a == 2 && !processcomplete)
	  {
	       z=0;
		   if(anode.scale.x>0 && anode.scale.z>0)
		   {  anode.scale.x -= 0.001;
		      anode.scale.z -= 0.001;
              cathode1.material.opacity += 0.005;  }
		  /*if(cathode.scale.x<1.5 && cathode.scale.z<1.5)
			{  cathode.scale.x += 0.0005;
			   cathode.scale.z += 0.0005;  
			     
			  }*/
		  else
		   {   w=3;
			   processcomplete = 1;}
	  }
	  else if(a == 3 && !processcomplete)
	  {
	       z=0;
		   if(anode.scale.x>0 && anode.scale.z>0)
		   {  anode.scale.x -= 0.001;
		      anode.scale.z -= 0.001;
              cathode1.material.opacity += 0.005;  }
		  /*if(cathode.scale.x<1.5 && cathode.scale.z<1.5)
			{  cathode.scale.x += 0.0005;
			   cathode.scale.z += 0.0005;  
		    }*/
		else
		   {  w=3;
			  processcomplete = 1;}
	  }
	    else if(a == 4 && !processcomplete)
	  {
	       z=0;
		   if(anode.scale.x>0 && anode.scale.z>0)
		   {  anode.scale.x -= 0.001;
		      anode.scale.z -= 0.001; 
			  cathode1.material.opacity += 0.005; }
		   /*if(cathode.scale.x<1.5 && cathode.scale.z<1.5)
			{  cathode.scale.x += 0.0005;
			   cathode.scale.z += 0.0005;  
		    }*/
		   else
		   {  w=3;
			  processcomplete = 1;}
	  }
    
    if(processcomplete == 1)
     { //PIEresetExperiment();
        resetExperiment();
       		  }
   else{	
    cO27.material.color.setStyle("yellow");
    cO28.material.color.setStyle("yellow");
	cO29.material.color.setStyle("yellow");
	cO30.material.color.setStyle("yellow");
	cO31.material.color.setStyle("yellow");
	cO32.material.color.setStyle("yellow");
	cO33.material.color.setStyle("yellow");
	cO34.material.color.setStyle("yellow");
	cO35.material.color.setStyle("yellow");
	cO36.material.color.setStyle("yellow");
	cO37.material.color.setStyle("yellow");
     w1.material.color.setStyle("yellow");
     w2.material.color.setStyle("yellow");
	if(a == 0){cathode.material.color.setStyle("red");}
    else if(a == 1){cathode.material.color.setStyle("#2e0000"); 
                   //cathode1.material.color.setStyle("red");
					//cathode2.material.color.setStyle("red");
					}
	else if(a == 2){cathode.material.color.setStyle("yellow"); 
                    // cathode1.material.color.setStyle("red");
					 //cathode2.material.color.setStyle("red");
					 }
	else if(a == 3){ cathode.material.color.setStyle("white");
	                 //cathode1.material.color.setStyle("red");
                     //cathode2.material.color.setStyle("red");
					 }
	else if(a == 4){ cathode.material.color.setStyle("black");
	                 //cathode1.material.color.setStyle("red");
                     //cathode2.material.color.setStyle("red");
					 }
	
    if(z == 0){anode.material.color.setStyle("red");}
	
    swtch.rotation.z = 0;
    electrolyte.material.color.setStyle("#062e56");
    bulb.material.color.setStyle("yellow");
    }
}
var w = 0;
function AICV()
{ if(a == 0 && !processcomplete)
		{
	        z=0;
			if(anode.scale.x>0 && anode.scale.z>0)
		    {  anode.scale.x -= 0.001;
		       anode.scale.z -= 0.001;  }
		    if(cathode.scale.x<1.5)
			{  cathode.scale.x += 0.0005;
			   cathode.scale.z += 0.0005; 
			   }
		    else
		    {processcomplete = 1;}
	     } 
       else if(a == 1 && !processcomplete)
	   {
	       z=0;
		   if(anode.scale.x>0 && anode.scale.z>0)
		    {  anode.scale.x -= 0.0008;
		       anode.scale.z -= 0.0008;  
			   cathode1.material.opacity += 0.005;}
		   else
		   {processcomplete = 1;}
	    }
      else if(a == 2 && !processcomplete)
	  {
	       z=0;
		   if(anode.scale.x>0 && anode.scale.z>0)
		    {  anode.scale.x -= 0.0008;
		       anode.scale.z -= 0.0008;  
			   cathode1.material.opacity += 0.005; }
		   else
		   {processcomplete = 1;}
	  }
	  else if(a == 3 && !processcomplete)
	  {
	       z=0;
		   if(anode.scale.x>0 && anode.scale.z>0)
		    {  anode.scale.x -= 0.0008;
		       anode.scale.z -= 0.0008;  
			   cathode1.material.opacity += 0.005; }
		   else
		   {processcomplete = 1;}
	  }
	   else if(a == 4 && !processcomplete)
	  {
	       z=0;
		   if(anode.scale.x>0 && anode.scale.z>0)
		    {  anode.scale.x -= 0.0008;
		       anode.scale.z -= 0.0008;  
			   cathode1.material.opacity += 0.005;}
		   else
		   {processcomplete = 1;}
	  }
   
    if(processcomplete == 1)
     { //PIEresetExperiment();
        w=2;
        //electrolyte.material.color.setStyle("green");
       resetExperiment(); 
           }
   else{	
    cO27.material.color.setStyle("yellow");
    cO28.material.color.setStyle("yellow");
	cO29.material.color.setStyle("yellow");
	cO30.material.color.setStyle("yellow");
	cO31.material.color.setStyle("yellow");
	cO32.material.color.setStyle("yellow");
	cO33.material.color.setStyle("yellow");
	cO34.material.color.setStyle("yellow");
	cO35.material.color.setStyle("yellow");
	cO36.material.color.setStyle("yellow");
	cO37.material.color.setStyle("yellow");
	w1.material.color.setStyle("yellow");
     w2.material.color.setStyle("yellow");
	if(a == 0){cathode.material.color.setStyle("red");}
    else if(a == 1){cathode.material.color.setStyle("#2E0000");
	               // cathode1.material.color.setStyle("red");
					//cathode2.material.color.setStyle("red");
					}
	else if(a == 2){cathode.material.color.setStyle("yellow");
	                //cathode1.material.color.setStyle("red");
					//cathode2.material.color.setStyle("red");
					}
	else if(a == 3){cathode.material.color.setStyle("white");
	                //cathode1.material.color.setStyle("red");
					//cathode2.material.color.setStyle("red");
					}
	else if(a == 4){cathode.material.color.setStyle("black");
	                //cathode1.material.color.setStyle("red");
					//cathode2.material.color.setStyle("red");
					}
	
    if(z == 0){anode.material.color.setStyle("#2E0000");}
	
    swtch.rotation.z = 0;
    electrolyte.material.color.setStyle("#062e56");
    bulb.material.color.setStyle("yellow");
    }
}
function AGCV()
{ if(a == 0 && !processcomplete)
		{   z=0;
		    if(cathode1.material.opacity<2.25)
			{  cathode1.material.opacity += 0.005;
			   }
		    else
		    {processcomplete = 1;}
	     } 
       else if(a == 1 && !processcomplete)
	   {
	       z=0;
		   if(cathode1.material.opacity<2.25)
		   { cathode1.material.opacity += 0.005;
			 }
		   else
		   {processcomplete = 1;}
	    }
      else if(a == 2 && !processcomplete)
	  {    z=0;
		   if(cathode1.material.opacity<2.25)
		   {  cathode1.material.opacity += 0.005;
			  }
		   else
		   {processcomplete = 1;}
	  }
	  else if(a == 3 && !processcomplete)
	  {
	       z=0;
		   if(cathode1.material.opacity<2.25)
		   { cathode1.material.opacity += 0.005;
			  }
		   else
		   {processcomplete = 1;}
	  }
	   else if(a == 4 && !processcomplete)
	  {
	       z=0;
		   if(cathode1.material.opacity<2.25)
		   {  cathode1.material.opacity += 0.005;
			  }
		   else
		   {processcomplete = 1;}
	  }
	  
 if(processcomplete == 1)
     { //PIEresetExperiment();
        w=1;
        electrolyte.material.color.setStyle("white");
        resetExperiment();
          }
 else{	
    cO27.material.color.setStyle("yellow");
    cO28.material.color.setStyle("yellow");
	cO29.material.color.setStyle("yellow");
	cO30.material.color.setStyle("yellow");
	cO31.material.color.setStyle("yellow");
	cO32.material.color.setStyle("yellow");
	cO33.material.color.setStyle("yellow");
	cO34.material.color.setStyle("yellow");
	cO35.material.color.setStyle("yellow");
	cO36.material.color.setStyle("yellow");
	cO37.material.color.setStyle("yellow");
	w1.material.color.setStyle("yellow");
     w2.material.color.setStyle("yellow");
	if(a == 0){cathode.material.color.setStyle("red");}
    else if(a == 1){cathode.material.color.setStyle("#2E0000");
	                //cathode1.material.color.setStyle("red");
					//cathode2.material.color.setStyle("red");
					}
	else if(a == 2){cathode.material.color.setStyle("yellow");
	                //cathode1.material.color.setStyle("red");
					//cathode2.material.color.setStyle("red");
					}
	else if(a == 3){cathode.material.color.setStyle("white");
	                //cathode1.material.color.setStyle("red");
                    //cathode2.material.color.setStyle("red");
					}
	else if(a == 4){cathode.material.color.setStyle("black");
	               // cathode1.material.color.setStyle("red");
                    //cathode2.material.color.setStyle("red");
					}
	
    if(z == 0){anode.material.color.setStyle("yellow");}
	
    swtch.rotation.z = 0;
    electrolyte.material.color.setStyle("#062e56");
    bulb.material.color.setStyle("yellow");
    }
}
function AZCV()
{ if(a == 0 && !processcomplete)
		{  z=0;
		    if(anode.scale.x>0 && anode.scale.z>0)
		    {  anode.scale.x -= 0.001;
		       anode.scale.z -= 0.001;  
			   cathode1.material.opacity += 0.005; }
		    else
		    {processcomplete = 1;}
	     } 
       else if(a == 1 && !processcomplete)
	   {
	       z=0;
		   if(anode.scale.x>0 && anode.scale.z>0)
		    {  anode.scale.x -= 0.0008;
		       anode.scale.z -= 0.0008;  
			   cathode1.material.opacity += 0.005; }
		   else
		   {processcomplete = 1;}
	    }
      else if(a == 2 && !processcomplete)
	  {
	       z=0;
		   if(anode.scale.x>0 && anode.scale.z>0)
		    {  anode.scale.x -= 0.0008;
		       anode.scale.z -= 0.0008;  
			   cathode1.material.opacity += 0.005; }
		   
		   else
		   {processcomplete = 1;}
	  }
	  else if(a == 3 && !processcomplete)
	  {
	       z=0;
		   if(anode.scale.x>0 && anode.scale.z>0)
		    {  anode.scale.x -= 0.0008;
		       anode.scale.z -= 0.0008; 
               cathode1.material.opacity += 0.005;  }
		   
		   else
		   {processcomplete = 1;}
	  }
	  else if(a == 4 && !processcomplete)
	  {
	       z=0;
		   if(anode.scale.x>0 && anode.scale.z>0)
		    {  anode.scale.x -= 0.0008;
		       anode.scale.z -= 0.0008;  
			   cathode1.material.opacity += 0.005; }
		   else
		   {processcomplete = 1;}
	  }
	  
if(processcomplete == 1)
     { //PIEresetExperiment();
          w=1;
		  electrolyte.material.color.setStyle("white");
          resetExperiment();  
           }
   else{	
    cO27.material.color.setStyle("yellow");
    cO28.material.color.setStyle("yellow");
	cO29.material.color.setStyle("yellow");
	cO30.material.color.setStyle("yellow");
	cO31.material.color.setStyle("yellow");
	cO32.material.color.setStyle("yellow");
	cO33.material.color.setStyle("yellow");
	cO34.material.color.setStyle("yellow");
	cO35.material.color.setStyle("yellow");
	cO36.material.color.setStyle("yellow");
	cO37.material.color.setStyle("yellow");
	w1.material.color.setStyle("yellow");
     w2.material.color.setStyle("yellow");
	if(a == 0){cathode.material.color.setStyle("red");}
    else if(a == 1){cathode.material.color.setStyle("#2E0000");
	                 //cathode1.material.color.setStyle("red");
					 //cathode2.material.color.setStyle("red");
					 }
	else if(a == 2){cathode.material.color.setStyle("yellow");
	                  //cathode1.material.color.setStyle("red");
					  //cathode2.material.color.setStyle("red");
					  }
	else if(a == 3){cathode.material.color.setStyle("white");
	                  //cathode1.material.color.setStyle("red");
					  //cathode2.material.color.setStyle("red");
					  }
	else if(a == 4){cathode.material.color.setStyle("black");
	                 // cathode1.material.color.setStyle("red");
					  //cathode2.material.color.setStyle("red");
					  }
	
    if(z == 0){anode.material.color.setStyle("white");}
	
    swtch.rotation.z = 0;
    electrolyte.material.color.setStyle("#062e56");
    bulb.material.color.setStyle("yellow");
    }
}
function ACaCV()
{ if(a == 0 && !processcomplete)
		{   z=0;
		    if(cathode.scale.x<1.5)
			{  cathode.scale.x += 0.0005;
		       cathode.scale.z += 0.0005; 
			   }
		    else
		    {processcomplete = 1;}
	     } 
       else if(a == 1 && !processcomplete)
	   {
	       z=0;
		   if(cathode1.material.opacity<2.25)
		   {  cathode1.material.opacity += 0.005;
			 }
		   else
		   {processcomplete = 1;}
	    }
      else if(a == 2 && !processcomplete)
	  {    z=0;
		   if(cathode1.material.opacity<2.25)
		   {  cathode1.material.opacity += 0.005;
			  }
		   else
		   {processcomplete = 1;}
	  }
	  else if(a == 3 && !processcomplete)
	  {
	       z=0;
		   if(cathode1.material.opacity<2.25)
		   {  cathode1.material.opacity += 0.005;
			  }
		   else
		   {processcomplete = 1;}
	  }
	   else if(a == 4 && !processcomplete)
	  {
	       z=0;
		   if(cathode1.material.opacity<2.25)
		   {  cathode1.material.opacity += 0.005;
			  }
		   else
		   {processcomplete = 1;}
	  }
	  
 if(processcomplete == 1)
     { //PIEresetExperiment();
         w=1;
         electrolyte.material.color.setStyle("white");
         resetExperiment();
          }
 else{	
    cO27.material.color.setStyle("yellow");
    cO28.material.color.setStyle("yellow");
	cO29.material.color.setStyle("yellow");
	cO30.material.color.setStyle("yellow");
	cO31.material.color.setStyle("yellow");
	cO32.material.color.setStyle("yellow");
	cO33.material.color.setStyle("yellow");
	cO34.material.color.setStyle("yellow");
	cO35.material.color.setStyle("yellow");
	cO36.material.color.setStyle("yellow");
	cO37.material.color.setStyle("yellow");
	w1.material.color.setStyle("yellow");
     w2.material.color.setStyle("yellow");
	if(a == 0){cathode.material.color.setStyle("red");}
    else if(a == 1){cathode.material.color.setStyle("#2E0000");
	               // cathode1.material.color.setStyle("red");
					//cathode2.material.color.setStyle("red");
					}
	else if(a == 2){cathode.material.color.setStyle("yellow");
	                //cathode1.material.color.setStyle("red");
					//cathode2.material.color.setStyle("red");
					}
	else if(a == 3){cathode.material.color.setStyle("white");
	                //cathode1.material.color.setStyle("red");
                    //cathode2.material.color.setStyle("red");
					}
	else if(a == 4){cathode.material.color.setStyle("black");
	                //cathode1.material.color.setStyle("red");
                    //cathode2.material.color.setStyle("red");
					}
	
    if(z == 0){anode.material.color.setStyle("black");}
	
    swtch.rotation.z = 0;
    electrolyte.material.color.setStyle("#062e56");
    bulb.material.color.setStyle("yellow");
    }
}

// imp. function 3
function updateExperimentElements(t, dt) 
{   /* cathode variable size */
    //PIErenderer.setSize(window.innerWidth, window.innerHeight-a);
    
  if(r == 1){
	oxygen.visible = true;
	PIEaddElement(gval); //cu+2
   }
  else{
  oxygen.visible = false;}
  if(r == 1 && x == 0)
   { ACCV();}
  else if(r == 1 && x == 1)
   { AICV();}
  else if(r == 1 && x == 2)
   {  AGCV();}
  else if(r == 1 && x == 3)
   { AZCV();}	
 else if(r == 1 && x == 4)
   { ACaCV(); }	

  else{
	cO27.material.color.setStyle("blue");
    cO28.material.color.setStyle("blue");
	cO29.material.color.setStyle("blue");
	cO30.material.color.setStyle("blue");
	cO31.material.color.setStyle("blue");
	cO32.material.color.setStyle("blue");
	cO33.material.color.setStyle("blue");
	cO34.material.color.setStyle("blue");
	cO35.material.color.setStyle("blue");
	cO36.material.color.setStyle("blue");
	cO37.material.color.setStyle("blue");
	w1.material.color.setStyle("blue");
     w2.material.color.setStyle("blue");
    cathode.material.color.setStyle("red");
    anode.material.color.setStyle("red");
    swtch.rotation.z = Math.PI / 4;
    electrolyte.material.color.setStyle("darkblue");
    bulb.material.color.setStyle("white");
	//processcomplete=0;
}

if(r == 1 && !processcomplete){ 

	    copperParticle[0].visible = true;
    	copperParticle[1].visible = true;
    	copperParticle[2].visible = true;
    	copperParticle[3].visible = true;
    	copperParticle[4].visible = true;
    	
    	if(copperParticle[0].position.x < 5)
    		copperParticle[0].position.x += 0.05;
    	else
    		copperParticle[0].position.x = -3;
    
    	if(copperParticle[1].position.x < 5)
    		copperParticle[1].position.x += 0.1;
    	else
    		copperParticle[1].position.x = -3.5;

    	if(copperParticle[2].position.x < 5)
    		copperParticle[2].position.x += 0.12;
    	else
    		copperParticle[2].position.x = -3;

    	if(copperParticle[3].position.x < 5)
    		copperParticle[3].position.x += 0.025;
    	else
    		copperParticle[3].position.x = -3.8;

    	if(copperParticle[4].position.x < 5)
    		copperParticle[4].position.x += 0.15;
    	else
    		copperParticle[4].position.x = -1.5;

    }
 
   }