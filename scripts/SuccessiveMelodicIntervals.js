/**
 * Generates a series of four random twelve-tone notes.
 * @class SuccessiveMelodicIntervals
 * @constructor
 */
function SuccessiveMelodicIntervals() {
  const LENGTH = 4;
  // Global random
  var g = Math.random();
  var notes = generateMelody();
  // var answers = calculateAnswers();

  // var startnote = getStartingNote()
  // document.write(startnote.toString() + "<br>");
  //
  // var notesp = getPalette(startnote, 1);
  // document.write(notesp);
  document.write(notes);



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
    var melody = [];

    var i = 0;

    while (melody[LENGTH - 1] == null) {
      var palette;
      if (i == 0) {
        melody.push(getStartingNote());
        console.log("i = " + i);
        console.log("melody.length = " + melody.length);
        console.log(melody[i].toString());
        i++;
        continue;
      } else palette = getPalette(melody[i-1], i);

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

        // Prepare index
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
  function getPalette(previousNote, i) {
    var palette = [];

    var lowestnote = new Note("C", 3);
    var highestnote = new Note("B", 5);

    var direction = true;
    for (var j = -6; j < 7; j++) {
      // var interval = intervals(j);
      console.log(previousNote.toString());
      var notetoadd = previousNote.getNextNote(j, direction);

      if (lowestnote.compareTo(notetoadd) == 1 || highestnote.compareTo(notetoadd) == -1
        || notetoadd.getAccidental() == -2 || notetoadd.getAccidental() == 2) {
        // Do not add notes that are out of bounds.
        // Do not use double sharps and double flats.
        continue;
      }
      else {
        palette.push(notetoadd);
      }
      // Now add all notes in the descending direction.
      if (j == 6 && direction) direction = false;
    }
    return shuffleNotes(palette, g * i);
  }

  /**
   * Picks a random starting note. Use notes 9 through 25 (Gb—A#)
   * @method getStartingPalette
   * @return {Note} palette
   */
  function getStartingNote() {
    var rand = Math.floor((Math.random() * 16) + 9);
    var notename = NOTES[rand];
    // var octave = Math.floor((Math.random() * 3) + 3);

    return new Note(notename, 4);

  }

  /**
   * Seeded shuffle.
   * @param shuffleNotes
   * @param {Note[]} notes to shuffle
   * @param {Integer} seed
   * @return {Note[]} shuffled notes
   */
  function shuffleNotes(notes, seed) {
    Math.seedrandom(seed);

    var shuffled = [];
    var strikeList = [];

    while (shuffled.length < notes.length) {
      var rand = Math.floor(Math.random() * notes.length);

      if (strikeList.indexOf(rand) == -1) {
        // We have not used this number yet! Add to shuffled list
        shuffled.push(notes[rand]);
        // Strike out this number
        strikeList.push(rand);
      } else {
        // We have already used this number. Keep going!
      }
    }
    return shuffled;
  }

}
