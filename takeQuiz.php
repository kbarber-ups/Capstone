<!DOCTYPE html>
<html>
<head>
	<meta content="text/html;charset=utf-8" http-equiv="Content-Type">
	<meta content="utf-8" http-equiv="encoding">
	<script src="howler/howler.js"></script>
	<script src="scripts/MusicSnippet.js"></script>
	<script src="scripts/noteToFileNum.js"></script>
	<script src="scripts/MusicManip.js"></script>
	<script src="scripts/QuestionGenerator.js"></script>
	<script src="scripts/ParseCSV.js"></script>

	<link rel="stylesheet" type="text/css" href="scripts/style.css">

	<script type="text/javascript">
		// Make config object
		var config = {
			scaleUP:false, 
			scaleDOWN:false, 
			
			root:false, 
			first:false, 
			second:false, 
			third:false, 
			
			intervalUP:false, 
			intervalDOWN:false
		};

		// Make an integer array to hold selected types of things to be tested on
		var chosen = [];
	</script>

	<?php
	// convert post vars into javascript
	foreach ($_POST as $key => $value) {
		if ($value == "opt") {
			echo "<script type='text/javascript'>config.$key = true;</script>";
		}
		else if ($value == "num") {
			echo "<script type='text/javascript'>chosen.push($key);</script>";
		}
		else {
			echo "<script type='text/javascript'>console.log(\"POST Format Error: $key, $value\");</script>";
		}
	}
	?>

	<script type="text/javascript">
		// console.log(config);
		// console.log(chosen);
	</script>
</head>

<body>
<script>
	var qg = new QuestionGenerator(chosen);
	console.log("here1");
	var snippet = qg.getNextQuestion();
	console.log("here2");
	snippet.generate();
	console.log("here3");
</script>

	<center>
		<h2> Sound </h2>
		<div id="loading"><!-- Needs to have id "loading" -->
			Loading...
		</div>
		<div id="allbuttons" style="display:none;"><!-- Needs to have id "allbuttons" -->
			<button onclick="snippet.play()">Play</button><br><br>
			<button id="revealbutt" onclick="reveal()">Reveal Answer</button>
			<div id="revealed" style="display:none;">
				<p id="answer"></p>
				<button onclick="nextQuestion()">Next Question</button>
			</div>
		</div>
	</center>

<script>
	document.getElementById("answer").innerHTML = snippet.answer();

	function nextQuestion() {
		hide();
		snippet.stopSound();
		snippet = qg.getNextQuestion();
		snippet.generate();
		document.getElementById("answer").innerHTML = snippet.answer();
	}

	function reveal() {
		document.getElementById("revealbutt").style.display = "none";
		document.getElementById("revealed").style.display = "block";
	}

	function hide() {
		document.getElementById("loading").style.display = "block";
		document.getElementById("revealbutt").style.display = "block";
		document.getElementById("revealed").style.display = "none";
	}
</script>
</body>
</html>
