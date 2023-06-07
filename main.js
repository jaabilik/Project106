function startClassification() {
    navigator.mediaDevices.getUserMedia({ audio: true});
    classifier = ml5.soundClassifier('https://teachablemachine.withgoogle.com/models/-DQRLmBSL/model.json', modelReady);
    console.log('ml5 loaded!! youre 0.02% more likely to not fail :D | ml5 version - ', ml5.version);
}

function modelReady(){
    classifier.classify(gotResults);
}

function gotResults(error, results) {
    if (error) {
        console.error(error);
        console.log("congrats, you're part of the 99.99% who failed :'( ")
    } else {
        console.log("you didnt fail, congrats? - ",results);
        number_r = Math.floor(Math.random() * 255) + 1;
        number_g = Math.floor(Math.random() * 255) + 1;
        number_b = Math.floor(Math.random() * 255) + 1;

        document.getElementById("result_label").innerHTML = 'I can hear - '+results[0].label;
        document.getElementById("result_confidence").innerHTML = 'Accuracy - '+(results[0].confidence*100).toFixed(2)+"%";
        document.getElementById("result_label").style.color = "rgb("+number_r+","+number_g+","+number_b+")";
        document.getElementById("result_confidence").style.color = "rgb("+number_r+","+number_g+","+number_b+")";

        img = document.getElementById('animal');

        if (results[0].label == "Meowing") {
            img.src = 'cat.jpg';
        } else if (results[0].label == "Woofing") {
            img.src = 'dog.jpg';
        } else if (results[0].label == "Mooing") {
            img.src = 'cow.jpg';
        } else if (results[0].label == "Roaring") {
            img.src = 'lion.jpg';
        } else if (results[0].label == "Background Noise") {
            img.src = 'bgnoise.jpg';
        } else {
            img.src = 'https://i.pinimg.com/474x/82/ec/e0/82ece0cf75903092fd8459fa9684ac52.jp';
        }
    }
}