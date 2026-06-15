//"use strict";
console.log("%c%s", "color: #000; background: green; font-size: 24px;", "STARTING...");
// colors for the consolelog
var msgcolor = '#000000';
var successcolor = '#00aa00';
var errorcolor = '#cc0000';
var warncolor = '#ff6600';

var debug = false;
var activeObject, fileName, notify;

// ── Toast notification (replaces Metro.toast.create) ──
function cfToast(message, duration, type) {
  if (!$('#cf-toast-container').length) {
    $('body').append('<div id="cf-toast-container"></div>');
  }
  var cls = 'cf-toast';
  if (type) cls += ' cf-toast-' + type;
  var $toast = $('<div class="' + cls + '"><span class="cf-toast-msg">' + message + '</span><span class="cf-toast-close">&times;</span></div>');
  $('#cf-toast-container').append($toast);
  $toast.find('.cf-toast-close').on('click', function() {
    $toast.remove();
  });
  if (duration > 0) {
    setTimeout(function() {
      $toast.addClass('cf-toast-fade');
      setTimeout(function() { $toast.remove(); }, 300);
    }, duration);
  }
}

// ── Modal system (replaces Metro4 dialogs) ──
function cfModalOpen(id) {
  $('body').addClass('cf-modal-open');
  $('#' + id).closest('.cf-modal-overlay').addClass('open');
}
function cfModalClose(id) {
  $('#' + id).closest('.cf-modal-overlay').removeClass('open');
  $('body').removeClass('cf-modal-open');
}
function cfModalIsOpen(id) {
  return $('#' + id).closest('.cf-modal-overlay').hasClass('open');
}
// Close modal on overlay click
$(document).on('click', '.cf-modal-overlay', function(e) {
  if ($(e.target).is('.cf-modal-overlay')) {
    $(this).find('.cf-modal').each(function() {
      cfModalClose($(this).attr('id'));
    });
  }
});
// Close modal on Escape key
$(document).on('keydown', function(e) {
  if (e.key === 'Escape') {
    $('.cf-modal-overlay.open').find('.cf-modal').each(function() {
      cfModalClose($(this).attr('id'));
    });
  }
});

// Dynamic dialog (replaces Metro.dialog.create)
function cfDialog(opts) {
  var id = 'cf-dialog-' + Date.now();
  function mapCls(cls) {
    if (!cls) return 'gray';
    if (cls.indexOf('primary') >= 0) return 'primary';
    if (cls.indexOf('success') >= 0) return 'green';
    return 'gray';
  }
  var html = '<div class="cf-modal-overlay" id="' + id + '-overlay">';
  html += '<div class="cf-modal" id="' + id + '" style="max-width:' + (opts.width || 480) + 'px;">';
  html += '<div class="cf-modal-title">' + (opts.title || '') + '<span class="cf-modal-close" onclick="cfModalClose(\'' + id + '\')">&times;</span></div>';
  html += '<div class="cf-modal-content">' + (opts.content || '') + '</div>';
  if (opts.actions && opts.actions.length) {
    html += '<div class="cf-modal-footer">';
    for (var a = 0; a < opts.actions.length; a++) {
      var act = opts.actions[a];
      html += '<button class="cf-btn cf-btn-' + mapCls(act.cls) + '" id="' + id + '-act-' + a + '">' + (act.caption || '') + '</button>';
    }
    html += '</div>';
  }
  html += '</div></div>';
  $('body').append(html);
  // Bind action click handlers
  if (opts.actions) {
    for (var a = 0; a < opts.actions.length; a++) {
      (function(idx) {
        $('#' + id + '-act-' + idx).on('click', function() {
          if (opts.actions[idx].onclick) opts.actions[idx].onclick();
          cfModalClose(id);
        });
      })(a);
    }
  }
  cfModalOpen(id);
}

// Place all document.ready tasks into functions and ONLY run the functions from doument.ready
$(document).ready(function() {
  // Intialise
  loadSettingsLocal();
  initLocalStorage();
  init3D();
  animate();
  errorHandlerJS();
  initTree();
  initAdvancedCAM();
  initMouseSelect();
  initMouseMode();
  initDragDrop();
  initExportworkspace();


  //File -> Open
  var fileOpen = document.getElementById('file');
  fileOpen.addEventListener('change', readFile, false);


  // Fix for opening same file from http://stackoverflow.com/questions/32916687/uploading-same-file-into-text-box-after-clearing-it-is-not-working-in-chrome?lq=1
  $('#file').bind('click', function() {
    $('#file').val(null);
  });

  $('#workspaceImport').bind('click', function() {
    $('#workspaceImport').val(null);
  });

  // File -> Save
  $('#save').on('click', function() {
    saveFile();
  });

  // Viewer
  var viewer = document.getElementById('renderArea');

  setTimeout(function() {
    $('#viewReset').click();
  }, 100);

  // A few gcode input fields need to be caps for the firmware to support it
  $('.uppercase').keyup(function() {
    this.value = this.value.toLocaleUpperCase();
  });



  loadLastClosedOnPageload()

  $(document).on('click', '.sidebar-handle', function(e) {
    e.preventDefault();
    $('#sidebar-overlay').toggleClass('sidebar-closed sidebar-open');
    $('#cf-float-tp').toggleClass('sidebar-closed sidebar-open');
  });

  // Update sidebar badge counts
  function updateSidebarBadges() {
    var docCount = typeof objectsInScene !== 'undefined' ? objectsInScene.length : 0;
    var tpCount = typeof toolpathsInScene !== 'undefined' ? toolpathsInScene.length : 0;
    $('#badge-docs').text(docCount).toggle(docCount > 0);
    $('#badge-tps').text(tpCount).toggle(tpCount > 0);
  }
  // Call after tree changes
  $(document).on('treeUpdated', updateSidebarBadges);
  // Initial call
  setTimeout(updateSidebarBadges, 100);

  // Dropdown toggle for Add Toolpath split buttons
  function toggleTPmenu(btn) {
    var menu = $('#toolpathsmenu');
    var rect = btn[0].getBoundingClientRect();
    menu.removeClass('cf-dropdown-down cf-dropdown-up');
    if (btn.is('#floatAddJobMenuBtn')) {
      menu.addClass('cf-dropdown-up').css({ right: window.innerWidth - rect.right, bottom: window.innerHeight - rect.top });
    } else {
      menu.addClass('cf-dropdown-down').css({ top: rect.top + rect.height + window.scrollY, left: rect.left + window.scrollX });
    }
    menu.toggleClass('open');
  }
  $(document).on('click', '#addJobMenuBtn, #floatAddJobMenuBtn', function(e) {
    e.preventDefault();
    e.stopPropagation();
    toggleTPmenu($(this));
  });
  $(document).on('click', function(e) {
    if (!$(e.target).closest('#toolpathsmenu').length && !$(e.target).closest('#addJobMenuBtn, #floatAddJobMenuBtn').length) {
      $('#toolpathsmenu').removeClass('open');
    }
  });

  // Toolbar dropdown toggles (data-dropdown attribute)
  $(document).on('click', '[data-dropdown]', function(e) {
    e.preventDefault();
    e.stopPropagation();
    var menu = $('#' + $(this).data('dropdown'));
    $('.cf-dropdown').not(menu).removeClass('open');
    menu.toggleClass('open');
  });
  $(document).on('click', function(e) {
    if (!$(e.target).closest('[data-dropdown]').length && !$(e.target).closest('.cf-dropdown').length) {
      $('.cf-dropdown').removeClass('open');
    }
  });

}); // End of document.ready

// Error handling
errorHandlerJS = function() {
  // window.onerror = function(errmessage, url, line) {
  window.onerror = function(errmessage, url, line, colno, error) {
    // console.log(error)
    errmessage = errmessage.replace(/^Uncaught /i, "");
    //alert(message+"\n\n("+url+" line "+line+")");
    console.log(errmessage + "\n\n(" + url + " line " + line + ")");
    if (errmessage.indexOf('updateMatrixWorld') == -1) { // Ignoring threejs/google api messages, add more || as discovered
      var message = `An unknown error occured:` + errmessage
      cfToast(message, 10000, 'red');
      // printLog(errmessage + "\n(" + url + " on line " + line + ")", errorcolor);
    }
  };
};

// Function to execute when opening file (triggered by fileOpen.addEventListener('change', readFile, false); )
function readFile(evt) {


  // setTimeout(function() {
  console.group("New FileOpen Event:");
  console.log(evt);
  console.groupEnd();
  // Close the menu
  $("#drop1").dropdown("toggle");

  // Files
  var files = evt.target.files || evt.dataTransfer.files;

  if (files.length > 0) {
    $('#documentstree').hide();
    $('#documentactivity').show();
  }

  for (var i = 0; i < files.length; i++) {
    if (files[i].name.match(/.obc$/i) || files[i].name.match(/.obc$/i)) {
      loadWorkspace(files[i])
    } else {

      loadFile(files[i]);
    }
  }
  // }, 0)
}

// drag/drop
function initDragDrop() {
  var dropTarget = document.getElementById('renderArea');

  var onDragLeave = function(e) {
    e.stopPropagation();
    e.preventDefault();
  };

  var onDragOver = function(e) {
    e.stopPropagation();
    e.preventDefault();
    e.dataTransfer.dropEffect = 'copy'; // Explicitly show this is a copy.
    $('#draganddrop').show();
  };

  var onDrop = function(e) {
    e.preventDefault();
    $('#draganddrop').hide();
    console.log(e)
    readFile(e);
  };

  dropTarget.addEventListener('drop', onDrop, false);
  dropTarget.addEventListener('dragover', onDragOver, false);
  dropTarget.addEventListener('dragleave', onDragLeave, false);
}

// load file
function loadFile(f) {
  // Filereader
  storeUndo(true);
  if (f) {
    var r = new FileReader();
    if (f.name.match(/.dxf$/i)) {
      // console.log(f.name + " is a DXF file");
      // console.log('Reader: ', r)
      r.readAsText(f);
      r.onload = function(e) {
        dxf = r.result;
        drawDXF(dxf, f.name);
        printLog('DXF Opened', msgcolor, "file");
        // putFileObjectAtZero();
        resetView();
      };
    } else if (f.name.match(/.svg$/i)) {
      // console.log(f.name + " is a SVG file");
      loadSVGFile(f)
      printLog('SVG Opened', msgcolor, "file");
      resetView();
      // } else if (f.name.match(/.gcode$/i)) {
      //   r.readAsText(f);
      //   r.onload = function(event) {
      //     // cleanupThree();
      //     $("#gcodefile").show();
      //     document.getElementById('gcodepreview').value = this.result;
      //     printLog('GCODE Opened', msgcolor, "file");
      //     resetView();
      //     setTimeout(function() {
      //       openGCodeFromText();
      //     }, 500);
      //   };
      // } else if (f.name.match(/.nc$/i)) {
      //   r.readAsText(f);
      //   r.onload = function(event) {
      //     // cleanupThree();
      //     $("#gcodefile").show();
      //     document.getElementById('gcodepreview').value = this.result;
      //     printLog('GCODE Opened', msgcolor, "file");
      //     resetView();
      //     setTimeout(function() {
      //       openGCodeFromText();
      //     }, 500);
      //   };
      // } else if (f.name.match(/.stl$/i)) {
      //   //r.readAsText(f);
      //   // Remove the UI elements from last run
      //   console.group("STL File");
      //   var stlloader = new MeshesJS.STLLoader();
      //   r.onload = function(event) {
      //     // cleanupThree();
      //     // Parse ASCII STL
      //     if (typeof r.result === 'string') {
      //       stlloader.loadString(r.result);
      //       return;
      //     }
      //     // buffer reader
      //     var view = new DataView(this.result);
      //     // get faces number
      //     var faces;
      //     try {
      //       faces = view.getUint32(80, true);
      //     } catch (error) {
      //       self.onError(error);
      //       return;
      //     }
      //     // is binary ?
      //     var binary = view.byteLength == (80 + 4 + 50 * faces);
      //     if (!binary) {
      //       // get the file contents as string
      //       // (faster than convert array buffer)
      //       r.readAsText(f);
      //       return;
      //     }
      //     // parse binary STL
      //     stlloader.loadBinaryData(view, faces, 100, window, f);
      //   };
      //   // start reading file as array buffer
      //   r.readAsArrayBuffer(f);
      //   printLog('STL Opened', msgcolor, "file");
      //   console.log("Opened STL, and asking user for Slice settings");
      //   console.groupEnd();
      //   $('#stlslice').modal('show');
    } else if (f.name.match(/\.(gif|jpg|jpeg|tiff|png|bmp)$/i)) {
      r.onload = function(e) {
        traceFromImg(e, f);
        // $('#imageThumb').attr('src', e.target.result);
      }
      r.readAsDataURL(f);

    } else if (f.name.match(/.gtl$/i) || f.name.match(/.gbl$/i) || f.name.match(/.gbr$/i) || f.name.match(/.GTL$/i) || f.name.match(/.GBL$/i) || f.name.match(/.GBR$/i)) {
      // console.log(f.name + " is a DXF file");
      // console.log('Reader: ', r)
      r.readAsText(f);
      r.onload = function(e) {
        var gerbdata = r.result;
        parseGerber(gerbdata, f.name);
        printLog('Gerber Opened');
        resetView();
      };
    } else if (f.name.match(/.txt$/i) || f.name.match(/.TXT$/i)) { // Excellon Drill File
      r.readAsText(f);
      r.onload = function(e) {
        var gerbdata = r.result;
        parseExcellon(gerbdata, f.name);
        printLog('Gerber Opened');
        resetView();
      };
    } else {
      // Not usable
    }
  }
  // $('#filestatus').hide();
  // $('#tree-cam-menu').click();
  if (control) {
    scene.remove(control);
    controls.reset();
  }
  setTimeout(function() {
    fillTree();
  }, 250);
  setTimeout(function() {
    resetView();
  }, 300);
  setTimeout(function() {
    $('#documentstree').show();
    $('#documentactivity').hide();
  }, 400)

}

function saveFile() {
  cfDialog({
    title: "Save GCODE",
    width: 420,
    content: '<label class="cf-dialog-label">Filename:</label>' +
             '<input type="text" class="cf-dialog-input" id="gcodeFilename" value="' + 'file-' + date.yyyymmdd() + '.gcode' + '"/>' +
             '<small class="cf-dialog-hint">What would you like to name the gcode export?</small>',
    actions: [{
        caption: "<span class='fas fa-download'></span> Save",
        cls: "primary",
        onclick: function() {
          saveFileGcode($('#gcodeFilename').val());
        }
      },
      {
        caption: "Cancel",
        cls: "",
        onclick: function() {}
      }
    ]
  });
}

function saveFileGcode(filename) {
  if (!filename.endsWith('.gcode')) {
    filename = filename += '.obc'
  }
  var textToWrite = prepgcodefile();
  var blob = new Blob([textToWrite], {
    type: "text/plain"
  });
  invokeSaveAsDialog(blob, filename);
}

function previewFile() {
  var textToWrite = prepgcodefile().split("\n");

  var content = `<div style="overflow-y: auto; max-height: calc(100vh - 430px);">`
  for (i = 0; i < textToWrite.length; i++) {
    content += `<code>` + textToWrite[i] + `</code><br>`
  }
  content += `</div>`

  cfDialog({
    title: "Preview GCODE",
    content: content,
    actions: [{
        caption: "<span class='fas fa-download'></span> Save",
        cls: "primary",
        onclick: function() {
          saveFile();
        }
      },
      {
        caption: "Cancel",
        cls: "",
        onclick: function() {
          //
        }
      }
    ]
  });
}

/**
 * @param {Blob} file - File or Blob object. This parameter is required.
 * @param {string} fileName - Optional file name e.g. "image.png"
 */
function invokeSaveAsDialog(file, fileName) {
  if (!file) {
    throw 'Blob object is required.';
  }

  if (!file.type) {
    file.type = 'text/plain';
  }

  var fileExtension = file.type.split('/')[1];

  if (fileName && fileName.indexOf('.') !== -1) {
    var splitted = fileName.split('.');
    fileName = splitted[0];
    fileExtension = splitted[1];
  }

  var fileFullName = (fileName || (Math.round(Math.random() * 9999999999) + 888888888)) + '.' + fileExtension;

  if (typeof navigator.msSaveOrOpenBlob !== 'undefined') {
    return navigator.msSaveOrOpenBlob(file, fileFullName);
  } else if (typeof navigator.msSaveBlob !== 'undefined') {
    return navigator.msSaveBlob(file, fileFullName);
  }

  var hyperlink = document.createElement('a');
  hyperlink.href = URL.createObjectURL(file);
  // hyperlink.target = '_blank';
  hyperlink.download = fileFullName;

  if (!!navigator.mozGetUserMedia) {
    hyperlink.onclick = function() {
      (document.body || document.documentElement).removeChild(hyperlink);
    };
    (document.body || document.documentElement).appendChild(hyperlink);
  }

  var evt = new MouseEvent('click', {
    view: window,
    bubbles: true,
    cancelable: true
  });

  hyperlink.dispatchEvent(evt);

  if (!navigator.mozGetUserMedia) {
    URL.revokeObjectURL(hyperlink.href);
  }
}

function printLog(text, color, logclass) {
  if (text.isString) {
    text = text.replace(/\n/g, "<br />");
  }
  console.log(text)
}



function isJson(item) {
  item = typeof item !== "string" ?
    JSON.stringify(item) :
    item;

  try {
    item = JSON.parse(item);
  } catch (e) {
    return false;
  }

  if (typeof item === "object" && item !== null) {
    return true;
  }

  return false;
}

