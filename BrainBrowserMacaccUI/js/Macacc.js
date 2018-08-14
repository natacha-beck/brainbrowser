/*
  Author: Jonathan Lurie (https://github.com/jonathanlurie)
  Project: BrainBrowser https://github.com/aces/brainbrowser
  Date: September 2016
  Institution: MCIN - Neuro - McGill University
  Licence: MIT

  Specific code to handle the Macacc dataset
*/
var Macacc = function(BrainBrowserViewer){
  "use strict";

  var that = this;

};


(function() {
  "use strict";

  var debug = true;

  /*
    Load a new model file and display it in the viewer (if compatible)
  */
  Macacc.prototype.loadMap = function(vertex_index){
    var that = this;

    if (debug) { console.log("> loadMap"); }

    var data_controls = {
      "modality": "CT",
      "sk": "25mm",
      "statistic": "T",
      "dataset_name": "CIVET-1"
    };

    macacc.getData(vertex_index, data_controls, function(){});
  };

  /*
    Primary data set method.
    Sends a request to the server and then parses the response.
  */
  Macacc.prototype.getData = function(vertex, settings, callback){
    if (debug) { console.log("> getData"); }

    var path        = vertex === "aal_atlas" ? "/assets/aal_atlas.txt" : macacc.defineDataPath(vertex, settings);
    if (debug) { console.log(path); }

    var options = {};
    if (vertex !== "aal_atlas") {
      options.min         = parseInt($("#minSliderLbl").val());
      options.max         = parseInt($("#maxSliderLbl").val());
      options.result_type =  "arraybuffer";
    }
    vertexIndexingController.loadIntensityDataFromURL(path, options);
  };

  // Define path for each dataset
  Macacc.prototype.defineDataPath = function(vertex, settings){
    if (debug) { console.log("> defineDataPath"); }

    var modality;
    var num_vertex;
    if (settings.dataset_name === "CIVET-1") {
      modality   = "ICBM152_" + settings.modality + "_MACACC_" + (settings.modality === 'CT' ? "mean" : "size");
      num_vertex = vertex;
    } else if (settings.dataset_name === "CIVET-2") {
      switch (settings.modality) {
      case "CT":
        modality = "thickness";
        break;
      case "VOL":
        modality = "volume";
        break;
      case "AREA":
        modality = "area";
        break;
      }
      num_vertex = vertex.toString();
      while (num_vertex.length < 5) { num_vertex = '0' + num_vertex; }
    }

    var sk        =  "ICBM152_" + settings.sk;
    var statistic = settings.statistic + "_map/" + settings.statistic + "_";

    var full_path = "./data/" + settings.dataset_name + "/" + modality + "/" + sk + "/" + statistic + num_vertex + ".txt.gz";
    if (debug) { console.log(full_path); }
    return full_path;
  }


})();
