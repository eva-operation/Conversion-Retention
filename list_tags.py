import re

def list_tags(filename):
    with open(filename, 'r', encoding='utf-8') as f:
        content = f.read()

    tags = []
    # Simplified tag finder that handles common JSX patterns
    pattern = re.compile(r'<(/?div|/?Tabs|/?main|/?TooltipProvider)[>\s]')
    
    lines = content.splitlines()
    for i, line in enumerate(lines):
        for match in pattern.finditer(line):
            tag = match.group(0).strip('<').strip('>').strip()
            tags.append((i+1, tag))
            
    with open('tags_list.txt', 'w', encoding='utf-8') as f:
        for line_num, tag in tags:
            f.write(f"L{line_num}: {tag}\n")

if __name__ == "__main__":
    list_tags('src/App.tsx')
