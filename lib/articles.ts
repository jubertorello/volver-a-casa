// ============================================================
//  Volver a Casa — Datos de Actualidad
// ============================================================

export type ArticleType =
  | "Jornada"
  | "Hito"
  | "Congreso"
  | "Alianza"
  | "Formación"
  | "Publicación"
  | "Noticia";

export const ALL_TYPES: ArticleType[] = [
  "Jornada",
  "Hito",
  "Congreso",
  "Alianza",
  "Formación",
  "Publicación",
  "Noticia",
];

/** Hex colors for each type — align with brand palette */
export const typeColor: Record<ArticleType, string> = {
  Jornada:    "#fa8d04", // naranja
  Hito:       "#02a54b", // verde
  Congreso:   "#1f53a6", // azul
  Alianza:    "#017a38", // verde-deep
  Formación:  "#d97700", // naranja-deep
  Publicación:"#173f80", // azul-deep
  Noticia:    "#1f53a6", // azul
};

export interface Article {
  /** URL slug — used in /actualidad/[id] */
  id: string;
  title: string;
  type: ArticleType;
  /** ISO date string: "2026-06-10" */
  date: string;
  /** Short description for listing cards */
  shortDesc: string;
  /** Path under /public or external URL. Empty string = show gradient. */
  cover: string;
  /** Rich HTML content for the detail page */
  content: string;
  /** Optional gallery image paths */
  gallery?: string[];
}

// ── Helpers ─────────────────────────────────────────────────

export function formatDate(iso: string): string {
  const d = new Date(iso + "T12:00:00");
  return d.toLocaleDateString("es-ES", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export function formatDateShort(iso: string): string {
  const d = new Date(iso + "T12:00:00");
  return d.toLocaleDateString("es-ES", { month: "short", year: "numeric" });
}

export function getArticle(id: string): Article | undefined {
  return articles.find((a) => a.id === id);
}

export function getRelated(currentId: string, type: ArticleType, limit = 3): Article[] {
  const sameType = articles.filter((a) => a.id !== currentId && a.type === type);
  const others   = articles.filter((a) => a.id !== currentId && a.type !== type);
  return [...sameType, ...others].slice(0, limit);
}

// ── Imagen por defecto ────────────────────────────────────────
export const DEFAULT_COVER = "/assets/article-cover-1.png";

// ── Artículos ────────────────────────────────────────────────

export const articles: Article[] = [
  // ── 0 — ARTÍCULO DEMO CON GALERÍA ──────────────────────────
  {
    id: "jornada-de-puertas-abiertas",
    title: "Jornada de puertas abiertas: familias y profesionales juntos",
    type: "Jornada",
    date: "2026-06-18",
    shortDesc:
      "Una tarde de encuentro, actividades y emoción para celebrar los primeros meses del programa con familias y equipo.",
    cover: "/assets/article-cover-2.jpg",
    content: `
      <h2>Una tarde para recordar</h2>
      <p>El pasado 18 de junio celebramos nuestra primera <strong>Jornada de Puertas Abiertas</strong>, una tarde llena de actividades, encuentros y emociones compartidas entre las familias participantes en el programa, el equipo profesional de Volver a Casa y representantes de las entidades colaboradoras.</p>
      <p>El espacio se transformó en un lugar de celebración y reconocimiento: de los avances conseguidos, del coraje de cada familia y del trabajo en equipo que lo hace posible. Fue un día muy especial para todos.</p>
      <blockquote>
        <p>"Ver a mi hijo jugar así, sin miedo, me recuerda por qué seguimos adelante cada día."</p>
        <cite>— Madre participante en el programa</cite>
      </blockquote>
      <h2>Actividades de la jornada</h2>
      <p>A lo largo de la tarde se desarrollaron distintas propuestas:</p>
      <ul>
        <li><strong>Talleres creativos</strong> para niños, niñas y adultos, conducidos por los educadores del equipo.</li>
        <li><strong>Espacio de testimonio</strong>: familias que llevan más tiempo en el programa compartieron su experiencia con las que acaban de incorporarse.</li>
        <li><strong>Mesa de intercambio profesional</strong>: debate abierto entre el equipo de Volver a Casa y representantes de servicios sociales.</li>
        <li><strong>Comida comunitaria</strong>: un momento informal y cálido para fortalecer el sentido de pertenencia.</li>
      </ul>
      <h2>Lo que nos llevamos</h2>
      <p>Más allá de las actividades, la jornada tuvo un valor simbólico enorme: demostró que <em>la comunidad funciona</em>. Que cuando las familias se ven reflejadas en otras, cuando sienten que no están solas, el proceso de cambio se vuelve más ligero y más sostenible.</p>
      <p>Nos vamos con las baterías cargadas y con la certeza renovada de que este proyecto tiene sentido, de que vale la pena. Hasta la próxima jornada.</p>
    `,
    gallery: [
      DEFAULT_COVER,
      DEFAULT_COVER,
      DEFAULT_COVER,
      DEFAULT_COVER,
      DEFAULT_COVER,
      DEFAULT_COVER,
    ],
  },

  // ── 1 ──────────────────────────────────────────────────────
  {
    id: "presentacion-publica-volver-a-casa",
    title: "Presentación pública de Volver a Casa",
    type: "Jornada",
    date: "2026-06-10",
    shortDesc:
      "Presentación oficial del proyecto Volver a Casa, un modelo de innovación social para la reunificación familiar.",
    cover: "/assets/article-cover-3.png",
    content: `
      <h2>Un proyecto que nace de la escucha</h2>
      <p>El pasado 10 de junio tuvo lugar la presentación pública de <strong>Volver a Casa</strong>, el nuevo proyecto de innovación social de Fundación Manantial orientado a acompañar procesos de reunificación familiar de niños, niñas y adolescentes que han estado en el sistema de protección.</p>
      <p>El acto contó con la presencia de representantes del <strong>Ministerio de Derechos Sociales</strong>, la <strong>Comunidad de Madrid</strong>, entidades colaboradoras y profesionales del ámbito de la protección a la infancia. Fue un momento de encuentro, de reconocimiento y de compromiso colectivo.</p>
      <blockquote>
        <p>"Volver a Casa no es solo un nombre. Es una promesa. Es decirle a cada niño y a cada familia que nadie tiene que recorrer este camino solo."</p>
        <cite>— Directora de Fundación Manantial</cite>
      </blockquote>
      <h2>El modelo de intervención</h2>
      <p>El programa se articula en torno a tres ejes fundamentales:</p>
      <ul>
        <li><strong>Acompañamiento familiar</strong>: trabajo directo y continuado con las familias para fortalecer vínculos y capacidades parentales.</li>
        <li><strong>Apoyo psicosocial</strong>: intervención especializada con los menores para trabajar el apego, la identidad y la gestión emocional.</li>
        <li><strong>Red comunitaria</strong>: coordinación con servicios sociales, centros educativos y recursos del entorno para una intervención integral.</li>
      </ul>
      <h2>Un equipo comprometido</h2>
      <p>El equipo de Volver a Casa está formado por psicólogos, trabajadores sociales y educadores con amplia experiencia en intervención familiar y protección a la infancia. Todos comparten una misma convicción: que la reunificación familiar, cuando es posible y segura, es siempre la mejor opción para el bienestar del menor.</p>
      <p>Durante la jornada se presentaron los primeros datos del programa piloto y los resultados preliminares de las familias que ya forman parte del proyecto, mostrando avances significativos en la calidad de los vínculos y en el bienestar emocional de los menores.</p>
    `,
  },

  // ── 2 ──────────────────────────────────────────────────────
  {
    id: "primeras-familias-incorporadas",
    title: "Primeras familias incorporadas al programa",
    type: "Hito",
    date: "2026-05-15",
    shortDesc:
      "Comenzamos el acompañamiento especializado con las primeras familias y menores del proyecto.",
    cover: "/assets/article-cover-1.png",
    content: `
      <h2>Un hito para el proyecto y para las familias</h2>
      <p>Mayo de 2026 marca un momento histórico para Volver a Casa: la incorporación de las primeras familias al programa de acompañamiento especializado. Tras meses de preparación, formación del equipo y coordinación con los servicios de protección, el programa da sus primeros pasos en la realidad de las personas a las que quiere servir.</p>
      <p>Las familias que inician este proceso provienen de situaciones muy diversas, pero comparten un mismo deseo: <strong>estar juntas</strong>. El proyecto respeta los tiempos de cada familia, sin prisas, construyendo confianza y seguridad paso a paso.</p>
      <h2>El proceso de incorporación</h2>
      <p>Cada familia pasa por un proceso de acogida que incluye:</p>
      <ol>
        <li>Una entrevista inicial de valoración con el equipo técnico.</li>
        <li>Un plan de trabajo individualizado adaptado a las necesidades específicas.</li>
        <li>La presentación de los profesionales de referencia (psicólogo/a y educador/a).</li>
        <li>El establecimiento de los primeros objetivos concretos y alcanzables.</li>
      </ol>
      <p>Este proceso es fundamental para crear el vínculo de confianza necesario entre la familia y el equipo profesional, base sobre la que se construirá todo el trabajo posterior.</p>
      <blockquote>
        <p>"Por fin sentimos que alguien nos escucha de verdad y que estamos avanzando."</p>
        <cite>— Madre participante en el programa</cite>
      </blockquote>
      <h2>Mirando hacia adelante</h2>
      <p>El equipo de Volver a Casa trabaja con un horizonte de 18 a 24 meses de acompañamiento por familia, aunque el plan es siempre flexible y se adapta a los progresos y necesidades de cada caso. Lo importante no es llegar rápido, sino llegar juntos.</p>
    `,
  },

  // ── 3 ──────────────────────────────────────────────────────
  {
    id: "congreso-desinstitucionalización",
    title: "Participación en encuentro sobre desinstitucionalización",
    type: "Congreso",
    date: "2026-04-22",
    shortDesc:
      "Compartiendo aprendizajes y debate sobre los retos de los sistemas de protección a la infancia.",
    cover: DEFAULT_COVER,
    content: `
      <h2>La desinstitucionalización como horizonte</h2>
      <p>El equipo de Volver a Casa participó en el <strong>II Encuentro Nacional sobre Desinstitucionalización en Protección a la Infancia</strong>, celebrado en Madrid los días 22 y 23 de abril. El encuentro reunió a más de 300 profesionales, investigadores y representantes de entidades sociales de toda España.</p>
      <p>La desinstitucionalización —el proceso de reducir la dependencia de los centros residenciales y apostar por alternativas familiares y comunitarias— es uno de los grandes retos del sistema de protección a la infancia en España y en toda Europa.</p>
      <h2>Nuestra aportación</h2>
      <p>El equipo presentó una comunicación oral titulada <em>"Reunificación familiar como alternativa a la institucionalización: aprendizajes del modelo Volver a Casa"</em>. La ponencia generó un debate rico y constructivo sobre los factores que favorecen o dificultan los procesos de reunificación.</p>
      <p>Entre los puntos más destacados del debate:</p>
      <ul>
        <li>La importancia del trabajo <strong>preventivo</strong> antes de que se produzca la separación familiar.</li>
        <li>La necesidad de <strong>coordinación efectiva</strong> entre los distintos sistemas de protección, salud y educación.</li>
        <li>El papel fundamental de las <strong>familias extendidas</strong> y las redes comunitarias.</li>
        <li>Los retos de la <strong>medición de resultados</strong> en intervenciones de carácter relacional.</li>
      </ul>
      <h2>Aprendizajes para seguir creciendo</h2>
      <p>El congreso fue también una oportunidad para conocer iniciativas similares en otros países europeos, como el modelo <em>Family Group Conferencing</em> de los Países Bajos o las experiencias de acogimiento en familia extensa de Portugal. Estos aprendizajes enriquecen nuestro modelo y nos inspiran a seguir mejorando.</p>
    `,
  },

  // ── 4 ──────────────────────────────────────────────────────
  {
    id: "acuerdo-colaboracion-entidades",
    title: "Nuevo acuerdo de colaboración con entidades sociales",
    type: "Alianza",
    date: "2026-03-10",
    shortDesc:
      "Fortalecemos la red de apoyo para garantizar un acompañamiento integral a las familias.",
    cover: DEFAULT_COVER,
    content: `
      <h2>Construyendo red</h2>
      <p>Volver a Casa ha formalizado nuevos acuerdos de colaboración con cuatro entidades del tercer sector especializadas en infancia, familia y salud mental. Estas alianzas refuerzan la capacidad del programa para ofrecer un acompañamiento verdaderamente integral.</p>
      <p>La lógica es clara: <strong>ninguna entidad puede hacerlo todo sola</strong>. Las familias tienen necesidades complejas y multidimensionales que requieren respuestas coordinadas desde distintos ámbitos.</p>
      <h2>Las entidades colaboradoras</h2>
      <p>Los nuevos acuerdos se han firmado con:</p>
      <ul>
        <li><strong>Asociación Crecer en Familia</strong>: especializada en formación y apoyo a familias en situación de vulnerabilidad.</li>
        <li><strong>Centro de Salud Mental Comunitaria San Blas</strong>: para la atención psicológica especializada de menores con necesidades específicas.</li>
        <li><strong>Red de Acogimiento Familiar de Madrid</strong>: para facilitar transiciones hacia el acogimiento familiar cuando sea necesario.</li>
        <li><strong>Fundación Integra</strong>: para el apoyo a la inserción laboral de las familias como factor de estabilidad.</li>
      </ul>
      <h2>Un modelo en red</h2>
      <p>El trabajo en red no solo amplía los recursos disponibles para las familias. También enriquece la práctica profesional, favorece el intercambio de conocimiento y fortalece la incidencia política del sector en su conjunto. Creemos que la colaboración entre entidades es, en sí misma, un acto de cuidado hacia las familias y hacia la comunidad.</p>
    `,
  },

  // ── 5 ──────────────────────────────────────────────────────
  {
    id: "formacion-profesionales-proteccion",
    title: "Sesiones de formación con profesionales de protección a la infancia",
    type: "Formación",
    date: "2026-02-18",
    shortDesc:
      "Formación especializada en metodologías de intervención y revinculación familiar.",
    cover: DEFAULT_COVER,
    content: `
      <h2>La formación como base del modelo</h2>
      <p>Durante el mes de febrero, el equipo de Volver a Casa ha impartido una serie de sesiones de formación dirigidas a profesionales de los servicios de protección a la infancia de la Comunidad de Madrid. El objetivo: compartir las metodologías de intervención familiar que sustentan el proyecto y crear una comunidad de práctica más sólida.</p>
      <p>Las sesiones han reunido a trabajadores sociales, psicólogos y educadores de equipos de valoración, centros de acogida y servicios especializados de familia. En total, más de <strong>80 profesionales</strong> han participado en estas jornadas formativas.</p>
      <h2>Contenidos de la formación</h2>
      <p>Los módulos formativos han cubierto los siguientes contenidos:</p>
      <ul>
        <li><strong>Teoría del apego y su aplicación en la intervención familiar</strong>: cómo los patrones de apego influyen en las dinámicas familiares y cómo trabajarlos terapéuticamente.</li>
        <li><strong>Evaluación de la parentalidad</strong>: herramientas y criterios para valorar las capacidades parentales y el riesgo/protección en cada caso.</li>
        <li><strong>Trabajo con resistencias y motivación al cambio</strong>: entrevista motivacional adaptada a contextos de protección involuntaria.</li>
        <li><strong>Coordinación intersistémica</strong>: protocolos de comunicación y derivación entre los distintos servicios implicados.</li>
      </ul>
      <blockquote>
        <p>"Esta formación me ha dado nuevas herramientas, pero sobre todo me ha devuelto la esperanza en que el cambio es posible con el acompañamiento adecuado."</p>
        <cite>— Trabajadora social participante</cite>
      </blockquote>
      <h2>Una práctica reflexiva</h2>
      <p>Más allá de los contenidos teóricos, las sesiones han priorizado el análisis de casos reales y el intercambio de experiencias entre profesionales. La reflexión sobre la propia práctica es, en sí misma, una de las herramientas más potentes para mejorar la calidad de la intervención.</p>
    `,
  },

  // ── 6 ──────────────────────────────────────────────────────
  {
    id: "primeros-aprendizajes-modelo-casa-verde",
    title: "Primeros aprendizajes del modelo Casa Verde",
    type: "Publicación",
    date: "2026-01-20",
    shortDesc:
      "Publicación de los resultados y lecciones aprendidas tras años de experiencia en salud mental.",
    cover: DEFAULT_COVER,
    content: `
      <h2>Del aprendizaje a la publicación</h2>
      <p>Fundación Manantial ha publicado el documento <em>"Aprendizajes del modelo Casa Verde: innovación en salud mental comunitaria"</em>, una síntesis de los resultados y lecciones extraídas de más de cinco años de experiencia con el programa Casa Verde, antecesor directo de Volver a Casa.</p>
      <p>Casa Verde fue un programa piloto de atención comunitaria en salud mental que trabajó con familias en situación de exclusión en tres barrios de Madrid. Los aprendizajes obtenidos han sido fundamentales para diseñar el modelo de Volver a Casa.</p>
      <h2>Principales hallazgos</h2>
      <p>El documento recoge los siguientes aprendizajes clave:</p>
      <ul>
        <li>La <strong>continuidad del vínculo terapéutico</strong> es el factor predictor más importante de los buenos resultados en intervenciones familiares complejas.</li>
        <li>Los programas que integran <strong>apoyo práctico y apoyo emocional</strong> tienen mayor impacto que los que se centran solo en uno de los dos.</li>
        <li>La <strong>participación activa de las familias</strong> en el diseño de su propio plan de intervención mejora significativamente la adherencia y los resultados.</li>
        <li>El trabajo en <strong>grupos de pares</strong> (familias con familias) tiene un potencial transformador enorme y aún poco aprovechado en el sistema.</li>
      </ul>
      <h2>De Casa Verde a Volver a Casa</h2>
      <p>Casa Verde demostró que es posible acompañar procesos de cambio profundos en familias que partían de situaciones muy difíciles. Esa convicción, alimentada por los datos y por cientos de historias reales, es la semilla de Volver a Casa.</p>
      <p>La publicación está disponible en formato digital en la web de Fundación Manantial y puede solicitarse en formato impreso contactando con el equipo del proyecto.</p>
      <blockquote>
        <p>"Los datos nos confirman lo que el equipo sentía: que invertir en las familias es siempre rentable, en términos humanos y también económicos."</p>
        <cite>— Responsable de Evaluación e Impacto, Fundación Manantial</cite>
      </blockquote>
    `,
  },
];
