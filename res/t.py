f = open("dictionnaire.txt", 'r')
f2 = open("dictionnaire2.txt", "w")

r = f.read()
r = r.split('\n')
max1 = 0
i = 0
while i < len(r):
    r[i] = "\""+r[i]+"\","
    i+=1
print(r)

def get_max_str(lst):
    return max(lst, key=len)

print(max1)
print(len(get_max_str(r)))

f2.write('\n'.join(r))