<?php
$thisPage = 'Test MusicManip';
?>

<?php require_once('phpincludes/header.php'); ?>

<body>
<!-- <h1>Testing MusicManip.js</h1> -->
<br></br>
<script src = "scripts/MusicManip.js"> </script>
<script>
// a test script for the Note.js class
// start with a C major scale
var notes1 = ["C", "D", "E", "F", "G", "A", "B", "C"];
// shift notes to D major
notes1 = transpose(notes1, 2);
document.write("transpose C major scale to D:<br>");

for (i = 0; i < notes1.length; i++) {
  document.write(notes1[i]);
  if (i < notes1.length - 1) {
    document.write(", ");
  }
}
// Descending D major scale
document.write("<br><br>Reverse D major scale:<br>");
notes1 = reverseDirection(notes1);
for (i = 0; i < notes1.length; i++) {
  document.write(notes1[i]);
  if (i < notes1.length - 1) {
    document.write(", ");
  }
}

var dflat = ["C", "D", "E", "F", "G", "A", "B", "C"];
// shift notes to Db major
dflat = transpose(dflat, 7);
document.write("<br><br>transpose C major scale to Db:<br>");
dflat = setOctave(dflat);
document.write(dflat);

// Inversions
var chord = ["C", "E", "G", "Bb"];
document.write("<br><br>setInversion of CMm7 to 4/3:<br>");
setInversion(chord, 2);
//2nd Inversion C dominant 7
document.write(chord);

// Calculate an interval in half steps
document.write("<br><br>calcInterval:");
// for (i = 0; i < NOTES.length; i++) {
//   document.write("<br>C to " + NOTES[i] + " is " + calcInterval("C", NOTES[i]));
//   document.write("<br><br>");
//   document.write("<br>" + NOTES[i] + " to C is " + calcInterval(NOTES[i], "C"));
//   document.write("<br><br>");
//
// }

document.write("<br>C to G is " + calcInterval("C", "G"));
document.write("<br>C to Dbb is " + calcInterval("C", "Dbb"));
document.write("<br>C to Ab is " + calcInterval("C", "Ab"));
document.write("<br>Ab to C is " + calcInterval("Ab", "C"));
document.write("<br>Fbb to Cbb is " + calcInterval("Fbb", "Cbb"));
document.write("<br>F to E# is " + calcInterval("F", "Ex"));
document.write("<br>E# to F is " + calcInterval("Ex", "F"));
document.write("<br>F to F# is " + calcInterval("F", "Fx"));
document.write("<br>F# to F is " + calcInterval("Fx", "F"));
document.write("<br>F to Gb is " + calcInterval("F", "Gb"));
document.write("<br>F to E is " + calcInterval("F", "E"));




// Calculate the span in half steps
var notes2 = ["C", "G"];
document.write("<br><br>calcSpan:<br>");
var span1 = calcSpan(notes2);
document.write("<br>C to G is " + span1);

// Calculate span in half steps with multiple notes
var notes3 = ["C", "G", "C"];
document.write("<br><br>calcSpan:<br>");
var span2 = calcSpan(notes3);
document.write("<br>C to G to C is " + span2);

// Calculate span in half steps with multiple notes
var notes3 = ["C", "C", "E"];
document.write("<br><br>calcSpan:<br>");
var span2 = calcSpan(notes3);
document.write("<br>C to C to E is " + span2);

// Generate a random number between 3 and 5 inclusive
document.write("<br><br>Random number:<br>");
var i = 0;
var max = 0;
var min1 = 10;
while (i < 100) {
  var rand = genRandomNum(2);
  if (rand > max) {
    max = rand;
  }
  if (rand < min1) {
    min1 = rand;
  }
  i++;

}
document.write("max = " + max + "<br>");
document.write("min = " + min1 + "<br>");

// Descending D major scale
document.write("<br><br>Set Octaves:<br>");
var notes0 = ["C", "D", "E", "F", "G", "A", "B", "C"];
notes0 = setOctave(notes0);
for (i = 0; i < notes0.length; i++) {
  document.write(notes0[i]);
  if (i < notes0.length - 1) {
    document.write(", ");
  }
}
document.write("<br>");

var amajorscale = ["C", "D", "E", "F", "G", "A", "B", "C"];
amajorscale = transpose(amajorscale, 3);
amajorscale = setOctave(amajorscale);
for (i = 0; i < amajorscale.length; i++) {
  document.write(amajorscale[i]);
  if (i < amajorscale.length - 1) {
    document.write(", ");
  }
}
document.write("<br>");
document.write("<br>CRAZY SCALE <br>");

var crazyscale = ["Abb", "Bbb", "Cbb", "Dbb", "Ebb", "Fbb", "Gbb", "Abb"];
crazyscale = setOctave(crazyscale);
//document.write(calcSpan(crazyscale)+ "<br>");

for (i = 0; i < crazyscale.length; i++) {
  document.write(crazyscale[i]);
  if (i < crazyscale.length - 1) {
    document.write(", ");
  }
}

</script>
</body>
<?php require_once('phpincludes/footer.php'); ?>
