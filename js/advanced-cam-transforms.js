var objectToScale = null;

function showScaleWindow(object) {
  objectToScale = object;
  var bbox2 = new THREE.Box3().setFromObject(object);
  var width = (bbox2.max.x - bbox2.min.x).toFixed(2);
  var height = (bbox2.max.y - bbox2.min.y).toFixed(2);
  var left = bbox2.min.x.toFixed(2);
  var bottom = bbox2.min.y.toFixed(2);
  var right = bbox2.max.x.toFixed(2);
  var top = bbox2.max.y.toFixed(2);
  var xcenter = (bbox2.max.x - (bbox2.max.x - bbox2.min.x) / 2).toFixed(2);
  var ycenter = (bbox2.max.y - (bbox2.max.y - bbox2.min.y) / 2).toFixed(2);
  // console.log(width, height, left, bottom)
  var template = `

  <div style="display:flex;gap:2px;margin-bottom:8px">
    <button class="cf-btn cf-btn-tab active" data-tab="SCALE" onclick="$('.cf-btn-tab').removeClass('active');$(this).addClass('active');$('.cf-tab').hide();$('#tr_SCALE').show()">Scale</button>
    <button class="cf-btn cf-btn-tab" data-tab="POSITION" onclick="$('.cf-btn-tab').removeClass('active');$(this).addClass('active');$('.cf-tab').hide();$('#tr_POSITION').show()">Position</button>
    <button class="cf-btn cf-btn-tab" data-tab="ROTATION" onclick="$('.cf-btn-tab').removeClass('active');$(this).addClass('active');$('.cf-tab').hide();$('#tr_ROTATION').show()">Rotation</button>
  </div>

    <div id="tr_SCALE" class="cf-tab">
      <p><i class="fas fa-ruler"></i> <b>Scale</b>: <small>` + object.name + `</small></p>
      <table style="width:100%">
        <tr>
          <td style="width:60px">Width:</td>
          <td style="width:24px"><i class="fas fa-ruler-horizontal fa-fw"></i></td>
          <td>
            <input type="text" class="cf-input" value="` + width + `" id="scaleWidth" objectseq="` + i + `" style="text-align:right">
          </td>
          <td style="width:30px;padding-left:4px">mm</td>
        </tr>
        <tr>
          <td>Height:</td>
          <td><i class="fas fa-ruler-vertical fa-fw"></i></td>
          <td>
            <input type="text" class="cf-input" value="` + height + `" id="scaleHeight" objectseq="` + i + `" style="text-align:right">
          </td>
          <td style="padding-left:4px">mm</td>
        </tr>
      </table>
      <div style="margin-top:8px;display:flex;gap:6px">
        <button type="button" class="cf-btn cf-btn-red" onclick="scalewindow.style.visibility = 'hidden'">Cancel</button>
        <button type="button" class="cf-btn cf-btn-green" onclick="scaleObj()">Apply</button>
      </div>
    </div>
    <div id="tr_POSITION" class="cf-tab" style="display:none">
      <p><i class="far fa-clone"></i> <b>Position</b>: <small>` + object.name + `</small></p>
      <table>
        <tr>
          <td style="width:50px"></td>
          <td align="center" style="width:90px"><i class="fas fa-align-left fa-fw"></i></td>
          <td align="center" style="width:90px"><i class="fas fa-align-center fa-fw"></i></td>
          <td align="center" style="width:90px"><i class="fas fa-align-right fa-fw"></i></td>
          <td style="width:50px"></td>
        </tr>
        <tr>
          <td><i class="fas fa-ruler-horizontal fa-fw"></i></td>
          <td><input type="text" class="cf-input" value="` + left + `" id="left" objectseq="` + i + `" style="text-align:right"></td>
          <td><input type="text" class="cf-input" value="` + xcenter + `" id="xcenter" objectseq="` + i + `" style="text-align:right"></td>
          <td><input type="text" class="cf-input" value="` + right + `" id="right" objectseq="` + i + `" style="text-align:right"></td>
          <td style="padding-left:4px">mm</td>
        </tr>
        <tr>
          <td><i class="fas fa-ruler-vertical fa-fw"></i></td>
          <td><input type="text" class="cf-input" value="` + bottom + `" id="bottom" objectseq="` + i + `" style="text-align:right"></td>
          <td><input type="text" class="cf-input" value="` + ycenter + `" id="ycenter" objectseq="` + i + `" style="text-align:right"></td>
          <td><input type="text" class="cf-input" value="` + top + `" id="top" objectseq="` + i + `" style="text-align:right"></td>
          <td style="padding-left:4px">mm</td>
        </tr>
      </table>
      <div style="margin-top:8px;display:flex;gap:6px">
        <button type="button" class="cf-btn cf-btn-red" onclick="scalewindow.style.visibility = 'hidden'">Cancel</button>
        <button type="button" class="cf-btn cf-btn-green" onclick="moveObj()">Apply</button>
      </div>
    </div>
    <div id="tr_ROTATION" class="cf-tab" style="display:none">
      <p><i class="fas fa-undo"></i> <b>Rotation</b>: <small>` + object.name + `</small></p>
      <table style="width:100%">
        <tr>
          <td style="width:60px">Angle:</td>
          <td>
            <input type="text" class="cf-input" value="45" id="rotationangle" objectseq="` + i + `" style="text-align:right">
          </td>
          <td style="width:30px;padding-left:4px">&deg;</td>
        </tr>
      </table>
      <div style="margin-top:8px;display:flex;gap:6px">
        <button type="button" class="cf-btn cf-btn-red" onclick="scalewindow.style.visibility = 'hidden'">Cancel</button>
        <button type="button" class="cf-btn cf-btn-green" onclick="rotateObj(1)">Anticlockwise</button>
        <button type="button" class="cf-btn cf-btn-green" onclick="rotateObj(-1)">Clockwise</button>
      </div>
    </div>
  `;
  $('#scalewindowcontent').html(template)
  var aspect = width / height
  $("#scaleWidth").keyup(function() {
    var width = Number($(this).val());
    $("#scaleHeight").val((width / aspect).toFixed(3));
  });
  $("#scaleHeight").keyup(function() {
    var height = Number($(this).val());
    $("#scaleWidth").val((height * aspect).toFixed(3));
  });
  $("#left").keyup(function() {
    var newLeft = Number($(this).val());
    var diff = newLeft - Number(left);
    $("#xcenter").val((parseFloat(xcenter) + parseFloat(diff)).toFixed(2));
    $("#right").val((parseFloat(right) + parseFloat(diff)).toFixed(2));
  });

  $("#xcenter").keyup(function() {
    var newxCenter = Number($(this).val());
    var diff = newxCenter - Number(xcenter);
    $("#left").val((parseFloat(left) + parseFloat(diff)).toFixed(2));
    $("#right").val((parseFloat(right) + parseFloat(diff)).toFixed(2));
  });

  $("#right").keyup(function() {
    var newRight = Number($(this).val());
    var diff = newRight - Number(right);
    $("#left").val((parseFloat(left) + parseFloat(diff)).toFixed(2));
    $("#xcenter").val((parseFloat(xcenter) + parseFloat(diff)).toFixed(2));
  });

  $("#top").keyup(function() {
    var newTop = Number($(this).val());
    var diff = newTop - Number(top);
    $("#ycenter").val((parseFloat(ycenter) + parseFloat(diff)).toFixed(2));
    $("#bottom").val((parseFloat(bottom) + parseFloat(diff)).toFixed(2));
  });

  $("#ycenter").keyup(function() {
    var newyCenter = Number($(this).val());
    var diff = newyCenter - Number(ycenter);
    $("#top").val((parseFloat(top) + parseFloat(diff)).toFixed(2));
    $("#bottom").val((parseFloat(bottom) + parseFloat(diff)).toFixed(2));
  });

  $("#bottom").keyup(function() {
    var newBottom = Number($(this).val());
    var diff = newBottom - Number(bottom);
    $("#ycenter").val((parseFloat(ycenter) + parseFloat(diff)).toFixed(2));
    $("#top").val((parseFloat(top) + parseFloat(diff)).toFixed(2));
  });
}

function scaleObj() {
  storeUndo(true);
  var object = objectToScale;
  var bbox2 = new THREE.Box3().setFromObject(object);
  var width = (bbox2.max.x - bbox2.min.x).toFixed(2)
  var height = (bbox2.max.y - bbox2.min.y).toFixed(2)
  var newWidth = $('#scaleWidth').val()
  var newHeight = $('#scaleHeight').val()
  var opt = {
    scale: {
      x: newWidth / width,
      y: newHeight / height,
      z: 1
    }
  }
  for (j = 0; j < object.children.length; j++) {
    alterGeometry(object.children[j].geometry, opt)
  }
  var bbox3 = new THREE.Box3().setFromObject(object);
  // console.log(bbox3, bbox2)
  var xoffset = bbox3.min.x - bbox2.min.x;
  var yoffset = bbox3.min.y - bbox2.min.y;
  console.log(xoffset, yoffset)
  object.translateX(-xoffset)
  object.translateY(-yoffset)
  changePositionToGeoTranslate();
  scalewindow.style.visibility = "hidden";
  $('#scaleWidth').unbind('keyup');
  $('#scaleHeight').unbind('keyup');
  // reset View and clear Hovers
  hoverShapesinScene.length = 0;
  resetView();
  clearSceneFlag = true;
}

function moveObj() {
  storeUndo(true);
  var object = objectToScale;
  var bbox2 = new THREE.Box3().setFromObject(object);
  var width = (bbox2.max.x - bbox2.min.x).toFixed(2);
  var height = (bbox2.max.y - bbox2.min.y).toFixed(2);
  var left = bbox2.min.x.toFixed(2);
  var bottom = bbox2.min.y.toFixed(2);
  var right = bbox2.max.x.toFixed(2);
  var top = bbox2.max.y.toFixed(2);
  var xcenter = (bbox2.max.x - (bbox2.max.x - bbox2.min.x) / 2).toFixed(2);
  var ycenter = (bbox2.max.y - (bbox2.max.y - bbox2.min.y) / 2).toFixed(2);
  var newxCenter = $('#xcenter').val()
  var newyCenter = $('#ycenter').val()
  var xoffset = newxCenter - xcenter;
  var yoffset = newyCenter - ycenter;
  object.translateX(xoffset)
  object.translateY(yoffset)
  changePositionToGeoTranslate();
  scalewindow.style.visibility = "hidden";
  $('#left').unbind('keyup');
  $('#xcenter').unbind('keyup');
  $('#right').unbind('keyup');
  $('#top').unbind('keyup');
  $('#ycenter').unbind('keyup');
  $('#bottom').unbind('keyup');
  hoverShapesinScene.length = 0;
  resetView();
  clearSceneFlag = true;
}

function rotateObj(dir) {
  storeUndo(true);
  var object = objectToScale;
  var bbox2 = new THREE.Box3().setFromObject(object);

  var xcenter = (bbox2.max.x - (bbox2.max.x - bbox2.min.x) / 2).toFixed(2);
  var ycenter = (bbox2.max.y - (bbox2.max.y - bbox2.min.y) / 2).toFixed(2);

  // center object on [0,0]
  object.translateX(-xcenter)
  object.translateY(-ycenter)
  changePositionToGeoTranslate();

  // Rotate
  var angle = $("#rotationangle").val() * (Math.PI / 180);

  object.rotateZ(dir * angle);
  object.updateMatrixWorld();
  object.traverse(function(child) {
    // console.log(child);
    if (child.type == "Line") {
      var newVert = [];
      var xpos_offset = child.position.x;
      var ypos_offset = child.position.y;
      // let's create gcode for all points in line
      for (i = 0; i < child.geometry.vertices.length; i++) {
        // Convert to World Coordinates
        var localPt = child.geometry.vertices[i];
        var worldPt = object.localToWorld(localPt.clone());
        var xpos = worldPt.x
        var ypos = worldPt.y
        if (child.geometry.type == "CircleGeometry") {
          xpos = (xpos + xpos_offset);
          ypos = (ypos + ypos_offset);
        }
        var zpos = worldPt.z;
        newVert.push(new THREE.Vector3(xpos, ypos, zpos));
      }
      console.log(child.geometry.vertices[10], newVert[10])
      child.geometry.vertices = newVert;
    }
  });
  object.rotation.z = 0;
  object.translateX(xcenter)
  object.translateY(ycenter)
  changePositionToGeoTranslate();
  scalewindow.style.visibility = "hidden";
  hoverShapesinScene.length = 0;
  resetView();
  clearSceneFlag = true;
}