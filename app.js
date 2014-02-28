var _ = require('underscore');
var ninjaBlocks = require('ninja-blocks');
// Use the API Access Token from https://a.ninja.is/hacking
var ninja = ninjaBlocks.app({user_access_token:"orm7QMe07zPcqL9gwYEiFhfQra1uZmYmKF3ROe2m4o"});

// Get the most recent temperature reading from all temperature sensors
ninja.devices({ device_type: 'rf433' }, function(err, devices) {
    _.each(devices, function(device, guid){
    	if(device.shortName == 'Alarm Button'){
	    	var eye_color = null;
			ninja.device('0000000000000000_0_0_1007').last_heartbeat(function(err, data){ eye_color = data.DA; });
			if(eye_color == 'FF0000'){
				ninja.device('0000000000000000_0_0_1007').actuate('0000FF');
			}else{
				ninja.device('0000000000000000_0_0_1007').actuate('FF0000');
			}
    	}
    })
});