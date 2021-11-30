---
title: Rolling Window
author: Tao Sun
date: 2021-11-29
category: Algorithm
date: 2021-11-29 18:53:00 +0800
layout: post
---

KEYWORDS:

        sliding window, rolling window, rolling

In q, rolling window is not built-in but can be easily realized.

### Pandas Rolling

```python
df = pd.DataFrame({'B': [0, 1, 2, np.nan, 4]})
```
```python
df.rolling(2).sum()
     B
0  NaN
1  1.0
2  3.0
3  NaN
4  NaN
```

### KX Rolling
the [rolling function](https://code.kx.com/q/kb/programming-idioms) provided by kx is 
```
swin:{[f;w;s] f each { 1_x,y }\[w#0;s]}
```
where it uses 0 to fulfill the nan, for example
```q
swin[avg; 3; til 10];

0 0.3333 1 2 3 4 5 6 7 8
```
To clarify:
```
swin[0N!; 3; til 10]
0 0 0
0 0 1
0 1 2
1 2 3
2 3 4
3 4 5
...
```

### My Rolling
```q
rw:{[op;n;x]
 op peach{1_x,y}\[n#type[x]$0N;x]
 };

op: function, eg:avg max
n: rolling size
x: input
type[x]$0N fill na 
```


### Example


