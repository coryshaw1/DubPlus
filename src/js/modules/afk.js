/**
 * AFK -  Away from Keyboard
 * Toggles the afk auto response on/off
 * including adding a custom message
 */

/* global Dubtrack */
var modal = require('../utils/modal.js');
var options = require('../utils/options.js');
var settings = require("../lib/settings.js");

var afk_module = {};
afk_module.id = "dubplus-afk";
afk_module.moduleName = "AFK Auto-respond";
afk_module.description = "Toggle Away from Keyboard and customize AFK message.";
afk_module.category = "General";

afk_module.canSend = true;
var afk_chat_respond = function(e) {
  if (!afk_module.canSend) {
    return; // do nothing until it's back to true
  }
  var content = e.message;
  var user = QueUp.session.get('username');
  
  if (content.indexOf('@'+user) > -1 && QueUp.session.id !== e.user.userInfo.userid) {
  
    if (settings.custom.customAfkMessage) {
      $('#chat-txt-message').val('[AFK] '+ settings.custom.customAfkMessage);
    } else {
      $('#chat-txt-message').val("[AFK] I'm not here right now.");
    }
    
    QueUp.room.chat.sendMessage();
    afk_module.canSend = false;

    setTimeout(()=> {
      afk_module.canSend = true;
    }, 30000);
  }
};

afk_module.turnOn = function(){
  QueUp.Events.bind("realtime:chat-message", afk_chat_respond);
};

afk_module.turnOff = function() {
  QueUp.Events.unbind("realtime:chat-message", afk_chat_respond);
};

var saveAFKmessage = function() {
  var customAfkMessage = $('.dp-modal textarea').val();
  if (customAfkMessage !== '') {
    options.saveOption('custom', 'customAfkMessage', customAfkMessage);
  }
};

afk_module.extra = function() {
  modal.create({
    title: 'Custom AFK Message',
    content: 'Enter a custom Away From Keyboard [AFK] message here',
    value : settings.custom.customAfkMessage || '',
    placeholder: "Be right back!",
    maxlength: '255',
    confirmCallback: saveAFKmessage
  });
};

module.exports = afk_module;