import re

def find_unclosed_in_ceo(filename):
    with open(filename, 'r', encoding='utf-8') as f:
        content = f.read()
    
    start_tag = '<TabsContent value="ceo"'
    end_tag = '</TabsContent>'
    
    start_idx = content.find(start_tag)
    end_idx = content.find(end_tag, start_idx)
    ceo_content = content[start_idx:end_idx]
    
    # Simple stack-based tracker for div only
    tag_pattern = re.compile(r'<(/?div|/?p|/?span)(\s+[^>]*?)?(/?)(>|$)')
    stack = []
    
    # Get lines of ceo_content
    lines = ceo_content.splitlines()
    offset = content.count('\n', 0, start_idx) + 1
    
    for match in tag_pattern.finditer(ceo_content):
        tag_full = match.group(1)
        is_closing = tag_full.startswith('/')
        tag_name = tag_full.lstrip('/')
        self_closing = match.group(3) == '/'
        
        line_num = ceo_content.count('\n', 0, match.start()) + offset
        
        if self_closing:
            continue
        
        if is_closing:
            if not stack:
                print(f"L{line_num}: Extra </{tag_name}>")
            else:
                top_tag, top_line = stack.pop()
                if top_tag != tag_name:
                    print(f"L{line_num}: Mismatch </{tag_name}> (opened <{top_tag}> at L{top_line})")
        else:
            stack.append((tag_name, line_num))
            
    print(f"\nFinal Unclosed Tags in CEO Section (L{offset}-L{offset+len(lines)}):")
    for tag, line in stack:
        print(f"  <{tag}> at L{line}")

if __name__ == "__main__":
    find_unclosed_in_ceo('src/App.tsx')
