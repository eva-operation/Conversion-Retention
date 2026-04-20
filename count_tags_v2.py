
import re

def count_tags(file_path, start_line, end_line):
    with open(file_path, 'r', encoding='utf-8') as f:
        lines = f.readlines()
    
    content = "".join(lines[start_line-1:end_line])
    
    opens = re.findall(r'<([a-zA-Z][a-zA-Z0-9]*|>)', content)
    closes = re.findall(r'</([a-zA-Z][a-zA-Z0-9]*|>)', content)
    
    print(f"Open tags: {len(opens)}")
    print(f"Close tags: {len(closes)}")
    
    # Simple stack trace
    stack = []
    # This is very naive as it doesn't handle self-closing tags or strings accurately
    # but might give a hint.
    
    # Refined regex to ignore self-closing tags like <img /> or <br />
    tags = re.findall(r'<(/?)([a-zA-Z][a-zA-Z0-9]*|>)', content)
    
    balance = 0
    for is_close, tag_name in tags:
        if tag_name in ['img', 'br', 'hr', 'input', 'meta', 'link']: # common self-closing
            continue
        if is_close == '/':
            balance -= 1
        else:
            balance += 1
            
    print(f"Balance (approx): {balance}")

if __name__ == "__main__":
    count_tags('src/App.tsx', 2043, 4183)
