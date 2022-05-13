num_parameters = 2
inputs = [("Jen", "Paul"), ("Colin", "Colin")]
outputs = ['Jen', 'Colin']

# sample solution:
def earlier_name(name1: str, name2: str) -> str:
    if name1 < name2:
        return name1
    else: 
        return name2
