const slider = document.getElementById('myRange')
const slider_value = document.getElementById('pass-val')

slider_value.innerText = slider.value

slider.oninput = function(){
    slider_value.innerText = this.value
    localStorage.setItem('slider-input',this.value)
}

const passwordField = document.getElementById('password-field')
passwordField.readOnly = true


//---------------------------------------------------------
// main algoritm

let Input = '1' // as the lw-case checkbox is by default ticked , we need to make sure that out Input has 1 by default

const lowerCase = 'abcdefghijklmnopqrstuvwxyz'
const upperCase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
const numbers = '0123456789'
const symbols = '@#$%&'
const similar_chr = [
    'aA@4',
    'bB68',
    'cCeo',
    'dD',
    'eEc3',
    'fFpP',
    'gG8',
    'hH#',
    'iI1lL',
    'jJ7i',
    'kKR',
    'mMNn',
    'oO0Q',
    'qQ9',
    'rRK',
    'sS$5&',
    'tTI1f',
    'uUvV',
    'wWvV',
    'xXyY',
    'zZ2',
]

const selectionOject = {
    '1': lowerCase,
    '2':upperCase,
    '3':numbers,
    '4':symbols,
}

const generatePassword = document.getElementById('pass-gen-btn')
const checkBoxOptions = document.querySelectorAll('Input[type=checkbox]')

checkBoxOptions.forEach((item) => { 
    item.addEventListener("click",() => {
        if(item.checked == true){
            Input += item.value
            localStorage.setItem('input',Input)
            console.log(Input)
        }
        else{
            Input = Input.replace(item.value,'') // the replace method returns a new String
            localStorage.setItem('input',Input)
            console.log(Input)
        }
    })
})

function reloadInput(){
    slider.value = localStorage.getItem('slider-input')
    slider_value.innerText =  slider.value

    Input = localStorage.getItem('input')

    checkBoxOptions.forEach((item) => {
        if(Input.includes(item.value)){
            item.checked = true
        }
    })
}

window.onload = reloadInput

//---------------------------------------------------------

function RandomSelection(array){
    return array.charAt(Math.floor(Math.random() * array.length))
}
//---------------------------------------------------------


generatePassword.addEventListener('click',() => {
    let password = ''
    let counter = 0

    let v // a temp variable used for no-rep case
    let comparatorString = ''
    let removedString = ''

    while(counter != Number(slider.value)){

        if(!Input.includes('5')){
            let access = RandomSelection(Input)
            password += RandomSelection(selectionOject[access])

        }else{
            let new_Input = Input.replace('5','')
            let access = RandomSelection(new_Input)
            let unique_val = RandomSelection(selectionOject[access])
            // console.log(unique_val)

            similar_chr.forEach((item) => {
                v = item.match(unique_val) // returns null if any of the patterns do not have the unique_val
                if(v != null){
                    if(!comparatorString.includes(unique_val)){
                        comparatorString += v.input+' '
                        // console.log(comparatorString)
                    }
                }
            })

            if(!password.includes(unique_val) && comparatorString.includes(unique_val)){
                // console.log(comparatorString +' ------- '+removedString)
                if(!removedString.includes(unique_val)){
                    removedString += comparatorString
                    password += unique_val
                    comparatorString = ''
                    // console.log('new comparator ' + comparatorString)
                }else{
                    comparatorString = ''
                    continue
                }
            }else{
                comparatorString = ''
                continue
            }
        }
        counter += 1
    }
    passwordField.value = password

    copyButton.value = 'copy'
    copyButton.disabled = false
})


//---------------------------------------------------------

// copy button

// syntax: 
// navigator.clipboard.writeText( <text> )

const copyButton = document.getElementById('cpy-btn')

copyButton.addEventListener('click',() => {
    navigator.clipboard.writeText(passwordField.value)

    copyButton.value = 'copied'
    copyButton.disabled = true
})

//---------------------------------------------------------
