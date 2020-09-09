const form= document.getElementsByTagName('form')[0];
const roleSelect= document.getElementById('title');
const otherField= document.getElementById('other-title');
const label=document.getElementsByTagName('LABEL');
otherField.style.display='none';
label[3].style.display='none';

const designSelect = document.getElementById('design');
const designOptions= designSelect.options;

const colorSelect = document.getElementById('color');
const colorOptions = colorSelect.options;
const colorLabel=document.querySelector('#shirt-colors');
colorLabel.style.display='none';

colorSelect.style.display='none';


const activitiesFieldset = document.querySelector('.activities');
const checkboxes = document.querySelectorAll('.activities input');
const errorDiv=document.createElement('div');
const activitiesError=document.createElement('p');
const activitiesErrorMes= activitiesError.textContent='Please Select One Activity';


errorDiv.appendChild(activitiesError);


const totalDiv= document.createElement('div');
const sumP = document.createElement('p');
activitiesFieldset.appendChild(totalDiv);
activitiesFieldset.appendChild(errorDiv);
const totalArray = [];

const paymentSelect = document.getElementById('payment');
const paymentOptions = paymentSelect.options;

const ccDiv = document.getElementById('credit-card');
const payPalDiv = document.getElementById('paypal');
const bitCoinDiv = document.getElementById('bitcoin');

const nameField= document.querySelector('#name');
const parentName = nameField.parentNode;
const nameError = document.createElement('p');
const nameErrorMessage = nameError.textContent = 'Name Field Cannot Be Blank';
parentName.insertBefore(nameError, nameField.nextSibling);

parentName.childNodes[6].style.display='none';


const emailField= document.querySelector('#mail'); 
const parentEmail= emailField.parentNode;
const emailError = document.createElement('p');
const emailErrorMessageBlank = emailError.textContent = 'Email Field Cannot Be Blank';
parentEmail.insertBefore(emailError, emailField.nextSibling);
parentEmail.childNodes[11].style.display='none';

const paymentFieldset = document.getElementsByTagName('fieldset')[3];
const ccField= document.querySelector('#cc-num');
const ccHolder=document.querySelector('#credit-card');
const ccInfoDiv= document.getElementsByClassName('col-3')[1];
const ccError=document.createElement('p');

const zipField= document.querySelector('#zip');
const zipError=document.createElement('p');

const cvvField=document.querySelector('#cvv');
const cvvError=document.createElement('p');


/**
 * Setting focus on page load to first field
 * 
 * Found code here: https://techstacker.com/how-to-auto-focus-first-input-field-form-vanilla-javascript/
 */

window.onload = function() {
    document.getElementById("name").focus();
};


/**
 * Setting default conditions for the T-shirt Info section
 * 
 * Is this a good instance where I would use an IIFE? 
 */

function defaultTheme() {
    designOptions[0].selected=true;
    designOptions[0].disabled=true;
    designOptions[0].setAttribute('value', 'design');
    const colorDefault = document.createElement('option');
    colorDefault.setAttribute('value', 'theme');
    const defaultText = document.createTextNode('Please select a T-shirt theme');
    colorDefault.appendChild(defaultText);

    colorSelect.appendChild(colorDefault);
    colorDefault.selected = true;

    for (i=0; i < colorOptions.length; i++){
        colorOptions[i].style.display='none';
    }
}
defaultTheme();

/**
 * Setting default conditions for the Payment Info section
 * 
 * Is this a good instance where I would use an IIFE? 
 */

function defaultPayment(){
    paymentOptions[1].selected=true;
    paymentOptions[0].disabled=true;
    ccDiv.style.display='block';
    payPalDiv.style.display='none';
    bitCoinDiv.style.display='none';
}
defaultPayment();

/**
 * Job Role Option eventhandler on chage 
 * 
 * If other selected dispaly input and label
 */
roleSelect.addEventListener('change', e => {
    if (e.target.value === 'other'){
        label[3].style.display='block';
        otherField.style.display='block';
    } else {
        otherField.style.display='none';
        label[3].style.display='none';
    }
});

/**
 * Displaying repsective colors based on selection 
 * Loop through color options and see if counter matches color index conditions 
 * Default color option set based on selection 
 */

designSelect.addEventListener('change', e => {
    colorSelect.style.display='block';
    colorLabel.style.display='block';
    if (e.target.value === 'js puns'){
        for (let i=0; i < colorOptions.length; i++){
            if ([i] <= 2) {
                colorOptions[i].style.display='block';
            } else {
                colorOptions[i].style.display='none';
            }
        }
        colorOptions[0].selected=true;
        
    } else if (e.target.value === 'heart js'){
        for (let i=0; i < colorOptions.length; i++){
            if ([i] > 2  && [i] < (colorOptions.length-1)) {
                colorOptions[i].style.display='block';
            }else {
                colorOptions[i].style.display='none';
            }
        }
        colorOptions[3].selected=true; 
    } 
});

/**
 * Checkbox Eventhandler
 * If event is checked = true any other event with conflicting time slot disabled = true
 * Get target's attribute data-cost and convert into number and push or pop out of array if check or unchecked
 * Sum of array is appended to Activities fieldset
 *  
 */
activitiesError.style.display='none';


function activitiesCheckedValidator(){
    for (let i=0; i < checkboxes.length; i++) {
        if(checkboxes[i].checked){
            activitiesError.style.display='none';
            return true;
        }
    }
    activitiesError.style.display='block';
    return false;    
}
activitiesFieldset.addEventListener('change', e => {     
    if (checkboxes[1].checked){
        checkboxes[3].disabled =true;
        checkboxes[5].disabled =true; 
    } else if (checkboxes[3].checked ){
        checkboxes[1].disabled =true;
        checkboxes[5].disabled =true; 
    } else if (checkboxes[5].checked){
        checkboxes[1].disabled =true;
        checkboxes[3].disabled =true;
    } else {
        checkboxes[1].disabled =false;
        checkboxes[3].disabled =false;
        checkboxes[5].disabled =false;
    }
    
    if (checkboxes[2].checked){
        checkboxes[4].disabled=true;
        checkboxes[6].disabled=true;
    } else if (checkboxes[4].checked){
        checkboxes[2].disabled=true;
        checkboxes[6].disabled=true;
    } else if (checkboxes[6].checked){
        checkboxes[2].disabled=true;
        checkboxes[4].disabled=true;
    } else {
        checkboxes[2].disabled =false;
        checkboxes[4].disabled =false;
        checkboxes[6].disabled =false;
    }

    if(e.target.checked){
        totalArray.push(parseInt(e.target.getAttribute('data-cost')));
    } else if (e.target.checked !== true){
        totalArray.pop(parseInt(e.target.getAttribute('data-cost')));
    }

/**
 * Had to google how to find sum of array
 * https://www.tutorialrepublic.com/faq/how-to-find-the-sum-of-an-array-of-numbers-in-javascript.php
 */
    const sum =totalArray.reduce(function(a,b){
        return a + b;
    }, 0);

    totalDiv.appendChild(sumP);
    
    if (sum){
        sumP.textContent=`Grand Total: $` + sum;
        sumP.style.display='block';
    } else {
        sumP.style.display='none';
    }  

    activitiesCheckedValidator();
});


/**
 * Displaying repsective payment option based off of selction 
 */

paymentSelect.addEventListener('change', e => {
    if (e.target.value === 'credit card'){
        ccDiv.style.display='block';
        payPalDiv.style.display='none';
        bitCoinDiv.style.display='none';
    } else if (e.target.value === 'paypal') {
        payPalDiv.style.display='block';
        ccDiv.style.display='none';
        bitCoinDiv.style.display='none';
    } else {
        bitCoinDiv.style.display='block';
        ccDiv.style.display='none';
        payPalDiv.style.display='none';
    }
});

/**
 *** VALIDATION ***
 */

function nameValidator() {
    if (nameField.value === '') {
        nameField.style.borderColor='#DE1838';
        parentName.insertBefore(nameError, nameField.nextSibling);
        parentName.childNodes[6].style.display='block';
        return false;
    } else{
        nameField.style.borderColor='';
        parentName.childNodes[6].style.display='none';
        return true;
    }
}
/**
 * Conditional Error Here
 * If empty or invalid different errors
 */
function emailValidator(){
    if (emailField.value=== '') {
        emailField.style.borderColor='#DE1838';
        const emailErrorMessageBlank = emailError.textContent = 'Email Field Cannot Be Blank';
        parentEmail.insertBefore(emailError, emailField.nextSibling);
        parentEmail.childNodes[11].style.display='block';
        return false;
    } else if (/[^@]+@[^@.]+\.[a-z]+$/i.test(emailField.value) !== true){
        const emailErrorMessageInvalid = emailError.textContent = 'Please Reformat Email to Match: save@teamtreehouse.com';
        parentEmail.insertBefore(emailError, emailField.nextSibling);  
        return false;
    }else {
        emailField.style.borderColor='';
        parentEmail.childNodes[11].style.display='none';
        return true;
    }
}

/**
 * Conditional Error Here
 * If empty or invalid different errors
 */

function ccValidator(){
    if (ccField.value=== '') {
        const ccErrorMessageBlank= ccError.textContent='Credit Card Field Cannot Be Blank.';
        ccHolder.insertBefore(ccError, ccInfoDiv.nextSibling);
        ccField.style.borderColor='#DE1838';
        ccError.style.display='block'; 
        return false;
    } else if (/^\d{13,16}$/.test(ccField.value) !== true){
        const ccErrorMessageInvalid= ccError.textContent='Please Enter A Valid Credit Card Number Between 13 and 16 Digits Long.';
        ccHolder.insertBefore(ccError, ccInfoDiv.nextSibling);
        ccError.style.display='block';  
        return false;
    }else {
        ccField.style.borderColor='';
        ccError.style.display='none';
        return true;
    }
};

function zipValidator(){
    
     if(/^\d{5}$/.test(zipField.value) !== true ){
        const zipMessage=zipError.textContent='Please Enter a Valid 5 Digit Zip';
        ccHolder.insertBefore(zipError, ccInfoDiv.nextSibling);
        zipField.style.borderColor='#DE1838';
        zipError.style.display='block';  
        return false;
    } else{ 
        zipField.style.borderColor='';
        zipError.style.display='none';
        return true;
    }
};

function cvvValidator(){
    if (/^\d{3}$/.test(cvvField.value) !== true){
        const cvvErrorMessage= cvvError.textContent='Please Enter a Valid 3 digit CVV.';
        ccHolder.insertBefore(cvvError, ccInfoDiv.nextSibling);
        cvvField.style.borderColor='#DE1838';
        cvvError.style.display='block';  
        return false;
    }else {
        cvvField.style.borderColor='';
        cvvError.style.display='none';
        return true;
    }
}


/**
 * Real Time Error Messages 
 */
nameField.addEventListener('keyup', e => {
   nameValidator();
});

emailField.addEventListener('keyup', e => {
    emailValidator();
});


ccField.addEventListener('keyup', e => {
    ccValidator();
});

zipField.addEventListener('keyup', e => {
    zipValidator();
    
});

cvvField.addEventListener('keyup', e => {
    cvvValidator();
});

form.addEventListener('submit', e => {
    
    nameValidator();
    emailValidator();
    activitiesCheckedValidator();
    ccValidator();
    zipValidator();
    cvvValidator();

    if(!nameValidator()) {
        e.preventDefault();
    } else if(!emailValidator()){
        e.preventDefault();
        parentEmail.childNodes[11].style.display='block';
    }else if (!activitiesCheckedValidator()){
        e.preventDefault();
    }else if(!ccValidator()){
        e.preventDefault(); 
        console.log('cc');
    } else if(!zipValidator()){
        e.preventDefault();
    } else if(!cvvValidator()){
        e.preventDefault();
    }
});

