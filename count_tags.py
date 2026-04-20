import sys
import re

def count_tags(filename):
    with open(filename, 'r', encoding='utf-8') as f:
        content = f.read()
    
    tags = ['div', 'main', 'Tabs', 'TabsContent', 'TabsList', 'TabsTrigger', 'TooltipProvider', 'Tooltip', 'TooltipTrigger', 'TooltipContent']
    
    for tag in tags:
        opens = len(re.findall(f'<{tag}[\\s>]', content))
        closes = len(re.findall(f'</{tag}\\s*>', content))
        if opens != closes:
            print(f"MISMATCH: {tag} Open: {opens}, Close: {closes}")
        else:
            print(f"OK: {tag} ({opens})")

if __name__ == "__main__":
    count_tags(sys.argv[1])
