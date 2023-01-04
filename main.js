objects = [];
video = "";
status = "";

function preload()
{
    video = createCapture(VIDEO);
    video.hide();
}

function setup()
{
    canvas = createCanvas(480, 380);
    canvas.center();
}

function start()
{
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status : Detecting Objects";
}

function draw()
{
    image(video, 0, 0, 480, 380);
    if(status != "")
    {
        objectDetector.detect(video, gotResult);

        for(i = 0; i < objects.length; i++)
        {
            document.getElementById("status").innerHTML = "Status : Object Detected";

            fill("#FF0000");
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15);
            noFill();
            stroke("#FF0000");
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);

            if(objects[i].label == object)
            {
                video.stop();
                objectDetector.detect(gotResult);
                document.getElementById("object_find").innerHTML = input + " found ";
            }
            else
            {
                document.getElementById("object_find").innerHTML = input + " not found ";
            }
        }
    }
}

function modelLoaded()
{
    console.log("Model Loaded!");
    status = true;
}

function gotResult(error, results)
{
    if(error)
    {
        console.log(error);
    }

    console.log(results);
    objects = results;
}

function start()
{
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status : Detecting Objects";
    input = document.getElementById("object").value;
}

