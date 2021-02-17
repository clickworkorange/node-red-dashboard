
title       text < 64
text        text < 1024
template    default, file, custom
custom      html (pre-populated)
type        alert, confirm, prompt or password
forward     true, false (whether to forward incoming message on "ok")
default     default input value (prompt)

output1 (always)                  true / false (ok / cancel)
output2 (if forward)              org msg (on ok)

cancel does nothing

validation function?