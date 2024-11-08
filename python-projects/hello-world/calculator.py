# Make a Calculator for Getting Input as Runtime Argument.

while True:
    num1 = float(input("Enter first number: "))
    num2 = float(input("Enter second number: "))

    print("Select operation:")
    print("1. Addition (+)")
    print("2. Subtraction (-)")
    print("3. Multiplication (*)")
    print("4. Division (/)")

    choice = input("Enter choice (1/2/3/4): ")

    if choice == '1':
        result = num1 + num2
        print(num1, "+", num2, "=", result)
    elif choice == '2':
        result = num1 - num2
        print(num1, "-", num2, "=", result)
    elif choice == '3':
        result = num1 * num2
        print(num1, "*", num2, "=", result)
    elif choice == '4':
        result = num1 / num2
        print(num1, "/", num2, "=", result)
    else:
        print("Invalid input")

    cont = int(input("Do you want to continue the Program? [Yes = 1, No = 0]: "))
    if cont != 1:
        print("Exiting the program.")
        break