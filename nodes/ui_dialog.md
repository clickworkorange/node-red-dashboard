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
    fields can be dynamically created with `msg.locals["fields"]`
    And their default values can be set via `msg.initalValue`

### output msg properties:
msg1 = {
  topic: node.topic || msg.topic,
  payload: value(s) if prompt & ok, hash if passcode & ok, else true / false (ok / cancel),
}
msg2 = original message if ok/passcode passed

### TODO:
hide defaultFields when `locals["fields"]` supplied

improve default template logic

htmlContent (in addition to textContent)

Make title, textContent and htmlContent settable in config? 

Required fields (ng-disabled="dialog.required && !dialog.result")

Tests!?

clean up output #2 messages (strip all dialog properties?)

how does "passcode" deal with multiple fields? 
  it shouldn't

i18n
  topic & name should use global labels

helpfile
  needs more details

Keypad 
  what does alert+keypad do, send each press?
  might this be used to create a dialog control panel?
  or maybe this should be a separate dialog class? 