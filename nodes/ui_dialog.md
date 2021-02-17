
title           text < 64
text            text < 1024
preset          dialog class
template        default, file, custom
custom          html (pre-populated)
type            alert, confirm, prompt or passcode
hash            if passcode, can be string or flow/global variable
initialValue    default input value (only "prompt")
                can be array, object, etc (for multiple fields)


output1 (always)               value(s) if prompt, passcode, else true / false (ok / cancel)
output2 (if "ok")              org msg

cancel does nothing

validation function? should the node compare the passcode hash with a stored hash, or just pass it on? 

3fd1235acdfa43f6768b5065d425d428112799d83699674d77bf2aa884ec2b24

message properties:

msg = {
  topic: node.topic || msg.topic,
  payload: value(s) if prompt & ok, hash if passcode & ok, else true / false (ok / cancel),
}

msg2 = original message if ok

### TODO:
aria
Hook up a test passcode function 
Templating
Keypad 
    what does alert+keypad do, send each press?
    might this be used to create a popup control panel?
multiple form fields / drop downs etc?
    are the values output automatically?
    this can be done with a custom template and e.g. `ng-repeat`
    do we really need "passcode" when custom template can be used?
        only if we want to do some special processing before emit