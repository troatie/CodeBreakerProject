let answer = document.getElementById('answer');
let attempt = document.getElementById('attempt');

function guess() {
    let input = document.getElementById('user-guess');
    //add functionality to guess function here

    if (answer.value == '' || attempt.value == '') {
        setHiddenFields();
    }

    if (validateInput(input.value)) {
        attempt.value++;
    } else {
        return false;
    }

    if (getResults(input.value)) {
        setMessage('You Win! :)');
        showAnswer(true);
        showReplay();
    } else {
        if (attempt.value >= 10) {
            setMessage('You Lose! :(');
            showAnswer(false);
            showReplay();
        } else {
            setMessage('Incorrect, try again.');
        }
    }
}

//implement new functions here
function setHiddenFields() {
    answer.value = Math.floor(10000 * Math.random()).toString();
    while (answer.value.length < 4) {
        answer.value = '0' + answer.value;
    }

    attempt.value = 0;
}

function setMessage(message) {
    document.getElementById('message').innerHTML = message;
}

function validateInput(input) {
    if (input.length == 4) {
        return true;
    } else {
        setMessage('Guesses must be exactly 4 characters long.');
        return false;
    }
}

function getResults(input) {
    var numCorrect = 0;
    var message = '<div class="row"><span class="col-md-6">'
        + input
        + '</span><div class="col-md-6">';

    for (var i = 0; i < input.length; i++) {
        if (answer.value.charAt(i) == input.charAt(i)) {
            message += '<span class="glyphicon glyphicon-ok"></span>';
            numCorrect++;
        } else if (answer.value.indexOf(input.charAt(i)) === -1) {
            message += '<span class="glyphicon glyphicon-remove"></span>';
        } else {
            message += '<span class="glyphicon glyphicon-transfer"></span>';
        }
    }

    message += '</div></div>';
    var results = document.getElementById('results');
    results.innerHTML = results.innerHTML + message;

    return (numCorrect == answer.value.length);
}

function showAnswer(hasWon) {
    var code = document.getElementById('code');
    code.innerHTML = answer.value;
    if (hasWon) {
        code.className += ' success';
    } else {
        code.className += ' failure';
    }
}

function showReplay() {
    document.getElementById('guessing-div').style.display = 'none';
    document.getElementById('replay-div').style.display = 'block';
}
