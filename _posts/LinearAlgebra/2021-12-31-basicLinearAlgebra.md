---
title: Basic Linear Algebra
author: Tao Sun
date: 2021-12-31 14:54:00 +0800
category: Linear Algebra
layout: post
---

<head>
    <script src="https://cdn.mathjax.org/mathjax/latest/MathJax.js?config=TeX-AMS-MML_HTMLorMML" type="text/javascript"></script>
    <script type="text/x-mathjax-config">
        MathJax.Hub.Config({
            tex2jax: {
            skipTags: ['script', 'noscript', 'style', 'textarea', 'pre'],
            inlineMath: [['$','$']]
            }
        });
    </script>
</head>

This note is heavily referenced on [James Neill's blog](http://jpneill.github.io/kdb_blog.html)

## Matrix
As an array processing language q allows us to perform vectorized operations on lists. The presence of vectors and matrices in q means that basic linear algebra techniques are available to us. A matrix in q is represented as a list of lists:
```q
q)A:(1 2;3 4f)
q)A
1 2
3 4
```
## Addition and Subtraction

$$
v = \begin{pmatrix}
 1  \\
 2
 \end{pmatrix};
 
 w = \begin{pmatrix}
 3  \\
 4
 \end{pmatrix};
 
 v+w = \begin{pmatrix}
 4  \\
 6
 \end{pmatrix}
$$

```q
q)v: 1 2f
q)w: 3 4f
q)v + w
4 6f
q)v - w
-2 -2f
```

$$
A=\begin{pmatrix}
 1 & 2\\
 3 & 4
 \end{pmatrix};
B=\begin{pmatrix}
 5 & 6\\
 7 & 8
 \end{pmatrix}
$$

```	q
q) A:(1 2f;3 4f)
q) B:(5 6f;7 8f)
q) A + B
6 8 
10 12
q) A - B
-4 -4 
-4 -4
```

### Dot Product of 2 vector

The dot product two vectors  and take the sum

```q
q)v mmu w
11f
```

or with "$" operator

```q
q)v$w
11f
```

### Dot Product of 2 matrices

```q
q)A mmu B
19 22
43 50
```

### Matrix Transpose

```q
q)A
1 2
3 4
```

To transpose the matrix, simply use "flip".

```q
q) flip A
1 3
2 4
```

### Identity Matrix

The identity matrix is the n x n square matrix with ones along the main diagonal and zeros elsewhere. It is commonly denoted as **I**n. For an m x n matrix **A** the identity matrix has the property:
$$
I_mA =AIn=A
$$
To construct a identity matrix:

```q
q)IMatrix:{`float${x=:/x}til x}
IMatrix 3
100
010
001
```

### Diagonal Matrix

A diagonal matrix is a matrix with 0 for all elements that are not on the main diagonal. We can construct one in q using the identity matrix definition above:

```q
q)DiagMatrix:{`float$x*{x=/:x} til count x}
DiagMatrix 4 0 1.3
4 0 0
0 0 0
0 0 1.3
```

### Matrix Inversion

An n x n square matrix **A** is invertible if there exists an n x n matrix **A^-1** such that the following is true:
$$
AA^-1 = A^-1A=I_n
$$
If a square matrix is singular then it has no reverse. 

There is an inbuild function for inversing a matrix:

```q
q)inv[A]
-2 1
1.5 -0.5
```

As mentioned in https://jpneill.github.io/posts/Lin_Alg_q.html, the built in algorithm <font color=red> sacrifice numerical stability for accuracy</font>. 

