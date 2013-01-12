/* MPL 2.0 Author : HideAway */ 

const wp = require("weblioPane");
const sp = require("simple-prefs");
const selection = require("selection");

exports.main = function(options, callbacks){
	var wpWidget = wp.createWidget();
	var wpPane = wp.refreshPane();
	if ( options.loadReason == "install" ){ require("tabs").activeTab.reload();}
	selection.on("select", function(){
		if ( selection.text &&  selection.html != null  ){
			if ( sp.prefs.EnableWeblioPane ){
				wpPane = wp.refreshPane(wpPane);
				if ( wpPane ) { wpPane.show();}
			}
		}
	});
	
	sp.on("EnableWeblioPane" , function(prefName){
		console.log("prefChange");
		if ( prefName == "EnableWeblioPane" ) {
			wpWidget = wp.refreshWidget(wpWidget);
		}
	});
	
	wpWidget.on("click" , function(){
		console.log("widgetClick");
		if ( sp.prefs.EnableWeblioPane ){
			sp.prefs.EnableWeblioPane = false;
		} else {
			sp.prefs.EnableWeblioPane = true;
		}
	});
	
}
