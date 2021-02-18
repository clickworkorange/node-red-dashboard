### node params 
title             text 
text              text 
html              not implemented yet! 
preset            dialog class (alert, confirm, prompt, passcode)
templatetype      default, file, custom
templatefile      a file URL
templatecustom    Angular/html (pre-populated)
passcode          can be cred (plaintext), or hased str & flow/global variable
locals["fields"]  an array of fields (text, radio, select, etc)
initialValue      string or object (for multiple `fields`)

### outputs 
output1 (always)               value(s) if prompt, passcode, else true / false (ok / cancel)
output2 (if "ok")              org msg

### logic
node settings are not needed in the output (drop config msg)
validation functions for "prompt"?
test passcode hash: 3fd1235acdfa43f6768b5065d425d428112799d83699674d77bf2aa884ec2b24

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

### TODO:
Required fields (ng-disabled="dialog.required && !dialog.result")

htmlContent (in addition to textContent)

Make title, textContent and htmlContent settable in config? 

Tests!?

hide defaultFields when `locals["fields"]` supplied

hook up custom & file templates
  custom should be textarea
  file *could* be file chooser?

clean up output #2 messages (should only have incoming properties?)

how does "passcode" deal with multiple fields? 

i18n
  topic & name should use global labels

helpfile
  needs more details

Keypad 
  what does alert+keypad do, send each press?
  might this be used to create a dialog control panel?
  or maybe this should be a separate dialog class? 