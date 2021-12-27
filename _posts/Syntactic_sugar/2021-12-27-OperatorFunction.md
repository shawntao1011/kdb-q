---
title: Operator Function
author: Tao Sun
date: 2021-11-29
category: Syntactic_sugar
date: 2021-12-27 13:45:00 +0800
layout: post
---

KEYWORDS:

        operator, function, table operation

In q, all the operator can be treated as function while some of them needs parentheses to become recognized by q.
### Sample Tables
Sample Table1: 
        
        columns are list of simple atoms
```q
t1:([] g:20?(`A`B);a:20?40;b:20?50)
```
Sample Table2: 

        columns are list of complex atoms
```q
t2:([] g:20?(`A`B);a:20?(3?30;3?20);b:20?(3?30;3?20))
```
### Monadic Operation
sample operation on simple table
        
        even or odd
```q
update resA:a mod 2, resB:not b mod2 by g from t1
```


Sample operation on complex table

        deltas, count

```q
//deltas of each row
update deltaA:deltas each a, countB:count b by g from t2

//deltas of next row
update deltaA:deltas a, countB:count b by g from t2
```

### Dyadic Operation
Sample Operation on simple table
        
        add

```q
update c:a+b,d:a*b by g from t1
```

Sample Operation on complex table

        add, diff 

```q
//add 
update c:a+b by g from t2

//diff of two column 
update c:a-b by g from t2
```

### Rolling Window

[Rolling Window Function](https://shawntao1011.github.io/kdb-q/algorithm/2021-11-29-RollingWindow.html) is realized by a function takes operation,rolling size,and data as parameters.

- operators like "+","," need parentheses to be recognized as function

#### Rolling Operation on one simple column:
        eg: rolling sum, size 5
```q
update sumA:rw[sum;5;a] by g from t1
```

#### Rolling Operation on several simple column:
        eg: rolling sum of a and b, size 5
```q
//the res is a column of 5 atom list, which takes the result of nearest 5 a+b
update sumAB:rw[(+) . value flip @;5;([] a;b)] by g from t1

//To take the sum of each list, we can
update sumAB:rw[sum (+) . value flip @;5;([] a;b)] by g from t1

//or 
update sumAB:sum each rw[(+) . value flip @;5;([] a;b)] by g from t1
```

#### Rolling Operation on one complex column:
        eg: append
<font color=red>!rolling window function needs to rewrite</font> 

as 0#x will generate a empty list which can not do some operation a several atom list
```
// form a list by appending 5 latest 3 atom list
update c: rw[(,);5;a] by g from t2
```
#### Rolling Operation on several complex column:
<font color=red>!rolling window function needs to rewrite</font> 
as 0#x will generate a empty list which can not do some operation a several atom list
