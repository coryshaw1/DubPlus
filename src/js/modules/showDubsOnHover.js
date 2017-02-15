'use strict';
/* global Dubtrack, dubplus */
var menu = require('../lib/menu.js');
var modal = require('../utils/modal.js');
var settings = require("../lib/settings.js");

var dubshover = {};

dubshover.id = "dubplus-dubs-hover";
dubshover.moduleName = "Show Dub info on Hover";
dubshover.description = "Show Dub info on Hover.";
dubshover.optionState = settings.options[dubshover.id] || false; // initial state from stored settings
dubshover.category = "General";
dubshover.menuHTML = menu.makeOptionMenu(dubshover.moduleName, {
    id : dubshover.id,
    desc : dubshover.description
  });

// tracking dub off our global scope which I'm not happy about 
// but it'll do for now
window.dubplus.dubs = {
  upDubs: [],
  downDubs: [],
  grabs: [],
};

/*******************************/


dubshover.resetGrabs = function(){
  window.dubplus.dubs.grabs = []; //TODO: Remove when we can hit the api for all grabs of current playing song
};

dubshover.grabInfoWarning = function(){
  if (!this.warned) {return;}

  this.warned = true;
  modal.create({
    title: 'Grab Vote Info',
    content: 'Please note that this feature is currently still in development. We are waiting on the ability to pull grab vote information from Dubtrack on load. Until then the only grabs you will be able to see are those you are present in the room for.'
  });
};

dubshover.showDubsOnHover = function(){
  var self = this;

  this.resetDubs();

  Dubtrack.Events.bind("realtime:room_playlist-dub", this.dubWatcher);
  Dubtrack.Events.bind("realtime:room_playlist-queue-update-grabs", this.grabWatcher);
  Dubtrack.Events.bind("realtime:user-leave", this.dubUserLeaveWatcher);
  Dubtrack.Events.bind("realtime:room_playlist-update", this.resetDubs);
  Dubtrack.Events.bind("realtime:room_playlist-update", this.resetGrabs); //TODO: Remove when we can hit the api for all grabs of current playing song

  var dubupEl = $('.dubup').first().parent('li');
  var dubdownEl = $('.dubdown').first().parent('li');
  var grabEl = $('.add-to-playlist-button').first().parent('li');

  $(dubupEl).addClass("dubplus-updubs-hover");
  $(dubdownEl).addClass("dubplus-downdubs-hover");
  $(grabEl).addClass("dubplus-grabs-hover");

  //Show compiled info containers when casting/changing vote
  $(dubupEl).click(function(event){
    $('#dubplus-updubs-container').remove();
      var x = event.clientX, y = event.clientY;

      if(!x || !y || isNaN(x) || isNaN(y)){
        return $('#dubplus-downdubs-container').remove();
      }

      var elementMouseIsOver = document.elementFromPoint(x, y);

    if($(elementMouseIsOver).hasClass('dubplus-updubs-hover') || 
        $(elementMouseIsOver).parents('.dubplus-updubs-hover').length > 0){
      setTimeout(function(){$(dubupEl).mouseenter();}, 250);
    }
  });

  $(dubdownEl).click(function(event){
    $('#dubplus-downdubs-container').remove();
      var x = event.clientX, y = event.clientY;

      if(!x || !y || isNaN(x) || isNaN(y)){
        return $('#dubplus-downdubs-container').remove();
      }

      var elementMouseIsOver = document.elementFromPoint(x, y);

    if($(elementMouseIsOver).hasClass('dubplus-downdubs-hover') || 
      $(elementMouseIsOver).parents('.dubplus-downdubs-hover').length > 0){
      setTimeout(function(){$(dubdownEl).mouseenter();}, 250);
    }
  });

  $(grabEl).click(function(event){
    $('#dubplus-grabs-container').remove();
      var x = event.clientX, y = event.clientY;

      if(!x || !y || isNaN(x) || isNaN(y)){
          return $('#dubplus-grabs-container').remove();
      }

      var elementMouseIsOver = document.elementFromPoint(x, y);

    if($(elementMouseIsOver).hasClass('dubplus-grabs-hover') || 
      $(elementMouseIsOver).parents('.dubplus-grabs-hover').length > 0){
      setTimeout(function(){$(grabEl).mouseenter();}, 250);
    }
  });

  $(dubupEl).mouseenter(function(){
    if($("#dubplus-updubs-container").length > 0) {return;} //already exists

    var infoPaneWidth = $(dubupEl).innerWidth() + $(dubdownEl).innerWidth();
    var dubupBackground = $('.dubup').hasClass('voted') ? $('.dubup').css('background-color') : $('.dubup').find('.icon-arrow-up').css('color');
    var html;

    if(window.dubplus.dubs.upDubs.length > 0){
      html = '<ul id="dubinfo-preview" class="dubinfo-show dubplus-updubs-hover" style="border-color: '+dubupBackground+'">';

      window.dubplus.dubs.upDubs.forEach(function(val){
        html += '<li class="preview-dubinfo-item users-previews dubplus-updubs-hover">' +
              '<div class="dubinfo-image">' +
                  '<img src="https://api.dubtrack.fm/user/' + val.userid + '/image">' +
              '</div>' +
              '<span class="dubinfo-text">@' + val.username + '</span>' +
          '</li>';
      });
      html += '</ul>';
    } else {
      html = '<div id="dubinfo-preview" class="dubinfo-show dubplus-updubs-hover dubplus-no-dubs" style="border-color: '+dubupBackground+'">' +
            'No updubs have been casted yet!' +
        '</div>';
    }

    var newEl = document.createElement('div');
    newEl.id = 'dubplus-updubs-container';
    newEl.className = 'dubinfo-show dubplus-updubs-hover';
    newEl.innerHTML = html;
    newEl.style.visibility = "hidden";
    document.body.appendChild(newEl);

    var elemRect = this.getBoundingClientRect();
    var bodyRect = document.body.getBoundingClientRect();

    newEl.style.visibility = "";
    newEl.style.width = infoPaneWidth + 'px';
    newEl.style.top = (elemRect.top-150) + 'px';

    //If info pane would run off screen set the position on right edge
    if(bodyRect.right - elemRect.left >= infoPaneWidth){
      newEl.style.left = elemRect.left + 'px';
    } else {
      newEl.style.right = 0;
    }

    document.body.appendChild(newEl);

    $(this).addClass('dubplus-updubs-hover');

    $(document.body).on('click', '.preview-dubinfo-item', function(e){
      var new_text = $(this).find('.dubinfo-text')[0].innerHTML + ' ' ;
      self.updateChatInputWithString(new_text);
    });

    $('#dubinfo-preview').perfectScrollbar();

    $('.dubplus-updubs-hover').mouseleave(function(event){
      var x = event.clientX, y = event.clientY;

      if(!x || !y || isNaN(x) || isNaN(y)){
          return $('#dubplus-downdubs-container').remove();
      }

      var elementMouseIsOver = document.elementFromPoint(x, y);

      if(!$(elementMouseIsOver).hasClass('dubplus-updubs-hover') && !$(elementMouseIsOver).hasClass('ps-scrollbar-y') && $(elementMouseIsOver).parent('.dubplus-updubs-hover').length <= 0){
          $('#dubplus-updubs-container').remove();
      }
    });

  });

  $(dubdownEl).mouseenter(function(){
    if($("#dubplus-downdubs-container").length > 0) {return;} //already exists

    var infoPaneWidth = $(dubupEl).innerWidth() + $(dubdownEl).innerWidth();
    var dubdownBackground = $('.dubdown').hasClass('voted') ? $('.dubdown').css('background-color') : $('.dubdown').find('.icon-arrow-down').css('color');
    var html;

    if(this.userIsAtLeastMod(Dubtrack.session.id)){
      if(window.dubplus.dubs.downDubs.length > 0){
          html = '<ul id="dubinfo-preview" class="dubinfo-show dubplus-downdubs-hover" style="border-color: '+dubdownBackground+'">';
          window.dubplus.dubs.downDubs.forEach(function(val){
            html += '<li class="preview-dubinfo-item users-previews dubplus-downdubs-hover">' +
                        '<div class="dubinfo-image">' +
                            '<img src="https://api.dubtrack.fm/user/' + val.userid + '/image">' +
                        '</div>' +
                        '<span class="dubinfo-text">@' + val.username + '</span>' +
                    '</li>';
          });
          html += '</ul>';
      } else {
        html = '<div id="dubinfo-preview" class="dubinfo-show dubplus-downdubs-hover dubplus-no-dubs" style="border-color: '+dubdownBackground+'">' +
              'No downdubs have been casted yet!' +
          '</div>';
      }
    } else {
        html = '<div id="dubinfo-preview" class="dubinfo-show dubplus-downdubs-hover dubplus-downdubs-unauthorized" style="border-color: '+dubdownBackground+'">' +
              'You must be at least a mod to view downdubs!' +
          '</div>';
    }

    var newEl = document.createElement('div');
    newEl.id = 'dubplus-downdubs-container';
    newEl.className = 'dubinfo-show dubplus-downdubs-hover';
    newEl.innerHTML = html;
    newEl.style.visibility = "hidden";
    document.body.appendChild(newEl);

    var elemRect = this.getBoundingClientRect();
    var bodyRect = document.body.getBoundingClientRect();

    newEl.style.visibility = "";
    newEl.style.width = infoPaneWidth + 'px';
    newEl.style.top = (elemRect.top-150) + 'px';

    //If info pane would run off screen set the position on right edge
    if (bodyRect.right - elemRect.left >= infoPaneWidth) {
      newEl.style.left = elemRect.left + 'px';
    } else {
      newEl.style.right = 0;
    }

    document.body.appendChild(newEl);

    $(this).addClass('dubplus-downdubs-hover');

    $(document.body).on('click', '.preview-dubinfo-item', function(e){
      var new_text = $(this).find('.dubinfo-text')[0].innerHTML + ' ' ;
      self.updateChatInputWithString(new_text);
    });

    $('#dubinfo-preview').perfectScrollbar();

    $('.dubplus-downdubs-hover').mouseleave(function(event){
      var x = event.clientX, y = event.clientY;

      if(!x || !y || isNaN(x) || isNaN(y)){
          return $('#dubplus-downdubs-container').remove();
      }

      var elementMouseIsOver = document.elementFromPoint(x, y);

      if(!$(elementMouseIsOver).hasClass('dubplus-downdubs-hover') && !$(elementMouseIsOver).hasClass('ps-scrollbar-y') && $(elementMouseIsOver).parent('.dubplus-downdubs-hover').length <= 0){
          $('#dubplus-downdubs-container').remove();
      }
    });
  });

  $(grabEl).mouseenter(function(){
    if($("#dubplus-grabs-container").length > 0) {return;} //already exists

    var infoPaneWidth = $(dubupEl).innerWidth() + $(grabEl).innerWidth();
    
    var grabsBackground = $('.add-to-playlist-button').hasClass('grabbed') ? $('.add-to-playlist-button').css('background-color') : $('.add-to-playlist-button').find('.icon-heart').css('color');
    
    var html;

    if(window.dubplus.dubs.grabs.length > 0){
      html = '<ul id="dubinfo-preview" class="dubinfo-show dubplus-grabs-hover" style="border-color: '+grabsBackground+'">';

      window.dubplus.dubs.grabs.forEach(function(val){
        html += '<li class="preview-dubinfo-item users-previews dubplus-grabs-hover">' +
            '<div class="dubinfo-image">' +
                '<img src="https://api.dubtrack.fm/user/' + val.userid + '/image">' +
            '</div>' +
            '<span class="dubinfo-text">@' + val.username + '</span>' +
        '</li>';
      });
      html += '</ul>';

    } else {
      
      html = '<div id="dubinfo-preview" class="dubinfo-show dubplus-grabs-hover dubplus-no-grabs" style="border-color: '+grabsBackground+'">' +
                    'This song hasn\'t been grabbed yet!' +
                '</div>';
    }

    var newEl = document.createElement('div');
    newEl.id = 'dubplus-grabs-container';
    newEl.className = 'dubinfo-show dubplus-grabs-hover';
    newEl.innerHTML = html;
    newEl.style.visibility = "hidden";
    document.body.appendChild(newEl);

    var elemRect = this.getBoundingClientRect();
    var bodyRect = document.body.getBoundingClientRect();

    newEl.style.visibility = "";
    newEl.style.width = infoPaneWidth + 'px';
    newEl.style.top = (elemRect.top-150) + 'px';

    //If info pane would run off screen set the position on right edge
    if (bodyRect.right - elemRect.left >= infoPaneWidth) {
      newEl.style.left = elemRect.left + 'px';
    } else {
      newEl.style.right = 0;
    }

    document.body.appendChild(newEl);

    $(this).addClass('dubplus-grabs-hover');

    $(document.body).on('click', '.preview-dubinfo-item', function(e){
      var new_text = $(this).find('.dubinfo-text')[0].innerHTML + ' ' ;
      self.updateChatInputWithString(new_text);
    });

    $('#dubinfo-preview').perfectScrollbar();

    $('.dubplus-grabs-hover').mouseleave(function(event){
      var x = event.clientX, y = event.clientY;

      if(!x || !y || isNaN(x) || isNaN(y)){
        return $('#dubplus-grabs-container').remove();
      }

      var elementMouseIsOver = document.elementFromPoint(x, y);

      if( !$(elementMouseIsOver).hasClass('dubplus-grabs-hover') && 
          !$(elementMouseIsOver).hasClass('ps-scrollbar-y') && 
        $(elementMouseIsOver).parent('.dubplus-grabs-hover').length <= 0){
          $('#dubplus-grabs-container').remove();
      }

    });
  });
 
};

dubshover.stopDubsOnHover = function(){
  Dubtrack.Events.unbind("realtime:room_playlist-dub", this.dubWatcher);
  Dubtrack.Events.unbind("realtime:room_playlist-queue-update-grabs", this.grabWatcher);
  Dubtrack.Events.unbind("realtime:user-leave", this.dubUserLeaveWatcher);
  Dubtrack.Events.unbind("realtime:room_playlist-update", this.resetDubs);
  Dubtrack.Events.unbind("realtime:room_playlist-update", this.resetGrabs); //TODO: Remove when we can hit the api for all grabs of current playing song
};


dubshover.dubUserLeaveWatcher = function(e){
    var self = this;
    //Remove user from dub list
    if($.grep(window.dubplus.dubs.upDubs, function(el){ return el.userid === e.user._id; }).length > 0){
        $.each(window.dubplus.dubs.upDubs, function(i){
            if(window.dubplus.dubs.upDubs[i].userid === e.user._id) {
                window.dubplus.dubs.upDubs.splice(i,1);
                return false;
            }
        });
    }
    if($.grep(window.dubplus.dubs.downDubs, function(el){ return el.userid === e.user._id; }).length > 0){
        $.each(window.dubplus.dubs.downDubs, function(i){
            if(window.dubplus.dubs.downDubs[i].userid === e.user._id) {
                window.dubplus.dubs.downDubs.splice(i,1);
                return false;
            }
        });
    }
    if($.grep(mydubs.grabs, function(el){ return el.userid === e.user._id; }).length > 0){
        $.each(window.dubplus.dubs.grabs, function(i){
            if(window.dubplus.dubs.grabs[i].userid === e.user._id) {
                window.dubplus.dubs.grabs.splice(i,1);
                return false;
            }
        });
    }
};

dubshover.grabWatcher = function(e){
  var self = this;
  //If grab already casted
  if($.grep(window.dubplus.dubs.grabs, function(el){ return el.userid === e.user._id; }).length <= 0){
    window.dubplus.dubs.grabs.push({
      userid: e.user._id,
      username: e.user.username
    });
  }
};

dubshover.updateChatInputWithString = function(str){
  $("#chat-txt-message").val(str).focus();
};

dubshover.userIsAtLeastMod = function(userid){
  return Dubtrack.helpers.isDubtrackAdmin(userid) ||
    Dubtrack.room.users.getIfOwner(userid) ||
    Dubtrack.room.users.getIfManager(userid) ||
    Dubtrack.room.users.getIfMod(userid);
};

dubshover.deleteChatMessageClientSide = function(el){
  $(el).parent('li')[0].remove();
};

dubshover.dubWatcher = function(e){

  if(e.dubtype === 'updub'){

    //If dub already casted
    if($.grep(window.dubplus.dubs.upDubs, function(el){ return el.userid === e.user._id; }).length <= 0){
      window.dubplus.dubs.upDubs.push({
        userid: e.user._id,
        username: e.user.username
      });
    }

    //Remove user from other dubtype if exists
    if($.grep(window.dubplus.dubs.downDubs, function(el){ return el.userid === e.user._id; }).length > 0){
      $.each(window.dubplus.dubs.downDubs, function(i){
        if(window.dubplus.dubs.downDubs[i].userid === e.user._id) {
          window.dubplus.dubs.downDubs.splice(i,1);
          return false;
        }
      });
    }

  } else if (e.dubtype === 'downdub'){

    //If dub already casted
    if($.grep(window.dubplus.dubs.downDubs, function(el){ return el.userid === e.user._id; }).length <= 0 && this.userIsAtLeastMod(Dubtrack.session.id)){
        window.dubplus.dubs.downDubs.push({
          userid: e.user._id,
          username: e.user.username
        });
    }

    //Remove user from other dubtype if exists
    if($.grep(window.dubplus.dubs.upDubs, function(el){ return el.userid === e.user._id; }).length > 0){
      $.each(window.dubplus.dubs.upDubs, function(i){
        if(window.dubplus.dubs.upDubs[i].userid === e.user._id) {
          window.dubplus.dubs.upDubs.splice(i,1);
          return false;
        }
      });
    }

  }

  var msSinceSongStart = new Date() - new Date(Dubtrack.room.player.activeSong.attributes.song.played);
  if(msSinceSongStart < 1000) {return;}

  if(window.dubplus.dubs.upDubs.length !== Dubtrack.room.player.activeSong.attributes.song.updubs){
    // console.log("Updubs don't match, reset! Song started ", msSinceSongStart, "ms ago!");
    this.resetDubs();
  }
  else if(this.userIsAtLeastMod(Dubtrack.session.id) && window.dubplus.dubs.downDubs.length !== Dubtrack.room.player.activeSong.attributes.song.downdubs){
    // console.log("Downdubs don't match, reset! Song started ", msSinceSongStart, "ms ago!");
    this.resetDubs();
  }

  // TODO: Uncomment this else if block when we can hit the api for all grabs of current playing song
  /*
  else if(window.dubplus.dubs.grabs.length !== parseInt($('.grab-counter')[0].innerHTML)){
      console.log("Grabs don't match, reset! Song started ", msSinceSongStart, "ms ago!");
      this.resetDubs();
  }*/
};

dubshover.resetDubs = function(){
  var self = this;
  window.dubplus.dubs.upDubs = [];
  window.dubplus.dubs.downDubs = [];
  // window.dubplus.dubs.grabs: [] //TODO: Uncomment this when we can hit the api for all grabs of current playing song

  var dubsURL = "https://api.dubtrack.fm/room/" + Dubtrack.room.model.id + "/playlist/active/dubs";
  $.getJSON(dubsURL, function(response){
    response.data.upDubs.forEach(function(e){
      //Dub already casted (usually from autodub)
      if($.grep(window.dubplus.dubs.upDubs, function(el){ return el.userid === e.userid; }).length > 0){
        return;
      }

      var username;
      if(!Dubtrack.room.users.collection.findWhere({userid: e.userid}) || 
         !Dubtrack.room.users.collection.findWhere({userid: e.userid}).attributes) {
          $.getJSON("https://api.dubtrack.fm/user/" + e.userid, function(response){
              if(response && response.userinfo) {
                username = response.userinfo.username;
              }
          });
      } else {
        username = Dubtrack.room.users.collection.findWhere({userid: e.userid}).attributes._user.username;
      }

      if(!username) { return; }

      window.dubplus.dubs.upDubs.push({
          userid: e.userid,
          username: username
      });
    });
    //TODO: Uncomment this when we can hit the api for all grabs of current playing song
    /*response.data.grabs.forEach(function(e){
        //Dub already casted (usually from autodub)
        if($.grep(window.dubplus.dubs.grabs, function(el){ return el.userid == e.userid; }).length > 0){
            return;
        }

        var username;
        if(!Dubtrack.room.users.collection.findWhere({userid: e.userid}) || !Dubtrack.room.users.collection.findWhere({userid: e.userid}).attributes) {
            $.getJSON("https://api.dubtrack.fm/user/" + e.userid, function(response){
                username = response.userinfo.username;
            });
        }
        else{
            username = Dubtrack.room.users.collection.findWhere({userid: e.userid}).attributes._user.username;
        }

        window.dubplus.dubs.grabs.push({
            userid: e.userid,
            username: username
        })
    });*/

    //Only let mods or higher access down dubs
    if(self.userIsAtLeastMod(Dubtrack.session.id)){
      response.data.downDubs.forEach(function(e){
        //Dub already casted
        if($.grep(window.dubplus.dubs.downDubs, function(el){ return el.userid === e.userid; }).length > 0){
            return;
        }

        var username;
        if(!Dubtrack.room.users.collection.findWhere({userid: e.userid}) || !Dubtrack.room.users.collection.findWhere({userid: e.userid}).attributes) {
            $.getJSON("https://api.dubtrack.fm/user/" + e.userid, function(response){
                username = response.userinfo.username;
            });
        }
        else{
            username = Dubtrack.room.users.collection.findWhere({userid: e.userid}).attributes._user.username;
        }

        window.dubplus.dubs.downDubs.push({
            userid: e.userid,
            username: Dubtrack.room.users.collection.findWhere({userid: e.userid}).attributes._user.username
        });
      });
    }
  });
};

/************************************************************/

dubshover.init = function(){
  if (this.optionState === true) {
    this.grabInfoWarning();
    this.showDubsOnHover();
  }
};

dubshover.go = function(e) {
  
  var newOptionState;
  if (!this.optionState) {
    newOptionState = true;
    
    this.showDubsOnHover();
    this.grabInfoWarning();

  } else {
    newOptionState = false;
    this.stopDubsOnHover();
  }

  // these following lines are standard, need to remove them and make
  // them part of loadModules
  this.optionState = newOptionState;
  this.toggleAndSave(this.id, newOptionState);
};

module.exports = dubshover;