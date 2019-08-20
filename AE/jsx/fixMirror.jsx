// Finds markers set by Premiere Pro and turns them into a horizontal flip

var activeItem = app.project.activeItem;
var layers = activeItem.layers;

var tempLayer = app.project.activeItem.layers.addText(app.project.activeItem.duration);
var tempText = tempLayer.property("Text").property("Source Text");

// Use an expression to get the number of markers in the composition
tempText.expression = "thisComp.marker.numKeys;";
var numMarkers = parseInt(tempText.value);

for (var i = 1; i <= numMarkers; i++) {

  // Use expressions to get the time and name of composition markers imported from Premiere
  tempText.expression = "thisComp.marker.key(" + i + ").time;";
  var markerTime = parseFloat(tempText.value);
  tempText.expression = "thisComp.marker.key(" + i + ").comment;";
  var markerName = tempText.value.toString();

  // Find the layer with the start time that matches the marker start time. If it has the same name, apply a horizontal flip.
  for (j=1;j<=activeItem.numLayers;j++) {
    if (layers[j].name == markerName && layers[j].inPoint == markerTime) {
      // Add the "Transform" effect to overwrite the existing "Transform" property
      layers[j].property("Effects").addProperty("Transform");
      layers[j].property("Effects").property("Transform").property("Uniform Scale").setValue("0"); // Uncheck "Uniform Scale"

      // Apply a horizontal flip by inverting (adding a negative to) the value of "Scale Width"
      var scaleWidth = layers[j].property("Effects").property("Transform").property("Scale Width").value;
      layers[j].property("Effects").property("Transform").property("Scale Width").setValue("-"+scaleWidth);
    }
  }

}

tempLayer.remove();
