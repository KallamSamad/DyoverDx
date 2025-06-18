factors=[]
c=1024
for x in range (1,c+1):
    a=c%x
    if a ==0:
        b=c//x
        factors.append(x)
print(factors)
