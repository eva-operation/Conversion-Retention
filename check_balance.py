                                                                                                                                                                                                                                                                            import sys
import re

def check_balance(filename):
    with open(filename, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # regex for all relevant tags
    tag_pattern = re.compile(r'<(/?)(TooltipProvider|Tabs|TabsContent|main|aside|nav|header|footer|div|p|h1|h2|h3|h4|span|button|tr|td|th|table|thead|tbody)(\s+[^>]*?)?(/?)(>|$)')
    
    stack = []
    for match in tag_pattern.finditer(content):
        closing_slash = match.group(1)
        tag_name = match.group(2)
        attr = match.group(3) or ''
        self_closing_slash = match.group(4)
        
        # Robust check for self-closing: if there is a regex inner > in attrs, fix it
        # Actually, let's just check if it ends with />
        full_tag = match.group(0)
        is_self_closing = self_closing_slash == '/' or full_tag.endswith('/>')
        
        line_num = content.count('\n', 0, match.start()) + 1
        
        if closing_slash == '/':
            if not stack:
                print(f"L{line_num}: EXTRA </{tag_name}>")
            else:
                top_tag, top_line = stack.pop()
                if top_tag != tag_name:
                    print(f"L{line_num}: MISMATCH </{tag_name}> (opened <{top_tag}> at L{top_line})")
                    # push back if mismatch to continue? no, better keep going correctly
                    # stack.append((top_tag, top_line))
        elif is_self_closing:
            continue
        else:
            stack.append((tag_name, line_num))
            
    if stack:
        print("UNCLOSED TAGS:")
        for tag, line in stack:
            print(f"  <{tag}> at L{line}")
    else:
        print("ALL BALANCED")

if __name__ == "__main__":
    check_balance(sys.argv[1])
