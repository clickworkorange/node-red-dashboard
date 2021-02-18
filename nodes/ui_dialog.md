
should "passcode" be renamed? how about "encrypted"? no. "hashed"? true but crude. "security", "secure"
"secure" is good. maybe. 

### node params 
title           text 
text            text 
preset          dialog class (alert, confirm, prompt, passcode)
template        default, file, custom
custom          html (pre-populated)
type            alert, confirm, prompt or passcode
hash            if passcode, can be string or flow/global variable
fields          an array of fields (text,radio,select,etc) if single text entry isn't enough
                the template will use this object to construct (and name, and default) the
                needed form elements
initialValue    this might not be a good fit with `fields`... 

### outputs 
output1 (always)               value(s) if prompt, passcode, else true / false (ok / cancel)
output2 (if "ok")              org msg

### logic
ok == primary action
cancel == secondary action
node settings are not needed in the output (drop config msg)
cancel/esc/etc should send false on out1, nothing on out2
validation functions for "prompt"?

### custom fields
multiple fields can be used in a template by giving them unique names e.g. `ng-model="dialog.result['two']"`
    `msg.payload` will contain an object with 'two' as a key
    fields can be dynamically created with syntax like:
      ````
      msg.locals = {"fields": [
          {
              "type": "text",
              "name": "Text",
              "label": "A text input"
          },
          {
              "type": "password",
              "name": "Password",
              "label": "A password input",
              "placeholder": "Enter password"
          },
          {
              "type": "checkbox",
              "name": "Checkboxes",
              "label": "Some checkboxes",
              "options": [{
                      "name": "CheckOne",
                      "label": "Check One",
                      "value": "C1" 
                  },{ 
                      "name": "CheckTwo",
                      "label": "Check Two",
                      "value": "C2"
                  }
              ]
          },
          {
              "type": "select",
              "name": "Select",
              "label": "A select box",
              "default": 222,
              "options": [{
                      "name": "Option One",
                      "value": 111 
                  },{ 
                      "name": "Option Two",
                      "value": 222
                  }
      ,{ 
                      "name": "Option Three",
                      "value": 333
                  }
              ]
          },
          {
              "type": "radio",
              "name": "Radio",
              "label": "A radio button group",
              "value": "R2",
              "options": [{
                      "label": "Radio One",
                      "value": "R1" 
                  },{ 
                      "label": "Radio Two",
                      "value": "R2"
                  }
              ]
          },
          {
              "type": "date",
              "name": "Date",
              "label": "A date input"
          },
      ]};
      ````
    And their default values can be set via `initalValue`:
      ````
      msg.initialValue = {
          "Text": "Initial value of 'Text'",
          "Select": 222,
          "Radio": "R2",
          "CheckTwo": true,
          "Date": new Date().toLocaleDateString()
      };
      ````

### output msg properties:
msg1 = {
  topic: node.topic || msg.topic,
  payload: value(s) if prompt & ok, hash if passcode & ok, else true / false (ok / cancel),
}
msg2 = original message if ok/passcode passed

"3fd1235acdfa43f6768b5065d425d428112799d83699674d77bf2aa884ec2b24"

### TODO:
passType hash or plaintext
  hash input should allow flow/global var, or string
  plaintext should allow password

how does "passcode" deal with multiple fields? 

i18n
  topic & name should use global labels
  how to do placeholders? 

helpfile!

multiple form fields / drop downs etc?
    this can be done with a custom template and e.g. `ng-repeat`

Keypad 
    what does alert+keypad do, send each press?
    might this be used to create a dialog control panel?
    or maybe this should be a separate dialog class? 