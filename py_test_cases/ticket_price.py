num_parameters = 1
inputs = [65, 7, 21, 101]
outputs = [4.75, 4.25, 7.5, 4.75]

# sample solution:
def ticket_price(age: int) -> float:
    if age >= 65:
        return 4.75
    elif age <= 12:
        return 4.25
    else:
        return 7.50

