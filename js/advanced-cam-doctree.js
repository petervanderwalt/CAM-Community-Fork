var selectCount = 0;

function treeClick(checked, node) {
  var type = node.getAttribute("data-type");
  var object = node.getAttribute("data-object");
  var child = node.getAttribute("data-child");
  var layer = node.getAttribute("data-layer");
  console.log(checked, "Event: " + (checked ? "Selected" : "Deselected") + " Type: " + type + " Object: " + object + ", child: " + child + ", layer: " + layer)
  if (type == "doc") {
    var obj = objectsInScene[object]
    obj.traverse(function(c) {
      if (c.type == "Line") c.userData.selected = checked;
    });
  }
  if (type == "layer") {
    var obj = objectsInScene[object]
    obj.traverse(function(c) {
      if (c.type == "Line" && c.userData.layer && c.userData.layer.label == layer)
        c.userData.selected = checked;
    });
  }
  if (type == "vector") {
    objectsInScene[object].children[child].userData.selected = checked;
  }
  clearSceneFlag = true;
}

// Tree event handlers
$(document).on('click', '.cf-tree-toggle', function(e) {
  e.stopPropagation();
  var node = $(this).closest('.cf-tree-node');
  node.toggleClass('expanded');
});

$(document).on('change', '.cf-tree-check', function() {
  var checked = this.checked;
  var node = this;
  treeClick(checked, node);
});

function filldoctree() {
  $('#left-tree-view').empty();
  clearSceneFlag = true;
  sortPolyGons();

  if (objectsInScene.length > 0) {
    for (i = 0; i < objectsInScene.length; i++) {
      if (objectsInScene[i].children.length < 1) {
        objectsInScene.splice(i, 1);
      }
    }

    var template = '<ul class="cf-tree" id="doctree">';
    template += '<li class="cf-tree-node"><div class="cf-tree-row"><span class="cf-tree-toggle"></span>';
    template += '<input type="checkbox" class="cf-tree-check" id="docroot" checked data-type="root">';
    template += '<span class="cf-tree-label"><span class="far fa-folder"></span> Documents</span></div>';
    template += '<ul class="cf-tree-group" id="documenttree"></ul></li></ul>';
    $('#left-tree-view').append(template);

    for (i = 0; i < objectsInScene.length; i++) {
      var tpl = '<li class="cf-tree-node"><div class="cf-tree-row"><span class="cf-tree-toggle"></span>';
      tpl += '<input type="checkbox" class="cf-tree-check" id="checkbox_' + i + '" data-type="doc" data-object="' + i + '">';
      tpl += '<span class="cf-tree-label"><span class="far fa-file"></span> ' + objectsInScene[i].name + '</span></div>';
      tpl += '<ul class="cf-tree-group" id="doc' + i + '"></ul></li>';
      $('#documenttree').append(tpl);
    }

    for (i = 0; i < objectsInScene.length; i++) {
      var layersinthisdoc = []
      for (j = 0; j < objectsInScene[i].children.length; j++) {
        var layer = objectsInScene[i].children[j].userData.layer ? objectsInScene[i].children[j].userData.layer.label : 'layer1';
        if (jQuery.inArray(layer, layersinthisdoc) < 0) layersinthisdoc.push(layer);
      }

      for (j = 0; j < layersinthisdoc.length; j++) {
        var tpl = '<li class="cf-tree-node"><div class="cf-tree-row"><span class="cf-tree-toggle"></span>';
        tpl += '<input type="checkbox" class="cf-tree-check" data-type="layer" data-object="' + i + '" data-layer="' + layersinthisdoc[j] + '">';
        tpl += '<span class="cf-tree-label"><span class="fas fa-layer-group"></span> ' + layersinthisdoc[j] + '</span></div>';
        tpl += '<ul class="cf-tree-group" id="doc' + i + 'layer' + layersinthisdoc[j].replace(/ /g, '') + '"></ul></li>';
        $('#doc' + i).append(tpl);
      }

      for (j = 0; j < objectsInScene[i].children.length; j++) {
        var layerKey = objectsInScene[i].children[j].userData.layer ? objectsInScene[i].children[j].userData.layer.label.replace(/ /g, '') : 'layer1';
        objectsInScene[i].children[j].userData.link = "link" + i + "_" + j;
        var tpl = '<li class="cf-tree-node"><div class="cf-tree-row"><span class="cf-tree-toggle" style="visibility:hidden"></span>';
        tpl += '<input type="checkbox" class="cf-tree-check" id="checkbox_' + i + '_' + j + '" data-type="vector" data-object="' + i + '" data-child="' + j + '" data-layer="' + layerKey + '">';
        tpl += '<span class="cf-tree-label"><span class="fas fa-vector-square"></span> ' + objectsInScene[i].children[j].name + '</span></div></li>';
        $("#doc" + i + "layer" + layerKey).append(tpl);
      }
    }

    $('#nodocuments').hide()
  } else {
    $('#nodocuments').show()
  }
}

// runs in threejs animate() loop: syncs checkboxes with 3D selection
function animateTree() {
  selectCount = 0;
  for (i = 0; i < objectsInScene.length; i++) {
    var obj = objectsInScene[i]
    var childselectcount = 0;
    for (j = 0; j < obj.children.length; j++) {
      var child = obj.children[j]
      if (child.type == "Line" && child.userData.selected) {
        if (child.userData.hover) {
          child.material.color.setRGB(1, 0.2, 0.27);
        } else {
          child.material.color.setRGB(1, 0.2, 0.27);
        }
        $('#checkbox_' + i + '_' + j).prop('checked', true);
        childselectcount++
        selectCount++
      } else if (child.type == "Line" && !child.userData.selected) {
        if (child.userData.hover) {
          child.material.color.setRGB(0, 0.48, 1);
        } else {
          child.material.color.setRGB(0, 0, 0);
        }
        $('#checkbox_' + i + '_' + j).prop('checked', false);
      }
    }
  }
  if (selectCount > 0) {
    $("#tpaddpathParent").prop('disabled', false).removeClass('disabled')
    $("#tpaddpath").prop('disabled', false);
    $('#addJobBtn,#addJobMenuBtn,#floatAddJobBtn,#floatAddJobMenuBtn').addClass('success').prop('disabled', false)
    $("#tpaddicon").addClass('fg-green')
    $(".cf-addjob-text").html("Create Toolpath using (" + selectCount + ") selected vectors");

    if (toolpathsInScene.length > 0) {
      $("#remJobBtn").addClass('bg-green').addClass('fg-white').removeClass('disabled');
      $("#tpaddpath-dropdown").prop('disabled', false);
      $("#addJobMenuBtn,#floatAddJobMenuBtn").show()
    } else {
      $("#addJobMenuBtn,#floatAddJobMenuBtn").hide()
    }

  } else {
    $("#tpaddpathParent").prop('disabled', true).addClass('disabled');
    $("#tpaddicon").removeClass('fg-green')
    $("#tpaddpath").prop('disabled', true);
    $('#addJobBtn,#remJobBtn,#addJobMenuBtn,#floatAddJobBtn,#floatAddJobMenuBtn').removeClass('success').prop('disabled', true)
    $("#tpaddpath-dropdown").prop('disabled', true);
    $(".cf-addjob-text").html("Please select Vector(s) to create toolpaths");
  }
}
