
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
multiple fields can be used in a template by giving them unique names e.g. `ng-model="dialog.result['two']"`
    `msg.payload` will be an object with 'two' as a key
    fields can be dynamically created with syntax like:
      `msg.locals.fields` = [{
           "type": "text",
           "name": "First Field",
           "default": "Default 1"
       }, {
           "type": "text",
           "name": "Second Field",
           "default": "Default 2"
       }]
how does "passcode" deal with multiple fields? 
    encryt as string (convert to JSON after decrypt)
should "passcode" change name to "encrypted"?

md-datepicker

### message properties:
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

helpfile!

multiple form fields / drop downs etc?
    this can be done with a custom template and e.g. `ng-repeat`
Templating
  Keypad 
      what does alert+keypad do, send each press?
      might this be used to create a dialog control panel?
      or maybe this should be a separate dialog class? 