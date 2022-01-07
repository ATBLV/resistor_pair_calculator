console.log("TITLE: Res_script.js");

var resistorValuesArray = [];

document.getElementById("integer_input").focus();

/* Event listener method */
document.getElementById("integer_input").addEventListener('keypress', function(enteredInput) {

    console.log(enteredInput.keyCode);

    if (event.keyCode === 13 || event.which === 13){

        var intInput = document.getElementById("integer_input").value;

        resistorValuesArray = res(intInput, cb_state());

        document.getElementById('array_output').innerHTML = '';

        for (var i = 0; i<5; i++) {

        html = '<div class="grid_results"><div class="box" style="width: 200px; margin-right: 0px;">Resistor 1:     ' +                  String(resistorValuesArray[i].resistor_1) + '</div> ' +
            '<div class="box " style="width: 200px;">Resistor 2:     ' + String(resistorValuesArray[i].resistor_2) + '</div> ' +
            '<div class="box " style="width: 200px;"> Result:     ' + String(resistorValuesArray[i].result) + ' </div>' +
            '<div class="box " style="width: 200px;"> Difference:     ' + String(resistorValuesArray[i].difference) +
            '</div></div></div></div>';

        document.getElementById('array_output').insertAdjacentHTML('beforeend', html);
        }
    }
});

var added_Values = [];

document.getElementById("additional_resistor").addEventListener('keypress', function(enteredInput) {

    console.log(enteredInput.keyCode);

    if (event.keyCode === 13 || event.which === 13){

        var intInput = parseInt(document.getElementById("additional_resistor").value);
        added_Values.push[intInput];
        console.log("Integer input: " + intInput);
//        var intInput = document.getElementById("additional_resistor").value;

        added_Values.push(intInput);

        // resistorValuesArray = res(intInput, cb_state());

        document.getElementById('extra_checkbox').innerHTML = '';

        for (var i = 0; i<added_Values.length; i++) {

        html = '<div class="box"><input type="checkbox" value="%value%" checked><label class="checkbox-inline">' +
        + String(added_Values[i]) + '</label></div></div>';

        html = html.replace('%value%', added_Values[i]);
        console.log(html);
        document.getElementById('extra_checkbox').insertAdjacentHTML('beforeend', html);
        }
    }
});


// Use for adding new checkbox elements
// document.getElementById("update_button").addEventListener('click', cb_state);
// document.querySelectorAll("box").addEventListener('click', res(document.getElementById("integer_input").value, cb_state()));

function cb_state() {
/* Checks the state of all check boxes to determine their inclusion in the resistor pairs calculations*/

    resistorValuesArray = [];
    var matches = document.querySelectorAll("input[type=checkbox]");

    for (var i = 0; i<matches.length; i++) {

        var ticked = matches[i].checked;
        if (ticked) {
            resistorValuesArray.push(parseInt(matches[i].value));
        }
    }
    return resistorValuesArray;
}



function res (requiredValue, values) {

    console.log("RequiredValue: " + requiredValue);
    console.log("Values array: " + values);

    var ResistorPairs = [];

    function parallelCalculation(res1, res2) {
        /* Resistors in parallel calculation */

        var sum_resistors = res1 + res2;
        var product_resistors = res1 * res2;
        var parallel_resistors = parseInt(product_resistors/sum_resistors);
        return parallel_resistors;
    }

    function ResistorPair_Object(resistor_1, resistor_2, result, difference) {

        this.resistor_1 = resistor_1;
        this.resistor_2 = resistor_2;
        this.result = result;
        this.difference = difference;
    }

    /* Resistor (pair) candidates have their value(s), calculated 'result' (for pairs) and their 'difference' from the required value stored in an object */

    /* Single resistor candidates to ResistorPairs array */
    for (var i = 0; i<values.length; i++) {

            ResistorPairs.push(new ResistorPair_Object(values[i], 0, values[i], Math.abs(requiredValue - values[i])));
    }

    /* Resistor pairs to ResistorPairs array */
    for (var i = 0; i<values.length; i++) {

        for(var j = 0; j<values.length; j++) {

            var result = parallelCalculation(values[i],values[j]);

            ResistorPairs.push(new ResistorPair_Object(values[i], values[j], result, Math.abs(requiredValue - result)));
        }
    }

    /* Sort ResistorPairs array by the difference from the required value */
    ResistorPairs.sort(function(a,b) {

            return (a.difference - b.difference)
    })

    /* Truncate the array */
    ResistorPairs = ResistorPairs.slice(0,20);

    /* Remove duplicate pairs */
    for (var i = 0; i<ResistorPairs.length; i++) {
        for (var j = 0; j<ResistorPairs.length-1; j++) {

            if ((ResistorPairs[i].resistor_1 === ResistorPairs[j+1].resistor_2) && (ResistorPairs[i].resistor_2 === ResistorPairs[j+1].resistor_1)) {

                ResistorPairs.splice(j+1,1);
            }
        }
    }

    console.log(ResistorPairs);
    return ResistorPairs;

}
