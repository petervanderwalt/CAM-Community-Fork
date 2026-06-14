// Handles the Toolpaths / Operations tree
function toggleToolpathVisibility(i, bool) {
  toolpathsInScene[i].userData.visible = bool
  fillTree();
  makeGcode();
}

// move toolpath order up/down
var moveOp = function(index, delta) {
  storeUndo(true)
  var array = toolpathsInScene;
  // var index = array.indexOf(element);
  var newIndex = index + delta;
  if (newIndex < 0 || newIndex == array.length) return; //Already at the top or bottom.
  var indexes = [index, newIndex].sort(); //Sort the indixes
  array.splice(indexes[0], 2, array[indexes[1]], array[indexes[0]]); //Replace from lowest index, two elements, reverting the order
};

function fillTree() {
  // $('#filetreeheader').empty();
  $('#filetree').empty();
  // $('#toolpathtreeheader').empty();
  $('#toolpathtree').empty();
  $('#toolpathsmenu').empty();


  // Default Menu
  var menuitem = `<li><a  href="#" onclick="addJob(-1);"><span class="fa fa-fw fa-plus"></span>Create a new operation...</a></li>`;
  $('#toolpathsmenu').append(menuitem);

  clearSceneFlag = true;

  filldoctree();

  if (toolpathsInScene.length > 0) {

    $('#generatetpgcode').prop('disabled', false);
    $('#generatetpgcode').addClass('success');

    var table = `<table class="jobsetuptable" style="width: 100%" id="toolpathstable">`
    $('#toolpathtree').append(table)

    for (i = 0; i < toolpathsInScene.length; i++) {
      if (toolpathsInScene[i].type != "Mesh") {

        var operation;
        if (toolpathsInScene[i].userData.camOperation) {
          operation = toolpathsInScene[i].userData.camOperation
        } else {
          operation = "not configured <i class='fas fa-times fa-fw cf-text-danger'></i>"
        }

        var toolp = `<tr class="jobsetupfile" id="toolpathrow` + i + `">
                <td>
                  <table>
                    <tr>
                    <td>
                    <h6 style="margin: 0px 0px;"><small>Toolpath: <b><span contenteditable="true" data-id="` + i + `">` + toolpathsInScene[i].name + `</span></b> [` + operation + `]`
        if (!toolpathsInScene[i].userData.visible) {
          toolp += " (hidden) "
        }
        toolp += `</small></h6>
                    </td>
                    </tr>
                    <tr>
                    <td>
                    <div class="cf-toolbar">
                    `

        toolp += `<button class="cf-btn cf-btn-primary cf-btn-icon" title="Configure toolpath" onclick="setupJob(` + i + `);"><i class="fas fa-sliders-h"></i></button>`

        if (i > 0) {
          toolp += `<button class="cf-btn cf-btn-green cf-btn-icon" title="Move up" onclick="moveOp(` + i + `, -1); fillTree();"><i class="fa fa-arrow-up fa-fw"></i></button>`
        } else {
          toolp += `<button class="cf-btn cf-btn-green cf-btn-icon cf-disabled" title="Move up" disabled><i class="fa fa-arrow-up fa-fw"></i></button>`
        }

        if (i < toolpathsInScene.length - 1) {
          toolp += `<button class="cf-btn cf-btn-green cf-btn-icon" title="Move down" onclick="moveOp(` + i + `, 1); fillTree();"><i class="fa fa-arrow-down fa-fw"></i></button>`
        } else {
          toolp += `<button class="cf-btn cf-btn-green cf-btn-icon cf-disabled" title="Move down" disabled><i class="fa fa-arrow-down fa-fw"></i></button>`
        }

        toolp += `<span style="flex:1;min-width:4px;"></span>`

        toolp += `<button class="cf-btn cf-btn-gray cf-btn-icon" title="Reselect toolpaths" onclick="setSelectionFromToolPath(` + i + `)"><i class="far fa-object-group fa-fw"></i></button>`

        if (toolpathsInScene[i].userData.visible) {
          toolp += `<button class="cf-btn cf-btn-orange cf-btn-icon" title="Hide toolpath, exclude from G-Code" onclick="toggleToolpathVisibility(` + i + `, false);"><i class="fa fa-fw fa-eye-slash"></i></button>`
        } else {
          toolp += `<button class="cf-btn cf-btn-orange cf-btn-icon" title="Show toolpath, include in G-Code" onclick="toggleToolpathVisibility(` + i + `, true);"><i class="fa fa-fw fa-eye"></i></button>`
        }

        toolp += `<button class="cf-btn cf-btn-red cf-btn-icon" title="Delete toolpath" onclick="storeUndo(); toolpathsInScene.splice('` + i + `', 1); fillTree();"><i class="fa fa-times fa-fw"></i></button>`

        toolp += `</div>`

        toolp += `
            <div class="cf-spinner-label" id="toolpathSpinner` + i + `"><i class="fas fa-spinner fa-pulse"></i> calculating...</div>
                    </td>
                    </tr>
                  </table>
                </td>
                </tr>
                `
      }
      $('#toolpathstable').append(toolp);

      // append toolpath to menu
      var string = `Add selection to: ` + toolpathsInScene[i].name + `: ` + operation
      if (string.length > 48) {
        string = string.substring(0, 48) + "..."
      }
      var menuitem = `<li><a  href="#" onclick="addJob(` + i + `)">` + string + `</a></li>`;
      $('#toolpathsmenu').append(menuitem);


      // append removal toolpath to menu
      var string = `Delete selection from: ` + toolpathsInScene[i].name + `: ` + operation
      if (string.length > 48) {
        string = string.substring(0, 48) + "..."
      }
      var menuitem = `<li><a  href="#" onclick="remJob(` + i + `)">` + string + `</a></li>`;
      $('#toolpathsmenu').append(menuitem);

    }

  } else {
    var instructions = `<p class="cf-text-muted cf-text-center cf-mt-2">Select vectors in the viewer or Documents tree (Ctrl+click for multiples, Ctrl+A for All).<br>Then use the <b>Add Toolpath</b> button above.</p>`
    $('#toolpathtree').append(instructions);
    $('#generatetpgcode').prop('disabled', true);
    $("#generatetpgcode").removeClass('success');

  } // End of if (toolpathsInScene.length > 0)

  var tableend = `
    </table>
    `

  $('#toolpathstable').append(tableend)

  // Register event to Edit Toolpath Name inplace
  $('#toolpathstable .entity-job').on('input', function() {
    var $this = $(this);
    var data = $this.data();
    toolpathsInScene[data.id].name = $this.text();
  });

  $(document).trigger('treeUpdated');
}