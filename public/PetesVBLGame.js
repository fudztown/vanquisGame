/*!
 *  Pete's Vanquis Bank Game v0.2
 *  This is free to use and update as you wish, not licensed
 *  Just a bit of fun!
 *
 */
const myTargets = [];
let myScore;
//target is selected
let targetSelected = true;
let selectedTarget = -1;

//background and stall front images
const mainBackgoundImg = "https://firebasestorage.googleapis.com/v0/b/vanquisgame.appspot.com/o/mainCanvasBackground.png?alt=media&token=ecef3fac-ab06-4375-80f0-e3d4d3b9ff68";
const stallBottom = "https://firebasestorage.googleapis.com/v0/b/vanquisgame.appspot.com/o/stallBottom.png?alt=media&token=f0e58bad-6520-44c3-a410-645fa4f34ac9";

//target images
const targetImg0 = "https://firebasestorage.googleapis.com/v0/b/vanquisgame.appspot.com/o/target1.png?alt=media&token=396992c3-5dbb-4655-b53e-18f974669891";
const targetImg1 = "https://firebasestorage.googleapis.com/v0/b/vanquisgame.appspot.com/o/target2.png?alt=media&token=2dc6ee00-6c33-4175-aefa-780a45397206";
const targetImg2 = "https://firebasestorage.googleapis.com/v0/b/vanquisgame.appspot.com/o/target3.png?alt=media&token=85448202-89f9-43ca-a13b-0a52cce7a207";
const targetImg3 = "https://firebasestorage.googleapis.com/v0/b/vanquisgame.appspot.com/o/target4.png?alt=media&token=efd010c3-01bf-474a-b2d4-33af69be5692";
const targetImg4 = "https://firebasestorage.googleapis.com/v0/b/vanquisgame.appspot.com/o/target5.png?alt=media&token=f2b96a09-4354-4df1-a9f8-1c2e479bdcf5";
const targetImg5 = "https://firebasestorage.googleapis.com/v0/b/vanquisgame.appspot.com/o/target6.png?alt=media&token=cb792400-876b-4b17-8840-df563c6cc472";

//Start button images
const startImg0 = "https://firebasestorage.googleapis.com/v0/b/vanquisgame.appspot.com/o/playbutton_green.png?alt=media&token=d8519cf6-6302-4a66-8dc3-ff5dace226eb";

//TODO: add mouse over colour change
//const startImg1 = "https://firebasestorage.googleapis.com/v0/b/vanquisgame.appspot.com/o/playbutton_red.png?alt=media&token=10f8cf86-318e-40bf-a148-dbd7e5b7e2f6";

//small and large sign target position when coming up
const targetOddY = 180;
const targetEventY = 255;
let interval;
//Sign in details
let email;
let password;

//Components
let gameStalls;
let myRemainingQs;
let questions;
let loggedInUser;
let startButton;
//Background img object
let img = new Image();


function startGame() {

    //Add the Targets
    myTargets.push(new Component(70, 75, targetImg0, 65, 330, "image", "target0"));
    myTargets.push(new Component(70, 150, targetImg1, 105, 330, "image", "target1"));
    myTargets.push(new Component(70, 75, targetImg2, 150, 330, "image", "target2"));
    myTargets.push(new Component(70, 150, targetImg3, 195, 330, "image", "target3"));
    myTargets.push(new Component(70, 75, targetImg4, 240, 330, "image", "target4"));
    myTargets.push(new Component(70, 150, targetImg5, 285, 330, "image", "target5"));

    //Start Button
    startButton = new Component(320, 250, startImg0, 30, 30, "image");

    //Set Stall image
    gameStalls = new Component(325, 140, stallBottom, 45, 330, "image");

    //score
    myScore = new Component("20px", "Consolas", "white", 440, 416, "text");

    //Questions remaining
    myRemainingQs = new Component("10px", "Consolas", "black", 340, 30, "text");
    questions = 6;

    //user
    loggedInUser = new Component("10px", "Consolas", "black", 30, 30, "text");

    //Get login areas and hide them
    const loginArea = document.getElementById("loginArea");
    loginArea.style.display = "none";
    const emailVerify = document.getElementById("emailVerify");
    emailVerify.style.display = "none";
    const signup = document.getElementById("signup");
    signup.style.display = "none";

    firebase.auth().onAuthStateChanged(function (user) {

        if (user) {
            //remove login things.
            loginArea.style.display = "none";
            emailVerify.style.display = "none";
            signup.style.display = "none";
            // User is signed in.
            email = user.email;
            let emailVerified = user.emailVerified;
            if (emailVerified) {
                myGameArea.readySet();
            } else {
                alert("Sorry, you need to verify your email to play this game. Please check your inbox.");
                emailVerify.style.display = "block";
            }
        } else {
            //Please log in
            myGameArea.loginEmail();
            loginArea.style.display = "block";
        }

    });

}


/**
 * Used to manage the different states the game can be in
 * @type {{
 * loginEmail: myGameArea.loginEmail,
 * canvas: HTMLCanvasElement,
 * readySet: myGameArea.readySet,
 * loginPassword: myGameArea.loginPassword,
 * start: myGameArea.start,
 * clear: myGameArea.clear}}
 */

let myGameArea = {
    canvas: document.createElement("canvas"),
    loginEmail: function () {
        let canv = document.getElementById("usernamecanvas");
        canv.style.display = "block";
        let input = new CanvasInput({
            canvas: document.getElementById("usernamecanvas"),
            fontSize: 18,
            fontFamily: 'Arial',
            fontColor: '#212121',
            fontWeight: 'bold',
            width: 300,
            padding: 8,
            borderWidth: 1,
            borderColor: '#000',
            borderRadius: 3,
            boxShadow: '1px 1px 0px #fff',
            innerShadow: '0px 0px 5px rgba(0, 0, 0, 0.5)',
            placeHolder: 'Please enter your email...',
            onsubmit: function () {
                var canv = document.getElementById("usernamecanvas")
                this.context = canv.getContext("2d");
                this.context.clearRect(0, 0, 350, 100);
                canv.style.display = "none";
                email = input.value();
                myGameArea.loginPassword();
            }

        });
    },
    loginPassword: function () {
        let canv = document.getElementById("passwordcanvas");
        canv.style.display = "block";
        let input2 = new CanvasInput({
            canvas: document.getElementById("passwordcanvas"),
            fontSize: 18,
            fontFamily: 'Arial',
            fontColor: '#212121',
            fontWeight: 'bold',
            width: 300,
            padding: 8,
            borderWidth: 1,
            borderColor: '#000',
            borderRadius: 3,
            boxShadow: '1px 1px 0px #fff',
            innerShadow: '0px 0px 5px rgba(0, 0, 0, 0.5)',
            placeHolder: 'Enter your password...',
            type: 'password',
            onsubmit: function () {
                password = input2.value();
                if (toggleSignIn()) {
                    var canv = document.getElementById("loginArea")
                    canv.style.display = "none";
                    myGameArea.readySet();
                } else {
                    alert("Sign in failed.");
                    myGameArea.loginEmail();
                }
            }
        });
    },
    //Go/Retry maybe a count down then start
    readySet: function () {
        //Background
        img.src = mainBackgoundImg
        this.canvas.width = 588;
        this.canvas.height = 431;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        startButton.update();
        this.context.drawImage(img, 10, 10);
        //Big button

        let elemLeft = this.canvas.offsetLeft + this.canvas.clientLeft,
            elemTop = this.canvas.offsetTop + this.canvas.clientTop;
        this.canvas.addEventListener('click', function (event) {
            let x = event.pageX - elemLeft,
                y = event.pageY - elemTop;
            //alert('Click recorded ' + x + ' ' + y + 'target 0 Top '+ myTargets[0].y);
            if (y > startButton.y && y < startButton.y + startButton.height
                && x > startButton.x && x < startButton.x + startButton.width) {
                myGameArea.start();
                let canv = document.getElementById("passwordcanvas");
                canv.removeEventListener('click', function(event){},false);            }
        }, false);
    },
    start: function () {
        //img = new Image();
        //img.src = mainBackgoundImg
        this.canvas.width = 588;
        this.canvas.height = 431;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        if (this.frameNo === null || this.frameNo === 0) {
            this.frameNo = 0;
        }

        //Random Target!
        this.min = Math.ceil(0);
        this.max = Math.floor(myTargets.length - 1);
        selectedTarget = Math.floor(Math.random() * (this.max - this.min + 1)) + this.min;
        if (targetSelected === false) {
            targetSelected = true
        }

        interval = setInterval(updateGameArea, 10);

        this.context.drawImage(img, 10, 10);


        //Add listener for target click
        let elemLeft = this.canvas.offsetLeft + this.canvas.clientLeft,
            elemTop = this.canvas.offsetTop + this.canvas.clientTop;
        // Add event listener for `click` events.
        this.canvas.addEventListener('click', function (event) {
            let x = event.pageX - elemLeft,
                y = event.pageY - elemTop;
            //alert('Click recorded ' + x + ' ' + y + 'target 0 Top '+ myTargets[0].y);
            if (y > myTargets[selectedTarget].y && y < myTargets[selectedTarget].y + myTargets[selectedTarget].height
                && x > myTargets[selectedTarget].x && x < myTargets[selectedTarget].x + myTargets[selectedTarget].width) {
                targetSelected = false
            }
        }, false);
    },
    clear: function () {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        //img = new Image();
        img.src = mainBackgoundImg
        this.context.drawImage(img, 10, 10);
    }
}


/**
 * Key class for creating items on the canvas
 * @param width
 * @param height
 * @param color
 * @param x
 * @param y
 * @param type
 * @constructor
 */
function Component(width, height, color, x, y, type) {
    this.type = type;
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
    this.update = function () {
        let ctx = myGameArea.context;
        if (this.type === "text") {
            ctx.font = this.width + " " + this.height;
            ctx.fillStyle = color;
            ctx.fillText(this.text, this.x, this.y);
        } else if (type === "image") {
            this.image = new Image();
            this.image.src = color;
            ctx.drawImage(this.image,
                this.x,
                this.y,
                this.width, this.height);
        } else {
            ctx.fillStyle = color;
            ctx.fillRect(this.x, this.y, this.width, this.height);
        }
    }
}

/**
 * Called to change items on the canvas
 */
function updateGameArea() {
    console.log("random element = " + selectedTarget)

    myGameArea.clear();
    if (selectedTarget % 2 > 0) {
        if (myTargets[selectedTarget].y > targetOddY) {
            myTargets[selectedTarget].y += -1;
        }
    } else {
        if (myTargets[selectedTarget].y > targetEventY) {
            myTargets[selectedTarget].y += -1;
        }
    }
    myTargets[selectedTarget].update();
    myGameArea.frameNo += 1;
    myScore.text = "Time: " + (myGameArea.frameNo / 100);
    myScore.update();

    myRemainingQs.text = "Questions remaining:" + questions;
    myRemainingQs.update();

    loggedInUser.text = "Hello, " + email;
    loggedInUser.update();

    gameStalls.update();
    if (questions <= 0) {
        myGameArea.clear();
        myRemainingQs.text = "Finished!";
        myRemainingQs.update();
        gameStalls.update();
        loggedInUser.update();
        clearInterval(interval);
        return;
    }

    if (targetSelected === false) {
        console.log("target hit, ending..")
        myGameArea.clear();
        myTargets[selectedTarget].y = 330;
        myTargets[selectedTarget].update();
        gameStalls.update();
        clearInterval(interval);
        myGameArea.start();
        questions--;
    }

}

/**
 * START USER MANAGEMENT CODE
 */


/**
 * Handles UI changes for showing registration page
 */
function register() {
    let loginArea = document.getElementById("loginArea")
    loginArea.style.display = "none";
    let emailVerify = document.getElementById("emailVerify")
    emailVerify.style.display = "none";
    let signup = document.getElementById("signup")
    signup.style.display = "block";
}

/**
 * Handles the sign up button press.
 */
function handleSignUp() {
    email = document.getElementById("inp_email").value;
    password = document.getElementById("inp_pw").value;
    if (email.length < 4) {
        alert('Please enter a valid email address.: ' + email);
        return false;
    }
    if (/@gmail.com\s*$/.test(email)) {
        //is Vanquis email
    } else {
        alert("Please enter a Vanquis Bank email account");
        return false;
    }
    if (password.length < 4) {
        alert('Please enter a password.');
        return false;
    }
    // Create user with email and pass.
    // [START createwithemail]
    firebase.auth().createUserWithEmailAndPassword(email, password).catch(function (error) {
        // Handle Errors here.
        let errorCode = error.code;
        //var errorMessage = error.message;
        // [START_EXCLUDE]
        if (errorCode === 'auth/weak-password') {
            alert('The password is too weak.');
            return false;
        } else {
//          alert(errorMessage);
//          return false;
        }
        console.log(error);
        // [END_EXCLUDE]
    });
    // [END
    sendEmailVerification();
    startGame();
    return true;
}

/**
 * Handles the sign in button press.
 */
function toggleSignIn() {
    if (firebase.auth().currentUser) {
        // [START signout]
        firebase.auth().signOut();
        return false;
    } else {
        if (email.length < 4) {
            alert('Please enter an email address.');
            return false;
        }
        if (password.length < 4) {
            alert('Please enter a password.');
            return false;
        }
        // Sign in with email and pass.
        // [START authwithemail]
        firebase.auth().signInWithEmailAndPassword(email, password).catch(function (error) {
            // Handle Errors here.
            let errorCode = error.code;
            // [START_EXCLUDE]
            if (errorCode === 'auth/wrong-password') {
                alert('Wrong password.');
                return false;
            } else {
//            alert(errorMessage);
                return false;
            }
            //console.log(error);
            //return false;
            // [END_EXCLUDE]
        });
        // [END authwithemail]
    }
    if (firebase.auth().currentUser) {
        alert("Login Successful!");
        return true;
    }
    alert("Login Failed");
    return false;
}

/**
 * Sends an email verification to the user.
 */
function sendEmailVerification() {
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            user.sendEmailVerification().then(function () {
                alert('Email Verification Sent!');
            }, function (error) {
                alert('There was an error');
                console.log(error);
            });

        }
    });
    // [END sendemailverification]
}

function sendPasswordReset() {
    // [START sendpasswordemail]
    if (email === null) {
        alert('Please enter an email address');
        return;
    }
    firebase.auth().sendPasswordResetEmail(email).then(function () {
        // Password Reset Email Sent!
        // [START_EXCLUDE]
        alert('Password Reset Email Sent!');
        // [END_EXCLUDE]
    }).catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // [START_EXCLUDE]
        if (errorCode === 'auth/invalid-email') {
            alert(errorMessage);
        } else if (errorCode === 'auth/user-not-found') {
            alert(errorMessage);
        }
        console.log(error);
        // [END_EXCLUDE]
    });
    // [END sendpasswordemail];
}
/**
 * END USER MANAGEMENT CODE
 */
