function typeofOperation(newval, objectseq) {
  if (newval == "... Select Operation ...") {
    noMode(objectseq);
    updateCamUserData(objectseq);
  } else if (newval == "Laser: Vector (no path offset)") {
    laserMode(objectseq);
    updateCamUserData(objectseq);
  } else if (newval == "Laser: Vector (path inside)") {
    laserInsideMode(objectseq);
    updateCamUserData(objectseq);
  } else if (newval == "Laser: Vector (path outside)") {
    laserOutsideMode(objectseq);
    updateCamUserData(objectseq);
  } else if (newval == "Laser: Vector (raster fill) (Beta)") {
    laserRasterMode(objectseq);
    updateCamUserData(objectseq);
  } else if (newval == "Drill: Peck (Centered)") {
    drillPeckMode(objectseq);
    updateCamUserData(objectseq);
  } else if (newval == "Drill: Continuous (Centered)") {
    drillMode(objectseq);
    updateCamUserData(objectseq);
  } else if (newval == "CNC: Vector (no offset)") {
    cncNoOffsetMode(objectseq);
    updateCamUserData(objectseq);
  } else if (newval == "CNC: Vector (path outside)") {
    cncOutsideMode(objectseq);
    updateCamUserData(objectseq);
  } else if (newval == "CNC: Vector (path inside)") {
    cncInsideMode(objectseq);
    updateCamUserData(objectseq);
  } else if (newval == "CNC: Pocket") {
    cncPocketMode(objectseq);
    updateCamUserData(objectseq);
  } else if (newval == "CNC: Pocket (Raster)") {
    cncPocketRasterMode(objectseq);
    updateCamUserData(objectseq);
  } else if (newval == "CNC: Texture") {
    cncTextureMode(objectseq);
    updateCamUserData(objectseq);
  } else if (newval == "CNC: V-Engrave") {
    cncVEngMode(objectseq);
    updateCamUserData(objectseq);
  } else if (newval == "Plasma: Vector (path outside)") {
    plasmaMode(objectseq);
    updateCamUserData(objectseq);
  } else if (newval == "Plasma: Vector (path inside)") {
    plasmaMode(objectseq);
    updateCamUserData(objectseq);
  } else if (newval == "Plasma: Vector (no path offset)") {
    plasmaMode(objectseq);
    updateCamUserData(objectseq);
  } else if (newval == "Drag Knife: Cutout") {
    dragKnifeMode(objectseq);
    updateCamUserData(objectseq);
  } else if (newval == "Pen Plotter: (no offset)") {
    plotterMode(objectseq);
    updateCamUserData(objectseq);
  } else if (newval == "Pen Plotter: (path inside)") {
    plotterMode(objectseq);
    updateCamUserData(objectseq);
  } else if (newval == "Pen Plotter: (path outside)") {
    plotterMode(objectseq);
    updateCamUserData(objectseq);
  } else if (newval == "Pen Plotter: (lines fill)") {
    penRasterMode(objectseq);
    updateCamUserData(objectseq);
  }


}

function initAdvancedCAM() {
  $('#statusBody2').on('keyup change', 'input, select', function() {
    // console.log('Action')
    var inputVal = $(this).val();
    var newval = inputVal
    var id = $(this).attr('id');
    // console.log(id)
    var objectseq = $(this).attr('objectseq');
    // console.log('Value for ' +id+ ' changed to ' +newval+ ' for object ' +objectseq );
    if (id.indexOf('tzstep') == 0) {
      updateCamUserData(objectseq);
    } else if (id.indexOf('tzdepth') == 0) {
      updateCamUserData(objectseq);
    } else if (id.indexOf('tspeed') == 0) {
      updateCamUserData(objectseq);
    } else if (id.indexOf('tplungespeed') == 0) {
      updateCamUserData(objectseq);
    } else if (id.indexOf('ttooldia') == 0) {
      updateCamUserData(objectseq);
    } else if (id.indexOf('tstepover') == 0) {
      updateCamUserData(objectseq);
    } else if (id.indexOf('tclearanceHeight') == 0) {
      updateCamUserData(objectseq);
    } else if (id.indexOf('tstartHeight') == 0) {
      updateCamUserData(objectseq);
    } else if (id.indexOf('tPasses') == 0) {
      updateCamUserData(objectseq);
    } else if (id.indexOf('tdragoffset') == 0) {
      updateCamUserData(objectseq);
    } else if (id.indexOf('tspotsize') == 0) {
      updateCamUserData(objectseq);
    } else if (id.indexOf('tfillAngle') == 0) {
      updateCamUserData(objectseq);
    } else if (id.indexOf('tplasmakerf') == 0) {
      updateCamUserData(objectseq);
    } else if (id.indexOf('tplasmazheight') == 0) {
      updateCamUserData(objectseq);
    } else if (id.indexOf('tplasmapierceheight') == 0) {
      updateCamUserData(objectseq);
    } else if (id.indexOf('tplasmapiercedelay') == 0) {
      updateCamUserData(objectseq);
    } else if (id.indexOf('tplasmaleadin') == 0) {
      updateCamUserData(objectseq);
    } else if (id.indexOf('tplasmaihs') == 0) {
      updateCamUserData(objectseq);
    } else if (id.indexOf('tdirection') == 0) {
      updateCamUserData(objectseq);
    } else if (id.indexOf('tunion') == 0) {
      updateCamUserData(objectseq);
    } else if (id.indexOf('tabdepth') == 0) {
      updateCamUserData(objectseq);
    } else if (id.indexOf('tabWidth') == 0) {
      updateCamUserData(objectseq);
    } else if (id.indexOf('tabSpace') == 0) {
      updateCamUserData(objectseq);
    } else if (id.indexOf('tOpName') == 0) {
      updateCamUserData(objectseq);
    } else if (id.indexOf('tRampPlunge') == 0) {
      updateCamUserData(objectseq);
    } else if (id.indexOf('ttexturetype') == 0) {
      updateCamUserData(objectseq);
    } else if (id.indexOf('ttexturespacing') == 0) {
      updateCamUserData(objectseq);
    } else if (id.indexOf('ttextureamplitude') == 0) {
      updateCamUserData(objectseq);
    } else if (id.indexOf('ttextureangle') == 0) {
      updateCamUserData(objectseq);
    } else if (id.indexOf('advanced') == 0) {
      updateCamUserData(objectseq);
    } else if (id.indexOf('tpwr') == 0) {
      updateCamUserData(objectseq);
    } else if (id.indexOf('trpm') == 0) {
      updateCamUserData(objectseq);
    } else if (id.indexOf('tToolNumber') == 0) {
      updateCamUserData(objectseq);
    } else if (id.indexOf('tpendown') == 0) {
      updateCamUserData(objectseq);
    } else if (id.indexOf('tpentime') == 0) {
      updateCamUserData(objectseq);
    } else if (id.indexOf('tpenup') == 0) {
      updateCamUserData(objectseq);
    } else if (id.indexOf('tpendownz') == 0) {
      updateCamUserData(objectseq);
    } else if (id.indexOf('tpenupz') == 0) {
      updateCamUserData(objectseq);
    } else if (id.indexOf('tplottertype') == 0) {
      console.log('Value for ' + id + ' changed to ' + newval + ' for object ' + objectseq);
      updateCamUserData(objectseq);
      if (newval == "Z-Axis") {
        plotterModeZ(i)
      } else {
        plotterModeServo(i)
      }
    }

  });

  $('#statusBody2').on('keyup change', 'select', function() {
    var newval = $(this).val();
    var id = $(this).attr('id');
    var objectseq = $(this).attr('objectseq');
    // console.log('Value for ' +id+ ' changed to ' +newval+ ' for object ' +objectseq );
    if (id.indexOf('toperation') == 0) {
      typeofOperation(newval, objectseq)
    };

  });
};

function updateCamUserData(i) {
  toolpathsInScene[i].userData.camOperation = $('#toperation' + i).val();
  toolpathsInScene[i].userData.camToolDia = $('#ttooldia' + i).val();
  toolpathsInScene[i].userData.camStepover = $('#tstepover' + i).val();
  toolpathsInScene[i].userData.camZClearance = $('#tclearanceHeight' + i).val();
  toolpathsInScene[i].userData.camZStart = $('#tstartHeight' + i).val();
  toolpathsInScene[i].userData.camPasses = $('#tPasses' + i).val();
  toolpathsInScene[i].userData.camDragOffset = $('#tdragoffset' + i).val();
  toolpathsInScene[i].userData.camLaserPower = $('#tpwr' + i).val();
  toolpathsInScene[i].userData.camSpindleRpm = $('#trpm' + i).val();
  toolpathsInScene[i].userData.camToolNumber = $('#tToolNumber' + i).val();
  toolpathsInScene[i].userData.camZStep = $('#tzstep' + i).val();
  toolpathsInScene[i].userData.camZDepth = $('#tzdepth' + i).val();
  toolpathsInScene[i].userData.camFeedrate = $('#tspeed' + i).val();
  toolpathsInScene[i].userData.camPlungerate = $('#tplungespeed' + i).val();
  toolpathsInScene[i].userData.camPlasmaKerf = $('#tplasmakerf' + i).val();
  toolpathsInScene[i].userData.camPlasmaZHeight = $('#tplasmazheight' + i).val();
  toolpathsInScene[i].userData.camPlasmaPierceHeight = $('#tplasmapierceheight' + i).val();
  toolpathsInScene[i].userData.camPlasmaPierceDelay = $('#tplasmapiercedelay' + i).val();
  toolpathsInScene[i].userData.camPlasmaLeadinDist = $('#tplasmaleadin' + i).val();
  toolpathsInScene[i].userData.camPlasmaIHS = $('#tplasmaihs' + i).val();
  toolpathsInScene[i].userData.camUnion = $('#tunion' + i).val();
  toolpathsInScene[i].userData.camDirection = $('#tdirection' + i).val();
  toolpathsInScene[i].userData.camSpotSize = $('#tspotsize' + i).val();
  toolpathsInScene[i].userData.camFillAngle = $('#tfillAngle' + i).val();
  toolpathsInScene[i].userData.camTabDepth = $('#tabdepth' + i).val();
  toolpathsInScene[i].userData.camTabWidth = $('#tabWidth' + i).val();
  toolpathsInScene[i].userData.camTabSpace = $('#tabSpace' + i).val();
  toolpathsInScene[i].userData.tRampPlunge = $('#tRampPlunge' + i).val();
  toolpathsInScene[i].userData.camTextureType = $('#ttexturetype' + i).val();
  toolpathsInScene[i].userData.camTextureSpacing = $('#ttexturespacing' + i).val();
  toolpathsInScene[i].userData.camTextureAmplitude = $('#ttextureamplitude' + i).val();
  toolpathsInScene[i].userData.camTextureAngle = $('#ttextureangle' + i).val();
  toolpathsInScene[i].userData.plotterType = $('#tplottertype' + i).val();
  toolpathsInScene[i].userData.camPenUp = $('#tpenup' + i).val();
  toolpathsInScene[i].userData.camPenDown = $('#tpendown' + i).val();
  toolpathsInScene[i].userData.camPenTime = $('#tpentime' + i).val();
  toolpathsInScene[i].userData.camPenUpZ = $('#tpenupz' + i).val();
  toolpathsInScene[i].userData.camPenDownZ = $('#tpendownz' + i).val();
  toolpathsInScene[i].userData.advanced = $('#advanced' + i).is(":checked");; // Marlin, Stepcraft, Mach3, LinuxCNC
  toolpathsInScene[i].name = $('#tOpName' + i).val();
  $('#statusTitle').html('Configure Toolpath: ' + toolpathsInScene[i].userData.camOperation);

  // store last used values in localStorage
  localStorage.setItem('lastCamOperation', JSON.stringify(toolpathsInScene[i].userData, inflatedReplacer));

};

function inflatedReplacer(key, value) {
  if (key == "inflated") return undefined;
  else if (key == "pretty") return undefined;
  else return value;
}


function setupJob(i) {

  // $('#statusmodal').modal('show');
  Metro.dialog.open('#statusmodal')
  $('#statusTitle').empty();
  $('#statusTitle').html('Configure Toolpath: ');
  $('#statusBody').empty();
  $('#statusBody2').empty();

  // $('#statusBody').html('' );
  var template2 = `
    <div id="toolpathWarnings"></div>
    <table class="table striped compact">
      <tr>
        <td style="width:120px">Name:</td>
        <td><input data-role="input" autofocus type="text" class="cam-form-field" value="` + toolpathsInScene[i].name + `" id="tOpName` + i + `" objectseq="` + i + `"></td>
      </tr>
      <tr>
        <td>Operation:</td>
        <td>
          <select class="cam-form-field camOperationSelect" id="toperation` + i + `" objectseq="` + i + `" style="width:100%;">
              <option>... Select Operation ...</option>
              <optgroup label="Laser" class="camOptgroup">
                <option class="camOption">Laser: Vector (no path offset)</option>
                <option class="camOption">Laser: Vector (path inside)</option>
                <option class="camOption">Laser: Vector (path outside)</option>
                <option class="camOption">Laser: Vector (raster fill) (Beta)</option>
              </optgroup>
              <optgroup label="Milling / Routing" class="camOptgroup">
                <option class="camOption">CNC: Vector (no offset)</option>
                <option class="camOption">CNC: Vector (path inside)</option>
                <option class="camOption">CNC: Vector (path outside)</option>
                <option class="camOption">CNC: Pocket</option>
                <option class="camOption">CNC: Pocket (Raster)</option>
                <option class="camOption">CNC: Texture</option>
              </optgroup>
              <optgroup label="Plasma" class="camOptgroup">
                <option class="camOption">Plasma: Vector (path outside)</option>
                <option class="camOption">Plasma: Vector (path inside)</option>
                <option class="camOption">Plasma: Vector (no path offset)</option>
              </optgroup>
              <optgroup label="Drilling" class="camOptgroup">
                <option class="camOption">Drill: Peck (Centered)</option>
                <option class="camOption">Drill: Continuous (Centered)</option>
              </optgroup>
              <optgroup label="Other" class="camOptgroup">
                <option class="camOption">Drag Knife: Cutout</option>
                <option class="camOption">Pen Plotter: (no offset)</option>
                <option class="camOption">Pen Plotter: (path inside)</option>
                <option class="camOption">Pen Plotter: (path outside)</option>
                <option class="camOption">Pen Plotter: (lines fill)</option>
              </optgroup>
            </select>
        </td>
      </tr>
    </table>
    <table class="table striped compact inputtexture">
      <tr>
        <td style="width:120px">Texture Type</td>
        <td>
          <div class="input-addon">
            <select class="cam-form-field" id="ttexturetype` + i + `" objectseq="` + i + `" style="width:100%;">
              <option>Linear Sweep</option>
              <option>Crosshatch</option>
              <option>Peck Grid</option>
              <option>Diamond Plate</option>
              <option>Sine Ripple</option>
              <option>Radial Ripple</option>
              <option>Random Stipple</option>
            </select>
          </div>
        </td>
      </tr>
      <tr>
        <td>Spacing / Resolution</td>
        <td>
          <div class="input-addon">
            <input data-role="input" data-clear-button="false" type="number" class="cam-form-field" value="2" id="ttexturespacing` + i + `" objectseq="` + i + `" min="0.1" step="any">
            <span class="input-addon-label-right">mm</span>
          </div>
        </td>
      </tr>
      <tr>
        <td>Amplitude / Z Variation</td>
        <td>
          <div class="input-addon">
            <input data-role="input" data-clear-button="false" type="number" class="cam-form-field" value="0.5" id="ttextureamplitude` + i + `" objectseq="` + i + `" min="0" step="any">
            <span class="input-addon-label-right">mm</span>
          </div>
        </td>
      </tr>
      <tr>
        <td>Pattern Angle</td>
        <td>
          <div class="input-addon">
            <input data-role="input" data-clear-button="false" type="number" class="cam-form-field" value="0" id="ttextureangle` + i + `" objectseq="` + i + `" min="0" max="180" step="any">
            <span class="input-addon-label-right">deg</span>
          </div>
        </td>
      </tr>
    </table>
    <table class="table striped compact">
      <tr class="inputcnc inputpocket inputtooldia inputdrill inputplotter">
        <td style="width:120px">Endmill / Pen Diameter</td>
        <td>
          <div class="input-addon">
            <span class="input-addon-label-left"><img class="fa-fw" src="images/endmilldia.svg" width="16px" height="16px"></span>
            <input data-role="input" data-clear-button="false" type="number" class="cam-form-field" value="6.35" id="ttooldia` + i + `" objectseq="` + i + `" min="0" step="any">
            <span class="input-addon-label-right">mm</span>
          </div>
        </td>
      </tr>
      <tr class="inputpocket">
        <td>Stepover</td>
        <td>
          <div class="input-addon">
            <span class="input-addon-label-left"><img class="fa-fw" src="images/endmilldia.svg" width="16px" height="16px"></span>
            <input data-role="input" data-clear-button="false" type="number" class="cam-form-field" value="40" id="tstepover` + i + `" objectseq="` + i + `" min="0" step="any">
            <span class="input-addon-label-right">%</span>
          </div>
        </td>
      </tr>
      <tr class="inputcnc inputpocket inputplasma inputdragknife inputlaser inputlaserraster inputdrill">
        <td>Z Safe Height</td>
        <td>
          <div class="input-addon">
            <span class="input-addon-label-left"><span class="fas fa-arrows-alt-v"></span></span>
            <input data-role="input" data-clear-button="false" type="number" class="cam-form-field" value="10" id="tclearanceHeight` + i + `" objectseq="` + i + `" min="0" step="any">
            <span class="input-addon-label-right">mm</span>
          </div>
        </td>
      </tr>
      <tr class="inputdragknife">
        <td>Center Offset</td>
        <td>
          <div class="input-addon">
            <span class="input-addon-label-left"><img class="fa-fw" src="images/dragoffset.svg" width="16px" height="16px"></span>
            <input data-role="input" data-clear-button="false" type="number" class="cam-form-field" value="1" id="tdragoffset` + i + `" objectseq="` + i + `" min="0" step="any">
            <span class="input-addon-label-right">mm</span>
          </div>
        </td>
      </tr>
      <tr class="inputlaser inputlaserraster">
        <td>Laser Power</td>
        <td>
          <div class="input-addon">
            <span class="input-addon-label-left"><span class="fas fa-tachometer-alt"></span></span>
            <input data-role="input" data-clear-button="false" type="number" class="cam-form-field" value="100" id="tpwr` + i + `" objectseq="` + i + `" min="1" max="100" step="any">
            <span class="input-addon-label-right">%</span>
          </div>
        </td>
      </tr>
      <tr class="inputcnc inputpocket inputdrill">
        <td>Spindle RPM</td>
        <td>
          <div class="input-addon">
            <span class="input-addon-label-left"><span class="fas fa-tachometer-alt"></span></span>
            <input data-role="input" data-clear-button="false" type="number" class="cam-form-field" value="1000" id="trpm` + i + `" objectseq="` + i + `" min="1" max="36000" step="any">
            <span class="input-addon-label-right">rpm</span>
          </div>
        </td>
      </tr>
      <tr class="inputcnc inputpocket inputdrill">
        <td>Tool Number</td>
        <td>
          <div class="input-addon">
            <span class="input-addon-label-left"><span class="fas fa-toolbox"></span></span>
            <input data-role="input" data-clear-button="false" type="number" class="cam-form-field" value="" id="tToolNumber` + i + `" objectseq="` + i + `" min="0" max="99" step="1" placeholder="1">
            <span class="input-addon-label-right">T#</span>
          </div>
        </td>
      </tr>
      <tr class="inputlaser inputlaserraster inputpenraster">
        <td>Kerf / Line Spacing</td>
        <td>
          <div class="input-addon">
            <span class="input-addon-label-left"><img class="fa-fw" src="images/kerf.svg" width="16px" height="16px"></span>
            <input data-role="input" data-clear-button="false" type="number" class="cam-form-field" value="0.1" id="tspotsize` + i + `" objectseq="` + i + `" min="0.1" max="5" step="any">
            <span class="input-addon-label-right">mm</span>
          </div>
        </td>
      </tr>
      <tr class="inputlaserraster inputpenraster inputpocketraster">
        <td>Fill Angle</td>
        <td>
          <div class="input-addon">
            <span class="input-addon-label-left"><img class="fa-fw" src="images/protractor.svg" width="16px" height="16px"></span>
            <input data-role="input" data-clear-button="false" type="number" class="cam-form-field" value="0" id="tfillAngle` + i + `" objectseq="` + i + `" min="0.1" max="5" step="any">
            <span class="input-addon-label-right">deg</span>
          </div>
        </td>
      </tr>
      <tr class="inputcnc inputpocket inputdrillpeck">
        <td>Cut Depth per Pass</td>
        <td>
          <div class="input-addon">
            <span class="input-addon-label-left"><span class="fas fa-sort-amount-down"></span></span>
            <input data-role="input" data-clear-button="false" type="number" class="cam-form-field" id="tzstep` + i + `" value="1" objectseq="` + i + `" min="0" step="any">
            <span class="input-addon-label-right">mm</span>
          </div>
        </td>
      </tr>
      <tr class="inputcnc inputpocket inputdrill">
        <td>Cut Depth Final</td>
        <td>
          <div class="input-addon">
            <span class="input-addon-label-left"><span class="fas fa-level-down-alt"></span></span>
            <input data-role="input" data-clear-button="false" type="number" class="cam-form-field" id="tzdepth` + i + `" value="6" objectseq="` + i + `" min="0" step="any">
            <span class="input-addon-label-right">mm</span>
          </div>
        </td>
      </tr>
      <tr class="inputcnc inputpocket inputdragknife inputlaser inputlaserraster inputplasma inputplotter inputpenraster">
        <td>Feedrate (X/Y)</td>
        <td>
          <div class="input-addon">
            <span class="input-addon-label-left"><span class="fas fa-exchange-alt"></span></span>
            <input data-role="input" data-clear-button="false" type="number" class="cam-form-field" value="1000" id="tspeed` + i + `" objectseq="` + i + `" min="0" step="any">
            <span class="input-addon-label-right">mm/min</span>
          </div>
        </td>
      </tr>
      <tr class="inputcnc inputplasma inputpocket inputdrill">
        <td>Feedrate Plunge</td>
        <td>
          <div class="input-addon">
            <span class="input-addon-label-left"><span class="fas fa-arrow-down"></span></span>
            <input data-role="input" data-clear-button="false" type="number" class="cam-form-field" value="300" id="tplungespeed` + i + `" objectseq="` + i + `" min="0" step="any">
            <span class="input-addon-label-right">mm/min</span>
          </div>
        </td>
      </tr>
      <tr class="inputplasma">
        <td>Plasma Kerf</td>
        <td>
          <div class="input-addon">
            <span class="input-addon-label-left"><img class="fa-fw" src="images/kerf.svg" width="16px" height="16px"></span>
            <input data-role="input" data-clear-button="false" type="number" class="cam-form-field" value="1.2" id="tplasmakerf` + i + `" objectseq="` + i + `" min="0" step="any">
            <span class="input-addon-label-right">mm</span>
          </div>
        </td>
      </tr>
      <tr class="inputplasma">
        <td>Pierce Height</td>
        <td>
          <div class="input-addon">
            <span class="input-addon-label-left"><span class="fas fa-meteor"></span></span>
            <input data-role="input" data-clear-button="false" type="number" class="cam-form-field" value="4" id="tplasmapierceheight` + i + `" objectseq="` + i + `" min="0" step="any">
            <span class="input-addon-label-right">mm</span>
          </div>
        </td>
      </tr>
      <tr class="inputplasma">
        <td>Pierce Delay</td>
        <td>
          <div class="input-addon">
            <span class="input-addon-label-left"><span class="far fa-clock"></span></span>
            <input data-role="input" data-clear-button="false" type="number" class="cam-form-field" value="1.5" id="tplasmapiercedelay` + i + `" objectseq="` + i + `" min="0" step="any">
            <span class="input-addon-label-right">sec</span>
          </div>
        </td>
      </tr>
      <tr class="inputplasma">
        <td>Cut Height</td>
        <td>
          <div class="input-addon">
            <span class="input-addon-label-left"><span class="fas fa-arrows-alt-v"></span></span>
            <input data-role="input" data-clear-button="false" type="number" class="cam-form-field" value="1.5" id="tplasmazheight` + i + `" objectseq="` + i + `" min="0" step="any">
            <span class="input-addon-label-right">mm</span>
          </div>
        </td>
      </tr>
      <tr class="inputplasma">
        <td>Lead-In Distance</td>
        <td>
          <div class="input-addon">
            <span class="input-addon-label-left"><span class="fas fa-drafting-compass"></span></span>
            <input data-role="input" data-clear-button="false" type="number" class="cam-form-field" value="5" id="tplasmaleadin` + i + `" objectseq="` + i + `" min="0" step="any">
            <span class="input-addon-label-right">mm</span>
          </div>
        </td>
      </tr>
      <tr class="inputplasma">
        <td>Touch-Off Zero</td>
        <td>
          <div class="input-addon">
            <span class="input-addon-label-left"><span class="far fa-arrow-alt-circle-down"></span></span>
            <select class="cam-form-field" id="tplasmaihs` + i + `" objectseq="` + i + `" style="width:100%;">
              <option selected>No</option>
              <option>Yes</option>
            </select>
          </div>
        </td>
      </tr>
      <tr class="inputplotter inputpenraster">
        <td>Plotter Type</td>
        <td>
          <div class="input-addon">
            <span class="input-addon-label-left"><span class="fas fa-pen-fancy"></span></span>
            <select class="cam-form-field" id="tplottertype` + i + `" objectseq="` + i + `" style="width:100%;">
              <option selected>Z-Axis</option>
              <option>RC Servo</option>
            </select>
          </div>
        </td>
      </tr>
      <tr class="inputplotter inputpenraster inputpenservo">
        <td>Pen Up S-Value</td>
        <td>
          <div class="input-addon">
            <input data-role="input" data-clear-button="false" type="number" class="cam-form-field" value="255" id="tpenup` + i + `" objectseq="` + i + `" min="0" step="any">
            <span class="input-addon-label-right">M3S</span>
          </div>
        </td>
      </tr>
      <tr class="inputplotter inputpenraster inputpenservo">
        <td>Pen Down S-Value</td>
        <td>
          <div class="input-addon">
            <input data-role="input" data-clear-button="false" type="number" class="cam-form-field" value="0" id="tpendown` + i + `" objectseq="` + i + `" min="0" step="any">
            <span class="input-addon-label-right">M3S</span>
          </div>
        </td>
      </tr>
      <tr class="inputplotter inputpenraster inputpenservo">
        <td>Pen Move Time</td>
        <td>
          <div class="input-addon">
            <span class="input-addon-label-left"><span class="fas fa-clock"></span></span>
            <input data-role="input" data-clear-button="false" type="number" class="cam-form-field" value="500" id="tpentime` + i + `" objectseq="` + i + `" min="0" step="any">
            <span class="input-addon-label-right">ms</span>
          </div>
        </td>
      </tr>
      <tr class="inputplotter inputpenraster inputpenz">
        <td>Pen Up Z</td>
        <td>
          <div class="input-addon">
            <input data-role="input" data-clear-button="false" type="number" class="cam-form-field" value="5" id="tpenupz` + i + `" objectseq="` + i + `" min="0" step="any">
            <span class="input-addon-label-right">mm</span>
          </div>
        </td>
      </tr>
      <tr class="inputplotter inputpenraster inputpenz">
        <td>Pen Down Z</td>
        <td>
          <div class="input-addon">
            <input data-role="input" data-clear-button="false" type="number" class="cam-form-field" value="0" id="tpendownz` + i + `" objectseq="` + i + `" min="0" step="any">
            <span class="input-addon-label-right">mm</span>
          </div>
        </td>
      </tr>
    </table>

    <table class="table striped compact">
      <tr class="inputcnc inputpocket inputplasma inputdragknife inputlaser inputlasernooffset">
        <td style="width:120px">Cutting Direction</td>
        <td>
          <select class="cam-form-field" id="tdirection` + i + `" objectseq="` + i + `" style="width:100%;">
            <option selected>Climb</option>
            <option>Conventional</option>
          </select>
        </td>
      </tr>
      <tr class="inputplasma inputcnc inputpocket inputdragknife inputlaser inputlasernooffset">
        <td>Geometry Merge</td>
        <td>
          <select class="cam-form-field" id="tunion` + i + `" objectseq="` + i + `" style="width:100%;">
            <option selected>No</option>
            <option>Yes</option>
          </select>
        </td>
      </tr>
      <tr class="inputcnc inputpocket">
        <td>Ramp Plunge <span class="fg-red">[beta]</span></td>
        <td>
          <select class="cam-form-field" id="tRampPlunge` + i + `" objectseq="` + i + `" style="width:100%;">
            <option selected>No</option>
            <option>Yes</option>
          </select>
        </td>
      </tr>
    </table>

    <div class="mt-1">
      <input type="checkbox" data-role="switch" data-caption="Advanced Settings" id="advanced` + i + `" objectseq="` + i + `">
    </div>
    <div data-role="collapse" data-collapsed="true" data-toggle-element="#advanced` + i + `" id="collapsediv` + i + `">
      <table class="table striped compact">
        <tr class="inputcnc inputpocket">
          <td style="width:120px">Cut Depth: Start</td>
          <td>
            <div class="input-addon">
              <span class="input-addon-label-left"><span class="fas fa-indent"></span></span>
              <input data-role="input" data-clear-button="false" type="number" class="cam-form-field" value="0" id="tstartHeight` + i + `" objectseq="` + i + `" min="1" step="any">
              <span class="input-addon-label-right">mm</span>
            </div>
          </td>
        </tr>
        <tr class="inputlaser inputlaserraster">
          <td>Multiple Passes</td>
          <td>
            <div class="input-addon">
              <span class="input-addon-label-left"><span class="fas fa-sort-amount-down"></span></span>
              <input data-role="input" data-clear-button="false" type="number" class="cam-form-field" value="1" id="tPasses` + i + `" objectseq="` + i + `" min="1" step="any">
              <span class="input-addon-label-right">x</span>
            </div>
          </td>
        </tr>
        <tr class="inputcnc">
          <td>Tab Height</td>
          <td>
            <div class="input-addon">
              <span class="input-addon-label-left"><span class="fas fa-text-height"></span></span>
              <input data-role="input" data-clear-button="false" type="number" class="cam-form-field" value="0" id="tabdepth` + i + `" objectseq="` + i + `" step="any">
              <span class="input-addon-label-right">mm</span>
            </div>
          </td>
        </tr>
        <tr class="inputcnc">
          <td>Tab Width</td>
          <td>
            <div class="input-addon">
              <span class="input-addon-label-left"><span class="fas fa-text-width"></span></span>
              <input data-role="input" data-clear-button="false" type="number" class="cam-form-field" value="6" id="tabWidth` + i + `" objectseq="` + i + `" min="0" step="any">
              <span class="input-addon-label-right">mm</span>
            </div>
          </td>
        </tr>
        <tr class="inputcnc">
          <td>Tab Spacing</td>
          <td>
            <div class="input-addon">
              <span class="input-addon-label-left"><span class="fas fa-ruler-horizontal"></span></span>
              <input data-role="input" data-clear-button="false" type="number" class="cam-form-field" value="50" id="tabSpace` + i + `" objectseq="` + i + `" min="0" step="any">
              <span class="input-addon-label-right">mm</span>
            </div>
          </td>
        </tr>
      </table>
    </div>`
  $('#statusBody2').html(template2);
  $('#statusFooter').html(`<button type="button" id="previewToolpathBtn" class="button success" onclick="toolpathPreview(` + i + `); fillTree();">Apply and Preview Toolpath </button><button class="button js-dialog-close">Close</button>`);
  noMode(); // Default to NOOP
  $("#tOpName" + i).focus()
  Metro.init();

  var closedVectors = 0
  var openVectors = 0
  for (j = 0; j < toolpathsInScene[i].children.length; j++) {
    if (toolpathsInScene[i].children[j].userData.closed == undefined) { // this is for imports of old Workspaces before the closed logic.
      closedVectors++
    } else { // New documents
      if (toolpathsInScene[i].children[j].userData.closed) {
        closedVectors++
      } else {
        openVectors++
      }
    }
  }

  console.log("This operation contains " + openVectors + " Open Vectors, and " + closedVectors + " Closed Vectors")
  if (openVectors > 0) {
    var template3 = '<div class="remark"><span class="text-small">This toolpath contains ' + openVectors + ' open vector(s), and ' + closedVectors + ' closed vector(s)</span>'
    template3 += '<br><span class="text-small fg-red">NB: You cannot use Offset operations on Open Vectors, you can try to use "No Offset" operations, or repair the file first</span>'
    template3 += '</div>'
    $('#toolpathWarnings').html(template3)
  }

  var lastused = JSON.parse(localStorage.getItem('lastCamOperation'));

  if (toolpathsInScene[i].userData.camOperation) {
    $('#tPasses' + i).val(toolpathsInScene[i].userData.camPasses);
    $('#toperation' + i).val(toolpathsInScene[i].userData.camOperation).prop('selected', true)
    $('#ttooldia' + i).val(toolpathsInScene[i].userData.camToolDia);
    $('#tstepover' + i).val(toolpathsInScene[i].userData.camStepover);
    $('#tclearanceHeight' + i).val(toolpathsInScene[i].userData.camZClearance);
    $('#tstartHeight' + i).val(toolpathsInScene[i].userData.camZStart);
    $('#tdragoffset' + i).val(toolpathsInScene[i].userData.camDragOffset);
    $('#tspotsize' + i).val(toolpathsInScene[i].userData.camSpotSize);
    $('#tfillAngle' + i).val(toolpathsInScene[i].userData.camFillAngle);
    $('#tpwr' + i).val(toolpathsInScene[i].userData.camLaserPower);
    $('#trpm' + i).val(toolpathsInScene[i].userData.camSpindleRpm);
    $('#tToolNumber' + i).val(toolpathsInScene[i].userData.camToolNumber);
    $('#tzstep' + i).val(toolpathsInScene[i].userData.camZStep);
    $('#tzdepth' + i).val(toolpathsInScene[i].userData.camZDepth);
    $('#tspeed' + i).val(toolpathsInScene[i].userData.camFeedrate);
    $('#tplungespeed' + i).val(toolpathsInScene[i].userData.camPlungerate);
    $('#tplasmakerf' + i).val(toolpathsInScene[i].userData.camPlasmaKerf);
    $('#tplasmazheight' + i).val(toolpathsInScene[i].userData.camPlasmaZHeight);
    $('#tplasmapierceheight' + i).val(toolpathsInScene[i].userData.camPlasmaPierceHeight);
    $('#tplasmapiercedelay' + i).val(toolpathsInScene[i].userData.camPlasmaPierceDelay);
    $('#tplasmaleadin' + i).val(toolpathsInScene[i].userData.camPlasmaLeadinDist);
    $('#tabdepth' + i).val(toolpathsInScene[i].userData.camTabDepth);
    $('#tabWidth' + i).val(toolpathsInScene[i].userData.camTabWidth);
    $('#tabSpace' + i).val(toolpathsInScene[i].userData.camTabSpace);
    $('#tplottertype' + i).val(toolpathsInScene[i].userData.plotterType).prop('selected', true);
    $('#tpenup' + i).val(toolpathsInScene[i].userData.camPenUp);
    $('#tpendown' + i).val(toolpathsInScene[i].userData.camPenDown);
    if (toolpathsInScene[i].userData.camPenTime) {
      $('#tpentime' + i).val(toolpathsInScene[i].userData.camPenTime);
    } else {
      $('#tpentime' + i).val(500); // good default for SCRIBE
    }
    if (toolpathsInScene[i].userData.camPenUpZ) {
      $('#tpenupz' + i).val(toolpathsInScene[i].userData.camPenUpZ);
    } else {
      $('#tpenupz' + i).val(3); // good default for SCRIBE
    }
    if (toolpathsInScene[i].userData.camPenDownZ) {
      $('#tpendownz' + i).val(toolpathsInScene[i].userData.camPenDownZ);
    } else {
      $('#tpendownz' + i).val(-1); // good default for SCRIBE
    }
    if (toolpathsInScene[i].userData.tRampPlunge) {
      $('#tRampPlunge' + i).val(toolpathsInScene[i].userData.tRampPlunge).prop('selected', true);
    } else {
      $('#tRampPlunge' + i).val("No").prop('selected', true);
    }
    if (toolpathsInScene[i].userData.camTextureType) {
      $('#ttexturetype' + i).val(toolpathsInScene[i].userData.camTextureType).prop('selected', true);
    }
    if (toolpathsInScene[i].userData.camTextureSpacing) {
      $('#ttexturespacing' + i).val(toolpathsInScene[i].userData.camTextureSpacing);
    }
    if (toolpathsInScene[i].userData.camTextureAmplitude) {
      $('#ttextureamplitude' + i).val(toolpathsInScene[i].userData.camTextureAmplitude);
    }
    if (toolpathsInScene[i].userData.camTextureAngle) {
      $('#ttextureangle' + i).val(toolpathsInScene[i].userData.camTextureAngle);
    }
    $('#tplasmaihs' + i).val(toolpathsInScene[i].userData.camPlasmaIHS).prop('selected', true);
    $('#tunion' + i).val(toolpathsInScene[i].userData.camUnion).prop('selected', true);
    $('#tdirection' + i).val(toolpathsInScene[i].userData.camDirection).prop('selected', true);
    $('#tOpName' + i).val(toolpathsInScene[i].name);
    $('#statusTitle').html('Configure Toolpath: ' + toolpathsInScene[i].userData.camOperation);
    $('#advanced' + i).prop('checked', toolpathsInScene[i].userData.advanced);
    if (toolpathsInScene[i].userData.advanced) {
      setTimeout(function() {
        $('#advanced' + i).prop('checked', true);
        $('#collapsediv' + i).data("collapse")['expand']()
      }, 200);
    } else {
      setTimeout(function() {
        $('#advanced' + i).prop('checked', false);
        $('#collapsediv' + i).data("collapse")['collapse']()
      }, 200);
    }
    typeofOperation(toolpathsInScene[i].userData.camOperation, i);
  } else if (lastused) {
    // if we don't already have an Operation, perhaps we can pull from last-used values to make it easier
    // console.log(lastused)
    $('#ttooldia' + i).val(lastused.camToolDia);
    $('#tstepover' + i).val(lastused.camStepover);
    $('#tclearanceHeight' + i).val(lastused.camZClearance);
    $('#tdragoffset' + i).val(lastused.camDragOffset);
    $('#tspotsize' + i).val(lastused.camSpotSize);
    $('#tfillAngle' + i).val(lastused.camFillAngle);
    $('#tpwr' + i).val(lastused.camLaserPower);
    if (lastused.camSpindleRpm > 0) {
      $('#trpm' + i).val(lastused.camSpindleRpm);
    } else if ($("#scommandscale").val() > 0) {
      $('#trpm' + i).val($("#scommandscale").val());
    } else {
      $('#trpm' + i).val(1000);
    }
    if (lastused.camToolNumber > 0) {
      $('#tToolNumber' + i).val(lastused.camToolNumber);
    }
    $('#tzstep' + i).val(lastused.camZStep);
    $('#tzdepth' + i).val(lastused.camZDepth);
    $('#tspeed' + i).val(lastused.camFeedrate);
    $('#tplungespeed' + i).val(lastused.camPlungerate);
    $('#tplasmakerf' + i).val(lastused.camPlasmaKerf);
    $('#tplasmazheight' + i).val(lastused.camPlasmaZHeight);
    $('#tplasmapierceheight' + i).val(lastused.camPlasmaPierceHeight);
    $('#tplasmapiercedelay' + i).val(lastused.camPlasmaPierceDelay);
    $('#tplasmaleadin' + i).val(lastused.camPlasmaLeadinDist);
    $('#tstartHeight' + i).val(lastused.camZStart);
    $('#tPasses' + i).val(lastused.camPasses);
    $('#tplasmaihs' + i).val(lastused.camPlasmaIHS);
    // $('#tunion' + i).val(lastused.camUnion);
    $('#tdirection' + i).val(lastused.camDirection);
    $('#tspotsize' + i).val(lastused.camSpotSize);
    $('#tfillAngle' + i).val(lastused.camFillAngle);
    //$('#tabdepth' + i).val(lastused.camTabDepth);
    //$('#tabWidth' + i).val(lastused.camTabWidth);
    //$('#tabSpace' + i).val(lastused.camTabSpace);
    //$('#tRampPlunge' + i).val(lastused.tRampPlunge);
    $('#tplottertype' + i).val(lastused.plotterType).prop('selected', true);
    $('#tpenup' + i).val(lastused.camPenUp);
    $('#tpentime' + i).val(lastused.camPenTime);
    $('#tpendown' + i).val(lastused.camPenDown);
    $('#tpenupz' + i).val(lastused.camPenUpZ);
    $('#tpendownz' + i).val(lastused.camPenDownZ);
  } else {
    if ($("#hasPlasma").is(':checked')) {
      // If user has LEAD1010 Plasma, lets force first time use to use IHS
      $('#tplasmaihs' + i).val("Yes");
    }
  };
}

function noMode(i) {
  $('.inputcnc').hide();
  $('.inputpocket').hide();
  $('.inputpocketraster').hide();
  $('.inputlaser').hide();
  $('.inputdragknife').hide();
  $('.inputplasma').hide();
  $('.inputdrill').hide();
  $('.inputdrillpeck').hide();
  $('.inputplotter').hide();
  $('.inputpenraster').hide();
  $('.inputlaserraster').hide();
  $('.inputtexture').hide();
}

function laserMode(i) {
  $('.inputcnc').hide();
  $('.inputpocket').hide();
  $('.inputpocketraster').hide();
  $('.inputdragknife').hide();
  $('.inputplasma').hide();
  $(".inputlasernooffset").hide();
  $('.inputdrill').hide();
  $('.inputdrillpeck').hide();
  $('.inputlaserraster').hide();
  $('.inputplotter').hide();
  $('.inputpenraster').hide();
  $('.inputtexture').hide();
  $('.inputlaser').show();
};

function laserInsideMode(i) {
  $('.inputcnc').hide();
  $('.inputpocket').hide();
  $('.inputpocketraster').hide();
  $('.inputdragknife').hide();
  $('.inputplasma').hide();
  $('.inputdrill').hide();
  $('.inputdrillpeck').hide();
  $('.inputlaserraster').hide();
  $('.inputplotter').hide();
  $('.inputpenraster').hide();
  $('.inputtexture').hide();
  $('.inputlaser').show();
};

function laserOutsideMode(i) {
  $('.inputcnc').hide();
  $('.inputpocket').hide();
  $('.inputpocketraster').hide();
  $('.inputdragknife').hide();
  $('.inputplasma').hide();
  $('.inputdrill').hide();
  $('.inputdrillpeck').hide();
  $('.inputlaserraster').hide();
  $('.inputplotter').hide();
  $('.inputpenraster').hide();
  $('.inputtexture').hide();
  $('.inputlaser').show();
};

function laserRasterMode(i) {
  $('.inputcnc').hide();
  $('.inputpocket').hide();
  $('.inputpocketraster').hide();
  $('.inputdragknife').hide();
  $('.inputplasma').hide();
  $('.inputdrill').hide();
  $('.inputdrillpeck').hide();
  $('.inputplotter').hide();
  $('.inputpenraster').hide();
  $('.inputtexture').hide();
  $('.inputlaserraster').show();
};

function drillMode(i) {
  $('.inputlaser').hide();
  $('.inputpocket').hide();
  $('.inputpocketraster').hide();
  $('.inputdragknife').hide();
  $('.inputplasma').hide();
  $('.inputcnc').hide();
  $('.inputdrillpeck').hide();
  $('.inputlaserraster').hide();
  $('.inputplotter').hide();
  $('.inputpenraster').hide();
  $('.inputtexture').hide();
  $('.inputdrill').show();
}

function drillPeckMode(i) {
  $('.inputlaser').hide();
  $('.inputpocket').hide();
  $('.inputpocketraster').hide();
  $('.inputdragknife').hide();
  $('.inputplasma').hide();
  $('.inputcnc').hide();
  $('.inputdrill').show();
  $('.inputlaserraster').hide();
  $('.inputplotter').hide();
  $('.inputpenraster').hide();
  $('.inputtexture').hide();
  $('.inputdrillpeck').show();

}

function cncInsideMode(i) {
  $('.inputlaser').hide();
  $('.inputpocket').hide();
  $('.inputpocketraster').hide();
  $('.inputdragknife').hide();
  $('.inputplasma').hide();
  $('.inputdrill').hide();
  $('.inputdrillpeck').hide();
  $('.inputlaserraster').hide();
  $('.inputplotter').hide();
  $('.inputpenraster').hide();
  $('.inputtexture').hide();
  $('.inputcnc').show();
};

function cncOutsideMode(i) {
  $('.inputlaser').hide();
  $('.inputpocket').hide();
  $('.inputpocketraster').hide();
  $('.inputdragknife').hide();
  $('.inputplasma').hide();
  $('.inputdrill').hide();
  $('.inputdrillpeck').hide();
  $('.inputlaserraster').hide();
  $('.inputplotter').hide();
  $('.inputpenraster').hide();
  $('.inputtexture').hide();
  $('.inputcnc').show();
};

function cncNoOffsetMode(i) {
  $('.inputlaser').hide();
  $('.inputpocket').hide();
  $('.inputpocketraster').hide();
  $('.inputdragknife').hide();
  $('.inputplasma').hide();
  $('.inputdrill').hide();
  $('.inputdrillpeck').hide();
  $('.inputtooldia').hide();
  $('.inputlaserraster').hide();
  $('.inputplotter').hide();
  $('.inputpenraster').hide();
  $('.inputtexture').hide();
  $('.inputcnc').show();

}

function cncPocketMode(i) {
  $('.inputlaser').hide();
  $('.inputdragknife').hide();
  $('.inputplasma').hide();
  $('.inputcnc').hide();
  $('.inputdrill').hide();
  $('.inputdrillpeck').hide();
  $('.inputlaserraster').hide();
  $('.inputplotter').hide();
  $('.inputpenraster').hide();
  $('.inputtexture').hide();
  $('.inputpocketraster').hide();
  $('.inputpocket').show();
  // force open Advanced and force Union by default
  setTimeout(function() {
    $('#advanced' + i).prop('checked', true);
    $('#collapsediv' + i).data("collapse")['expand']()
  }, 200);
  if (!toolpathsInScene[i].userData.camOperation) { // only force if not set already (ie suggested default)
    $('#tunion' + i).val("Yes").prop('selected', true);
  }
};

function cncPocketRasterMode(i) {
  $('.inputlaser').hide();
  $('.inputdragknife').hide();
  $('.inputplasma').hide();
  $('.inputcnc').hide();
  $('.inputdrill').hide();
  $('.inputdrillpeck').hide();
  $('.inputlaserraster').hide();
  $('.inputplotter').hide();
  $('.inputpenraster').hide();
  $('.inputtexture').hide();
  // Show pocket fields but hide raster-irrelevant ones
  $('.inputpocket').show();
  $('.inputpocketraster').show();
  $('#tunion' + i).closest('tr').hide();
  $('#tRampPlunge' + i).closest('tr').hide();
  $('#tdirection' + i).closest('tr').hide();
  // force open Advanced
  setTimeout(function() {
    $('#advanced' + i).prop('checked', true);
    $('#collapsediv' + i).data("collapse")['expand']()
  }, 200);
};

function cncTextureMode(i) {
  $('.inputlaser').hide();
  $('.inputdragknife').hide();
  $('.inputplasma').hide();
  $('.inputpocket').hide();
  $('.inputpocketraster').hide();
  $('.inputdrill').hide();
  $('.inputdrillpeck').hide();
  $('.inputlaserraster').hide();
  $('.inputplotter').hide();
  $('.inputpenraster').hide();
  $('.inputcnc').show();
  $('.inputtexture').show();
};

function plasmaMode(i) {
  $('.inputcnc').hide();
  $('.inputpocket').hide();
  $('.inputpocketraster').hide();
  $('.inputlaser').hide();
  $('.inputdragknife').hide();
  $('.inputdrill').hide();
  $('.inputdrillpeck').hide();
  $('.inputlaserraster').hide();
  $('.inputplotter').hide();
  $('.inputpenraster').hide();
  $('.inputtexture').hide();
  $('.inputplasma').show();
};


function dragKnifeMode(i) {
  $('.inputcnc').hide();
  $('.inputpocket').hide();
  $('.inputpocketraster').hide();
  $('.inputlaser').hide();
  $('.inputplasma').hide();
  $('.inputdrill').hide();
  $('.inputdrillpeck').hide();
  $('.inputlaserraster').hide();
  $('.inputplotter').hide();
  $('.inputpenraster').hide();
  $('.inputtexture').hide();
  $('.inputdragknife').show();
};

function plotterMode(i) {
  $('.inputcnc').hide();
  $('.inputpocket').hide();
  $('.inputpocketraster').hide();
  $('.inputlaser').hide();
  $('.inputplasma').hide();
  $('.inputdrill').hide();
  $('.inputdrillpeck').hide();
  $('.inputlaserraster').hide();
  $('.inputdragknife').hide();
  $('.inputpenraster').hide();
  $('.inputtexture').hide();
  $('.inputplotter').show();
  if ($('#tplottertype' + i).val() == "Z-Axis") {
    plotterModeZ(i)
  } else {
    plotterModeServo(i)
  }

};

function penRasterMode(i) {
  $('.inputcnc').hide();
  $('.inputpocket').hide();
  $('.inputpocketraster').hide();
  $('.inputdragknife').hide();
  $('.inputplasma').hide();
  $('.inputdrill').hide();
  $('.inputdrillpeck').hide();
  $('.inputplotter').hide();
  $('.inputlaserraster').hide();
  $('.inputtexture').hide();
  $('.inputpenraster').show();
  if ($('#tplottertype' + i).val() == "Z-Axis") {
    plotterModeZ(i)
  } else {
    plotterModeServo(i)
  }
};

function plotterModeZ(i) {
  $('.inputpenservo').hide();
  $('.inputpenz').show();
}

function plotterModeServo(i) {
  $('.inputpenservo').show();
  $('.inputpenz').hide();

}