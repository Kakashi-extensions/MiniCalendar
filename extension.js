
const Lang = imports.lang;
const Shell = imports.gi.Shell;
const St = imports.gi.St;
const Util = imports.misc.util;

const Main = imports.ui.main;
const PanelMenu = imports.ui.panelMenu;
const PopupMenu = imports.ui.popupMenu;
const Panel = imports.ui.panel;

const dateMenu = imports.ui.dateMenu;
const Clutter = imports.gi.Clutter;

const Calendar = imports.ui.calendar;

const guuid = 'SystemMenu'



let extension;


function _isToday(date) {
    let now = new Date();
    return now.getYear() == date.getYear() &&
           now.getMonth() == date.getMonth() &&
           now.getDate() == date.getDate();
}

const MiniCalendar = new Lang.Class({
    Name: guuid+"."+guuid,
    Extends: PanelMenu.Button,

    _init: function(calendar) {


    this._calendar = new Calendar.Calendar();

    this.icon = new St.Button({style_class: '',
                                     x_expand: true, x_align: St.Align.START,
                                     can_focus: true,
                                     reactive: false });
		this.label = new St.Icon({  icon_name: 'emblem-default-symbolic',
					 style_class: 'system-status-icon' });
		this.parent(0.0, this.label.text);
		this.actor.add_actor(this.icon);
    this.icon.add_actor(this.label);

    let boxLayout = new dateMenu.CalendarColumnLayout(this._calendar.actor);

    let vbox = new St.BoxLayout({vertical: true});
    let layout = new dateMenu.FreezableBinLayout();

    this._date = new dateMenu.TodayButton(this._calendar);



        this.menu.connect('open-state-changed', Lang.bind(this, function (menu, isOpen) {
            if (isOpen) {
                let now = new Date();
                this._date.setDate(now);
                this._calendar.setDate(now);

            }
        }));

        let item = new PopupMenu.PopupBaseMenuItem({
          reactive: false,
          can_focus: false
        });


        item.actor.add_child(vbox);

        vbox.add_actor(this._date.actor);

        vbox.add_actor(this._calendar.actor);

        this.menu.addMenuItem(item);


	},

	destroy: function() {
		this.parent();
	},


});



function enable() {



	extension = new MiniCalendar();
	Main.panel.addToStatusArea(guuid, extension);
}

function disable() {

	extension.destroy();
}
