import random
squares = [
     1,   4,   9,  16,  25,
    36,  49,  64,  81, 100,
   121, 144, 
]
b=1
c=1

def disc(b,c):
    state=False
    while state==False:
        b=random.randint(1,150)
        c=random.randint(1,150)
        if b**2-(4*c) in squares:
            return b,c

b,c=disc(b,c)
print(b)
print(c)
