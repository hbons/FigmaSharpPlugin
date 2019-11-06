// Copyright (c) 2019 Hylke Bons. All rights reserved.
//
// This work is licensed under the terms of the MIT license.  
// For a copy, see <https://opensource.org/licenses/MIT>.


let documentId;
let nodeId;

if (figma.currentPage.selection.length == 0) {
  alert("Nothing selected. Please select a window to preview.");
  figma.closePlugin();
}

let node = figma.currentPage.selection[0];

if (node.type == "FRAME" || node.type == "COMPONENT") {
    nodeId = node.id.replace(":", "%"); 
} else {
  alert('Not a window. Please select a window to preview');
  figma.closePlugin();
}

let url = "figma-sharp://" + documentId + "/" + nodeId;
figma.showUI("<script>window.open({$url});</script> {$nodeId}", {width: 256, height: 48});
