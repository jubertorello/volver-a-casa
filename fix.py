import re

with open('index.html', 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Hero & Proyecto fixes
content = content.replace('<section class="hero" data-variant="a"', '<section class="hero" data-variant="b"')
content = re.sub(r'<div class="hero__stage".*?</div>\s*</div>\s*</div>', '</div>\n  </div>', content, flags=re.DOTALL)
content = re.sub(r'<!-- Editorial version \(variant B\) -->.*?</div>\s*</div>\s*</section>', '</section>', content, flags=re.DOTALL)
content = re.sub(r'/\* proyecto: variant swap.*?</style>', '</style>', content, flags=re.DOTALL)
content = re.sub(r'<!-- ===================== Hero direction switch ===================== -->.*?</style>', '', content, flags=re.DOTALL)

# 2. Text replacements
content = content.replace('Por qué importa', 'Objetivos')
content = content.replace('por qué importa', 'objetivos')
content = content.replace('El recorrido', 'Nuestra experiencia')
content = content.replace('el camino recorrido', 'nuestra experiencia')
content = content.replace('Nuestro recorrido', 'Nuestra experiencia')
content = content.replace('La infancia', 'Blog')
content = content.replace('la infancia', 'el blog')
content = content.replace('Cómo acompañamos', 'Principios')
content = content.replace('cómo acompañamos', 'principios')

# Special cases
content = content.replace('Ver todo «Blog»', 'Ver todo el Blog')
content = content.replace('Hablemos de el blog', 'Hablemos del blog')

# 3. Section Reordering
# Let's split the file at the main tag
parts = content.split('<main id="top">')
header = parts[0] + '<main id="top">\n'
rest = parts[1]
parts2 = rest.split('</main>')
main_content = parts2[0]
footer = '\n</main>' + parts2[1]

# Split main_content by sections
section_regex = re.compile(r'(<!-- ===================== .*? ===================== -->\n<section.*?</section>\n(?:<style>.*?</style>\n)?)', re.DOTALL)
sections = section_regex.split(main_content)

# sections will have alternating non-matching and matching chunks
# We need to identify them by ID
section_dict = {}
non_sections = []

for i, chunk in enumerate(sections):
    if chunk.startswith('<!-- ===================== '):
        # find ID
        m = re.search(r'id="([^"]+)"', chunk)
        if m:
            section_dict[m.group(1)] = chunk
        else:
            non_sections.append((i, chunk))
    else:
        non_sections.append((i, chunk))

# We also need to extract Hero and Marquee which are before the numbered sections
# Looking at the file, the first split chunk will contain hero and marquee.

# Desired order:
order = ['proyecto', 'camino', 'porque', 'recorrido', 'actualidad', 'hablemos', 'metodo', 'historias']

new_main = sections[0] # hero + marquee
for sec_id in order:
    new_main += section_dict[sec_id]

# 4. Update menus
menu_pattern = re.compile(r'(<nav class="nav__links" aria-label="Principal">.*?)</nav>', re.DOTALL)
new_menu = '''<nav class="nav__links" aria-label="Principal">
    <a href="#proyecto">El proyecto</a>
    <a href="#camino">El camino</a>
    <a href="#porque">Objetivos</a>
    <a href="#recorrido">Nuestra experiencia</a>
    <a href="#actualidad">Actualidad</a>
    <a href="#hablemos">Blog</a>
    <a href="#metodo">Principios</a>
    <a href="#historias">Historias</a>
  </nav>'''
header = menu_pattern.sub(new_menu, header)

mobile_menu_pattern = re.compile(r'(<div class="mobile-menu" id="mobileMenu">.*?)</div>', re.DOTALL)
new_mobile_menu = '''<div class="mobile-menu" id="mobileMenu">
  <a href="#proyecto">El proyecto</a>
  <a href="#camino">El camino</a>
  <a href="#porque">Objetivos</a>
  <a href="#recorrido">Nuestra experiencia</a>
  <a href="#actualidad">Actualidad</a>
  <a href="#hablemos">Blog</a>
  <a href="#metodo">Principios</a>
  <a href="#historias">Historias</a>
</div>'''
header = mobile_menu_pattern.sub(new_mobile_menu, header)

footer_menu_pattern = re.compile(r'(<div class="footer__col">\s*<h4>Explora</h4>\s*<ul>.*?</ul>)', re.DOTALL)
new_footer_menu = '''<div class="footer__col">
        <h4>Explora</h4>
        <ul>
          <li><a href="#proyecto">El proyecto</a></li>
          <li><a href="#camino">El camino</a></li>
          <li><a href="#porque">Objetivos</a></li>
          <li><a href="#recorrido">Nuestra experiencia</a></li>
          <li><a href="#actualidad">Actualidad</a></li>
          <li><a href="#hablemos">Blog</a></li>
          <li><a href="#metodo">Principios</a></li>
          <li><a href="#historias">Historias</a></li>
        </ul>'''
footer = footer_menu_pattern.sub(new_footer_menu, footer)

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(header + new_main + footer)

print("Done")
