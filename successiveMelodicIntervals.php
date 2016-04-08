<?php
$thisPage = 'Successive Melodic Intervals';
// header("Location: successiveMelodicIntervals.php", true, 303);
?>

<?php require_once('phpincludes/header.php'); ?>

<body>
<br></br>
<script src = "scripts/MusicManip.js"> </script>
<script src = "scripts/MusicSnippet.js"> </script>
<script src = "howler/howler.js"> </script>
<script src = "scripts/Note.js"> </script>
<script src = "scripts/noteToFileNum.js"> </script>
<script src = "scripts/SuccessiveMelodicIntervals.js"> </script>
<script src = "scripts/ValidateSMI.js"> </script>
<script src="//cdnjs.cloudflare.com/ajax/libs/seedrandom/2.4.0/seedrandom.min.js"></script>

<script>
  var smi = new SuccessiveMelodicIntervals();
  var answers = smi.getAnswers();
  // document.write(answers);
  var snippet = new MusicSnippet(smi.getNotes());
  snippet.generate();
  var bpm = 80;
  snippet.setBPM(bpm);
  var inst = "Indentify the interval between consecutive note. Select your answers from the drop down menus."

</script>
<div id ="smi">
  <div id="instructions" class="">
    <script>
      document.write(inst);
    </script>
  </div>

  <button id="playbtn" class="button" onclick="play()" style="display:block;">Play</button>
  <button id="stopbtn" class="button" onclick="stop()" style="display:none;">Stop</button>

  <div id="alert" class="">
  </div>

  <div id="intervals" method="">
    <script>
    var intervals = ["--", "m2", "M2", "m3", "M3", "P4", "tritone", "P5", "m6", "M6", "m7", "M7"];
    for (var i = 0; i < answers.length; i++) {
      document.write("<select id=\"" + i + "\">");
      for (var j = 0; j < intervals.length; j++) {
        document.write("<option value=\"" + intervals[j] + "\">" + intervals[j] + "</option>");
      }
      document.write("</select>");
    }
    </script>
    <br></br>

    <span id="answers"> </span>
    <br></br>
    <button id="checkanswers" class="button" onclick="return checkAnswers()">Check Answers</button>
    <button id="nextquestion" class="button" style="display:none;" onclick="return nextQuestion()">Next Question</button>

</div>

</div>
</body>

<script type="text/javascript">

  function play() {
    snippet.play();
		document.getElementById("playbtn").style.display = "none";
		document.getElementById("stopbtn").style.display = "block";
  }

  function stop() {
    snippet.fadeOut();
		document.getElementById("stopbtn").disabled = true;
		setTimeout(function() { // delay the return of the play button until sound has faded
			document.getElementById("playbtn").style.display = "block";
			document.getElementById("stopbtn").style.display = "none";
			document.getElementById("stopbtn").disabled = false;
		}, 101);
  }

  function checkAnswers() {
    var userAnswers = [];
    // Make sure the user has selected answers.
    for (var i = 0; i < answers.length; i++) {
      userAnswers.push(document.getElementById(i).value);
      if (userAnswers[i] == "--") {
        document.getElementById("instructions").innerHTML = "Please select your answers from the drop down menus!";
        return false;
      }
    }

    var result = [];

    for (var i = 0; i < answers.length; i++) {
      if (userAnswers[i] == answers[i]) {
        result.push(true);
      } else {
        result.push(false);
      }
    }

    // document.getElementById("asdf").disabled = true;
    var resultstring = "<ul list-style=none>";
    for (var i = 0; i < result.length; i++) {
      // resultstring += "<span style=\"color:#";
      resultstring += "<li position=relative style=\"color:#";


      if (result[i]) {
        // Checkmark character
        resultstring += "00b300\">&#10003";
      } else {
        // "Ballot x" character
        // resultstring += "FF0000\">&#10007";
        resultstring += "FF0000\">" + answers[i];
      }
      // if (i > result.length-1) {
      //   resultstring += "&nbsp";
      // }
      resultstring += "</li>";

    }
    resultstring += "</ul>";
    document.getElementById("answers").innerHTML = resultstring;
    document.getElementById("checkanswers").style.display = "none";
    document.getElementById("nextquestion").style.display = "block";


    return false;

  }

  function nextQuestion() {
    document.getElementById("answers").innerHTML = "";
    document.getElementById("checkanswers").style.display = "block";
    document.getElementById("nextquestion").style.display = "none";
    document.getElementById("instructions").innerHTML = inst;


    // reset drop down menus
    for (var i = 0; i < answers.length; i++) {
      document.getElementById(i).selectedIndex = 0;
    }

    var smi = new SuccessiveMelodicIntervals();
    answers = smi.getAnswers();
    // document.write(answers);
    snippet = new MusicSnippet(smi.getNotes());
    snippet.generate();
    var bpm = 80;
    snippet.setBPM(bpm);
    return false;
  }

</script>

<?php require_once('phpincludes/footer.php'); ?>
