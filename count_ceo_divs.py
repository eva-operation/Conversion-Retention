import re

def count_in_ceo(filename):
    with open(filename, 'r', encoding='utf-8') as f:
        content = f.read()
    
    start_tag = '<TabsContent value="ceo"'
    end_tag = '</TabsContent>'
    
    start_idx = content.find(start_tag)
    end_idx = content.find(end_tag, start_idx)
    
    ceo_content = content[start_idx:end_idx]
    
    open_divs = len(re.findall(r'<div[ \s>]', ceo_content))
    close_divs = len(re.findall(r'</div>', ceo_content))
    self_closing = len(re.findall(r'<div\s+[^>]*?/>', ceo_content))
    
    print(f"CEO SECTION:")
    print(f"  Opening divs: {open_divs}")
    print(f"  Closing divs: {close_divs}")
    print(f"  Self-closing: {self_closing}")
    print(f"  Balance (Open - Close - SelfClosing): {open_divs - close_divs - self_closing}")

if __name__ == "__main__":
    count_in_ceo('src/App.tsx')
