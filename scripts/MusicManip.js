/*
 * This file contains a variety of methods that perform useful
 * manipulations on a collection of musical notes.
 */

// An array of musical notes in order of the circle of fifths.
// DO NOT CHANGE THIS ORDER!!!
const NOTES = ["Fbb", "Cbb", "Gbb", "Dbb", "Abb", "Ebb", "Bbb", "Fb",
  "Cb", "Gb", "Db", "Ab", "Eb", "Bb", "F", "C", "G", "D", "A", "E",
  "B", "Fx", "Cx", "Gx", "Dx", "Ax", "Ex", "Bx", "Fxx", "Cxx", "Gxx",
  "Dxx", "Axx", "Exx", "Bxx"];

/*
 * Returns the position of a note in the circle of fifths.
 */
function ordinal(note) {
  for (var i = 0; i < NOTES.length; i++) {
    // Test Strings for equality.
    if (note == NOTES[i]) return i;
  }
}

/*
 * Takes an array of notes and shifts them over by the specified
 * amount in the circle of fifths. Take care with providing the
 * amount to shift; you don't want to shift far enough to create
 * an unused spelling. Since the shift argument must be in fifths,
 * it is a range that can be easily determined.
 */
function transpose(notes, shift) {
  var transposedNotes = [];

  // For each note in the array arg, find it in our circle of
  // fifths array.
  for (var i = 0; i < notes.length; i++) {
    for (var j = 0; j < NOTES.length; j++) {
      var ord = ordinal(notes[i]);
      // Test Strings for equality.
      if (NOTES[j] == notes[i]) {
        // TODO: Simplify this!!!
        // var ordinal = ordinal(notes[i]);
        // We have found the note in the circle of fifths!
        // Offset it and add it to the new array.
        transposedNotes[transposedNotes.length] = NOTES[j + shift];
        // transposedNotes[transposedNotes.length] = NOTES[ord + shift];

        break;
      }
    }
  }
  return transposedNotes;
}

/*
 * Reverses the direction of a collection of notes.
 * To be used for scales and intervals, but NOT chords!
 * Do this AFTER the octave is set!
 */
function reverseDirection(notes) {
  return notes.reverse();
}

/*
 * Reorders the notes so that they are in the specified inversion.
 * To be used for major triads, minor triads, and 7th chords only!
 * NEVER to be used for scales, intervals, jazz chords, and 20th
 * century chords!!!
 */
function setInversion(chord, inversion) {
  // inversion should be an int between the values 0 and notes.length-1
  for (i = 0; i < inversion; i++) {
    chord.push(chord.shift());
  }
  return chord;
}

/*
 * Reference array for the ascending distance to an interval.
 * Each number corresponds to the number of half steps between
 * the following intervals, respectively:
 * unison, p5, M2, M6, M3, M7, tritone, m2, m3, m7, p4
 * DO NOT CHANGE THE ORDER!
 */
const INTERVALS = [0, 7, 2, 9, 4, 11, 6, 1, 8, 3, 10, 5];

// The number of half steps in an octave.
const OCTAVE = 12;

/*
 * Calculate the interval between two notes.
 * Returns the interval as a number of half steps.
 */
function calcInterval(note1, note2) {
  // Subtract Note1's ordinal from Note2's ordinal
  var ordinalDiff = ordinal(note2) - ordinal(note1);

  // Normalize
  if (!(ordinalDiff < OCTAVE && ordinalDiff > -OCTAVE)) {
    ordinalDiff %= OCTAVE;
  }

  // Bring negative numbers up into the positives!
  if (ordinalDiff < 0) ordinalDiff += OCTAVE;

  return INTERVALS[ordinalDiff];
}

/*
 * Calculates the span of a collection of notes. Returns an
 * integer representing the number of half steps between the
 * lowest note and highest note in the given note collection.
 */
function calcSpan(notes) {
  var span = 0;
  for (var i = 0; i < notes.length - 1; i++) {
    span += calcInterval(notes[i], notes[i + 1]);
  }
  return span;
}

// The number of notes available for playback ranging from
// C3 to B5.
const NUM_NOTES = 35;

/*
 * Sets an octave appropriate for the given span of notes.
 * Does so by appending a number to the end of each String.
 * DO NOT USE ON A SCALE OR INTERVAL THAT HAS BEEN REVERSED.
 * PLEASE REVERSE AFTER SETTING THE OCTAVE!!!
 * Inverted chords are O.K.
 */
function setOctave(notes) {

  var C = 15;
  var span = calcInterval(NOTES[C], notes[0]);
  //document.write("<br><br>span = " + span);

  span += calcSpan(notes);
  //document.write("<br>span = " + span);

  // The number of octaves available for playback
  // const NUM_OCTAVES = 3;
  var numPlaces = 0;
  // while (span <= NUM_NOTES/(numPlaces + 1)
  //             && numPlaces < NUM_OCTAVES) {
  //   numPlaces++;
  // }

  if (span - 12  < 0) {
    // This note collection fits under an octave
    numPlaces = 3;
  } else if (span - 24 < 0) {
    // Fits under two octaves
    numPlaces = 2;
  } else if (span - 36 < 0){
    // Fits under three octaves
    numPlaces = 1;
  } else {
    // This note collection will not fit.
    console.log("Warning: This note collection either has too "
      + "large a span, or the span is large with too high of"
      + " a starting note. Please check your inputs!")
    return null;
  }

  //document.write("<br><br>span = " + span);
  //document.write("<br>numPlaces = " + numPlaces);

  // if (numPlaces == 0) {
  //   // This note collection will not fit.
  //   console.log("Warning: This note collection either has too "
  //     + "large a span, or the span is large with too high of"
  //     + " a starting note. Please check your inputs!")
  //   return null;
  // }

  /*
   * Go up one note name.
   */
  function increment(noteName) {
    noteName = String.fromCharCode(noteName.charCodeAt(0) + 1);
    if (noteName == "H") noteName = "A";
    return noteName
  }

  /*
   * Generate a random number for the octave in which a note
   * collection may begin.
   */
  function genRandomNum(numPlaces) {
    const lowestOctave = 3;
    // 3 is the lowest octave in which a note collection may begin,
    // and numPlaces provides a range. This method will return a
    // random number from [lowestOctave, numPlaces).
    return Math.floor((Math.random() * (numPlaces)) + lowestOctave);
  }

  // Let's pick one of those places at random.
  var octave = genRandomNum(numPlaces);
  var octavizedNotes = [];
  var notename = notes[0].charAt(0);

  for (var i = 0; i < notes.length; i++) {
    while (notes[i].charAt(0) != notename) {
      notename = increment(notename);
      if (notename == "C") octave++;

    }
    // Concat octave onto the note name!
    octavizedNotes.push(notes[i] + octave);
  }

  return octavizedNotes;
}
