function convertToJSON() {
  var htmlInput = document.getElementById('htmlInput').value;
  var jsonOutput = document.getElementById('jsonOutput');

  try {
    var parser = new DOMParser();
    var doc = parser.parseFromString(htmlInput, 'text/html');
    var jsonData = htmlToJSON(doc.body);
    jsonOutput.value = JSON.stringify(jsonData, null, 2);
  } catch (error) {
    jsonOutput.value = 'Error: ' + error.message;
  }
}

function htmlToJSON(node) {
  var obj = {};

  if (node.nodeType === Node.TEXT_NODE) {
    return node.nodeValue;
  }

  if (node.nodeType === Node.ELEMENT_NODE) {
    obj[node.nodeName] = {};

    // Memeriksa apakah node memiliki atribut
    if (node.hasAttributes()) {
      var attrs = node.attributes;
      for (var i = 0; i < attrs.length; i++) {
        obj[node.nodeName][attrs[i].nodeName] = attrs[i].nodeValue;
      }
    }

    // Memeriksa child nodes
    for (var i = 0; i < node.childNodes.length; i++) {
      var child = node.childNodes[i];
      var nodeName = child.nodeName;

      if (obj[node.nodeName][nodeName] === undefined) {
        obj[node.nodeName][nodeName] = [];
      }

      obj[node.nodeName][nodeName].push(htmlToJSON(child));
    }
  }

  return obj;
}
