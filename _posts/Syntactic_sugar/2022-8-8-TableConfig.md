---
title: Table Config
author: Tao Sun
date: 2022-8-8
category: Syntactic_sugar
date: 2022-8-8 13:45:00 +0800
layout: post
---

KEYWORDS:

        config, rename, convert, table operation

### Table convert:
Usually, the table queried from third party API is of string type. And the column name is also not specified.

To make the query fucntion more readable, dict and table form configuration can be applied after rawData querired.

Function qSQL:
```q
![t;c;b;a]              /update and delete

?[t;i;p]                /simple exec

?[t;c;b;a]              /select or exec
?[t;c;b;a;n]            /select up to n records
?[t;c;b;a;n;(g;cn)]     /select up to n records sorted by g on cn
```
The fourth arg **a** determine the function and new column name of raw table t.

To set "a" value in a readable way, we can:

**dict**
```q
conf:(!). flip (
    (`v1;`f1);
    (`v2;`f2)
 )

![;();0b;(`c1`c2)!((key conf);value conf)] rawTable
```
**table**
```q
conf:`oldName`newName`convF!/:(
    (`n1;`N1;`$);
    (`n2;`N2;"J"$)
    )

![;();0b;exec oldName!(newName,'convF) from conf] rawTable
```