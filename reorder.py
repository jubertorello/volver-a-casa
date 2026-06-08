import re

with open('index.html', 'r', encoding='utf-8') as f:
    content = f.read()

# Replace texts
content = content.replace('>La infancia<', '>Blog<')
content = content.replace('La infancia</p>', 'Blog</p>')
content = content.replace('data-screen-label="08 La infancia"', 'data-screen-label="08 Blog"')
content = content.replace('Ver todo «La infancia»', 'Ver todo el Blog')

content = content.replace('>Cómo acompañamos<', '>Principios<')
content = content.replace('Cómo acompañamos</p>', 'Principios</p>')
content = content.replace('data-screen-label="05 Cómo acompañamos"', 'data-screen-label="05 Principios"')
content = content.replace('Hablemos de cómo acompañamos', 'Hablemos de principios')

# Extract sections
def extract_section(name):
    # Regex to find from the comment to the next section comment or </main>
    # The pattern matches <!-- ============ X ============ --> ... up to the next <!-- ============
    pattern = r'(<!-- ===================== \d+ · .*? ===================== -->\n<section class="section.*?id="' + name + r'".*?</section>\n(?:<style>.*?</style>\n)?)'
    match = re.search(pattern, content, re.DOTALL)
    if not match:
        # Fallback to simple matching
        pattern2 = r'(<!-- ===================== .*? ===================== -->\n<section class="section.*?id="' + name + r'".*?</section>\n(?:<style>.*?</style>\n)?)'
        match = re.search(pattern2, content, re.DOTALL)
    if match:
        return match.group(1)
    else:
        print(f"Could not find section {name}")
        return ""

metodo = extract_section("metodo")
recorrido = extract_section("recorrido")
historias = extract_section("historias")
hablemos = extract_section("hablemos")
actualidad = extract_section("actualidad")

if not (metodo and recorrido and historias and hablemos and actualidad):
    print("Failed to extract one or more sections")
    exit(1)

# The block to replace is the contiguous block of all these 5 sections
# We find the start of the first one and the end of the last one.
# Looking at the file, the order is: metodo, recorrido, historias, hablemos, actualidad
full_block_start = content.find(metodo)
full_block_end = content.find(actualidad) + len(actualidad)

if full_block_start == -1 or content.find(actualidad) == -1:
    print("Could not find full block")
    exit(1)

# New order: recorrido, actualidad, hablemos, metodo, historias
new_block = recorrido + '\n' + actualidad + '\n' + hablemos + '\n' + metodo + '\n' + historias + '\n'

content = content[:full_block_start] + new_block + content[full_block_end:]

# Also update the menus
menu_pattern = r'(<a href="#proyecto">El proyecto</a>\s*<a href="#camino">El camino</a>\s*<a href="#porque">Objetivos</a>\s*)<a href="#metodo">Principios</a>\s*<a href="#recorrido">Nuestra experiencia</a>\s*<a href="#historias">Historias</a>\s*<a href="#hablemos">Blog</a>\s*<a href="#actualidad">Actualidad</a>'
menu_repl = r'\1<a href="#recorrido">Nuestra experiencia</a>\n    <a href="#actualidad">Actualidad</a>\n    <a href="#hablemos">Blog</a>\n    <a href="#metodo">Principios</a>\n    <a href="#historias">Historias</a>'

mobile_menu_pattern = r'(<a href="#proyecto">El proyecto</a>\s*<a href="#camino">El camino</a>\s*<a href="#porque">Objetivos</a>\s*)<a href="#metodo">Principios</a>\s*<a href="#recorrido">Nuestra experiencia</a>\s*<a href="#historias">Historias</a>\s*<a href="#hablemos">Blog</a>\s*<a href="#actualidad">Actualidad</a>'
mobile_menu_repl = r'\1<a href="#recorrido">Nuestra experiencia</a>\n  <a href="#actualidad">Actualidad</a>\n  <a href="#hablemos">Blog</a>\n  <a href="#metodo">Principios</a>\n  <a href="#historias">Historias</a>'

# Apply menu updates. Since they have slightly different indentation, we can just replace the links block.
def replace_menu(m):
    indent = m.group(1).split('\n')[-1].replace('<a href="#porque">Objetivos</a>', '')
    return (m.group(1) + 
            '<a href="#recorrido">Nuestra experiencia</a>\n' +
            indent + '<a href="#actualidad">Actualidad</a>\n' +
            indent + '<a href="#hablemos">Blog</a>\n' +
            indent + '<a href="#metodo">Principios</a>\n' +
            indent + '<a href="#historias">Historias</a>')

content = re.sub(menu_pattern, replace_menu, content)

# Update footer menu
footer_menu_pattern = r'(<li><a href="#proyecto">El proyecto</a></li>\s*<li><a href="#camino">El camino</a></li>\s*<li><a href="#porque">Objetivos</a></li>\s*)<li><a href="#hablemos">Blog</a></li>\s*<li><a href="#actualidad">Actualidad</a></li>'
def replace_footer_menu(m):
    indent = m.group(1).split('\n')[-1].replace('<li><a href="#porque">Objetivos</a></li>', '')
    return (m.group(1) + 
            '<li><a href="#recorrido">Nuestra experiencia</a></li>\n' +
            indent + '<li><a href="#actualidad">Actualidad</a></li>\n' +
            indent + '<li><a href="#hablemos">Blog</a></li>\n' +
            indent + '<li><a href="#metodo">Principios</a></li>\n' +
            indent + '<li><a href="#historias">Historias</a></li>')

content = re.sub(footer_menu_pattern, replace_footer_menu, content)

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(content)

print("Done")
