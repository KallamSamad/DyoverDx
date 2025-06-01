function gcf(a,b){
  if (b==0){
    return a}
  else{
    return gcf(b,a%b)
  }
}
