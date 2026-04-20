import re

def check_jsx_balance(filename):
    with open(filename, 'r', encoding='utf-8') as f:
        content = f.read()

    # Regex to match JSX tags, handling some degree of complexity in attributes
    # This regex attempts to find tags and correctly identify self-closing ones
    # We use a pattern that matches < followed by tag name, then optional attributes, then /> or >
    # To handle > in attributes (like arrow functions), we can't easily use regex.
    # But we can try to skip strings and curly braces.
    
    tags = []
    i = 0
    while i < len(content):
        if content[i] == '<':
            # Potential tag
            if i + 1 < len(content) and content[i+1].isalpha() or content[i+1] == '/' or content[i+1] == '{':
                # Find the end of the tag properly
                j = i + 1
                brace_count = 0
                in_quote = None
                while j < len(content):
                    char = content[j]
                    if in_quote:
                        if char == in_quote:
                            in_quote = None
                    elif char in ('"', "'", "`"):
                        in_quote = char
                    elif char == '{':
                        brace_count += 1
                    elif char == '}':
                        brace_count -= 1
                    elif char == '>' and brace_count == 0 and not in_quote:
                        # Found end of tag
                        tag_content = content[i:j+1]
                        # Determine if opening, closing, or self-closing
                        is_closing = tag_content.startswith('</')
                        # Check for self-closing: ends with /> or is a known void tag
                        # but in JSX, only /> matters usually, plus some components
                        is_self_closing = tag_content.endswith('/>')
                        
                        tag_name_match = re.search(r'</?([a-zA-Z0-9_.-]+)', tag_content)
                        if tag_name_match:
                            tag_name = tag_name_match.group(1)
                            line_num = content.count('\n', 0, i) + 1
                            tags.append({'name': tag_name, 'closing': is_closing, 'self': is_self_closing, 'line': line_num})
                        
                        i = j
                        break
                    j += 1
        i += 1

    stack = []
    for tag in tags:
        if tag['self']:
            continue
        if tag['closing']:
            if not stack:
                print(f"EXTRA CLOSING TAG: </{tag['name']}> at Line {tag['line']}")
            else:
                last_tag = stack.pop()
                if last_tag['name'] != tag['name']:
                    print(f"MISMATCH: </{tag['name']}> at Line {tag['line']} (opened <{last_tag['name']}> at Line {last_tag['line']})")
        else:
            stack.append(tag)
    
    if stack:
        print("\nUNCLOSED TAGS:")
        for tag in stack:
            print(f"  <{tag['name']}> at Line {tag['line']}")

if __name__ == "__main__":
    check_jsx_balance('src/App.tsx')
