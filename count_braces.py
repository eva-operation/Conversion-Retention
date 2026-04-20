import sys

def count_braces(filename):
    with open(filename, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # We want to find unmatched braces that are NOT inside strings or comments.
    # This is a bit hard, but let's just count total for a start.
    braces = 0
    brackets = 0
    for i, char in enumerate(content):
        if char == '{': braces += 1
        elif char == '}': braces -= 1
        elif char == '(': brackets += 1
        elif char == ')': brackets -= 1
        
        if braces < 0:
            print(f"Brace underflow at char {i}")
            # braces = 0 # reset to continue?
        if brackets < 0:
            print(f"Bracket underflow at char {i}")
            # brackets = 0
            
    print(f"Total Braces: {braces}")
    print(f"Total Brackets: {brackets}")

if __name__ == "__main__":
    count_braces(sys.argv[1])
