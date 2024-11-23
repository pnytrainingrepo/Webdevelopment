a ="  Hello, World!  "
b ="Hello, World!"
print(b)
# Slicing of String
print(b[2:5])
print(b[:5])
print(b[2:])

# UPPER CASE
print(b.upper())

# LOWER CASE
print(b.lower())

# REMOVE WHITE SPACES
print(a)
print(a.strip())

# SPLIT THE STRING
print(a.split(","))

# CONCAT STRINGS
print(a+b)

# F-STRING
name="Azam"
age=45
course="DAWT"
print (f"My name is {name}, \t I am {age}")

# LIST EXAMPLES
thislist = ["banana","apple","cherry"];
thislist.sort();
print(thislist);

# UTILIZATION OF LOOP

fruits = ["banana","apple","cherry"];
for x in fruits:
    print(x)

# CREATING & CALLING FUNCTIONS
# CREATE FUNCTION
def my_function():
    print("Hello from a function")

# CALLING FUNCTION
my_function()

# FUNCTION BY ARGUMENT

def my_function1(name):
    print(name +" Training")
    
my_function1("PNY");