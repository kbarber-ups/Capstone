/**
 * Validation rules for successive melodic intervals.
 * @method validateSMI
 * @param {String} notes
 */
 function validateSMI(notes) {

   if (checkSpan() && checkDirections() && checkIntervals() && checkForHarmony()) {
     return true;
   } else return false;

   /**
    * Ensure that the melody does not exceed the span of an octave.
    * @method checkSpan
    */
   function checkSpan() {

   }

   /**
    * Ensure that the intervals do not occur all in the same direction.
    * @method checkDirections
    */
   function checkDirections() {

   }

   /**
    * Ensure that any interval is used no more than once.
    * @method
    */
   function checkIntervals() {

   }

   /**
    * Ensure that the melody does not outline a triad or 7th chord.
    * @method
    */
   function checkForHarmony() {
     // An array containing the intervals found between major and minor triads
     // Diminished and augmented triads, and seventh chords (e.g MM7, mm7, Mm7,
     // dm7, and dd7) need not be explicitly spelled because they contain
     // repeating intervals, which will be prevented with another rule.
     var badChords = [[4, 3, 7], [3, 4, 7]];

   }
 }
