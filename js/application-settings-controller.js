function ConfirmDelete() {
  var x = confirm("Are you sure you want to restore to factory defaults?");
  if (x) {
    window.localStorage.clear()
    return true;
  } else {
    return false;
  }
}

function initLocalStorage() {
  var settingsOpen = document.getElementById('jsonFile');
  settingsOpen.addEventListener('change', restoreSettingsLocal, false);
  $('#savesettings').on('click', function() {
    saveSettingsLocal();
    cfModalClose('settingsmodal');
  });
  checkSettingsLocal();
}

// FIXME
// A way to access all of the settings
// $("#settings-menu-panel input, #settings-menu-panel textarea, #settings-menu-panel select").each(function() {console.log(this.id + ": " + $(this).val())});

localParams = [
  ['sizexmax', true],
  ['sizeymax', true],
  ['sizezmax', true],
  ['startgcode', false],
  ['laseron', false],
  ['laseroff', false],
  ['endgcode', false],
  ['g0command', true],
  ['g1command', true],
  ['scommandnewline', true],
  ['scommand', true],
  ['scommandscale', true],
  ['ihsgcode', false],
  ['machinetype', true],
  ['performanceLimit', false]
];


// Wrappers for direct access to local storage -- these will get swapped with profiles laster
function saveSetting(setting, value) {
  if (setting == "machinetype") {
    setMachineButton(value)
  }
  localStorage.setItem(setting, value);

};

function loadSetting(setting) {
  return localStorage.getItem(setting);
};


function saveSettingsLocal() {
  console.group("Saving settings to LocalStorage");
  for (i = 0; i < localParams.length; i++) {
    var localParam = localParams[i];
    var paramName = localParam[0];
    if (paramName == 'sizexmax' || paramName == 'sizeymax') {
      var newval = $('#' + paramName).val()
      var oldval = loadSetting(paramName);
      if (oldval != newval) {
        redrawGrid()
      }
    }
    if (paramName == 'scommandnewline') {
      var val = $('#' + paramName).is(":checked");
    } else if (paramName == 'performanceLimit') {
      var val = $('#' + paramName).is(":checked");
    } else {
      var val = $('#' + paramName).val(); // Read the value from form
    }
    printLog('Saving: ' + paramName + ' : ' + val, successcolor);
    saveSetting(paramName, val);
  }
  printLog('<b>Saved Settings: <br>NB:</b> Please refresh page for settings to take effect', errorcolor, "settings");
  // $("#settingsmodal").modal("hide");
  console.groupEnd();

};

function loadSettingsLocal() {
  // console.log("Loading settings from LocalStorage")
  for (i = 0; i < localParams.length; i++) {
    var localParam = localParams[i];
    var paramName = localParam[0];
    var val = loadSetting(paramName);

    if (val) {
      // console.log('Loading: ' + paramName + ' : ' + val);
      if (paramName == 'machinetype') {
        setMachineButton(val)
      }
      if (paramName == 'scommandnewline') {
        $('#' + paramName).prop('checked', parseBoolean(val));
        // console.log('#' + paramName + " is set to " + val)
      } else if (paramName == 'performanceLimit') {
        $('#' + paramName).prop('checked', parseBoolean(val));
        // console.log('#' + paramName + " is set to " + val)
      } else {
        $('#' + paramName).val(val); // Set the value to Form from Storage
      }
    } else {
      // console.log('Not in local storage: ' +  paramName);
    }
  }
  // console.groupEnd();
};

function backupSettingsLocal() {
  var json = JSON.stringify(localStorage)
  var blob = new Blob([json], {
    type: "application/json"
  });
  invokeSaveAsDialog(blob, 'settings-backup.json');
};

function checkSettingsLocal() {
  var anyissues = false;
  // printLog('<b>Checking for configuration :</b><p>', msgcolor, "settings");
  for (i = 0; i < localParams.length; i++) {
    var localParam = localParams[i];
    var paramName = localParam[0];
    var paramRequired = localParam[1];
    var val = $('#' + localParams[i]).val(); // Read the value from form

    if (!val && paramRequired) {
      printLog('Missing required setting: ' + paramName, errorcolor, "settings");
      anyissues = true;

    } else if (!val && !paramRequired) {
      printLog('Missing optional setting: ' + paramName, warncolor, "settings");
    } else {
      // printLog('Found setting: ' + paramName + " : " + val, msgcolor, "settings");
    }
  }


  if (anyissues) {
    // console.log(`<b>MISSING CONFIG: You need to configure your setup. </b>. Click Edit, <a href='#' onclick='Metro.dialog.open('#settingsmodal');'><kbd>Settings <i class="fa fa-cogs"></i></kbd></a> on the top menu bar, and work through all the options`, errorcolor, "settings");
    // $("#settingsmodal").modal("show");
    setTimeout(function() {
cfModalOpen('settingsmodal');
    }, 1000)
  }


};

function restoreSettingsLocal(evt) {
  // console.log('Inside Restore');
  var input, file, fr;

  console.log('event ', evt)
  file = evt.target.files[0];
  fr = new FileReader();
  fr.onload = loadSettings;
  fr.readAsText(file);
};

function loadSettings(e) {
  lines = e.target ? e.target.result : e;
  var o = JSON.parse(lines);
  for (var property in o) {
    if (o.hasOwnProperty(property)) {
      saveSetting(property, o[property]);
    } else {
      // I'm not sure this can happen... I want to log this if it does!
      // console.log("Found a property " + property + " which does not belong to itself.");
    }
  }
  loadSettingsLocal();
};

window.parseBoolean = function(string) {
  var bool;
  bool = (function() {
    switch (false) {
      case string.toLowerCase() !== 'true':
        return true;
      case string.toLowerCase() !== 'false':
        return false;
    }
  })();
  if (typeof bool === "boolean") {
    return bool;
  }
  return void 0;
};


// Settings Dialog


function selectToolhead(type) {
  console.log(this)

  console.log("Selecting toolhead type: ", type)
  if (type == 'router' && $("#hasRouter").is(':checked')) {
    $('#hasPlasma').prop('checked', false);
    $('#hasLaser').prop('checked', false);
    $('#hasPenPlotter').prop('checked', false);
    $('#hasSpindle').prop('checked', false);
    $('#hasSpindleAtSpeed').prop('checked', false);
  } else if (type == 'plasma' && $("#hasPlasma").is(':checked')) {
    $('#hasRouter').prop('checked', false);
    $('#hasLaser').prop('checked', false);
    $('#hasPenPlotter').prop('checked', false);
    $('#hasSpindle').prop('checked', false);
    $('#hasSpindleAtSpeed').prop('checked', false);
  } else if (type == 'laser' && $("#hasLaser").is(':checked')) {
    $('#hasRouter').prop('checked', false);
    $('#hasPlasma').prop('checked', false);
    $('#hasPenPlotter').prop('checked', false);
    $('#hasSpindle').prop('checked', false);
    $('#hasSpindleAtSpeed').prop('checked', false);
  } else if (type == 'penPlotter' && $("#hasPenPlotter").is(':checked')) {
    $('#hasRouter').prop('checked', false);
    $('#hasPlasma').prop('checked', false);
    $('#hasLaser').prop('checked', false);
    $('#hasSpindle').prop('checked', false);
    $('#hasSpindleAtSpeed').prop('checked', false);
  } else if (type == 'spindle' && $("#hasSpindle").is(':checked')) {
    $('#hasRouter').prop('checked', false);
    $('#hasPlasma').prop('checked', false);
    $('#hasLaser').prop('checked', false);
    $('#hasPenPlotter').prop('checked', false);
    $('#hasSpindleAtSpeed').prop('checked', false);
  } else if (type == 'spindleAtSpeed' && $("#hasSpindleAtSpeed").is(':checked')) {
    $('#hasRouter').prop('checked', false);
    $('#hasPlasma').prop('checked', false);
    $('#hasLaser').prop('checked', false);
    $('#hasPenPlotter').prop('checked', false);
    $('#hasSpindle').prop('checked', false);
  }

  // Default grbl parameters
  var tplscommand = `S`;
  $('#scommand').val(tplscommand);
  var tplsscale = `1000`;
  var tplsnewline = false;
  $('#scommandnewline').prop('checked', tplsnewline);
  var tplrapidcommand = `G0`;
  $('#g0command').val(tplrapidcommand);
  var tplmovecommand = `G1`;
  $('#g1command').val(tplmovecommand);

  $('#startgcode').val("");
  $('#endgcode').val("");
  $("#ihsgcode").val("");
  var startcode = `G54; Work Coordinates\nG21; mm-mode\nG90; Absolute Positioning\n`;
  var endcode = "";

  if ($("#hasRouter").is(':checked')) {
    // console.log('Add Spindle')
    startcode += "M3 S" + $('#scommandscale').val() + "; Spindle On\n"
    endcode += "M5 S0; Spindle Off\n"
    $('#scommandscale').val(1000);
    localStorage.setItem("hasRouter", true);
  } else {
    localStorage.setItem("hasRouter", false);
  }

  if ($("#hasSpindle").is(':checked')) {
    // console.log('Add Spindle')
    //startcode += "M3 S" + $('#scommandscale').val() + "; Spindle On\n"
    endcode += "M5 S0; Spindle Off\n"
    $('#scommandscale').val(24000);
    localStorage.setItem("hasSpindle", true);
    localStorage.setItem("hasSpindleAtSpeed", false);
  } else {
    localStorage.setItem("hasSpindle", false);
  }

  if ($("#hasSpindleAtSpeed").is(':checked')) {
    endcode += "M5 S0; Spindle Off\n"
    $('#scommandscale').val(24000);
    localStorage.setItem("hasSpindleAtSpeed", true);
    localStorage.setItem("hasSpindle", false);
  } else {
    if (!$("#hasSpindle").is(':checked')) {
      localStorage.setItem("hasSpindleAtSpeed", false);
    }
  }

  if ($("#hasPlasma").is(':checked')) {
    $("#ihsgcode").val("G38.2 Z-30 F500; Touch off Probe\nG10 L20 Z-3; Set Z Zero\n")
    $('#scommandscale').val(1000);
    var xaxis = 740
    var yaxis = 830
    var zaxis = 80
    $("#sizexmax").val(xaxis)
    $("#sizeymax").val(yaxis)
    $("#sizezmax").val(zaxis)
    localStorage.setItem("hasPlasma", true);
  } else {
    localStorage.setItem("hasPlasma", false);
  }

  if ($("#hasLaser").is(':checked')) {
    // console.log('Add Laser Dynamic')
    startcode += "M4; Dynamic Power Laser On\n"
    endcode += "M5; Laser Off\n"
    $('#scommandscale').val(1000);
    localStorage.setItem("hasLaser", true);
  } else {
    localStorage.setItem("hasLaser", false);
  }

  if ($("#hasPenPlotter").is(':checked')) {
    // console.log('Add Laser Dynamic')
    // startcode += "; Plotter does not need specific startup\n"
    endcode += "G0 X0 Y0; Move back to start Position\n"
    //$('#scommandscale').val(1000);
    localStorage.setItem("hasPenPlotter", true);
  } else {
    localStorage.setItem("hasPenPlotter", false);
  }


  if ($("#hasDust").is(':checked')) {
    // console.log('Add Misting')
    startcode += "M8; Coolant Output On - turns on Dust Extractor if wired\n"
    endcode += "M9; Coolant Output Off  - turns off Dust Extractor if wired\n"
    localStorage.setItem("hasDust", true);
  } else {
    localStorage.setItem("hasDust", false);
  }

  $('#startgcode').val(startcode)
  $('#endgcode').val(endcode)

  console.log("Start GCODE: ", startcode)
  console.log("End GCODE: ", endcode)
  console.log("Plasma Touchoff Macro: ", $("#ihsgcode").val())
}

function setMachineButton(type) {
  // Tick add-on checkboxes
  if (localStorage.getItem("hasPlasma") == 'true') {
    $("#hasPlasma").attr('checked', true)
  }
  if (localStorage.getItem("hasRouter") == 'true') {
    $("#hasRouter").attr('checked', true)
  }
  if (localStorage.getItem("hasSpindle") == 'true') {
    $("#hasSpindle").attr('checked', true)
  }
  if (localStorage.getItem("hasSpindleAtSpeed") == 'true') {
    $("#hasSpindleAtSpeed").attr('checked', true)
  }
  if (localStorage.getItem("hasDust") == 'true') {
    $("#hasDust").attr('checked', true)
  }
  if (localStorage.getItem("hasLaser") == 'true') {
    $("#hasLaser").attr('checked', true)
  }
  if (localStorage.getItem("hasPenPlotter") == 'true') {
    $("#hasPenPlotter").attr('checked', true)
  }

};

$(document).ready(function() {
  var modal = `
  <!-- Settings Modal -->

  <div class="cf-modal-overlay" id="settingsmodal-overlay">
    <div class="cf-modal" id="settingsmodal" style="max-width:830px;">
      <div class="cf-modal-title">Application Settings <span class="cf-modal-close" onclick="cfModalClose('settingsmodal')">&times;</span></div>
      <div class="cf-modal-content" style="max-height: calc(100vh - 200px);overflow-y: auto; overflow-x: hidden;">
      <form>

        <div style="text-align:center">
          <h6>Welcome to CAM Community Fork</h6>
          <p style="font-size:13px;color:#777">Let us help you get set up!</p>
        </div>

        <div class="cf-settings-section">
          <h6>Machine Size</h6>
          <p class="cf-settings-desc">Set your machine's working area dimensions in mm</p>
          <div class="cf-settings-row" style="display:flex;gap:12px">
            <div style="flex:1">
              <label class="cf-settings-label">Width (X-Axis)</label>
              <input type="number" class="cf-input" id="sizexmax" value="200" step="any">
              <span class="cf-input-suffix">mm</span>
            </div>
            <div style="flex:1">
              <label class="cf-settings-label">Depth (Y-Axis)</label>
              <input type="number" class="cf-input" id="sizeymax" value="200" step="any">
              <span class="cf-input-suffix">mm</span>
            </div>
            <div style="flex:1">
              <label class="cf-settings-label">Height (Z-Axis)</label>
              <input type="number" class="cf-input" id="sizezmax" value="100" step="any">
              <span class="cf-input-suffix">mm</span>
            </div>
          </div>
          <input type="hidden" id="machinetype" value="custom">
        </div>

        <div class="cf-settings-section">
          <h6>Add-Ons Installed</h6>
          <p class="cf-settings-desc">Select the attachments your machine has so we can generate appropriate G-Code</p>

          <div class="cf-check-col">
            <label class="cf-check-row">
              <input type="checkbox" onchange="selectToolhead('router')" id="hasRouter" />
              <span class="cf-check-mark"></span>
              <span class="cf-check-text">Router</span>
            </label>
            <label class="cf-check-row">
              <input type="checkbox" onchange="selectToolhead('plasma')" id="hasPlasma" />
              <span class="cf-check-mark"></span>
              <span class="cf-check-text">Plasma Cutter</span>
            </label>
            <label class="cf-check-row">
              <input type="checkbox" onchange="selectToolhead('laser')" id="hasLaser" />
              <span class="cf-check-mark"></span>
              <span class="cf-check-text">Laser Diode Module</span>
            </label>
            <label class="cf-check-row">
              <input type="checkbox" onchange="selectToolhead('penPlotter')" id="hasPenPlotter" />
              <span class="cf-check-mark"></span>
              <span class="cf-check-text">Pen Lift</span>
            </label>
            <label class="cf-check-row">
              <input type="checkbox" onchange="selectToolhead('spindle')" id="hasSpindle" />
              <span class="cf-check-mark"></span>
              <span class="cf-check-text">Variable Speed Spindle</span>
            </label>
            <label class="cf-check-row">
              <input type="checkbox" onchange="selectToolhead('spindleAtSpeed')" id="hasSpindleAtSpeed" />
              <span class="cf-check-mark"></span>
              <span class="cf-check-text">Variable Speed Spindle (At-Speed)</span>
            </label>
            <label class="cf-check-row">
              <input type="checkbox" onchange="selectToolhead('dust')" id="hasDust" />
              <span class="cf-check-mark"></span>
              <span class="cf-check-text">Dust Shoe with Extractor</span>
            </label>
          </div>
        </div>

        <div class="cf-settings-section">
          <h6>Advanced Settings</h6>
          <p class="cf-settings-desc">Customise G-Code commands and other advanced options</p>

          <button class="cf-btn" id="collapse_toggle_2" type="button" onclick="$('#advanced-settings').toggleClass('cf-hidden');$('#collapse_toggle_2').text($('#advanced-settings').hasClass('cf-hidden')?'Show Advanced Settings':'Hide Advanced Settings')">Show Advanced Settings</button>

          <div id="advanced-settings" class="cf-hidden" style="margin-top:8px">

            <div class="cf-adv-row">
              <label class="cf-adv-label">Spindle / Laser / Plasma Command</label>
              <input type="text" class="cf-input" id="scommand" value="S">
            </div>

            <div class="cf-adv-row">
              <label class="cf-adv-label">Power/Speed Scale</label>
              <input type="number" class="cf-input" id="scommandscale" value="1000" step="any">
            </div>

            <div class="cf-adv-row">
              <label class="cf-adv-label">Power/Speed on new-line</label>
              <label class="cf-check-row">
                <input type="checkbox" id="scommandnewline" value="option1">
                <span class="cf-check-mark"></span>
                <span class="cf-check-text">Enable</span>
              </label>
            </div>

            <div class="cf-adv-row">
              <label class="cf-adv-label">Rapid Move Command</label>
              <input type="text" class="cf-input" id="g0command" value="G0">
            </div>

            <div class="cf-adv-row">
              <label class="cf-adv-label">Linear Move Command</label>
              <input type="text" class="cf-input" id="g1command" value="G1">
            </div>

            <div class="cf-adv-row">
              <label class="cf-adv-label">Start G-Code</label>
              <textarea class="cf-textarea" id="startgcode" placeholder="For example M4 G28 G90 M80 - supports multi line commands"></textarea>
            </div>

            <div class="cf-adv-row">
              <label class="cf-adv-label">End G-Code</label>
              <textarea class="cf-textarea" id="endgcode" placeholder="For example M5 M81 G28 - supports multi line commands"></textarea>
            </div>

            <div class="cf-adv-row">
              <label class="cf-adv-label">Plasma: Touch Off Sequence</label>
              <textarea class="cf-textarea" id="ihsgcode" placeholder="G0 + clearanceHeight + \nG38.2 Z-30 F100\nG10 L20 P1 Z0"></textarea>
            </div>

            <div class="cf-adv-row">
              <label class="cf-adv-label">Performance: Disable Tool-Width Preview</label>
              <div>
                <label class="cf-check-row">
                  <input type="checkbox" id="performanceLimit" value="option1">
                  <span class="cf-check-mark"></span>
                  <span class="cf-check-text">Disable preview</span>
                </label>
                <p class="cf-settings-desc" style="margin-top:4px">
                  This can speed up toolpath calculations, but will
                  disable the toolpath-width preview: You'll only see
                  the centerline of the toolpath, not the width of the
                  cut. Helps slow PCs work better.
                </p>
              </div>
            </div>

          </div>
        </div>

        </form>
    </div>
    <div class="cf-modal-footer">
      <button class="cf-btn" onclick="cfModalClose('settingsmodal')" type="button">Cancel</button>
      <button id="savesettings" type="button" class="cf-btn cf-btn-green">Save</button>
    </div>
  </div>
  </div>
  <!-- #settingsmodal -->
  `
  $("body").append(modal);
});