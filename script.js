function CheckTypeOfDrawn( type ) {
    let returnPrice = 0;
    let method = $('#typeOfMethod').val();


    switch( type ) {
        case "bust": 
            switch ( method ) {
                case "sketch":
                    returnPrice = 5;
                    break;
                case "sketchColor":
                    returnPrice = 8;
                    break;
                case "fullshading":
                    returnPrice = 15;
                    break;
            }
        break;
        

        case "halfbody": 
            switch ( method ) {
                case "sketch":
                    returnPrice = 10;
                    break;
                case "sketchColor":
                    returnPrice = 15;
                    break;
                case "fullshading":
                    returnPrice = 22;
                    break;
            }
        break;

        case "fullbody": 
            switch ( method ) {
                case "sketch":
                    returnPrice = 15;
                    break;
                case "sketchColor":
                    returnPrice = 25;
                    break;
                case "fullshading":
                    returnPrice = 30;
                    break;
            }
        break;
    }
    return returnPrice;
}

function CheckResolution() {
    let returnPrice = 0;
    switch ( $("#typeOfResolution").val() ) {
        case "fullhd":
            returnPrice = 0;
            break;
        case "4k":
            returnPrice = 0;
            break;
        case "customRes":
            returnPrice = 5;
            break;
    }
    return returnPrice;
}

function CheckBackground() {
    let returnPrice = 0;
    switch ( $("#typeOfBackground").val() ) {
        case "flatcolor":
            returnPrice = 0;
            break;
        case "transparent":
            returnPrice = 0;
            break;
        case "gradient":
            returnPrice = 0;
            break;
        case "custom":
            returnPrice = 5;
            break;
    }
    return returnPrice;
}

function MultiThings( count ) {
    var multiplier = 1;

	if ( count == 0 ) multiplier = 0;
    if ( count > 1 ) {
        multiplier = +count * 0.75;
    }
    console.log( multiplier );
    return multiplier;
}

function CalculateFinalPrice() {
    var finalPrice = 0;

    var typeOfDrawnPrice = ( CheckTypeOfDrawn( $("#typeOfDrawn").val() ) );
    var numberOfCharactersFurryCount = Number($("#numberOfCharactersFurry").val());
    var numberOfCharactersHumanCount = Number($("#numberOfCharactersHuman").val());
    var numberOfCharactersFeralCount = Number($("#numberOfCharactersFeral").val());

    var numberOfAnimalsSmallCount = Number($("#numberOfAnimalsSmall").val());
    var numberOfAnimalsBigCount = Number($("#numberOfAnimalsBig").val());

    var resolutionPrice = CheckResolution();
    var backgroundPrice = CheckBackground();

    var numberOfPropsLargeCount = Number($("#numberOfPropsLarge").val());
    var numberOfPropsSmallCount = Number($("#numberOfPropsSmall").val());

    var heavyDetailsBodyChecked = 0;
    if ( $("#heavyDetailsBody").is(':checked') ) {
        heavyDetailsBodyChecked = 10;
    }

    var hotOrder = 1;
    if ( $("#hotorder").is(':checked') ) {
        hotOrder = 2;
        if ( $("#animated").is(':checked') ) {
			hotOrder = 4;
		}
    }
	if ( $("#animated").is(':checked') && !$("#hotorder").is(':checked') ) {
        hotOrder = 3;
    }

    finalPrice = typeOfDrawnPrice * ( ( MultiThings( numberOfCharactersFurryCount + numberOfCharactersHumanCount + numberOfCharactersFeralCount ) ) );
    finalPrice = finalPrice + ( numberOfAnimalsSmallCount * 7 ) + ( numberOfAnimalsBigCount * 15 ) + resolutionPrice + backgroundPrice + heavyDetailsBodyChecked;
    finalPrice = finalPrice + ( ( MultiThings( numberOfPropsLargeCount ) * 8 ) + ( MultiThings( numberOfPropsSmallCount ) ) * 4  );
    finalPrice = finalPrice * hotOrder;

    return finalPrice;
}

$('input, select').change(function(){
    $('#finalPrice').text("$" + Math.round(CalculateFinalPrice().toString()));
});