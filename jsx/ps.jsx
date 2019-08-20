// Set markers on clips that have been horizontally flipped

if (ExternalObject.AdobeXMPScript === undefined) {
  ExternalObject.AdobeXMPScript = new ExternalObject('lib:AdobeXMPScript');
}

var kPProPrivateProjectMetadataURI = "http://ns.adobe.com/premierePrivateProjectMetaData/1.0/";

function setMarkers() {
  var markers = app.project.activeSequence.markers;
  var tracks = app.project.activeSequence.videoTracks; // Get all tracks in the project

  for (i=0;i<tracks.numTracks;i++) {
    clips = tracks[i].clips; // On each track, get all the clips
    for (j=0;j<clips.numItems;j++) {
      components = clips[j].components; // Get the components of each clip
      for (k=0;k<components.numItems;k++) {
        // If the clip has a "Horizontal Flip" component, give it a marker
        if (components[k].displayName == "Horizontal Flip") {
          var newMarker = markers.createMarker(clips[j].start.seconds); // Start the marker at the beginning of the clip
          newMarker.end = clips[j].end.seconds; // End it at the end of the clip
          newMarker.name = clips[j].name; // Give it the same name as the clip so the two can be compared when imported into AE
          // newMarker.comment = "Horizontal flip";
        }
      }
    }
  }
}
