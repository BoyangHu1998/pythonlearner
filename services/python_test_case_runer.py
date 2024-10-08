import importlib.machinery
import importlib.util
import sys
from pathlib import Path

#
#  python python_test_case_runer.py FUNCTION.py TESTCASES.py "FUNCTION_NAME" 
#  

TEST_FUNCTION_NAME = sys.argv[3]

def load_fuction_from_module():
    ## import from string
    ## https://csatlas.com/python-import-file-module/

    ## get python call parameter Python Command Line Arguments
    ## https://www.askpython.com/python/python-command-line-arguments

    # Get path to mymodule
    if len(sys.argv) != 4:
        raise ValueError('< 4 python command line arguments')
    
    module_path = sys.argv[1]

    # Import mymodule
    loader = importlib.machinery.SourceFileLoader( 'mymodule', module_path )
    spec = importlib.util.spec_from_loader( 'mymodule', loader )
    mymodule = importlib.util.module_from_spec( spec )
    loader.exec_module( mymodule )

    # Get function from module and the name string https://www.delftstack.com/howto/python/python-call-function-from-a-string/#:~:text=Use%20locals%20%28%29%20and%20globals%20%28%29%20to%20Call,difference%20between%20the%20two%20functions%20is%20the%20namespace.
    function = getattr(mymodule, TEST_FUNCTION_NAME)
    return function


def load_testcases():
    testcases_path = sys.argv[2]

    # Import testcases module
    loader = importlib.machinery.SourceFileLoader( 'testcasesmodule', testcases_path )
    spec = importlib.util.spec_from_loader( 'testcasesmodule', loader )
    testcasesmodule = importlib.util.module_from_spec( spec )
    loader.exec_module( testcasesmodule )

    return testcasesmodule.inputs, testcasesmodule.outputs, testcasesmodule.num_parameters

def test(ins, outs, num_params, function):
    count_fail = 0
    for i, o_expected in zip(ins, outs):
        o = run_function(function, num_params, i)
        if not o == o_expected:
            print(f"Input: {i}, Expected output: {o_expected}, but your output is: {o}")
            count_fail += 1
    print(f"Passed {len(outs) - count_fail}/{len(outs)}")
    if count_fail == 0:
        print("Passed all test cases!")

def run_function(function, num_parameters, i):
    if (num_parameters == 1):
        o = function(i)
    elif (num_parameters == 2):
        o = function(i[0], i[1])
    elif (num_parameters == 3):
        o = function(i[0], i[1], i[2])
    elif (num_parameters == 4):
        o = function(i[0], i[1], i[2], i[3])
    else:
        console.log("update run_function(_,_) in python_test_case_runner.py")
    return o

if __name__ == "__main__":
    function = load_fuction_from_module()
    ins, outs, num_params = load_testcases()
    test(ins, outs, num_params, function)
