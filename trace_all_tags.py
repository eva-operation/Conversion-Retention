import re

def list_all_tags(filename):
    with open(filename, 'r', encoding='utf-8') as f:
        content = f.read()

    tags = []
    i = 0
    while i < len(content):
        if content[i] == '<':
            if i + 1 < len(content) and (content[i+1].isalpha() or content[i+1] == '/'):
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
                        tag_content = content[i:j+1]
                        is_closing = tag_content.startswith('</')
                        is_self_closing = tag_content.endswith('/>')
                        tag_name_match = re.search(r'</?([a-zA-Z0-9_.-]+)', tag_content)
                        if tag_name_match:
                            name = tag_name_match.group(1)
                            line = content.count('\n', 0, i) + 1
                            tags.append({'name': name, 'closing': is_closing, 'self': is_self_closing, 'line': line})
                        i = j
                        break
                    j += 1
        i += 1

    with open('full_tags_trace.txt', 'w', encoding='utf-8') as f:
        stack = []
        for tag in tags:
            if tag['self']:
                f.write(f"L{tag['line']}: SELF <{tag['name']}/>\n")
                continue
            if tag['closing']:
                if stack:
                    last = stack.pop()
                    if last['name'] == tag['name']:
                        f.write(f"L{tag['line']}: CLOSE </{tag['name']}> (matches L{last['line']})\n")
                    else:
                        f.write(f"L{tag['line']}: MISMATCH </{tag['name']}> (expected </{last['name']}> from L{last['line']})\n")
                        # Push back the mismatch to see how it recovers? No, just keep popping or something.
                else:
                    f.write(f"L{tag['line']}: EXTRA CLOSE </{tag['name']}>\n")
            else:
                f.write(f"L{tag['line']}: OPEN <{tag['name']}>\n")
                stack.append(tag)
        
        if stack:
            f.write("\nREMAINING ON STACK:\n")
            for tag in stack:
                f.write(f"  <{tag['name']}> from L{tag['line']}\n")

if __name__ == "__main__":
    list_all_tags('src/App.tsx')
