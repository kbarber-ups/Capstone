/**
 * Generates a series of four random twelve-tone notes.
 * @class SuccessiveMelodicIntervals
 * @constructor
 */
function SuccessiveMelodicIntervals() {
  const LENGTH = 4;
  var notes = generateMelody();
  var answers = calculateAnswers();
  // Global random
  var g = Math.random();

  /**
   * @method getAnswers
   * @return {String[]} intervals
   */
  this.getAnswers = function() {
    return answers;
  }

  /**
   * Returns the notes as Strings
   * @method getNotes
   * @return {String[]} notes
   */
  this.getNotes = function() {
    var notes1 = [];

    for (var i = 0; i < notes.length; i++) {
      notes1.push(notes[i].toString());
    }
    return notes1;
  }

  /**
   * Generates a 4-note 12-tone melody using backtracking.
   * @method generateMelody
   * @return {Note[]} notes
   */
  function generateMelody() {

    var paletteIndices = [];

    var i = 0;

    while (notes[LENGTH - 1] == null) {
      var palette = getPalette(i);

      for (var j = paletteIndices[i]; j < palette.length; j++) {
        melody.push(palette[j]);

        // Check if valid
        if (validateSMI(melody)) {
          // It worked!
          // Update palette of indices in case we need to backtrack later.
          paletteIndices[i] = j + 1;
          break;
        } else {
          // if didn't work
          melody[i] = null;
          // continue iterating until we find something that works
        }
      }
      if (melody[i] == null) {
        // We made it through the whole palette and nothing worked

        if (i == 0) {
          // If no starting notes worked, nothing will
          // Will never happen in the SMI domain
          // Still need to write safe code.
          break;
        }

        // Clean palette index array
        paletteIndices[i] = 0;
        i--;

        // Remove the previous element because it does not lead us anywhere
        // Won't happen in this domain. Again, just writing safe code.
        melody[i] = null;
      } else {
        // Move on to the next note!
        i++;
      }
    }
  }

  /**
   * Create a palette of notes to try based on previous note.
   * @method getPalette
   * @param {Integer} melody current index
   * @return {Note[]} palette
   */
  function getPalette(i) {
    if (i == 0) {
      // There is no previous note.
      // Do something completely different.
    }

    var palette = [];

    var lowestnote = new Note("C", 3);
    var highestnote = new Note("B", 5);

    var direction = true;
    for (var j = -6; j < 7; j++) {
      var interval = intervals(j);
      var notetoadd = melody[i - 1].getNextNote(interval, direction);

      if (lowestnote.compareTo(notetoadd) == 1 || highestnote.compareTo(notetoadd) == -1) {
        // Do not add notes that are out of bounds
        continue;
      } else {
        palette.push(notetoadd);
      }
      // Now add all notes in the descending direction.
      if (i == 6 && direction) direction = false;
    }
    return palette;
  }




}



 // Use notes 9 through 25 (Gb—A#)
