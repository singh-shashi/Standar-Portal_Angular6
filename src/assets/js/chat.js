var chatHub;
var chatHistory;
var server = "";
var project = "";
var name = '';
var id = 0;
var type = 'Customer';
var https = "https://"
var chatwebserver = "sf108.soffront.com";
var chatwebdirectory = "chat";
function reset() {
  chatHub = undefined;
  server = "";
  project = "";
  name = '';
  id = 0;
}

function setServerAndProject(_server, _project) {
  server = _server;
  project = _project;
}

function loginWithName(_id, _name) {
  id = _id;
  name = _name;
}

function checkandlogin(o) {
  chatHistory=o;
  if (name != undefined && name != "")
    fnLoginToSignalR();
}

function fnLoginToSignalR() {
  $.support.cors = true;
  var connection = $.hubConnection();
  connection.url = https + chatwebserver + "/" + chatwebdirectory + "/signalr";
  chatHub = connection.createHubProxy('chatHub');

  registerClientMethods(chatHub);

  connection.start()
    .done(function () {
      registerEvents(chatHub);

      if (name.length > 0) {
        chatHub.invoke('connect', id, name, type, server, project);
        //chatHub.server.connect(name, type, server, project);
      } else {
        alert("Please enter name");
      }

    })
    .fail(function () {
      console.log('Chat could not connect');
    });
}

function registerEvents(chatHub) {
  $("#button-addon2").click(function () {
    var chatid = $(".chatmodal").attr("chatid");
    var msg = $("#msg-addon2").val();
    var userName = $('#hdUserName').val();
    $("#msg-addon2").val('');
    $("#msg-addon2").focus();
    chatHub.invoke('SendMessage', chatid, userName, msg);
    //chatHub.server.SendMessage(chatid, userName, msg);

  });

  $('#msg-addon2').keypress(function (e) {
    if (e.which == 13) {
      $('#button-addon2').trigger('click');
    } else {
      var userId = $('#hdId').val();
      var chatid = $(".chatmodal").attr("chatid");
      chatHub.invoke('IsTyping', userId, chatid);
    }
  });

  $('#lnkAskForHelp').click(function () {
    // Request for chat
    chatHistory.ChartActivityHistory('Request', 'Request for chat');
    var userId = $('#hdId').val();
    chatHub.invoke('notifyForHelpToAgents', userId, server, project);
    //alert('Request has been sent to all online support representatives. Please wait for the representative to accept.')
    $("#chatmessages").children().remove();
    $('.chatmodal').addClass('show');
    $(".chatwaiting").removeClass("d-none");
  });

  $("#closeModal").click(function () {
    var userId = $('#hdId').val();
    var chatid = $(".chatmodal").attr("chatid");
    chatHub.invoke('LeaveChat', userId, chatid);

    var chatHist= chatText();
    chatHistory.ChartActivityHistory('Chat Ended', chatHist);

    $('.chatmodal').removeClass('show');
  });

  $("#cancelRequest").click(function () {
    // chat cancelled
    chatHistory.ChartActivityHistory('Cancelled', 'Chat Cancelled');
    var userId = $('#hdId').val();
    chatHub.invoke('CancelRequest', userId, server, project);
    $('.chatmodal').removeClass('show');
  });
}

function registerClientMethods(chatHub) {
  chatHub.on('onConnected', function (id, userName, userType, allUsers, messages) {
    $('#hdId').val(id);
    $('#hdUserName').val(userName);
    $('#hdUserType').val(userType);

    if (userType != "Agent") {
      $("#lnkAskForHelp").parent().removeClass("d-none");
      $("#inviteList").parent().parent().addClass("d-none");
      $("#divChat").parent().css("display", "none");
    } else {
      $("#lnkAskForHelp").parent().addClass("d-none");
      $("#inviteList").parent().parent().removeClass("d-none");
      $("#divChat").parent().show();
    }

    $('#spanUser').html(userName);

    // Add All Users
    for (i = 0; i < allUsers.length; i++) {
      AddUser(chatHub, allUsers[i].ConnectionId, allUsers[i].UserName);
    }

    // Add Existing Messages
    for (i = 0; i < messages.length; i++) {
      AddMessage(messages[i].UserName, messages[i].Message);
    }


  });


  chatHub.on('onNewChatInit', function (chatInfo) {
    // start chat..
    chatHistory.ChartActivityHistory('Start', 'Chat Started');
    AddChat(chatInfo);
  });

  chatHub.on('onNewUserConnected', function (id, name) {
    AddUser(chatHub, id, name);
  });


  chatHub.on('onUserDisconnected', function (id, userName) {

    $('#' + id).remove();

    var ctrId = 'private_' + id;
    $('#' + ctrId).remove();


    var disc = $('<div class="disconnect">"' + userName + '" logged off.</div>');

    $(disc).hide();
    $('#divusers').prepend(disc);
    $(disc).fadeIn(200).delay(2000).fadeOut(200);

  });

  chatHub.on('messageReceived', function (messageDetail) {
    AddMessage(messageDetail);
  });

  chatHub.on('notifyForHelpToAgents', function (userHelp) {
    //alert(userHelp.ConnectionId);

    var $inviteList = $("#inviteList");

    var r = '<li class="list-group-item d-flex" id="invite-user-' + userHelp.ConnectionId + '">';
    r += '<div class="flex-fill">' + userHelp.UserName + '</div>';
    r += '  <div class="pl-1 pr-1">';
    r += '      <a href="#" onclick="acceptInvite(this)">';
    r += '          <i class="fa fa-check"></i>';
    r += '      </a>';
    r += '  </div>';
    r += '  <div class="pl-1 pr-1">';
    r += '      <a href="#" onclick="rejectInvite(this)">';
    r += '          <i class="fa fa-trash"></i>';
    r += '      </a>';
    r += '  </div>';
    r += '</li>';

    $inviteList.append(r);
  });


  chatHub.on('removeAcceptedInviteForAgents', function (userHelp) {
    var $inviteList = $("#inviteList");
    $inviteList.find("li[id='invite-user-" + userHelp.ConnectionId + "']").remove();
  });

  chatHub.on('isTyping', function (name) {
    var isTyping = $('#isTyping');
    isTyping.html(name + ' is typing...');
    setTimeout(function () {
      isTyping.html('&nbsp;');
    }, 5000);
  });

}


function AddChat(chatInfo) {
  $('.chatmodal').attr('chatid', chatInfo.ChatId);
  // $('.chatmodal').modal({
  //   keyboard: false,
  //   backdrop: false
  // });
  // $('.chatmodal').modal('show')
  //$('.chatmodal').addClass('show');
  $(".chatwaiting").addClass("d-none");
  for (i = 0; i < chatInfo.CurrentMessages.length; i++) {
      AddMessage(chatInfo.CurrentMessages[i]);
  }
}

function AddUser(chatHub, id, name) {

  var userId = $('#hdId').val();

  var code = "";

  if (userId == id) {
    code = $('<a class="loginUser list-group-item">' + name + "</a>");
  } else {

    code = $('<a id="' + id + '" class="user list-group-item" >' + name + '</a>');

    $(code).dblclick(function () {

      var id = $(this).attr('id');

      if (userId != id)
        OpenPrivateChatWindow(chatHub, id, name);

    });
  }

  $("#divusers").append(code);

}

function AddMessage(messageDetail) {

  var $divChatWindow = $('#chatmessages');
  var userName = $('#hdUserName').val();

  var messageClass = "";
  if (messageDetail.Notify) {
    messageClass = "notifymessage";
  } else if (userName.toUpperCase() == messageDetail.UserName.toUpperCase()) {
    messageClass = "ownmessage";
  }

  var t = '';
  if (!messageDetail.Notify) {
      t += '<div class="p-2 ' + messageClass + '">';
      t += '  <div class="">';
      t += '    <div class="bg-light rounded-lg border">';
      if (messageClass == "ownmessage") {
          t += '        <h5 class="p-2 mb-0 border-bottom text-info text-truncate">' + messageDetail.UserName + '</h5>';
      } else {
          t += '        <h5 class="p-2 mb-0 border-bottom text-danger text-truncate">' + messageDetail.UserName + '</h5>';
      }

      t += '        <p class="p-2 m-0">' + messageDetail.Message + '</p>';
      t += '    </div>';
      t += '  </div>';
      t += '</div>';
  } else {
      t += '<div class="' + messageClass + ' p-2">';
      t += '  <div class="">';
      t += '    <div class="border bg-warning shadow-sm">';
      t += '        <p class="p-2 m-0 text-center">' + messageDetail.Message + '</p>';
      t += '    </div>';
      t += '  </div>';
      t += '</div>';
  }


  $divChatWindow.append(t);

  var height = $divChatWindow[0].scrollHeight;
  $divChatWindow.scrollTop(height);
}

function OpenPrivateChatWindow(chatHub, id, userName) {

  var ctrId = 'private_' + id;

  if ($('#' + ctrId).length > 0) return;

  createPrivateChatWindow(chatHub, id, ctrId, userName);

}

function acceptInvite(o) {
  var uid = $(o).parent().parent().attr("id").replace("invite-user-", "");
  var userName = $(o).parent().prev().html();
  OpenPrivateChatWindow(chatHub, uid, userName);
  chatHub.invoke('removeAcceptedInviteForAgents', uid);
  //chatHub.server.removeAcceptedInviteForAgents(uid);
}

function rejectInvite(o) {
  $(o).parent().parent().remove();
}

function AddDivToContainer($div) {
  $('#divContainer').prepend($div);

  $div.draggable({

    handle: ".header",
    stop: function () {

    }
  });

  ////$div.resizable({
  ////    stop: function () {

  ////    }
  ////});

}
function disconnectUser() {
  // chat exit - history

  

  if (chatHub != undefined)
    chatHub.invoke('disconnectUser');
}

function chatText(){
  return ($.map($("#chatmessages").children(), function(v, i) {
    if ($(v).hasClass("notifymessage")) {
      return $(v).find(".border.bg-warning.shadow-sm > p").text();
    } else {
      return $(v).find(".bg-light.rounded-lg.border > h5").text() + ": " + $(v).find(".bg-light.rounded-lg.border > p").text();
    }
  })).join("\n\r");
}

function showChatLog(o) {
  var todayDate=new Date(o.ActDate);
  var format ="AM";
  var hour=todayDate.getHours();
  var min=todayDate.getMinutes();
  if(hour>11){format="PM";}
  if (hour   > 12) { hour = hour - 12; }
  if (hour   == 0) { hour = 12; }  
  if (min < 10){min = "0" + min;}
  var month = todayDate.getMonth()+1;
  var dates = todayDate.getDate();
  month = month>10? month : "0" + month;
  dates = dates>10? dates : "0" + dates;
  var date ='( '+ month + " / " + dates + " / " +  todayDate.getFullYear()+" "+ hour +":"+ min +" "+ format +' )';
  $(".chatlog.modal .modal-body p").html(o.OptDet.toString().trim().replace(  /\n/gi , "<br>"));
  $(".chatlog.modal .modal-header h4>span").text(date);
  $('.chatlog').modal('show');
}

function closeChatLog(o) {
  $('.chatlog').modal('hide');
}

function downloadhistory(o)
{
  $(".tooltip").remove();
  $('[data-toggle="tooltip"]').tooltip();
  //var chatid = $activechats.find(" > li.active").attr("id");
  var txtData = $(".chatlog.modal .modal-body p").html().replace(/<br>/gi , "\n\r" + "\n\r");
  $(o).attr('download', 'chatlog.txt')
      .attr('href', "data:application/octet-stream;base64," + btoa(txtData));
}

function getSoapData(v)
{
  const xmlhttp = new XMLHttpRequest();
  xmlhttp.open('POST', 'https://Sf108.soffront.com/WorkdayServices/WorkdayServices.asmx', true);
  const sr =
      '<?xml version="1.0" encoding="utf-8"?> ' +
// tslint:disable-next-line:max-line-length
      '<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">' +
      '<soap:Body>' +
      '<GetData xmlns="http://tempuri.org/">' +
      '<empId>'+ v +'</empId>' +
      '</GetData>' +
      '</soap:Body>' +
      '</soap:Envelope>';

      xmlhttp.setRequestHeader('Content-Type', 'text/xml');
      xmlhttp.send(sr);
     const object123 = xmlhttp.onreadystatechange = function () {
              if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
                $("#Soapdata").html('');
                const obj = xmlhttp.responseXML.all[2].textContent;
                Result = JSON.parse(obj);
                if(Result.Email!="" &&  Result.Email!=undefined){
                  
             var htlTest="<table><tr><td style='width: 30%; vertical-align: initial;'>Email :</td> <td style='width: 70%; vertical-align: initial;' id='email'></td></tr><tr><td style='width: 30%; vertical-align: initial;'>Phone No. :</td><td style='width: 70%; vertical-align: initial;' id='phone'></td></tr><tr><td style='width: 30%; vertical-align: initial;'>Address :</td><td style='width: 70%; vertical-align: initial;' id='address'></td></tr><tr><td style='width: 30%; vertical-align: initial;'>Start Date :</td><td style='width: 70%; vertical-align: initial;' id='sDate'></td></tr><tr><td style='width: 30%; vertical-align: initial;'>Designation :</td><td style='width: 70%; vertical-align: initial;' id='design'></td></tr></table>";
              $("#Soapdata").append(htlTest);
                }
               // $('#Soapdata').attr("display","block");
                $('#email').html(Result.Email);
                $('#phone').html(Result.Phone);
                $('#address').html(Result.Address);
                $('#sDate').html(Result.StartDate);
                $('#design').html(Result.Designation);
               // CreateTableFromJSON([Result]);
              }
      };
}

function CreateTableFromJSON(data) {
  // EXTRACT VALUE FOR HTML HEADER. 
  // ('Book ID', 'Book Name', 'Category' and 'Price')
  var col = [];
  for (var i = 0; i < data.length; i++) {
      for (var key in data[i]) {
          if (col.indexOf(key) === -1) {
              col.push(key);
          }
      }
  }

  // CREATE DYNAMIC TABLE.
  var table = document.createElement("table");
$(table).addClass("table");
  // CREATE HTML TABLE HEADER ROW USING THE EXTRACTED HEADERS ABOVE.

  var tr = table.insertRow(-1);                   // TABLE ROW.

  for (var i = 0; i < col.length; i++) {
      var th = document.createElement("th");      // TABLE HEADER.
      th.innerHTML = col[i];
      tr.appendChild(th);
  }

  // ADD JSON DATA TO THE TABLE AS ROWS.
  for (var i = 0; i < data.length; i++) {

      tr = table.insertRow(-1);

      for (var j = 0; j < col.length; j++) {
          var tabCell = tr.insertCell(-1);
          tabCell.innerHTML = data[i][col[j]];
      }
  }

  // FINALLY ADD THE NEWLY CREATED TABLE WITH JSON DATA TO A CONTAINER.
  var divContainer = document.getElementById("Soapdata");
  divContainer.innerHTML = "";
  divContainer.appendChild(table);
}