img = "";
status = "";
objects = "";

function preload() {
    img=loadImage("https://www.shutterstock.com/image-photo/aesthetic-composition-living-room-interior-600nw-2246333885.jpg") ;
}

function setup(){
    canvas = createCanvas(640, 420);
    canvas.center();
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status: Detecting Objects";

}

function modelLoaded() {
    console.log("Model Loaded!");
    status = true;
    objectDetector.detect(img, gotResults);
}

function gotResults(error, results){
    if (error){
        console.log(error);
    }
    console.log(results);
    objects = results;
}

function draw() {
    image(img, 0, 0, 640, 420);
     
     if( status !="")
    {
        for(i = 0; i < objects.length; i++)
        {
             document.getElementById("status").innerHTML = "Status: Object Detected";

             fill("#1338BE");
             percent = floor(objects[i].confidence * 100);
             text(objects[i].label + " " + percent + "%", objects[i].x, objects[i].y);
             noFill()
             stroke("#1338BE");
             rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        }
    }
}