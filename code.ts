// Copyright (c) 2019 Hylke Bons. All rights reserved.
//
// This work is licensed under the terms of the MIT license.  
// For a copy, see <https://opensource.org/licenses/MIT>.

const protocolHandler = "figma-sharp://";
let documentId;
let nodeId;

// TODO: Figma plugins can't get the File key or URL, so we have to put it in a page title for now
function getDocumentId() {
  if (window == null || window.location == null)
    for (let node of figma.root.children)
      if (node.type == "PAGE" && node.name.startsWith(protocolHandler))
          return node.name.substring(protocolHandler.length);

  return window.location.href;
}

if (figma.currentPage.selection.length == 0) {
  alert("Nothing selected. Please select a window to preview.");
  figma.closePlugin();
}

let selectedNode = figma.currentPage.selection[0];

if (selectedNode.type != "FRAME" && selectedNode.type != "COMPONENT") {
  alert('Selection is not a window. Please select a window to preview.');
  figma.closePlugin();
}

// TODO: Figma can't open external apps, because the protocol handlers need to be explicitly marked as safe by Electron
let url = protocolHandler + getDocumentId() + "/" + encodeURIComponent(selectedNode.id);
figma.showUI("<script>window.open('" + url + "')</script>", {width: 512, height: 48});
