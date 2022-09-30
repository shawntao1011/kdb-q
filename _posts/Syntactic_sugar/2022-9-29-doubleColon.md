---
title: set default value
author: Tao Sun
date: 2022-9-30
category: Syntactic_sugars
date: 2022-9-30 9:49:00 +0800
layout: post
---

KEYWORDS:

        alias, view, doubleColon 

### Alias:

  Expressions are normally evaluated as soon as encountered by interpreter. This means expression on the right are evaluated before assigned to left.

  Alias is an expression <font color=blue> it's not th e result of express evaluation</font>, but expression itself. 

  Evaluation of alias is lazy(occurs only when necesary). This follow two rules:
  - If it is the first reference or if any variable in its associated expression has changed since the last evaluation, evaluation proceeds with the current values of all the variables in the expression. The result of the most recent evaluation is then stored internally and also returned. The stored result is said to be memoized.
  - If no variables in the expression have changed since the previous evaluation, the memoized value is returned.

  Case:
  ```q
    q)w::(0N!x*x)+y*y  
    q)x:3
    q)y:4
    q)w
    9
    25
    q)w
    25
    q)y:6
    q)w
    9
    45
  ```

### Dependencies

.z.b

eg:
```q
q)w::(x*x)+y*y
q).z.b
x| w
y| w
```

### Views
Aliasing is commonly used to provide a database view by specifying a query as the expression.

```q
q)t:([]c1:`a`b`c`a;c2:20 15 10 20;c3:99.5 99.45 99.42 99.4)
q)v::select sym:c1,px:c3 from t where c1=`a
q)v
sym px
--------
a 99.5
a 99.4
q)update c3:42.0 from `t where c1=`a
_
q)v
_
```

### Golbal Variable

Though delare and assign can both use double colon, the following method is recommneded.

declare with doublecolon
```q
symglobal::`old
```

assign with set
```q
set[`symglobal;`new]
```w