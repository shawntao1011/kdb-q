---
title: set default value
author: Tao Sun
date: 2022-8-19
category: Syntactic_sugar
date: 2022-8-19 9:43:00 +0800
layout: post
---

KEYWORDS:

        default value, init, variable

### Variable init:

  Sometimes, we need to init a variable if it's not assigned. 
  
  Using exectuon control is not good for checking current value and fillup values. If the varibale is not available, an exception will be throw and cause the program to break.
  ```q
    // set variable a to 3 if not assignd
    a:if[a;3]
  ```
  This code actually doest <font color=red>not</font> work, since if "a" is not assigned, during the `cond phase, an error will be raised.

### Init method:
#### trap
Trap(@) is recommended for init variables.
```q
a:@[.:;`a;2]
```
The code above can work even there is no "a". The more general form is 
```q
.[g;gx;e] /Trap g . gx; catchj with e

@[f;fx;e] /Trap at Try f@fx; catch with e
```
"e" is the error,but using the ".:" as function, if trap f fx failed, then e is returned and captured by a.

### .Q.def
The .Q.def method can also init variables.

The .Q.def, .Q.opt .z.x are used as combinations to generate and fillup command-line arguments.

Example:
```q
q -arg1 abc -arg2 bcd
```
Then we got the command line args as a dictionary. 
```q
.Q.opt .z.x
```
arg1| "abc"

arg2| "bcd"

To add more variables, @ operation .Q.def on maps can work.
Example:
```q
.Q.def[`aaa`bbb`ccc`arg1`arg2!(100;200;300;`$"abc";`$"bcd")] .Q.opt .z.x
```
aaa | 100
bbb | 200
ccc | 300
arg1| `abc
arg2| `bcd

