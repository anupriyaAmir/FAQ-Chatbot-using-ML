var file;
var training=[];
var testing=[];

var tokens=[];
var vocab;
var dict = {},dictw={};
var word_idx;
var idx_word;
var arr=[];

var counts={}; //obj
var keys=[]; //array

function preload()
{
  file=loadStrings('008.txt'); // single sample file
}

function setup()
{
  noCanvas();
  //tokenizer
  file=file.toString().replace(/[&\/\\#,+()$~%.'":*?<>{}]/g,"");
  tokens=tokens.concat(file.toString().split(/\b\s+(?!$)/));
  var sort_tokens=tokens.sort();
  console.log("Tokenize");
  console.log(sort_tokens);

  vocab=new Set(sort_tokens);//unique word
  console.log("Sorted Unique Set ");
  console.log(vocab);
  var len=vocab.size;

  //split for train and test

   training=training.concat(file.training);  //80% training
   testing=testing.concat(file.testing);     //20% testing

for(var it=vocab.values(), val=null, i=0; i<len , val=it.next().value ;i++)
  {
    dict[i]={};
    dict[i].label=i+1;
    dict[i].value=val;
  }
  console.log("Indexing");
  console.log(dict);
  idx_word=dict;

  for(var it=vocab.values(), val=null, i=0; i<len , val=it.next().value ;i++)
    {
      dictw[i]={};
      dictw[i].label=val;
      dictw[i].value=i+1;
    }
    word_idx=dictw;

//vectorize tfidf
//term’s frequency (TF) and its inverse document frequency (IDF).

for(var i=0;i<sort_tokens.length;i++)
{
  var word=sort_tokens[i];
  if(counts[word] === undefined)
  {
    counts[word]={
      tf:1,
      df:1
    }
    keys.push(word);
  }else{
    counts[word].tf =counts[word].tf+1;
  }
}

/*
tf:Word -number of occurance in document
df:Number of Document
*/

for(var i=0;i<keys.length;i++)
{
var wd=keys[i];
var wordobj=counts[wd];
wordobj.tfidf=wordobj.tf * log(file.length / wordobj .df);
}


for(var i=0;i<keys.length;i++)
{
var key=keys[i];
arr[i]=counts[key].tfidf;
}
console.log("Vectorize word");
console.log(arr);

}
