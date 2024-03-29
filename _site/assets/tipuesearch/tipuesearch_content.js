var tipuesearch = {"pages": [{
    "title": "MapReduce",
    "text": "Sometimes the tdb database is way too big to read all the columns into memory. So map reduce is necessary to split big table into small blocks. Split by Syms Since date is required to query table in tdb, so date is fixed. For tick-level data and 32bit KDB, no more than 2 columns should be used as the columns will be mapped into memory . Normally, filter table by sym is a good choice. batch_groups:{[topic;par;syms] 0N!par; date_sym:0!select rid:i by sym from topic where date=par, sym in syms; ... } date_sym sym | rid .. ---------| ------------------------------------------------------------------.. 000001.SZ| 38309230 38309231 38309232 38309233 38309234 38309235 38309236 383.. 000002.SZ| 38414128 38414129 38414130 38414131 38414132 38414133 38414134 384.. Split by Strategy Example",
    "tags": "BigTable",
    "url": "/kdb-q/bigtable/2021-11-29-MapReduce.html"
  },{
    "title": "GroupBy",
    "text": "The groupby is built-in for q. pandas method The self-define function apply on pandas groupby object is operating on a small dataframe rather than specified column. df = pd.DataFrame({ 'Animal':['Falcon','Falcon','Parrot','Parrot'], 'Max Speed':[300,200,400,500], 'Min Speed':[100,100,200,300] }) After groupby(), a groupby object is generated. list(df.groupby('Animal')) [('Falcon', Animal Max Speed Min Speed 0 Falcon 300 100 1 Falcon 200 100), ('Parrot', Animal Max Speed Min Speed 2 Parrot 400 200 3 Parrot 500 300)] Suppose we need to get the sum of two column groupby sym,(in this case, get mean,sum or delta of max_speed and min_speed by animal) df.groupby('Animal').apply(lambda x:pd.Series({ \"max_min mean\":(x['Max Speed']+x['Min Speed']).mean() })) So the lambda input is the sub dataframe. q method t:([] sym:4#`a`b;val1:4#1+til 10;val2:4#2+til 10); The q method groupby is called directly and applied on column. For example, update val3:val1*2 by sym from t sym val1 val2 val3 ------------------ a 1 2 2 b 2 3 4 a 3 4 6 b 4 5 8 Aggregate !!Attention check the row number update val3:avg val1+val2 by sym from t sym val1 val2 val3 ------------------ a 1 2 5 b 2 3 7 a 3 4 5 b 4 5 7 VS 0!select val3:avg val1+val2 by sym from t sym val3 -------- a 5 b 7 The row number differs a lot. The result of select query is much more like the pandas groupby, where the key number will be the same as the group set of grouped pairs. THUS, as long as the column you groupby with is with duplicates, use select rather than update. Example",
    "tags": "Algorithm",
    "url": "/kdb-q/algorithm/2021-11-29-GroupBy.html"
  },{
    "title": "Rolling Window",
    "text": "KEYWORDS: sliding window, rolling window, rolling In q, rolling window is not built-in but can be easily realized. Pandas Rolling df = pd.DataFrame({'B': [0, 1, 2, np.nan, 4]}) df.rolling(2).sum() B 0 NaN 1 1.0 2 3.0 3 NaN 4 NaN KX Rolling the rolling function provided by kx is swin:{[f;w;s] f each { 1_x,y }\\[w#0;s]} where it uses 0 to fulfill the nan, for example swin[avg; 3; til 10]; 0 0.3333 1 2 3 4 5 6 7 8 To clarify: swin[0N!; 3; til 10] 0 0 0 0 0 1 0 1 2 1 2 3 2 3 4 3 4 5 ... My Rolling rw:{[op;n;x] op peach{1_x,y}\\[n#type[x]$0N;x] }; op: function, eg:avg max n: rolling size x: input type[x]$0N fill na Example",
    "tags": "Algorithm",
    "url": "/kdb-q/algorithm/2021-11-29-RollingWindow.html"
  },{
    "title": "How to Add Blogs",
    "text": "pages The simplest method to create page is to add certain html(md) file under the root directory. The path of the file determines the associated URL. . ├── about.md # =&gt; http://example.com/about.html ├── index.html # =&gt; http://example.com/ └── contact.html # =&gt; http://example.com/contact.html Complicated structure like subfolder is also supported. . ├── about.md # =&gt; http://example.com/about.html ├── documentation # folder containing pages │ └── doc1.md # =&gt; http://example.com/documentation/doc1.html ├── design # folder containing pages │ └── draft.md # =&gt; http://example.com/design/draft.html Check official document for more. Posts “The _posts folder is where your blog posts live. You typically write posts in Markdown, HTML is also supported.” To create a post, file need to follow the following format: YEAR-MONTH-DAY-title.MARKUP Where YEAR is a four-digit number, MONTH and DAY are both two-digit numbers, and MARKUP is the file extension representing the format used in the file. For example, the following are examples of valid post filenames: 2011-12-31-new-years-eve-is-awesome.md 2012-09-12-how-to-write-a-blog.md Check official document for more.",
    "tags": "",
    "url": "/kdb-q/2021-11-29-howto.html"
  },{
    "title": "",
    "text": "404 Page not found :( The requested page could not be found.",
    "tags": "",
    "url": "/kdb-q/404.html"
  }]};
