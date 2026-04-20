import sys

def trace_divs(filename):
    with open(filename, 'r', encoding='utf-8') as f:
        lines = f.readlines()

    stack = []
    for i, line in enumerate(lines):
        line_num = i + 1
        # Find all <div and </div> on this line
        # Use a simple approach: look for <div (not closing) and </div>
        
        # This is a bit naive but can help
        pos = 0
        while True:
            open_idx = line.find('<div', pos)
            close_idx = line.find('</div>', pos)
            
            if open_idx == -1 and close_idx == -1:
                break
                
            if open_idx != -1 and (close_idx == -1 or open_idx < close_idx):
                # Potential open tag
                # Check if self-closing
                tag_end = line.find('>', open_idx)
                if tag_end != -1:
                    is_self = line[tag_end-1:tag_end+1] == '/>'
                    if not is_self:
                        stack.append(line_num)
                    pos = tag_end + 1
                else:
                    # Multi-line tag, assume opening for now
                    stack.append(line_num)
                    break
            else:
                # Closing tag
                if stack:
                    stack.pop()
                else:
                    print(f"EXTRA </div> at L{line_num}")
                pos = close_idx + 6

    print("\nUNCLOSED <div> at lines:")
    for ln in stack:
        print(f"  L{ln}")

if __name__ == "__main__":
    trace_divs('src/App.tsx')
