/**
  // General 
 */

import { h, Component } from 'preact';
import SectionHeader from '../../components/section-header.js';
import AFK from './afk.js'
import Autovote from './autovote.js'
import settings from '../../utils/UserSettings.js';
import AutocompleteEmoji from './autocomplete-emoji.js';
import Emotes from './emotes.js';
import CustomMentions from './custom-mentions.js';
import ChatCleaner from './chat-cleaner.js';
import ChatNotification from './chat-notifications.js';
import PMNotifications from './pm-notifications.js';
import DJNotification from './dj-notification.js';
import SnowSwitch from './snow-switch.js';
import RainSwitch from './rain-switch.js';
import ShowDubsOnHover from './show-dubs-on-hover.js';
import DowndubInChat from './downdub-in-chat.js';
import UpdubsInChat from './updubs-in-chat.js';
import GrabsInChat from './grabs-in-chat.js';

export default class GeneralSection extends Component {
  state = {
    section : settings.stored.menu.general || "open"
  }

  toggleSection = (e) => {
    this.setState((prevState)=>{
      let newState = prevState.section === "open" ? "closed" : "open";
      settings.save('menu', 'general', newState);
      return {section : newState}
    });
  }

  render(props,state) {
    let _cn = ['dubplus-menu-section'];
    if (state.section === "closed") {
      _cn.push('dubplus-menu-section-closed');
    }
    return (
      <>
        <SectionHeader 
          onClick={this.toggleSection}
          id="dubplus-general" 
          category="General"
          open={state.section} />
        <ul className={_cn.join(' ')}>
          <Autovote />
          <AFK />
          <AutocompleteEmoji />
          <Emotes />
          <CustomMentions />
          <ChatCleaner />
          <ChatNotification />
          <PMNotifications />
          <DJNotification />
          <ShowDubsOnHover />
          <DowndubInChat />
          <UpdubsInChat />
          <GrabsInChat />
          <SnowSwitch />
          <RainSwitch />
        </ul>
      </>
    );
  }
}