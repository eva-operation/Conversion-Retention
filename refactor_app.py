
import os

file_path = r"c:\Users\Atil Bilge\Documents\projects\src\App.tsx"

with open(file_path, 'r', encoding='utf-8') as f:
    lines = f.readlines()

# Find the start and end of the content to extract
start_idx = -1
end_idx = -1
tabs_content_start_str = '<TabsContent value="ceo" className="mt-0 relative">'

for i, line in enumerate(lines):
    if tabs_content_start_str in line:
        start_idx = i
        break

if start_idx == -1:
    print("Could not find start of TabsContent value='ceo'")
    exit(1)

# Find the closing tag. It should be the </TabsContent> corresponding to the opening one.
# Since we know the approximate location and structure, we can search for the next </TabsContent> with same indentation
# The start line has indentation.
indentation = lines[start_idx][:lines[start_idx].find('<')]
end_tag = f"{indentation}</TabsContent>"

for i in range(start_idx + 1, len(lines)):
    if lines[i].startswith(end_tag):
        end_idx = i
        break

if end_idx == -1:
    print("Could not find end of TabsContent")
    exit(1)

# Extract content (excluding the TabsContent wrapper lines)
content_lines = lines[start_idx+1 : end_idx]

# Define the new render function
render_fn_lines = [
    "\n",
    "    const renderOverview = () => (\n",
    "        <>\n"
] + content_lines + [
    "        </>\n",
    "    );\n",
    "\n"
]

# Find where to insert the function definition (before the main component return)
# Search for "return (" inside the App component.
# App component starts around line 884.
# We look for the main return.
return_idx = -1
for i in range(start_idx, 0, -1):
    if lines[i].strip() == "return (" or lines[i].strip() == "return (":
        return_idx = i
        break

if return_idx == -1:
    # Try searching from top if we missed it
    for i, line in enumerate(lines):
         if "return (" in line and i > 884: # approximate start of App
             return_idx = i
             # We want the LAST one before the tabs content? No, the App component has one main return.
             # The one at 1732 seems correct.
             if i > 1700: 
                 break

if return_idx == -1:
    print("Could not find main return statement")
    exit(1)

# Modify the lines

# 1. Insert render function
# We verify insertion point.
new_lines = lines[:return_idx] + render_fn_lines + lines[return_idx:start_idx+1]

# 2. Add call in ceo tab
new_lines.append(f"{indentation}    {{renderOverview()}}\n")

# 3. Add brand_manager tab
new_lines.append(lines[end_idx]) # </TabsContent> for ceo
new_lines.append("\n")
new_lines.append(f"{indentation}<TabsContent value=\"brand_manager\" className=\"mt-0 relative\">\n")
new_lines.append(f"{indentation}    {{renderOverview()}}\n")
new_lines.append(f"{indentation}</TabsContent>\n")

# 4. Copy the rest of the file, skipping the original content lines
# We need to handle the loop for other personas.
# The original file had:
# </TabsContent>
# {
#     PERSONAS.filter(p => p.id !== 'ceo').map(persona => (
# ...

# We need to change the filter condition.

# Check the lines after end_idx
rest_start_idx = end_idx + 1
rest_lines = lines[rest_start_idx:]

# Find the filter line
filter_line_idx = -1
for i, line in enumerate(rest_lines):
    if "PERSONAS.filter" in line:
        filter_line_idx = i
        break

if filter_line_idx != -1:
    rest_lines[filter_line_idx] = rest_lines[filter_line_idx].replace(
        "p.id !== 'ceo'", 
        "p.id !== 'ceo' && p.id !== 'brand_manager'"
    )

new_lines.extend(rest_lines)

# Write result
out_path = r"c:\Users\Atil Bilge\Documents\projects\src\App_refactored.tsx"
with open(out_path, 'w', encoding='utf-8') as f:
    f.writelines(new_lines)

print(f"Refactored file written to {out_path}")
print(f"Extracted {len(content_lines)} lines of content.")
print(f"Inserted function at line {return_idx}")
