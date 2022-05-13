num_parameters = 2
inputs = [('Cherilyn', 'Sarkisian'), ('Cher', '')]
outputs = ['Sarkisian, Cherilyn', 'Cher']

# sample solution:
def format_name(first: str, last: str) -> str:
    """Return the first and last names as a single string, in the form:
    last, first
    
    Mononymous persons (those with no last name) should have their name
    returned without a comma.
    """
    
    if last == "":
        return first
    else:
        return last + ", " + first

