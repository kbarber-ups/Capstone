var lastKey = "I"; //Keep track of last key played so that you don't replay it

/**
 * Determines how to play the given notes based on their type and quality, then loads
 * the corresponding audio files and plays them.
 * 
 * @class MusicSnippet
 * @constructor
 * @param {String} type Type of the sonority
 * @param {String} quality Quality of the sonority
 * @param {String} category Category of the sonority
 * @param {String Array} notes Array of notes
 */
function MusicSnippet(type, quality, notes, category) {
	/* Constants */
	const CHORD = "chord";
	const SCALE = "scale";
	const INTERVAL = "interval";
	const TWENTIETH = "20th Century";
	const JAZZ = "jazz";

	const BPM = 80; 				//Beats per minute
	var bps = BPM/60; 				//Beats per second

	/* Variables */
	var baseNotes = notes;			//Store the base notes to transpose from
	var type = type;				//Chord, scale, or interval
	var quality = quality;			//Answer
	var category = category;		//Category
	var numNotes = notes.length;	//Number of notes

	var tempNotes = [];				//Holds current notes
	var tempSounds = [];			//Holds current sound
	var numLoaded = 0;				//Number of loaded files
	var timeouts = [];				//Timeout objects to keep track of when playing broken

	/**
	 * Plays the loaded files:
	 *  - Chords are played broken then blocked
	 *  - Scales are played broken
	 *  - Intervals are played broken
	 *
	 * @method play
	 * @param {String} style How to play the notes. No argument means play it quiz style
	 */
	this.play = function(style) {
		//Unload and reload
		if(tempSounds.length > 0) {
			for(var i = 0; i < numNotes; i++) {
				tempSounds[i].unload();
			}
		}
		tempSounds = loadFiles(tempNotes);

		stop();
		clear();		

		if(style == undefined) {
			//Play arpegiated and then play block
			if(type == CHORD) {
				if(category == TWENTIETH) {
					playBlock();
				}
				else {
					playBlock();
					timeouts.push(setTimeout(function() {playBroken();}, (1/bps)*2000));
				}
			}
			//Play broken
			else if(type == SCALE) {
				playBroken();
			}
			else if(type == INTERVAL) {
				playBroken();
			}
			else {
				playBroken();
			}
		}
	}

	/**
	 * Randomly transposes the notes given from the CSV file and gives them a random octave.
	 * Then loads the corresponding audio files.
	 * 
	 * @method generate
	 */
	this.generate = function() {
		tempSounds = generateTransposition();
	}

	/**
	 * Returns the type and quality
	 *
	 * @method answer
	 * @return {String} quality + type
	 */
	this.answer = function() {
		return quality+" "+type;
	}

	/**
	 * Stops all sound
	 *
	 * @method stopSound
	 */
	this.stopSound = function() {
		stop();
		clear();
	}

	/**
	 * Transposes and sets octave of the notes from the CSV file randomly, then loads the
	 * corresponding files
	 *
	 * @method generateTransposition
	 * @return {Howl Array} An array of Howl objects that have the loaded audio files
	 * @private
	 */
	function generateTransposition() {
		do {
			var randKey = Math.floor(Math.random()*13)-6;	//Get Random key between -7 and 7
			tempNotes = setNotes(randKey);			//Array of transposed keys
		} while(tempNotes[0] == lastKey);			//Don't generate the previously played key
		
		lastKey = tempNotes[0];
		tempNotes = setOctave(tempNotes);			//Set a random octave
		console.log(tempNotes);
		return loadFiles(tempNotes);				//Load the corresponding files
	}
	
	/**
	 * Tranposes the notes from the CSV file a given number of sharps or flats
	 * 
	 * @method setNotes
	 * @param {Integer} shift How much to transpose the notes by
	 * @return {String Array} Array of the notes after transposition
	 * @private
	 */
	function setNotes(shift) {
		return transpose(baseNotes, shift);
	}

	/**
	 * Plays the note at the given index in the loaded files array
	 * 
	 * @method playNote
	 * @param {Integer} i Index of the note to be played
	 * @private
	 */
	function playNote(i) {
		tempSounds[i].play();

		//Fade out scale notes. Let it kind of bleed over.
		if(type == SCALE) {
			tempSounds[i].fadeOut(0, (1/bps)*2000);
		}		
	}

	/**
	 * Plays all notes at the same time
	 *
	 * @method playBlock
	 * @private
	 */
	function playBlock() {
		for(i = 0; i < numNotes; i++) {
			tempSounds[i].play();
		}
	}

	/*
	 * Plays all notes in sequence with timing based on bpm
	 *
	 * @method playBroken
	 * @private
	 */
	function playBroken() {
		//Play first note instantly
		timeouts.push(setTimeout(function() {
			playNote(0);
			playBrokenHelp(1);		//Play rest of notes
		}, (1/bps)*500));
	}

	/*
	 * Recursive helper for playBroken()
	 *
	 * @method playBrokenHelp
	 * @param {Integer} note An index representing the note to be played
	 * @private
	 */
	function playBrokenHelp(note) {
		console.log("Playing note "+note);
		if(note < numNotes) {
			timeouts.push(setTimeout(function() {
				playNote(note);
				playBrokenHelp(note+1);
			}, (1/bps)*1000)); //How many seconds per note given the bpm
		}
	}

	/*
	 * Stops all sound immediately
	 * 
	 * @method stop
	 * @private
	 */
	function stop() {
		for(i = 0; i < tempSounds.length; i++) {
			tempSounds[i].stop();
		}
	}

	/*
	 * Clears all timeouts (delayed sounds)
	 * 
	 * @method clear
	 * @private
	 */
	function clear() {
		var initLength = timeouts.length;
		for(i = 0; i < initLength; i++) {
			clearTimeout(timeouts[timeouts.length-1]);
			timeouts.pop();
		}
	}

	/*
	 * Takes the notes and converts them into Howl objects with the appropriate
	 * sound files.
	 * 
	 * @method loadFiles
	 * @param {String Array} notes Array of notes to be loaded
	 * @return {Howl Array} Array of Howl objects containing the corresponding audio files
	 * @private
	 */
	function loadFiles(notes) {
		var midi = [];		//Store notes as midi numbers
		var files = [];		//Store file paths to corresponding files
		var sounds = [];	//Howl objects of files

		//Get midi numbers of given notes
		for(i = 0; i < numNotes; i++) {
			midi.push(noteToFileNum[notes[i]]);
			//Error checking
			if(midi[i] == undefined) {
				console.log("Error: Check notation for "+quality+" "+type);
			}
		}

		//Convert midi numbers to their corresponding file names
		files = convMidiToFile(midi);

		//Load sound files
		for(i = 0; i < numNotes; i++) {
			sounds.push(new Howl({
				urls : [files[i]],
				onload : function() {
					numLoaded++;
					//Display loaded notes
					console.log("Loaded note "+numLoaded);
					//If all notes displayed, show buttons
					if(numLoaded == numNotes) {
						document.getElementById("loading").style.display = "none";
						document.getElementById("allbuttons").style.display = "block";
						numLoaded = 0;
					}
				},
				onloaderror : function() {console.log(quality+" "+type+" loading error")}
			}));
		}
		return sounds;
	}

	/* 
 	 * Converts midi numbers to their corresponding file names
 	 * 
 	 * @method convMidiToFile
 	 * @param {Integer Array} midi Array of midi numbers to be converted into files
 	 * @return {String Array} Array of strings containing the proper file paths to the audio files
 	 * @private
 	 */
	function convMidiToFile(midi) {
		var files = [];
		for(i = 0; i < numNotes; i++) {
			files.push("audio/piano/piano"+midi[i]+".wav");
		}
		return files;
	}
}
