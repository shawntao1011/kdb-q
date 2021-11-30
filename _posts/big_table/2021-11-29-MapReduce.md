---
title: MapReduce
author: Tao Sun
date: 2021-11-29
category: BigTable
date: 2021-11-29 19:08:00 +0800
layout: post
---


Sometimes the tdb database is way too big to read all the columns into memory. So map reduce is necessary to split big table into small blocks.

![Image result for map reduce](https://th.bing.com/th/id/OIP.6HY3K-GyD79l-SZFGNIyZwHaDc?w=330&h=162&c=7&r=0&o=5&dpr=1.25&pid=1.7)

## Split by Syms

Since date is required to query table in tdb, so date is fixed. For tick-level data and 32bit KDB, no more than 2 columns should be used as the columns will be mapped into memory . 



Normally, filter table by sym is a good choice. 

```q
batch_groups:{[topic;par;syms]
	0N!par;
	date_sym:0!select rid:i by sym from topic where date=par, sym in syms;	
	...
}

date_sym
sym      | rid                                                               ..
---------| ------------------------------------------------------------------..
000001.SZ| 38309230 38309231 38309232 38309233 38309234 38309235 38309236 383..
000002.SZ| 38414128 38414129 38414130 38414131 38414132 38414133 38414134 384..
```

## Split by Strategy


## Example
